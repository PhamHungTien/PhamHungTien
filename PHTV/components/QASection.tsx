import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Icons } from './Icons';
import { auth, db, requestNotificationPermission, googleProvider } from '../src/firebase';
import { 
  onAuthStateChanged, 
  signOut,
  updateProfile,
  signInWithPopup
} from 'firebase/auth';
import { 
  collection, 
  addDoc, 
  query, 
  orderBy, 
  onSnapshot, 
  doc, 
  updateDoc, 
  deleteDoc,
  arrayUnion,
  arrayRemove,
  getDoc,
  limit,
  increment,
  where,
  Timestamp,
  getDocs
} from 'firebase/firestore';

interface User {
  uid: string;
  username: string;
  isAdmin: boolean;
  email: string;
  photoURL?: string;
}

interface Reply {
  id: string;
  parentId?: string;
  replyToName?: string;
  authorId: string;
  author: string;
  authorPhoto?: string;
  content: string;
  timestamp: number;
  isAdmin: boolean;
  likedBy: string[];
}

interface Question {
  id: string;
  authorId: string;
  author: string;
  authorPhoto?: string;
  content: string;
  timestamp: number;
  replies: Reply[];
  likedBy: string[];
  isPinned?: boolean;
  isReported?: boolean;
  isLocked?: boolean;
  isAdmin?: boolean;
  viewCount?: number;
}

interface AppNotification {
  id: string;
  recipientId: string;
  senderName: string;
  senderPhoto?: string;
  type: 'reply' | 'like' | 'mention';
  questionId: string;
  content: string;
  timestamp: number;
  isRead: boolean;
}

const ADMIN_EMAILS = ['admin@phtv.com', 'hungtien10a7@gmail.com'];
const POSTS_PER_PAGE = 15;

const getInitials = (name: string) => {
  if (!name) return '??';
  return name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2);
};

const formatRelativeTime = (timestamp: any) => {
  if (!timestamp) return '...';
  const date = typeof timestamp === 'number' ? timestamp : timestamp.toMillis?.() || Date.now();
  const diff = Date.now() - date;
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (seconds < 60) return 'Vừa xong';
  if (minutes < 60) return `${minutes}p`;
  if (hours < 24) return `${hours}h`;
  if (days < 7) return `${days} ngày`;
  return new Date(date).toLocaleDateString('vi-VN');
};

const SmartContent: React.FC<{ content: string, className?: string }> = ({ content, className }) => {
  const parts = content.split(/(`[^`]+`|@[a-zA-Z0-9_]+|https?:\/\/[^\s]+)/g);
  return (
    <div className={`whitespace-pre-wrap break-words ${className}`}>
      {parts.map((part, i) => {
        if (part.startsWith('`') && part.endsWith('`')) {
          return <code key={i} className="bg-white/10 px-1.5 py-0.5 rounded text-brand-300 font-mono text-[0.9em] border border-white/5">{part.slice(1, -1)}</code>;
        }
        if (part.startsWith('@')) {
          return <span key={i} className="text-brand-400 font-bold hover:underline cursor-pointer">{part}</span>;
        }
        if (part.startsWith('http')) {
          return <a key={i} href={part} target="_blank" rel="noopener noreferrer" className="text-blue-400 underline hover:text-blue-300 inline-flex items-center gap-1 transition-colors">{part.length > 40 ? part.substring(0, 40) + '...' : part} <Icons.ExternalLink size={10} /></a>;
        }
        return <span key={i}>{part}</span>;
      })}
    </div>
  );
};

export const QASection: React.FC = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [notifications, setNotifications] = useState<AppNotification[]>([]);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [newQuestion, setNewQuestion] = useState('');
  const [sortBy, setSortBy] = useState<'newest' | 'popular' | 'trending'>('newest');
  const [filterBy, setFilterBy] = useState<'all' | 'mine' | 'reported' | 'unanswered'>('all');
  const [searchQuery, setSearchBy] = useState('');
  
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showNamePrompt, setShowNamePrompt] = useState(false);
  const [showNotifs, setShowNotifs] = useState(false);
  const [tempUsername, setTempUsername] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [lastPostTime, setLastPostTime] = useState(0);
  const [showToast, setShowToast] = useState({ show: false, message: '' });
  const [postsLimit, setPostsLimit] = useState(POSTS_PER_PAGE);
  const [hasMore, setHasMore] = useState(true);
  
  const [replyingTo, setReplyingTo] = useState<{qId: string, rId?: string, name?: string, authorId?: string} | null>(null);
  const [replyContent, setReplyContent] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingReplyId, setEditingReplyId] = useState<string | null>(null);
  const [editContent, setEditContent] = useState('');

  // Authentication Listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const isAdmin = ADMIN_EMAILS.includes(user.email || '');
        setCurrentUser({
          uid: user.uid,
          username: user.email === 'hungtien10a7@gmail.com' ? 'Phạm Hùng Tiến' : (user.displayName || user.email?.split('@')[0] || 'User'),
          email: user.email || '',
          photoURL: user.photoURL || undefined,
          isAdmin: isAdmin
        });
      } else {
        setCurrentUser(null);
      }
    });
    return () => unsubscribe();
  }, []);

  // Notifications Listener
  useEffect(() => {
    if (!currentUser) return;
    const q = query(
      collection(db, "notifications"), 
      where("recipientId", "==", currentUser.uid),
      orderBy("timestamp", "desc"),
      limit(20)
    );
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setNotifications(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as AppNotification[]);
    });
    return () => unsubscribe();
  }, [currentUser]);

  // Firestore Real-time Listener for Questions
  useEffect(() => {
    const q = query(collection(db, "questions"), orderBy("timestamp", "desc"), limit(postsLimit));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      let qList = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Question[];

      if (sortBy === 'popular') {
        qList = qList.sort((a, b) => (b.likedBy?.length || 0) - (a.likedBy?.length || 0));
      } else if (sortBy === 'trending') {
        qList = qList.sort((a, b) => {
          const scoreA = (a.likedBy?.length || 0) + (a.replies?.length || 0) * 2 + (a.viewCount || 0) * 0.5;
          const scoreB = (b.likedBy?.length || 0) + (b.replies?.length || 0) * 2 + (b.viewCount || 0) * 0.5;
          return scoreB - scoreA;
        });
      }
      
      const pinned = qList.filter(q => q.isPinned);
      const others = qList.filter(q => !q.isPinned);
      setQuestions([...pinned, ...others]);
      setHasMore(snapshot.docs.length >= postsLimit);
    });
    return () => unsubscribe();
  }, [sortBy, postsLimit]);

  const unreadCount = useMemo(() => notifications.filter(n => !n.isRead).length, [notifications]);

  const displayQuestions = useMemo(() => {
    let result = questions;
    if (filterBy === 'mine' && currentUser) result = result.filter(q => q.authorId === currentUser.uid);
    else if (filterBy === 'reported' && currentUser?.isAdmin) result = result.filter(q => q.isReported);
    else if (filterBy === 'unanswered') result = result.filter(q => q.replies.length === 0);

    if (searchQuery.trim()) {
      const lowSearch = searchQuery.toLowerCase();
      result = result.filter(q => 
        q.content.toLowerCase().includes(lowSearch) || 
        q.author.toLowerCase().includes(lowSearch) ||
        q.replies.some(r => r.content.toLowerCase().includes(lowSearch))
      );
    }
    return result;
  }, [questions, filterBy, searchQuery, currentUser]);

  const triggerToast = (message: string) => {
    setShowToast({ show: true, message });
    setTimeout(() => setShowToast({ show: false, message: '' }), 3000);
  };

  const createNotification = async (recipientId: string, type: 'reply' | 'like', questionId: string, content: string) => {
    if (!currentUser || recipientId === currentUser.uid) return;
    await addDoc(collection(db, "notifications"), {
      recipientId,
      senderName: currentUser.username,
      senderPhoto: currentUser.photoURL || null,
      type,
      questionId,
      content,
      timestamp: Date.now(),
      isRead: false
    });
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      setShowAuthModal(false);
      requestNotificationPermission();
      if (result.user.metadata.creationTime === result.user.metadata.lastSignInTime && result.user.email !== 'hungtien10a7@gmail.com') {
        setTempUsername(result.user.displayName || '');
        setShowNamePrompt(true);
      }
    } catch (err: any) {
      alert('Lỗi đăng nhập: ' + err.message);
    }
  };

  const handleUpdateName = async () => {
    if (!tempUsername.trim()) return;
    if (auth.currentUser) {
      await updateProfile(auth.currentUser, { displayName: tempUsername });
      setCurrentUser(prev => prev ? { ...prev, username: tempUsername } : null);
      setShowNamePrompt(false);
      triggerToast('Đã cập nhật danh tính!');
    }
  };

  const handleAskQuestion = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) { setShowAuthModal(true); return; }
    if (!newQuestion.trim() || isSubmitting) return;
    if (Date.now() - lastPostTime < 10000 && !currentUser.isAdmin) {
      triggerToast('Vui lòng đợi 10 giây!');
      return;
    }
    setIsSubmitting(true);
    try {
      await addDoc(collection(db, "questions"), {
        authorId: currentUser.uid,
        author: currentUser.username,
        authorPhoto: currentUser.photoURL || null,
        content: newQuestion,
        timestamp: Date.now(),
        replies: [],
        likedBy: [],
        isPinned: false,
        isReported: false,
        isLocked: false,
        viewCount: 0,
        isAdmin: currentUser.isAdmin
      });
      setNewQuestion('');
      setLastPostTime(Date.now());
      triggerToast('Thảo luận đã được đăng!');
    } catch (err) {
      alert('Lỗi!');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReply = async (qId: string) => {
    if (!currentUser || !replyingTo) { setShowAuthModal(true); return; }
    if (!replyContent.trim()) return;

    const questionRef = doc(db, "questions", qId);
    const snap = await getDoc(questionRef);
    if (snap.exists() && snap.data().isLocked && !currentUser.isAdmin) {
      alert('Thảo luận này đã bị khóa!');
      return;
    }

    const newReply: Reply = {
      id: Date.now().toString(),
      parentId: replyingTo.rId || qId,
      replyToName: replyingTo.name,
      authorId: currentUser.uid,
      author: currentUser.isAdmin ? 'Phạm Hùng Tiến' : currentUser.username,
      authorPhoto: currentUser.photoURL || undefined,
      content: replyContent,
      timestamp: Date.now(),
      isAdmin: currentUser.isAdmin,
      likedBy: []
    };

    await updateDoc(questionRef, { replies: arrayUnion(newReply) });
    
    // Notify the author of the post or the author of the reply being replied to
    const recipientId = replyingTo.authorId || snap.data()?.authorId;
    if (recipientId) createNotification(recipientId, 'reply', qId, replyContent.substring(0, 50));

    setReplyContent('');
    setReplyingTo(null);
    triggerToast('Phản hồi đã gửi!');
  };

  const toggleLikeQuestion = async (q: Question) => {
    if (!currentUser) { setShowAuthModal(true); return; }
    const questionRef = doc(db, "questions", q.id);
    const hasLiked = q.likedBy?.includes(currentUser.uid);
    await updateDoc(questionRef, {
      likedBy: hasLiked ? arrayRemove(currentUser.uid) : arrayUnion(currentUser.uid)
    });
    if (!hasLiked) createNotification(q.authorId, 'like', q.id, q.content.substring(0, 50));
  };

  const toggleLikeReply = async (qId: string, rId: string) => {
    if (!currentUser) { setShowAuthModal(true); return; }
    const questionRef = doc(db, "questions", qId);
    const snap = await getDoc(questionRef);
    if (!snap.exists()) return;
    const data = snap.data() as Question;
    let targetReply: Reply | undefined;
    const updatedReplies = data.replies.map(r => {
      if (r.id === rId) {
        targetReply = r;
        const likedBy = r.likedBy || [];
        const hasLiked = likedBy.includes(currentUser.uid);
        return { ...r, likedBy: hasLiked ? likedBy.filter(id => id !== currentUser.uid) : [...likedBy, currentUser.uid] };
      }
      return r;
    });
    await updateDoc(questionRef, { replies: updatedReplies });
    if (targetReply && !targetReply.likedBy.includes(currentUser.uid)) {
      createNotification(targetReply.authorId, 'like', qId, targetReply.content.substring(0, 50));
    }
  };

  const deleteQuestion = async (id: string) => {
    if (!window.confirm('Xóa vĩnh viễn thảo luận này?')) return;
    await deleteDoc(doc(db, "questions", id));
    triggerToast('Đã xóa bài viết.');
  };

  const deleteReply = async (qId: string, rId: string) => {
    if (!window.confirm('Xóa phản hồi này?')) return;
    const questionRef = doc(db, "questions", qId);
    const snap = await getDoc(questionRef);
    if (!snap.exists()) return;
    const updatedReplies = (snap.data() as Question).replies.filter(r => r.id !== rId);
    await updateDoc(questionRef, { replies: updatedReplies });
    triggerToast('Đã xóa phản hồi.');
  };

  const saveEdit = async (id: string) => {
    if (!editContent.trim()) return;
    await updateDoc(doc(db, "questions", id), { content: editContent });
    setEditingId(null);
    triggerToast('Đã lưu.');
  };

  const saveReplyEdit = async (qId: string, rId: string) => {
    if (!editContent.trim()) return;
    const questionRef = doc(db, "questions", qId);
    const snap = await getDoc(questionRef);
    if (!snap.exists()) return;
    const updatedReplies = (snap.data() as Question).replies.map(r => r.id === rId ? { ...r, content: editContent } : r);
    await updateDoc(questionRef, { replies: updatedReplies });
    setEditingReplyId(null);
    triggerToast('Đã lưu.');
  };

  const reportContent = async (qId: string) => {
    if (!window.confirm('Báo cáo nội dung vi phạm?')) return;
    await updateDoc(doc(db, "questions", qId), { isReported: true });
    triggerToast('Cảm ơn bạn!');
  };

  const markNotifRead = async (notifId: string) => {
    await updateDoc(doc(db, "notifications", notifId), { isRead: true });
  };

  const incrementViews = async (id: string) => {
    const questionRef = doc(db, "questions", id);
    await updateDoc(questionRef, { viewCount: increment(1) });
  };

  const Avatar: React.FC<{ user: { username: string, photoURL?: string, isAdmin?: boolean }, size?: string }> = ({ user, size = "w-12 h-12", isAdmin }) => (
    <div className={`${size} rounded-[1.3rem] flex items-center justify-center text-white font-black overflow-hidden shadow-2xl transition-all duration-500 hover:scale-105 shrink-0 ${
      isAdmin 
        ? 'bg-gradient-to-br from-brand-400 via-brand-600 to-purple-600 ring-2 ring-brand-400/50 shadow-[0_0_20px_rgba(245,158,11,0.3)]' 
        : 'bg-slate-800'
    }`}>
      {user.photoURL ? (
        <img src={user.photoURL} alt={user.username} className="w-full h-full object-cover" />
      ) : (
        <span className={size.includes('w-8') ? 'text-[10px]' : 'text-xl'}>{getInitials(user.username)}</span>
      )}
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 py-8 md:py-24 flex flex-col lg:flex-row gap-8 min-h-screen">
      
      {/* Sidebar - Left (Desktop) */}
      <aside className="w-full lg:w-80 shrink-0 space-y-6 order-2 lg:order-1">
        <div className="glass-panel rounded-[2.2rem] p-8 border border-white/5 shadow-2xl backdrop-blur-xl">
           <div className="flex items-center justify-between mb-8">
              <h3 className="text-xl font-black text-white flex items-center gap-3"><Icons.Info size={20} className="text-brand-400" /> Thống kê</h3>
              <span className="bg-brand-500/10 text-brand-400 text-[10px] px-2 py-1 rounded-lg font-black uppercase border border-brand-500/20">Live</span>
           </div>
           <div className="space-y-4">
              <div className="flex items-center justify-between p-5 bg-white/[0.03] rounded-2xl border border-white/5 group hover:bg-white/[0.05] transition-all">
                 <span className="text-slate-500 text-sm font-bold uppercase tracking-widest">Thảo luận</span>
                 <span className="text-white font-black text-xl tabular-nums">{questions.length}</span>
              </div>
              <div className="p-5 bg-yellow-500/[0.03] rounded-2xl border border-yellow-500/10">
                 <div className="flex items-center gap-2 text-yellow-500 mb-3">
                    <Icons.ShieldCheck size={18} />
                    <span className="text-xs font-black uppercase tracking-widest">Quy tắc cộng đồng</span>
                 </div>
                 <ul className="space-y-2">
                    {['Văn minh, lịch sự', 'Không spam quảng cáo', 'Hỗ trợ lẫn nhau'].map((rule, i) => (
                      <li key={i} className="flex items-center gap-2 text-xs text-slate-500 font-medium">
                        <div className="w-1 h-1 rounded-full bg-slate-700"></div>
                        {rule}
                      </li>
                    ))}
                 </ul>
              </div>
           </div>
        </div>

        <div className="glass-panel rounded-[2.2rem] p-8 border border-white/5 shadow-2xl hidden md:block backdrop-blur-xl group/dev">
           <h3 className="text-xl font-black text-white mb-8 flex items-center gap-3"><Icons.Award size={20} className="text-brand-400" /> Tác giả</h3>
           <div className="flex items-center gap-4 p-5 bg-gradient-to-br from-brand-500/10 to-purple-500/10 rounded-2xl border border-brand-500/20 shadow-inner">
              <div className="w-14 h-14 rounded-2xl bg-brand-500 flex items-center justify-center text-white shadow-lg shadow-brand-500/30 transition-transform group-hover/dev:scale-110 group-hover/dev:rotate-6">
                 <Icons.User size={28} />
              </div>
              <div>
                 <h4 className="text-white font-black text-base">Phạm Hùng Tiến</h4>
                 <p className="text-[10px] text-brand-400 font-black uppercase tracking-widest">PHTV Creator</p>
              </div>
           </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 order-1 lg:order-2 space-y-10">
        
        {/* Top Header & Auth */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-8 mb-16">
          <div className="text-center sm:text-left space-y-2">
             <h2 className="text-5xl md:text-8xl font-black text-white tracking-tighter italic leading-none select-none">
               Thảo luận <span className="text-brand-500 drop-shadow-[0_0_15px_rgba(139,92,246,0.3)]">PHTV</span>
             </h2>
             <p className="text-slate-600 text-xs md:text-sm font-black uppercase tracking-[0.3em] flex items-center justify-center sm:justify-start gap-3">
               <span className="w-10 h-[1px] bg-slate-800"></span>
               Cộng đồng bộ gõ tiếng Việt
               <span className="w-10 h-[1px] bg-slate-800"></span>
             </p>
          </div>
          
          <div className="flex items-center gap-4">
            {currentUser ? (
              <div className="flex items-center gap-4">
                {/* Notification Bell */}
                <div className="relative">
                  <button 
                    onClick={() => setShowNotifs(!showNotifs)}
                    className={`p-4 rounded-2xl border transition-all relative ${showNotifs ? 'bg-white text-slate-950 border-white shadow-xl' : 'bg-white/5 border-white/5 text-slate-500 hover:text-white hover:bg-white/10'}`}
                  >
                    <Icons.Bell size={24} />
                    {unreadCount > 0 && (
                      <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-[10px] font-black flex items-center justify-center rounded-full ring-4 ring-slate-950 animate-pulse">{unreadCount}</span>
                    )}
                  </button>
                  
                  {/* Notifications Dropdown */}
                  {showNotifs && (
                    <div className="absolute right-0 top-16 w-[320px] md:w-[400px] bg-slate-900 border border-white/10 rounded-[2.5rem] shadow-[0_30px_100px_rgba(0,0,0,0.8)] z-[150] overflow-hidden animate-in zoom-in-95 duration-200">
                       <div className="p-6 border-b border-white/5 flex items-center justify-between bg-slate-950/50">
                          <span className="font-black text-sm uppercase tracking-widest text-white">Thông báo</span>
                          <button onClick={() => setShowNotifs(false)} className="text-slate-500 hover:text-white"><Icons.X size={18} /></button>
                       </div>
                       <div className="max-h-[450px] overflow-y-auto custom-scrollbar">
                          {notifications.length === 0 ? (
                            <div className="p-12 text-center text-slate-600 font-bold text-xs uppercase tracking-widest">Không có thông báo</div>
                          ) : (
                            notifications.map(n => (
                              <div key={n.id} onClick={() => { markNotifRead(n.id); setShowNotifs(false); }} className={`p-5 border-b border-white/5 flex gap-4 cursor-pointer transition-colors ${n.isRead ? 'opacity-60 grayscale' : 'bg-brand-500/[0.03] hover:bg-brand-500/[0.08]'}`}>
                                 <Avatar user={{ username: n.senderName, photoURL: n.senderPhoto }} size="w-10 h-10" />
                                 <div className="flex-1 space-y-1">
                                    <p className="text-xs text-white leading-relaxed">
                                      <span className="font-black">{n.senderName}</span> {n.type === 'reply' ? 'đã phản hồi thảo luận của bạn:' : 'đã thích thảo luận của bạn:'}
                                    </p>
                                    <p className="text-[11px] text-slate-500 italic line-clamp-1">"{n.content}"</p>
                                    <span className="text-[9px] text-brand-500 font-black uppercase tracking-tighter">{formatRelativeTime(n.timestamp)}</span>
                                 </div>
                                 {!n.isRead && <div className="w-2 h-2 rounded-full bg-brand-500 mt-2"></div>}
                              </div>
                            ))
                          )}
                       </div>
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-3 p-2 pr-5 bg-white/5 rounded-3xl border border-white/10 group shadow-2xl backdrop-blur-xl transition-all hover:bg-white/10">
                  <Avatar user={currentUser} size="w-11 h-11" isAdmin={currentUser.isAdmin} />
                  <div className="flex flex-col">
                    <span className="text-sm font-black text-white flex items-center gap-1 uppercase tracking-tight">
                      {currentUser.username} 
                      {currentUser.isAdmin && <Icons.CheckCircle2 size={12} className="text-brand-400" />}
                    </span>
                    <div className="flex gap-3">
                      <button onClick={() => {setTempUsername(currentUser.username); setShowNamePrompt(true);}} className="text-[9px] font-black text-brand-400 hover:text-white uppercase">Sửa tên</button>
                      <button onClick={() => signOut(auth)} className="text-[9px] font-black text-red-500 hover:text-red-400 uppercase">Thoát</button>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <button onClick={() => setShowAuthModal(true)} className="group flex items-center gap-4 px-10 py-5 bg-white text-slate-950 rounded-[2rem] transition-all transform hover:scale-105 active:scale-95 font-black text-base shadow-[0_25px_50px_rgba(255,255,255,0.15)]">
                <Icons.User size={22} className="group-hover:rotate-12 transition-transform" />
                <span>Bắt đầu Thảo luận</span>
              </button>
            )}
          </div>
        </div>

        {/* Premium Toolbar */}
        <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-700">
           <div className="relative group shadow-2xl">
              <div className="absolute inset-0 bg-brand-500/5 opacity-0 group-focus-within:opacity-100 transition-opacity rounded-[2.2rem]"></div>
              <Icons.Search className="absolute left-7 top-1/2 -translate-y-1/2 text-slate-700 group-focus-within:text-brand-500 transition-colors" size={28} />
              <input 
                type="text" 
                placeholder="Tìm nội dung, tên thành viên, lỗi phần mềm..." 
                value={searchQuery}
                onChange={e => setSearchBy(e.target.value)}
                className="w-full bg-slate-900/60 backdrop-blur-2xl border border-white/5 rounded-[2.2rem] py-6 pl-16 pr-10 text-white focus:outline-none focus:border-brand-500/30 transition-all text-xl shadow-inner font-medium"
              />
           </div>
           
           <div className="flex flex-wrap items-center justify-between gap-6">
              <div className="flex bg-slate-900/80 p-1.5 rounded-2xl border border-white/5 shadow-2xl backdrop-blur-xl">
                 {[ 
                   { id: 'newest', label: 'Mới nhất', icon: Icons.RefreshCw },
                   { id: 'trending', label: 'Xu hướng', icon: Icons.Sparkles },
                   { id: 'popular', label: 'Yêu thích', icon: Icons.Award }
                 ].map(tab => (
                   <button key={tab.id} onClick={() => setSortBy(tab.id as any)} className={`flex items-center gap-3 px-8 py-3.5 rounded-xl text-[11px] font-black uppercase tracking-[0.2em] transition-all ${sortBy === tab.id ? 'bg-white text-slate-950 shadow-2xl scale-[1.03]' : 'text-slate-600 hover:text-white'}`}>
                     <tab.icon size={16} />
                     {tab.label}
                   </button>
                 ))}
              </div>

              <div className="flex items-center gap-4 bg-slate-900/60 px-8 py-4 rounded-2xl border border-white/5 backdrop-blur-md shadow-lg">
                 <Icons.Filter size={18} className="text-brand-500" />
                 <select 
                   value={filterBy} 
                   onChange={e => setFilterBy(e.target.value as any)}
                   className="bg-transparent text-white font-black text-xs uppercase tracking-[0.1em] focus:outline-none cursor-pointer"
                 >
                    <option value="all" className="bg-slate-900">Tất cả bài đăng</option>
                    <option value="mine" className="bg-slate-900">Bài của tôi</option>
                    <option value="unanswered" className="bg-slate-900 text-brand-400">Cần phản hồi</option>
                    {currentUser?.isAdmin && <option value="reported" className="bg-slate-900 text-red-400">⚠️ Bị báo cáo</option>}
                 </select>
              </div>
           </div>
        </div>

        {/* Premium Post Form */}
        <div className="glass-panel rounded-[3.5rem] p-2 shadow-[0_40px_120px_rgba(0,0,0,0.5)] border border-white/5 overflow-hidden group/form relative backdrop-blur-3xl animate-in zoom-in-95 duration-1000 delay-200">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand-500 via-purple-500 to-red-500 opacity-20 group-focus-within/form:opacity-100 transition-all duration-700"></div>
          <div className="bg-slate-900/40 rounded-[3.3rem] p-10 md:p-14 transition-all group-focus-within/form:bg-slate-900/60 shadow-inner">
            <form onSubmit={handleAskQuestion} className="space-y-10">
              <div className="flex items-start gap-8">
                 <div className="hidden md:block">
                    <Avatar user={{ username: currentUser?.username || 'User', photoURL: currentUser?.photoURL, isAdmin: currentUser?.isAdmin }} isAdmin={currentUser?.isAdmin} size="w-16 h-16" />
                 </div>
                 <div className="flex-1">
                    <textarea 
                      placeholder={currentUser ? `Bạn đang nghĩ gì, ${currentUser.username.split(' ')[0]}?` : "Đăng nhập Google để cùng chia sẻ kiến thức..."} 
                      value={newQuestion} 
                      onChange={(e) => setNewQuestion(e.target.value)} 
                      disabled={isSubmitting} 
                      className="w-full bg-transparent border-none p-0 text-white text-2xl md:text-3xl focus:ring-0 placeholder:text-slate-800 min-h-[140px] resize-none font-medium leading-tight tracking-tight" 
                      required 
                    />
                 </div>
              </div>
              
              <div className="flex flex-col sm:flex-row items-center justify-between pt-8 border-t border-white/5 gap-8">
                <div className="flex items-center gap-8 text-slate-700">
                   <div className="flex items-center gap-3 hover:text-brand-400 cursor-help transition-all group/tip" title="Hỗ trợ mã nguồn">
                      <Icons.Terminal size={24} className="group-hover/tip:rotate-12" />
                      <span className="text-[10px] font-black uppercase tracking-widest hidden lg:inline opacity-0 group-hover/tip:opacity-100 transition-opacity">Code `...`</span>
                   </div>
                   <div className="flex items-center gap-3 hover:text-brand-400 cursor-help transition-all group/tip" title="Liên kết tự động">
                      <Icons.Link2 size={24} className="group-hover/tip:-rotate-12" />
                      <span className="text-[10px] font-black uppercase tracking-widest hidden lg:inline opacity-0 group-hover/tip:opacity-100 transition-opacity">Auto URL</span>
                   </div>
                </div>
                <button type="submit" disabled={isSubmitting || !newQuestion.trim()} className="group w-full sm:w-auto flex items-center justify-center gap-5 px-16 py-6 bg-white text-slate-950 rounded-[2rem] font-black text-lg transition-all transform hover:scale-[1.05] active:scale-95 shadow-2xl disabled:opacity-50 disabled:scale-100">
                  {isSubmitting ? (
                    <Icons.RefreshCw className="animate-spin" size={24} />
                  ) : (
                    <>
                      <span>Gửi Thảo luận</span>
                      <Icons.Send size={24} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Discussion List */}
        <div className="space-y-20">
          {displayQuestions.map((q) => (
            <div key={q.id} className={`group/card animate-in fade-in slide-in-from-bottom-12 duration-1000 ${q.isPinned ? 'ring-2 ring-brand-500/40 rounded-[3.5rem] p-8 md:p-12 bg-brand-500/[0.04] shadow-[0_0_80px_rgba(139,92,246,0.15)] relative overflow-hidden' : ''}`} onMouseEnter={() => incrementViews(q.id)}>
               {q.isPinned && <div className="absolute top-0 right-0 w-32 h-32 bg-brand-500/10 blur-[60px] pointer-events-none"></div>}
               
               <div className="flex gap-8 md:gap-12">
                  {/* Avatar Column */}
                  <div className="flex flex-col items-center">
                    <Avatar user={{ username: q.author, photoURL: q.authorPhoto, isAdmin: q.isAdmin }} isAdmin={q.isAdmin} size="w-16 h-16 md:w-20 md:h-20" />
                    <div className="w-[3px] flex-1 bg-gradient-to-b from-white/10 via-white/5 to-transparent my-6 rounded-full opacity-50 group-hover/card:opacity-100 transition-opacity"></div>
                  </div>
                  
                  {/* Content Column */}
                  <div className="flex-1 space-y-8 pb-16">
                    <div className="flex justify-between items-start gap-6">
                      <div className="space-y-2">
                        <div className="flex items-center gap-4 flex-wrap">
                          <h4 className={`font-black text-2xl md:text-3xl tracking-tight transition-all ${q.isAdmin ? 'text-brand-400 text-glow hover:text-brand-300' : 'text-white hover:text-brand-400'} cursor-pointer uppercase`}>{q.author}</h4>
                          {q.isAdmin && <span className="flex items-center gap-2 bg-brand-500 text-slate-950 text-[10px] px-4 py-1.5 rounded-full font-black uppercase tracking-[0.2em] shadow-lg"><Icons.ShieldCheck size={14} /> Admin</span>}
                          {q.isPinned && <div className="flex items-center gap-2 bg-white/10 text-brand-400 text-[10px] px-3 py-1.5 rounded-full font-black uppercase tracking-widest border border-white/10 shadow-xl"><Icons.Paperclip size={14} className="animate-pulse" /> Ghim</div>}
                          <span className="text-xs text-slate-700 font-black uppercase tracking-[0.2em] ml-2">{formatRelativeTime(q.timestamp)}</span>
                        </div>
                        <div className="flex items-center gap-6 text-[10px] font-black text-slate-800 uppercase tracking-[0.2em] select-none">
                           <span className="flex items-center gap-2"><Icons.Eye size={14} /> {q.viewCount || 0} views</span>
                           <span className="flex items-center gap-2 text-red-500/40 hover:text-red-500 cursor-pointer transition-all group/rp" onClick={() => reportContent(q.id)}><Icons.Flag size={14} className="group-hover/rp:rotate-12" /> Report</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2 opacity-0 group-hover/card:opacity-100 transition-all transform translate-x-6 group-hover/card:translate-x-0">
                        {currentUser?.isAdmin && (
                          <>
                            <button onClick={() => toggleLock(q)} className={`p-3.5 rounded-2xl border transition-all ${q.isLocked ? 'text-brand-500 bg-brand-500/10 border-brand-500/30 shadow-lg' : 'text-slate-700 border-white/5 hover:bg-white/5'}`} title={q.isLocked ? 'Mở khóa' : 'Khóa'}>{q.isLocked ? <Icons.Lock size={24} /> : <Icons.Unlock size={24} />}</button>
                            <button onClick={() => updateDoc(doc(db, "questions", q.id), { isPinned: !q.isPinned })} className={`p-3.5 rounded-2xl border transition-all ${q.isPinned ? 'text-brand-500 bg-brand-500/10 border-brand-500/30' : 'text-slate-700 border-white/5 hover:bg-white/5'}`} title="Ghim"><Icons.Paperclip size={24} /></button>
                          </>
                        )}
                        {(currentUser?.isAdmin || currentUser?.uid === q.authorId) && (
                          <div className="flex bg-slate-950/80 backdrop-blur-2xl border border-white/10 rounded-[1.5rem] p-2 shadow-3xl">
                            <button onClick={() => {setEditingId(q.id); setEditContent(q.content);}} className="p-3.5 text-slate-500 hover:text-white transition-all rounded-xl hover:bg-white/5"><Icons.Settings size={24} /></button>
                            <button onClick={() => deleteQuestion(q.id)} className="p-3.5 text-slate-500 hover:text-red-500 transition-all rounded-xl hover:bg-red-500/10"><Icons.Trash2 size={24} /></button>
                          </div>
                        )}
                      </div>
                    </div>

                    {editingId === q.id ? (
                      <div className="space-y-6 animate-in zoom-in-95 duration-300">
                        <textarea value={editContent} onChange={e => setEditContent(e.target.value)} className="w-full bg-slate-900 border border-white/10 rounded-[2.5rem] p-10 text-white text-2xl md:text-3xl focus:border-brand-500/30 outline-none shadow-2xl leading-tight" />
                        <div className="flex gap-5"><button onClick={() => saveEdit(q.id)} className="px-12 py-5 bg-brand-600 text-white rounded-[1.5rem] font-black shadow-2xl hover:bg-brand-500 transition-all">Xác nhận Lưu</button><button onClick={() => setEditingId(null)} className="px-12 py-5 bg-white/5 text-slate-400 rounded-[1.5rem] font-black hover:bg-white/10 transition-all">Hủy bỏ</button></div>
                      </div>
                    ) : (
                      <div className="relative group/content">
                        <div className="absolute -left-4 top-0 w-1 h-full bg-brand-500/20 rounded-full opacity-0 group-hover/content:opacity-100 transition-opacity"></div>
                        <SmartContent content={q.content} className="text-slate-200 text-xl md:text-3xl leading-[1.4] font-medium bg-slate-900/30 rounded-[2.8rem] p-10 md:p-14 border border-white/5 shadow-inner hover:bg-slate-900/40 transition-all backdrop-blur-md" />
                      </div>
                    )}

                    <div className="flex items-center gap-14 px-8">
                       <button onClick={() => toggleLikeQuestion(q)} className={`flex items-center gap-4 font-black text-lg transition-all transform active:scale-50 ${q.likedBy?.includes(currentUser?.uid || '') ? 'text-brand-500 scale-110 drop-shadow-[0_0_10px_rgba(139,92,246,0.5)]' : 'text-slate-700 hover:text-slate-400'}`}>
                         <Icons.ThumbsUp size={28} fill={q.likedBy?.includes(currentUser?.uid || '') ? 'currentColor' : 'none'} className="transition-all" /> 
                         <span className="tabular-nums">{q.likedBy?.length || 0}</span>
                       </button>
                       <button onClick={() => q.isLocked ? triggerToast('🔒 Thảo luận này đã khóa') : setReplyingTo({qId: q.id, name: q.author, authorId: q.authorId})} className={`flex items-center gap-4 font-black text-lg transition-all ${q.isLocked ? 'text-slate-900 cursor-not-allowed opacity-30' : 'text-slate-700 hover:text-brand-400'}`}>
                         <Icons.MessageSquareReply size={28} /> 
                         <span>{q.replies?.length || 0} Phản hồi</span>
                       </button>
                       <button onClick={() => {
                         navigator.clipboard.writeText(`${window.location.origin}${window.location.pathname}#community?qid=${q.id}`);
                         triggerToast('Link thảo luận đã được copy!');
                       }} className="flex items-center gap-4 text-slate-700 hover:text-white transition-all group/share">
                         <Icons.Link2 size={28} className="group-hover/share:rotate-45 transition-transform" />
                         <span className="uppercase tracking-[0.2em] text-[10px] hidden sm:inline">Chia sẻ</span>
                       </button>
                    </div>

                    {/* Replies Section: Highly Refined */}
                    <div className="space-y-12 pt-12 border-l-[6px] border-white/[0.03] ml-6 pl-12 md:pl-20 relative">
                      {q.replies?.map((r) => (
                        <div key={r.id} className="flex gap-6 md:gap-8 group/reply animate-in fade-in slide-in-from-left-10 duration-1000">
                          <div className="relative shrink-0 pt-2">
                            <Avatar user={{ username: r.author, photoURL: r.authorPhoto, isAdmin: r.isAdmin }} isAdmin={r.isAdmin} size="w-14 h-14 md:w-16 md:h-16" />
                            {r.isAdmin && <div className="absolute -top-2 -right-2 bg-brand-500 text-slate-950 p-1 rounded-lg shadow-xl ring-2 ring-slate-950"><Icons.ShieldCheck size={12} /></div>}
                          </div>
                          
                          <div className="flex-1 space-y-5">
                            <div className={`rounded-[2.5rem] p-8 md:p-10 border transition-all shadow-xl backdrop-blur-2xl hover:shadow-brand-500/[0.05] ${
                              r.isAdmin 
                                ? 'bg-gradient-to-br from-brand-500/[0.08] to-purple-500/[0.08] border-brand-500/30' 
                                : 'bg-slate-900/60 border-white/5 hover:bg-slate-900/80'
                            }`}>
                               <div className="flex justify-between items-center mb-5">
                                 <div className="flex items-center gap-4 flex-wrap">
                                   <span className={`font-black text-xl md:text-2xl tracking-tight ${r.isAdmin ? 'text-brand-400 text-glow-sm' : 'text-white'}`}>{r.author} {r.isAdmin && <Icons.CheckCircle2 size={20} className="text-brand-500 inline ml-2" />}</span>
                                   {r.replyToName && (
                                     <div className="flex items-center gap-3 bg-white/5 px-4 py-2 rounded-2xl border border-white/5 shadow-inner">
                                       <Icons.ArrowRight size={14} className="text-brand-500" />
                                       <span className="text-xs font-black text-brand-400/80 uppercase tracking-widest">{r.replyToName}</span>
                                     </div>
                                   )}
                                   <span className="text-[11px] text-slate-700 font-black uppercase tracking-[0.2em] ml-3">{formatRelativeTime(r.timestamp)}</span>
                                 </div>
                                 
                                 <div className="flex items-center gap-2 opacity-0 group-hover/reply:opacity-100 transition-all duration-300 transform translate-x-2 group-hover/reply:translate-x-0">
                                   {(currentUser?.isAdmin || currentUser?.uid === r.authorId) && (
                                     <div className="flex bg-black/40 backdrop-blur-3xl rounded-2xl p-1.5 border border-white/10 shadow-2xl">
                                       <button onClick={() => {setEditingReplyId(r.id); setEditContent(r.content);}} className="p-3 text-slate-500 hover:text-white transition-all"><Icons.Settings size={22} /></button>
                                       <button onClick={() => deleteReply(q.id, r.id)} className="p-3 text-slate-500 hover:text-red-500 transition-all"><Icons.Trash2 size={22} /></button>
                                     </div>
                                   )}
                                 </div>
                               </div>
                               
                               {editingReplyId === r.id ? (
                                 <div className="space-y-6 animate-in zoom-in-95 duration-200">
                                   <textarea autoFocus value={editContent} onChange={e => setEditContent(e.target.value)} className="w-full bg-slate-950 border border-white/10 rounded-[2rem] p-8 text-white text-xl focus:border-brand-500/30 outline-none shadow-2xl shadow-black/50" />
                                   <div className="flex gap-4"><button onClick={() => saveReplyEdit(q.id, r.id)} className="px-10 py-4 bg-brand-600 text-white rounded-[1.2rem] font-black shadow-2xl">Lưu Phản hồi</button><button onClick={() => setEditingReplyId(null)} className="px-10 py-4 bg-white/5 text-slate-400 rounded-[1.2rem] font-black">Hủy bỏ</button></div>
                                 </div>
                               ) : (
                                 <SmartContent content={r.content} className={`${r.isAdmin ? 'text-white' : 'text-slate-300'} text-lg md:text-2xl leading-relaxed font-medium`} />
                               )}
                            </div>
                            
                            <div className="flex items-center gap-12 px-8">
                               <button onClick={() => toggleLikeReply(q.id, r.id)} className={`flex items-center gap-3.5 text-xs font-black uppercase tracking-[0.2em] transition-all transform active:scale-50 ${r.likedBy?.includes(currentUser?.uid || '') ? 'text-brand-500 scale-110' : 'text-slate-700 hover:text-slate-400'}`}>
                                 <Icons.ThumbsUp size={20} fill={r.likedBy?.includes(currentUser?.uid || '') ? 'currentColor' : 'none'} /> 
                                 <span className="tabular-nums text-sm">{r.likedBy?.length || 0}</span>
                               </button>
                               <button onClick={() => setReplyingTo({qId: q.id, rId: r.id, name: r.author, authorId: r.authorId})} className="text-xs font-black text-slate-700 hover:text-brand-400 uppercase tracking-[0.2em] transition-all transform active:scale-95">Trả lời</button>
                               <button onClick={() => reportContent(q.id)} className="text-xs font-black text-slate-900 hover:text-yellow-500/50 uppercase tracking-[0.2em] transition-all ml-auto opacity-0 group-hover/reply:opacity-100">Báo cáo</button>
                            </div>
                          </div>
                        </div>
                      ))}

                      {/* Thread-ending Reply Input */}
                      {replyingTo?.qId === q.id && (
                        <div className="flex gap-8 pt-14 animate-in slide-in-from-top-8 duration-500 border-t-2 border-white/[0.03]">
                           <div className="hidden sm:flex w-16 h-16 rounded-[1.8rem] bg-brand-500/10 border-2 border-brand-500/20 items-center justify-center text-brand-400 shrink-0 shadow-3xl shadow-brand-500/10 rotate-3 transition-transform hover:rotate-0"><Icons.MessageSquareReply size={32} /></div>
                           <div className="flex-1 space-y-8">
                              <div className="flex items-center justify-between bg-brand-500/[0.03] px-10 py-5 rounded-[2rem] border border-brand-500/10 shadow-inner">
                                 <span className="text-[11px] font-black text-slate-500 uppercase tracking-[0.3em] flex items-center gap-4">Đang phản hồi <span className="text-brand-400 bg-brand-500/10 px-5 py-2 rounded-2xl border border-brand-500/20 shadow-2xl">@{replyingTo.name}</span></span>
                                 <button onClick={() => setReplyingTo(null)} className="text-slate-700 hover:text-white transition-all transform hover:rotate-90"><Icons.X size={24} /></button>
                              </div>
                              <textarea autoFocus value={replyContent} onChange={(e) => setReplyContent(e.target.value)} placeholder={`Viết câu trả lời thông thái của bạn...`} className="w-full bg-slate-950/50 border-2 border-white/5 rounded-[3rem] py-10 px-12 text-white text-xl md:text-3xl focus:outline-none focus:border-brand-500/30 min-h-[200px] resize-none shadow-[0_40px_100px_rgba(0,0,0,0.6)] backdrop-blur-3xl transition-all placeholder:text-slate-900 font-medium" />
                              <div className="flex gap-6"><button onClick={() => handleReply(q.id)} className="flex-1 sm:flex-none px-16 py-6 bg-white text-slate-950 rounded-[2rem] font-black text-lg shadow-3xl transition-all transform hover:scale-[1.05] active:scale-95">Gửi Phản hồi</button><button onClick={() => {setReplyingTo(null); setReplyContent('');}} className="px-12 py-6 bg-slate-900 text-slate-500 rounded-[2rem] font-black text-lg hover:text-white hover:bg-slate-800 transition-all transform hover:scale-[1.05] active:scale-95">Hủy bỏ</button></div>
                           </div>
                        </div>
                      )}
                    </div>
                  </div>
               </div>
            </div>
          ))}
          
          {hasMore && displayQuestions.length >= postsLimit && (
            <div className="text-center pt-32 pb-60">
               <button onClick={() => setPostsLimit(prev => prev + POSTS_PER_PAGE)} className="group px-20 py-8 bg-white text-slate-950 rounded-[3rem] font-black text-xl transition-all transform hover:scale-110 active:scale-95 flex items-center gap-6 mx-auto shadow-[0_50px_120px_rgba(255,255,255,0.15)] ring-8 ring-white/5">
                  <span className="tracking-[0.4em] uppercase ml-4">Xem thêm thảo luận</span>
                  <Icons.ChevronDown size={32} className="group-hover:translate-y-2 transition-transform text-brand-600" />
               </button>
            </div>
          )}
        </div>
      </main>

      {/* Auth Modal: Ultra Premium */}
      {showAuthModal && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-6">
          <div className="absolute inset-0 bg-slate-950/95 backdrop-blur-3xl animate-in fade-in duration-1000"></div>
          <div className="relative w-full max-w-lg bg-slate-900 rounded-[5rem] p-16 md:p-24 border border-white/10 shadow-[0_0_200px_rgba(0,0,0,0.9)] animate-in zoom-in-95 duration-500">
            <button onClick={() => setShowAuthModal(false)} className="absolute top-16 right-16 text-slate-700 hover:text-white p-2 transition-all transform hover:rotate-90"><Icons.X size={40} /></button>
            <div className="text-center mb-20">
               <div className="w-32 h-32 bg-gradient-to-br from-brand-500/20 via-purple-500/20 to-brand-500/20 rounded-[3rem] flex items-center justify-center mx-auto mb-16 shadow-[0_30px_100px_rgba(139,92,246,0.2)] border border-white/10 ring-1 ring-white/20 animate-float"><Icons.MessageCircle size={64} className="text-white drop-shadow-2xl" /></div>
               <h3 className="text-5xl md:text-6xl font-black text-white tracking-tighter leading-none mb-6 italic uppercase">Tham gia<br/><span className="text-brand-500">Thảo luận</span></h3>
               <p className="text-slate-600 text-xs font-black uppercase tracking-[0.4em] mb-4">Cộng đồng PHTV Việt Nam</p>
               <div className="h-1 w-20 bg-brand-500 mx-auto rounded-full opacity-50"></div>
            </div>
            <button onClick={handleGoogleLogin} className="w-full py-8 bg-white text-slate-950 rounded-[2.5rem] font-black text-2xl flex items-center justify-center gap-6 transition-all transform hover:scale-[1.03] active:scale-95 shadow-[0_40px_100px_rgba(255,255,255,0.1)]">
               <svg className="w-10 h-10" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
               Đăng nhập ngay
            </button>
          </div>
        </div>
      )}

      {/* Name Choice: Ultra Premium */}
      {showNamePrompt && (
        <div className="fixed inset-0 z-[250] flex items-center justify-center p-6">
          <div className="absolute inset-0 bg-slate-950/98 backdrop-blur-3xl animate-in fade-in duration-1000"></div>
          <div className="relative w-full max-w-xl bg-slate-900 rounded-[5rem] p-16 md:p-24 border border-white/10 shadow-[0_0_200px_rgba(0,0,0,1)] animate-in zoom-in-95 duration-500">
            <div className="text-center mb-16 space-y-6">
               <div className="w-32 h-32 bg-gradient-to-br from-brand-500 to-purple-600 rounded-[3rem] flex items-center justify-center mx-auto shadow-[0_30px_100px_rgba(139,92,246,0.4)] rotate-6 transition-transform hover:rotate-0"><Icons.UserCheck size={64} className="text-white drop-shadow-2xl" /></div>
               <h3 className="text-5xl md:text-6xl font-black text-white tracking-tighter uppercase italic leading-none">Bạn là ai?</h3>
               <p className="text-slate-500 text-lg font-medium italic">Hãy chọn cho mình một danh xưng thật đẳng cấp</p>
            </div>
            <input type="text" value={tempUsername} onChange={e => setTempUsername(e.target.value)} className="w-full bg-slate-950 border-2 border-white/5 rounded-[2.5rem] py-8 px-12 text-white font-black mb-16 text-center text-4xl md:text-5xl focus:border-brand-500/50 outline-none transition-all shadow-[inset_0_10px_30px_rgba(0,0,0,0.5)] placeholder:text-slate-900" placeholder="Nhập tên..." />
            <button onClick={handleUpdateName} className="w-full py-8 bg-white text-slate-950 rounded-[2.5rem] font-black text-2xl shadow-[0_30px_80px_rgba(255,255,255,0.1)] active:scale-95 transition-all transform hover:scale-[1.02] uppercase tracking-widest">Bắt đầu Trải nghiệm</button>
          </div>
        </div>
      )}

      {/* Global Toast: Premium */}
      {showToast.show && (
        <div className="fixed bottom-16 left-1/2 -translate-x-1/2 z-[300] animate-in slide-in-from-bottom-20 fade-in duration-700">
          <div className="bg-white text-slate-950 px-16 py-8 rounded-[4rem] font-black shadow-[0_50px_150px_rgba(255,255,255,0.4)] flex items-center gap-8 border border-white/30 backdrop-blur-md">
             <div className="w-14 h-14 rounded-full bg-green-500 flex items-center justify-center text-white shadow-[0_10px_30px_rgba(34,197,94,0.5)] animate-bounce"><Icons.Check size={32} /></div>
             <span className="tracking-tight text-2xl md:text-3xl italic">{showToast.message}</span>
          </div>
        </div>
      )}
    </div>
  );
};