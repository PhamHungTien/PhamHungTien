import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Icons } from './Icons';
import { auth, db, requestNotificationPermission, googleProvider } from '../src/firebase';
import emailjs from '@emailjs/browser';
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
  where
} from 'firebase/firestore';

interface User {
  uid: string;
  username: string;
  isAdmin: boolean;
  email: string;
  photoURL?: string;
}

type LabelType = 'bug' | 'enhancement' | 'feature' | 'question' | 'help' | null;

interface LabelInfo {
  id: LabelType;
  label: string;
  color: string;
  bg: string;
}

const LABELS: LabelInfo[] = [
  { id: 'bug', label: 'Bug', color: 'text-white', bg: 'bg-red-600 shadow-lg shadow-red-900/40' },
  { id: 'enhancement', label: 'Enhancement', color: 'text-white', bg: 'bg-rose-500 shadow-lg shadow-rose-900/40' },
  { id: 'feature', label: 'Feature', color: 'text-white', bg: 'bg-blue-600 shadow-lg shadow-blue-900/40' },
  { id: 'question', label: 'Question', color: 'text-white', bg: 'bg-emerald-600 shadow-lg shadow-emerald-900/40' },
  { id: 'help', label: 'Help Wanted', color: 'text-white', bg: 'bg-orange-600 shadow-lg shadow-orange-900/40' },
];

interface Reply {
  id: string;
  parentId?: string;
  replyToName?: string;
  authorId: string;
  authorEmail?: string;
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
  authorEmail?: string;
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
  label?: LabelType;
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
    <div className={`whitespace-pre-wrap break-words leading-relaxed ${className}`}>
      {parts.map((part, i) => {
        if (part.startsWith('`') && part.endsWith('`')) {
          return <code key={i} className="bg-white/10 px-1.5 py-0.5 rounded text-rose-300 font-mono text-[0.85em] border border-white/5">{part.slice(1, -1)}</code>;
        }
        if (part.startsWith('@')) {
          return <span key={i} className="text-rose-400 font-black hover:underline cursor-pointer">{part}</span>;
        }
        if (part.startsWith('http')) {
          return <a key={i} href={part} target="_blank" rel="noopener noreferrer" className="text-blue-400 underline hover:text-blue-300 inline-flex items-center gap-1 transition-colors">{part.length > 40 ? part.substring(0, 40) + '...' : part} <Icons.ExternalLink size={10} /></a>;
        }
        return <span key={i} className="text-slate-200">{part}</span>;
      })}
    </div>
  );
};

export const QASection: React.FC = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [notifications, setNotifications] = useState<AppNotification[]>([]);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [newQuestion, setNewQuestion] = useState('');
  const [selectedLabel, setSelectedLabel] = useState<LabelType>(null);
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
  const [isLoading, setIsLoading] = useState(true);
  
  const [replyingTo, setReplyingTo] = useState<{qId: string, rId?: string, name?: string, authorId?: string, authorEmail?: string} | null>(null);
  const [replyContent, setReplyContent] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingReplyId, setEditingReplyId] = useState<string | null>(null);
  const [editContent, setEditContent] = useState('');

  // Initialize EmailJS
  useEffect(() => {
    emailjs.init("BaMMIrujdXkrbCwLH");
  }, []);

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
      setIsLoading(false);
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

    const now = Date.now();
    if (now - lastPostTime < 10000 && !currentUser.isAdmin) {
      triggerToast('Hãy chậm lại (10s)!');
      return;
    }

    setIsSubmitting(true);
    try {
      await addDoc(collection(db, "questions"), {
        authorId: currentUser.uid,
        authorEmail: currentUser.email,
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
        isAdmin: currentUser.isAdmin,
        label: selectedLabel
      });
      setNewQuestion('');
      setSelectedLabel(null);
      setLastPostTime(Date.now());
      triggerToast('Đã đăng thảo luận!');
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
      authorEmail: currentUser.email,
      author: currentUser.isAdmin ? 'Phạm Hùng Tiến' : currentUser.username,
      authorPhoto: currentUser.photoURL || undefined,
      content: replyContent,
      timestamp: Date.now(),
      isAdmin: currentUser.isAdmin,
      likedBy: []
    };

    await updateDoc(questionRef, { replies: arrayUnion(newReply) });
    
    // Notification logic
    const recipientId = replyingTo.authorId || snap.data()?.authorId;
    if (recipientId) createNotification(recipientId, 'reply', qId, replyContent.substring(0, 50));

    // EmailJS Notification Logic
    const targetEmail = replyingTo.authorEmail || "hungtien10a7@gmail.com"; // Fallback to admin for old posts
    
    if (targetEmail !== currentUser.email) {
      console.log("🚀 EmailJS: Attempting to notify:", targetEmail);
      emailjs.send(
        "PHTV Community", 
        "template_qd4vozb", 
        {
          to_email: targetEmail,
          recipient_name: replyingTo.name || "Thành viên PHTV",
          sender_name: currentUser.username,
          message: replyContent,
          link: window.location.href
        }
      ).then(
        () => console.log("✅ EmailJS: Success! Notified", targetEmail),
        (err) => console.error("❌ EmailJS: Failed!", err)
      );
    } else {
      console.log("ℹ️ EmailJS: Skipping (Self-reply)");
    }

    setReplyContent('');
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
    if (!window.confirm('Xóa thảo luận này?')) return;
    await deleteDoc(doc(db, "questions", id));
    triggerToast('Đã xóa bài.');
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
    if (!window.confirm('Báo cáo nội dung này?')) return;
    await updateDoc(doc(db, "questions", qId), { isReported: true });
    triggerToast('Đã gửi báo cáo!');
  };

  const toggleLock = async (q: Question) => {
    if (!currentUser?.isAdmin) return;
    await updateDoc(doc(db, "questions", q.id), { isLocked: !q.isLocked });
    triggerToast(q.isLocked ? 'Đã mở khóa' : 'Đã khóa');
  };

  const markNotifRead = async (notifId: string) => {
    await updateDoc(doc(db, "notifications", notifId), { isRead: true });
  };

  const incrementViews = async (id: string) => {
    const questionRef = doc(db, "questions", id);
    await updateDoc(questionRef, { viewCount: increment(1) });
  };

  const Avatar: React.FC<{ user: { username: string, photoURL?: string, isAdmin?: boolean }, size?: string }> = ({ user, size = "w-10 h-10", isAdmin }) => (
    <div className={`${size} rounded-[1rem] flex items-center justify-center text-white font-black overflow-hidden shadow-lg transition-all duration-500 hover:scale-105 shrink-0 ${
      isAdmin 
        ? 'bg-gradient-to-br from-rose-400 via-rose-600 to-pink-600 ring-2 ring-rose-400/50 shadow-rose-500/20' 
        : 'bg-slate-800 border border-white/5'
    }`}>
      {user.photoURL ? (
        <img src={user.photoURL} alt={user.username} className="w-full h-full object-cover" />
      ) : (
        <span className={size.includes('w-8') ? 'text-[9px]' : 'text-base'}>{getInitials(user.username)}</span>
      )}
    </div>
  );

  const SkeletonCard = () => (
    <div className="rounded-[1.5rem] p-6 md:p-8 bg-white/[0.02] border border-white/5 animate-pulse space-y-6">
      <div className="flex gap-6">
        <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-white/5 shrink-0" />
        <div className="flex-1 space-y-3 pt-2">
          <div className="h-3 bg-white/10 rounded-full w-1/4" />
          <div className="h-2 bg-white/5 rounded-full w-1/6" />
        </div>
      </div>
      <div className="space-y-2 pl-16">
        <div className="h-3 bg-white/5 rounded-full w-full" />
        <div className="h-3 bg-white/5 rounded-full w-5/6" />
      </div>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto px-4 md:px-6 py-8 md:py-16 flex flex-col lg:flex-row gap-6 min-h-screen">
      
      {/* Sidebar - Left */}
      <aside className="w-full lg:w-64 shrink-0 space-y-5 order-2 lg:order-1">
        <div className="glass-panel rounded-[1.5rem] p-6 border border-white/5 shadow-xl backdrop-blur-md">
           <div className="flex items-center justify-between mb-6">
              <h3 className="text-base font-black text-white flex items-center gap-2"><Icons.Info size={16} className="text-rose-400" /> Thống kê</h3>
              <span className="bg-rose-500/10 text-rose-400 text-[9px] px-2 py-0.5 rounded font-black uppercase border border-rose-500/20">Live</span>
           </div>
           <div className="space-y-2">
              <div className="flex items-center justify-between p-3.5 bg-white/[0.03] rounded-xl border border-white/5 group hover:bg-white/[0.05] transition-all">
                 <span className="text-slate-400 text-[11px] font-bold uppercase tracking-widest">Thảo luận</span>
                 <span className="text-white font-black text-base tabular-nums">{questions.length}</span>
              </div>
              <div className="p-4 bg-rose-500/[0.03] rounded-xl border border-rose-500/10">
                 <div className="flex items-center gap-2 text-rose-500 mb-2">
                    <Icons.ShieldCheck size={14} />
                    <span className="text-[10px] font-black uppercase tracking-widest">Quy tắc</span>
                 </div>
                 <p className="text-[11px] text-slate-400 leading-relaxed font-medium">Tôn trọng, không spam, văn minh. Chúc bạn vui vẻ!</p>
              </div>
           </div>
        </div>

        <div className="glass-panel rounded-[1.5rem] p-6 border border-white/5 shadow-xl hidden md:block backdrop-blur-md group/dev">
           <h3 className="text-base font-black text-white mb-6 flex items-center gap-2"><Icons.Award size={16} className="text-rose-400" /> Tác giả</h3>
           <div className="flex items-center gap-3 p-4 bg-gradient-to-br from-rose-500/10 to-pink-500/10 rounded-xl border border-rose-500/20 shadow-inner group-hover/dev:bg-rose-500/20 transition-all">
              <div className="w-10 h-10 rounded-xl bg-rose-500 flex items-center justify-center text-white shadow-lg transition-transform group-hover/dev:scale-110">
                 <Icons.User size={20} />
              </div>
              <div>
                 <h4 className="text-white font-black text-[11px] uppercase tracking-tight leading-none">Phạm Hùng Tiến</h4>
                 <p className="text-[9px] text-rose-400 font-black uppercase tracking-widest mt-1">Developer</p>
              </div>
           </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 order-1 lg:order-2 space-y-6">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 mb-8">
          <div className="text-center sm:text-left">
             <h2 className="text-3xl md:text-5xl font-black text-white tracking-tighter italic leading-none">
               Thảo luận <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-600 via-pink-500 via-red-500 to-rose-400 bg-[length:200%_auto] animate-gradient-flow drop-shadow-[0_0_10px_rgba(244,63,94,0.3)] pr-4 py-1">PHTV</span>
             </h2>
             <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.3em] mt-2 flex items-center justify-center sm:justify-start gap-2">
               <span className="w-6 h-[0.5px] bg-slate-800"></span>
               Cộng đồng bộ gõ
               <span className="w-6 h-[0.5px] bg-slate-800"></span>
             </p>
          </div>
          
          <div className="flex items-center gap-3">
            {currentUser ? (
              <div className="flex items-center gap-3">
                <div className="relative">
                  <button onClick={() => setShowNotifs(!showNotifs)} className={`p-2.5 rounded-xl border transition-all relative ${showNotifs ? 'bg-white text-slate-950 border-white shadow-xl' : 'bg-white/5 border-white/5 text-slate-500 hover:text-white hover:bg-white/10'}`} aria-label="Xem thông báo">
                    <Icons.Bell size={18} />
                    {unreadCount > 0 && <span className="absolute -top-1 -right-1 w-4 h-4 bg-rose-500 text-white text-[9px] font-black flex items-center justify-center rounded-full ring-2 ring-slate-950">{unreadCount}</span>}
                  </button>
                  {showNotifs && (
                    <div className="fixed inset-x-4 top-24 sm:absolute sm:inset-x-auto sm:right-0 sm:top-12 sm:w-[320px] bg-slate-900 border border-white/10 rounded-[1.5rem] shadow-[0_20px_60px_rgba(0,0,0,0.8)] z-[150] overflow-hidden animate-in zoom-in-95 duration-200">
                       <div className="p-4 border-b border-white/5 flex items-center justify-between bg-slate-950/50"><span className="font-black text-[10px] uppercase tracking-widest text-white">Thông báo</span><button onClick={() => setShowNotifs(false)} className="text-slate-500 hover:text-white"><Icons.X size={16} /></button></div>
                       <div className="max-h-[350px] overflow-y-auto custom-scrollbar">
                          {notifications.length === 0 ? <div className="p-8 text-center text-slate-600 font-bold text-[10px] uppercase tracking-widest">Trống</div> : 
                            notifications.map(n => (
                              <div key={n.id} onClick={() => { markNotifRead(n.id); setShowNotifs(false); }} className={`p-4 border-b border-white/5 flex gap-3 cursor-pointer transition-colors ${n.isRead ? 'opacity-50 grayscale' : 'bg-rose-500/[0.03] hover:bg-rose-500/[0.08]'}`}>
                                 <Avatar user={{ username: n.senderName, photoURL: n.senderPhoto }} size="w-8 h-8" />
                                 <div className="flex-1"><p className="text-[10px] text-white leading-tight mb-1"><span className="font-black">{n.senderName}</span> {n.type === 'reply' ? 'phản hồi bạn' : 'thích bài viết'}</p><span className="text-[8px] text-rose-500 font-black uppercase tracking-tighter">{formatRelativeTime(n.timestamp)}</span></div>
                              </div>
                            ))
                          }
                       </div>
                    </div>
                  )}
                </div>
                <div className="flex items-center gap-2.5 p-1.5 pr-4 bg-white/5 rounded-2xl border border-white/10 group shadow-xl backdrop-blur-xl transition-all hover:bg-white/10">
                  <Avatar user={currentUser} size="w-8 h-8" isAdmin={currentUser.isAdmin} />
                  <div className="flex flex-col"><span className="text-[10px] font-black text-white uppercase leading-none mb-1">{currentUser.username} {currentUser.isAdmin && <Icons.CheckCircle2 size={10} className="text-rose-400" />}</span><div className="flex gap-2"><button onClick={() => {setTempUsername(currentUser.username); setShowNamePrompt(true);}} className="text-[8px] font-black text-rose-400 hover:text-white uppercase transition-colors">Sửa</button><button onClick={() => signOut(auth)} className="text-[8px] font-black text-red-500/70 hover:text-red-400 uppercase transition-colors">Thoát</button></div></div>
                </div>
              </div>
            ) : (
              <button onClick={() => setShowAuthModal(true)} className="group flex items-center gap-3 px-6 py-3 bg-white text-slate-950 rounded-xl transition-all transform hover:scale-105 font-black text-xs shadow-xl"><Icons.User size={16} /><span>Đăng nhập Google</span></button>
            )}
          </div>
        </div>

        {/* Toolbar */}
        <div className="space-y-4 animate-in slide-in-from-bottom-2 duration-700">
           <div className="relative group shadow-lg">
              <Icons.Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-700 group-focus-within:text-rose-500 transition-colors" size={20} />
              <input 
                type="text" 
                placeholder="Tìm nội dung, thành viên, lỗi..." 
                value={searchQuery}
                onChange={e => setSearchBy(e.target.value)}
                className="w-full bg-slate-900/60 backdrop-blur-2xl border border-white/5 rounded-2xl py-3.5 pl-12 pr-6 text-white focus:outline-none focus:border-brand-500/30 transition-all text-sm font-medium placeholder:text-slate-400 shadow-inner"
              />
           </div>
           <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex bg-slate-900/80 p-1 rounded-xl border border-white/5 shadow-xl backdrop-blur-xl w-full sm:w-auto">
                 {[{ id: 'newest', label: 'Mới nhất', icon: Icons.RefreshCw }, { id: 'trending', label: 'Xu hướng', icon: Icons.Sparkles }, { id: 'popular', label: 'Yêu thích', icon: Icons.Award }].map(tab => (
                   <button key={tab.id} onClick={() => setSortBy(tab.id as any)} className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 py-2 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all ${sortBy === tab.id ? 'bg-white text-slate-950 shadow-lg scale-105' : 'text-slate-500 hover:text-white'}`}><tab.icon size={12} />{tab.label}</button>
                 ))}
              </div>
              <div className="flex items-center gap-3 bg-slate-900/60 px-5 py-2.5 rounded-xl border border-white/5 backdrop-blur-md w-full sm:w-auto justify-center">
                 <Icons.Filter size={14} className="text-rose-500" /><select value={filterBy} onChange={e => setFilterBy(e.target.value as any)} className="bg-transparent text-white font-black text-[9px] uppercase tracking-widest focus:outline-none cursor-pointer"><option value="all" className="bg-slate-900">Tất cả</option><option value="mine" className="bg-slate-900">Bài của tôi</option><option value="unanswered" className="bg-slate-900">Cần phản hồi</option>{currentUser?.isAdmin && <option value="reported" className="bg-slate-900 text-red-400">⚠️ Bị báo cáo</option>}</select>
              </div>
           </div>
        </div>

        {/* Refined Compact Post Form */}
        <div className="glass-panel rounded-[1.5rem] p-0.5 shadow-lg border border-white/5 overflow-hidden group/form relative backdrop-blur-3xl">
          <div className="bg-slate-900/40 rounded-[1.4rem] p-4 md:p-5 transition-all group-focus-within/form:bg-slate-900/60 shadow-inner">
            <form onSubmit={handleAskQuestion} className="space-y-4">
              <div className="flex items-start gap-3.5">
                 <div className="hidden xs:block"><Avatar user={{ username: currentUser?.username || 'User', photoURL: currentUser?.photoURL, isAdmin: currentUser?.isAdmin }} isAdmin={currentUser?.isAdmin} size="w-9 h-9" /></div>
                 <div className="flex-1 pt-0.5">                    <textarea 
                      placeholder={currentUser ? `Chào ${currentUser.username.split(' ')[0]}, bạn đang nghĩ gì?` : "Đăng nhập Google để thảo luận..."} 
                      value={newQuestion} 
                      onChange={(e) => setNewQuestion(e.target.value)} 
                      disabled={isSubmitting} 
                      className="w-full bg-transparent border-none p-0 text-sm md:text-base text-white focus:ring-0 placeholder:text-slate-400 min-h-[50px] md:min-h-[60px] resize-none leading-relaxed font-medium" 
                      required 
                    /></div>
              </div>
              
              <div className="flex flex-wrap items-center gap-2 mb-2">
                 <span className="text-[10px] font-black text-slate-200 uppercase tracking-widest mr-2">Phân loại:</span>
                 {LABELS.map(l => (
                   <button 
                     key={l.id} 
                     type="button" 
                     onClick={() => setSelectedLabel(selectedLabel === l.id ? null : l.id)} 
                     className={`px-3 py-1.5 rounded-lg text-[10px] font-black uppercase transition-all border shadow-sm ${
                       selectedLabel === l.id 
                         ? `${l.bg} ${l.color} border-transparent ring-2 ring-white/20 scale-105 shadow-lg` 
                         : 'bg-white/30 text-white border-white/20 hover:bg-white/40'
                     }`}
                   >
                     {l.label}
                   </button>
                 ))}
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-white/5">
                <div className="flex items-center gap-4 text-slate-700">
                   <Icons.Terminal size={16} className="hover:text-rose-400 cursor-help transition-colors" /><Icons.Link2 size={16} className="hover:text-rose-400 cursor-help transition-colors" />
                </div>
                <button type="submit" disabled={isSubmitting || !newQuestion.trim()} className="group flex items-center justify-center gap-2 px-5 py-2 bg-white text-slate-950 rounded-lg font-black text-[11px] md:text-xs transition-all transform hover:scale-[1.03] active:scale-95 shadow-md disabled:opacity-50">
                  {isSubmitting ? <Icons.RefreshCw className="animate-spin" size={14} /> : <><span>Đăng bài</span><Icons.Send size={12} /></>}
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Feed */}
        <div className="space-y-8 pb-32">
          {isLoading ? <div className="space-y-8">{[1, 2, 3].map(i => <SkeletonCard key={i} />)}</div> : 
           displayQuestions.length === 0 ? <div className="text-center py-32 bg-white/5 rounded-[2rem] border border-dashed border-white/10 opacity-50"><Icons.MessageSquare size={48} className="mx-auto mb-4 text-slate-700" /><p className="text-slate-500 font-black uppercase tracking-widest text-[10px]">Trống</p></div> : 
           displayQuestions.map((q) => (
            <div key={q.id} className={`group animate-in fade-in duration-700 ${q.isPinned ? 'ring-1 ring-rose-500/30 rounded-[2rem] p-6 bg-rose-500/[0.02] shadow-xl relative overflow-hidden' : ''}`} onMouseEnter={() => incrementViews(q.id)}>
               <div className="flex gap-5 md:gap-6">
                  <div className="flex flex-col items-center">
                    <Avatar user={{ username: q.author, photoURL: q.authorPhoto, isAdmin: q.isAdmin }} isAdmin={q.isAdmin} size="w-10 h-10 md:w-12 md:h-12" />
                    <div className="w-[1.5px] flex-1 bg-gradient-to-b from-white/10 via-white/[0.05] to-transparent my-3 rounded-full opacity-50"></div>
                  </div>
                  <div className="flex-1 space-y-4 pb-6">
                    <div className="flex justify-between items-start gap-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h4 className={`font-black text-sm md:text-base tracking-tight ${q.isAdmin ? 'text-rose-400 text-glow-sm' : 'text-white'}`}>{q.author}</h4>
                                                    {q.label && (
                            <span className={`px-2 py-0.5 rounded-[4px] text-[9px] font-black uppercase shadow-sm ${LABELS.find(l => l.id === q.label)?.bg} ${LABELS.find(l => l.id === q.label)?.color}`}>
                              {LABELS.find(l => l.id === q.label)?.label}
                            </span>
                          )}
                          {q.isAdmin && <span className="bg-rose-500 text-slate-950 text-[7px] px-2 py-0.5 rounded font-black uppercase tracking-widest shadow-md">Admin</span>}
                          {q.isPinned && <Icons.Paperclip size={12} className="text-rose-400" />}
                          <span className="text-[9px] text-slate-600 font-black uppercase tracking-widest ml-1">{formatRelativeTime(q.timestamp)}</span>
                        </div>
                        <div className="flex items-center gap-3 text-[8px] font-black text-slate-800 uppercase tracking-widest">
                           <span>{q.viewCount || 0} views</span><span className="text-red-500/40 hover:text-red-500 cursor-pointer transition-all" onClick={() => reportContent(q.id)}>Report</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-all transform translate-x-2 group-hover:translate-x-0">
                        {currentUser?.isAdmin && (<><button onClick={() => toggleLock(q)} className="p-2 rounded-lg text-slate-700 hover:text-rose-500">{q.isLocked ? <Icons.Lock size={16} /> : <Icons.Unlock size={16} />}</button><button onClick={() => updateDoc(doc(db, "questions", q.id), { isPinned: !q.isPinned })} className="p-2 rounded-lg text-slate-700 hover:text-rose-500"><Icons.Paperclip size={16} /></button></>)}
                        {(currentUser?.isAdmin || currentUser?.uid === q.authorId) && (<><button onClick={() => {setEditingId(q.id); setEditContent(q.content);}} className="p-2 rounded-lg text-slate-700 hover:text-white"><Icons.Settings size={16} /></button><button onClick={() => deleteQuestion(q.id)} className="p-2 rounded-lg text-slate-700 hover:text-red-500"><Icons.Trash2 size={16} /></button></>)}
                      </div>
                    </div>
                    {editingId === q.id ? (
                      <div className="space-y-4 animate-in zoom-in-95 duration-300"><textarea value={editContent} onChange={e => setEditContent(e.target.value)} className="w-full bg-slate-900 border border-white/10 rounded-xl p-4 text-white text-sm focus:border-rose-500/30 outline-none shadow-xl" /><div className="flex gap-2"><button onClick={() => saveEdit(q.id)} className="px-5 py-2 bg-rose-600 text-white rounded-lg text-[10px] font-black shadow-lg">Lưu</button><button onClick={() => setEditingId(null)} className="px-5 py-2 bg-white/5 text-slate-400 rounded-lg text-[10px] font-black">Hủy</button></div></div>
                    ) : <SmartContent content={q.content} className="text-slate-200 text-sm md:text-base leading-relaxed font-medium bg-white/[0.02] p-5 md:p-6 rounded-[1.5rem] border border-white/5 shadow-inner" />}
                    <div className="flex items-center gap-8 px-4">
                       <button onClick={() => toggleLikeQuestion(q)} className={`flex items-center gap-2 font-black text-xs transition-all transform active:scale-50 ${q.likedBy?.includes(currentUser?.uid || '') ? 'text-rose-500' : 'text-slate-700 hover:text-slate-400'}`}><Icons.ThumbsUp size={18} fill={q.likedBy?.includes(currentUser?.uid || '') ? 'currentColor' : 'none'} /><span className="tabular-nums">{q.likedBy?.length || 0}</span></button>
                         <button onClick={() => q.isLocked ? triggerToast('🔒 Thảo luận này đã khóa') : setReplyingTo({qId: q.id, name: q.author, authorId: q.authorId, authorEmail: q.authorEmail})} className={`flex items-center gap-4 font-black text-lg transition-all ${q.isLocked ? 'text-slate-900 cursor-not-allowed opacity-30' : 'text-slate-700 hover:text-brand-400'}`}>
                           <Icons.MessageSquareReply size={28} /> 
                           <span>{q.replies?.length || 0} Phản hồi</span>
                         </button>
                       <button onClick={() => { navigator.clipboard.writeText(`${window.location.origin}${window.location.pathname}#community?qid=${q.id}`); triggerToast('Đã copy link!'); }} className="flex items-center gap-2 text-slate-700 hover:text-white transition-all transform active:scale-90"><Icons.Link2 size={18} /></button>
                    </div>
                    <div className="space-y-6 pt-6 border-l-[3px] border-white/[0.03] ml-3 pl-6 md:pl-10 relative">
                      {q.replies?.map((r) => (
                        <div key={r.id} className="flex gap-4 group/reply animate-in fade-in duration-1000"><Avatar user={{ username: r.author, photoURL: r.authorPhoto, isAdmin: r.isAdmin }} isAdmin={r.isAdmin} size="w-8 h-8 md:w-9 md:h-9" /><div className="flex-1 space-y-3"><div className={`rounded-[1.2rem] p-4 md:p-5 border transition-all ${r.isAdmin ? 'bg-gradient-to-br from-rose-500/[0.05] to-pink-500/[0.05] border-rose-500/20 shadow-xl' : 'bg-slate-900/60 border-white/5 hover:bg-slate-900/80'}`}><div className="flex justify-between items-center mb-2"><div className="flex items-center gap-2 flex-wrap"><span className={`font-black text-[11px] md:text-xs tracking-tight ${r.isAdmin ? 'text-rose-400' : 'text-white'}`}>{r.author} {r.isAdmin && <Icons.CheckCircle2 size={12} className="text-rose-500 inline ml-1" />}</span>{r.replyToName && <span className="text-[8px] text-slate-600 flex items-center gap-1.5 font-black bg-white/5 px-2 py-0.5 rounded uppercase"><Icons.ArrowRight size={8} /> {r.replyToName}</span>}<span className="text-[8px] text-slate-700 font-black uppercase tracking-widest ml-1">{formatRelativeTime(r.timestamp)}</span></div><div className="flex items-center gap-1 opacity-0 group-hover/reply:opacity-100 transition-all transform translate-x-1 group-hover/reply:translate-x-0">{(currentUser?.isAdmin || currentUser?.uid === r.authorId) && (<div className="flex bg-black/20 rounded-lg p-0.5 border border-white/5"><button onClick={() => {setEditingReplyId(r.id); setEditContent(r.content);}} className="p-1.5 text-slate-700 hover:text-white rounded-lg transition-all hover:bg-white/5"><Icons.Settings size={14} /></button><button onClick={() => deleteReply(q.id, r.id)} className="p-1.5 text-slate-700 hover:text-red-500 rounded-lg transition-all hover:bg-red-500/10"><Icons.Trash2 size={14} /></button></div>)}</div></div>{editingReplyId === r.id ? (<div className="space-y-3 animate-in zoom-in-95 duration-200"><textarea autoFocus value={editContent} onChange={e => setEditContent(e.target.value)} className="w-full bg-slate-950 border border-white/10 rounded-xl p-4 text-white text-sm focus:border-brand-500/30 outline-none shadow-inner" /><div className="flex gap-2"><button onClick={() => saveReplyEdit(q.id, r.id)} className="px-4 py-1.5 bg-brand-600 text-white rounded-lg text-[9px] font-black shadow-lg">Lưu</button><button onClick={() => setEditingReplyId(null)} className="px-4 py-1.5 bg-white/5 text-slate-400 rounded-lg text-[9px] font-black">Hủy</button></div></div>) : <SmartContent content={r.content} className={`${r.isAdmin ? 'text-white' : 'text-slate-300'} text-[11px] md:text-sm leading-relaxed font-medium`} />}</div><div className="flex gap-6 px-4"><button onClick={() => toggleLikeReply(q.id, r.id)} className={`flex items-center gap-2 text-[9px] font-black uppercase tracking-widest transition-all transform active:scale-50 ${r.likedBy?.includes(currentUser?.uid || '') ? 'text-rose-500 scale-110' : 'text-slate-700 hover:text-slate-400'}`}><Icons.ThumbsUp size={14} fill={r.likedBy?.includes(currentUser?.uid || '') ? 'currentColor' : 'none'} /> <span className="tabular-nums">{r.likedBy?.length || 0}</span></button><button onClick={() => setReplyingTo({qId: q.id, rId: r.id, name: r.author, authorId: r.authorId})} className="text-[9px] font-black text-slate-700 hover:text-rose-400 uppercase tracking-widest transition-all">Trả lời</button></div></div></div>))}
                      {replyingTo?.qId === q.id && (
                        <div className="flex gap-4 pt-6 animate-in slide-in-from-top-4 duration-500 border-t border-white/5"><div className="hidden sm:flex w-10 h-10 rounded-xl bg-brand-500/10 border border-brand-500/20 items-center justify-center text-brand-400 shrink-0"><Icons.MessageSquareReply size={18} /></div><div className="flex-1 space-y-4"><div className="flex items-center justify-between bg-brand-500/[0.03] px-5 py-2 rounded-xl border border-brand-500/10"><span className="text-[9px] font-black text-slate-500 uppercase tracking-widest flex items-center gap-3">Phản hồi <span className="text-brand-400">@{replyingTo.name}</span></span><button onClick={() => setReplyingTo(null)} className="text-slate-700 hover:text-white transition-all"><Icons.X size={12} /></button></div><textarea autoFocus value={replyContent} onChange={(e) => setReplyContent(e.target.value)} placeholder={`Gửi câu trả lời của bạn...`} className="w-full bg-slate-900 border border-white/5 rounded-[1.8rem] py-6 px-8 text-white text-sm md:text-base focus:outline-none focus:border-brand-500/30 min-h-[100px] resize-none shadow-2xl backdrop-blur-md" /><div className="flex gap-3"><button onClick={() => handleReply(q.id)} className="px-10 py-4 bg-brand-600 hover:bg-brand-500 text-white rounded-2xl font-black text-xs shadow-xl transition-all transform hover:scale-105 active:scale-95">Gửi</button><button onClick={() => {setReplyingTo(null); setReplyContent('');}} className="px-10 py-4 bg-white/5 text-slate-400 rounded-2xl font-black text-xs hover:bg-white/10 transition-all">Hủy</button></div></div></div>
                      )}
                    </div>
                  </div>
               </div>
            </div>
          ))}
          {hasMore && displayQuestions.length >= postsLimit && (
            <div className="text-center pt-12 pb-32"><button onClick={() => setPostsLimit(prev => prev + POSTS_PER_PAGE)} className="group px-10 py-4 bg-white text-slate-950 rounded-2xl font-black text-xs transition-all transform hover:scale-110 active:scale-95 flex items-center gap-3 mx-auto shadow-2xl"><span className="tracking-widest uppercase">Tải thêm nội dung</span><Icons.ChevronDown size={18} /></button></div>
          )}
        </div>
      </main>

      {/* Modals */}
      {showAuthModal && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-6"><div className="absolute inset-0 bg-slate-950/90 backdrop-blur-3xl" onClick={() => setShowAuthModal(false)}></div><div className="relative w-full max-w-sm bg-slate-900 rounded-[3.5rem] p-12 border border-white/10 shadow-2xl animate-in zoom-in-95"><button onClick={() => setShowAuthModal(false)} className="absolute top-10 right-10 text-slate-600 p-2"><Icons.X size={28} /></button><div className="text-center mb-10"><div className="w-20 h-20 bg-gradient-to-br from-rose-500/20 to-pink-500/20 rounded-[2rem] flex items-center justify-center mx-auto mb-10 text-rose-400 shadow-3xl"><Icons.User size={48} /></div><h3 className="text-4xl font-black text-white tracking-tighter leading-none mb-4 uppercase">Chào bạn!</h3><p className="text-slate-500 text-sm font-medium leading-relaxed uppercase tracking-widest text-[9px]">Cộng đồng PHTV Việt Nam</p></div><button onClick={handleGoogleLogin} className="w-full py-6 bg-white text-slate-950 rounded-[1.5rem] font-black text-lg flex items-center justify-center gap-4 transition-all active:scale-95 shadow-2xl"><svg className="w-7 h-7" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>Đăng nhập ngay</button></div></div>
      )}
      {showNamePrompt && (
        <div className="fixed inset-0 z-[250] flex items-center justify-center p-6"><div className="absolute inset-0 bg-slate-950/95 backdrop-blur-3xl animate-in fade-in duration-1000"></div><div className="relative w-full max-w-lg bg-slate-900 rounded-[4rem] p-12 md:p-16 border border-white/10 shadow-3xl animate-in zoom-in-95 duration-500"><div className="text-center mb-12 space-y-4"><div className="w-24 h-24 bg-gradient-to-br from-rose-500 to-pink-600 rounded-[2rem] flex items-center justify-center mx-auto shadow-2xl rotate-3"><Icons.UserCheck size={48} className="text-white" /></div><h3 className="text-4xl font-black text-white tracking-tighter uppercase italic leading-none">Bạn là ai?</h3><p className="text-slate-500 text-lg font-medium italic">Chọn một danh xưng thật đẳng cấp cho cộng đồng</p></div><input type="text" value={tempUsername} onChange={e => setTempUsername(e.target.value)} className="w-full bg-slate-950 border border-white/10 rounded-[2rem] py-6 px-10 text-white font-black mb-10 text-center text-3xl focus:border-brand-500/50 outline-none transition-all shadow-inner placeholder:text-slate-800" placeholder="Nhập tên..." /><button onClick={handleUpdateName} className="w-full py-6 bg-white text-slate-950 rounded-[2rem] font-black text-xl shadow-2xl active:scale-95 transition-all transform hover:scale-[1.02]">Bắt đầu ngay</button></div></div>
      )}
      {showToast.show && (
        <div className="fixed bottom-12 left-1/2 -translate-x-1/2 z-[300] animate-in slide-in-from-bottom-12 fade-in duration-500"><div className="bg-white text-slate-950 px-12 py-6 rounded-[2.5rem] font-black shadow-3xl flex items-center gap-5 border border-white/20"><div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center text-white shadow-xl"><Icons.Check size={22} /></div><span className="tracking-tight text-xl italic">{showToast.message}</span></div></div>
      )}
    </div>
  );
};
