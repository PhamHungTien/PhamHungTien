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
  serverTimestamp,
  increment
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
  if (minutes < 60) return `${minutes} phút trước`;
  if (hours < 24) return `${hours} giờ trước`;
  if (days < 7) return `${days} ngày trước`;
  return new Date(date).toLocaleDateString('vi-VN');
};

const SmartContent: React.FC<{ content: string, className?: string }> = ({ content, className }) => {
  // Regex for code, mentions, and links
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
          return <a key={i} href={part} target="_blank" rel="noopener noreferrer" className="text-blue-400 underline hover:text-blue-300 inline-flex items-center gap-1">{part} <Icons.ExternalLink size={10} /></a>;
        }
        return <span key={i}>{part}</span>;
      })}
    </div>
  );
};

export const QASection: React.FC = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [newQuestion, setNewQuestion] = useState('');
  const [sortBy, setSortBy] = useState<'newest' | 'popular' | 'trending'>('newest');
  const [filterBy, setFilterBy] = useState<'all' | 'mine' | 'reported' | 'unanswered'>('all');
  const [searchQuery, setSearchBy] = useState('');
  
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showNamePrompt, setShowNamePrompt] = useState(false);
  const [tempUsername, setTempUsername] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [lastPostTime, setLastPostTime] = useState(0);
  const [showToast, setShowToast] = useState({ show: false, message: '' });
  const [postsLimit, setPostsLimit] = useState(POSTS_PER_PAGE);
  const [hasMore, setHasMore] = useState(true);
  
  const [replyingTo, setReplyingTo] = useState<{qId: string, rId?: string, name?: string} | null>(null);
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
          username: user.displayName || user.email?.split('@')[0] || 'User',
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

  // Firestore Real-time Listener
  useEffect(() => {
    const q = query(collection(db, "questions"), orderBy("timestamp", "desc"), limit(postsLimit));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      let qList = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Question[];

      // Sort logic
      if (sortBy === 'popular') {
        qList = qList.sort((a, b) => (b.likedBy?.length || 0) - (a.likedBy?.length || 0));
      } else if (sortBy === 'trending') {
        // Simple trending: (likes + replies*2) within recent period
        qList = qList.sort((a, b) => {
          const scoreA = (a.likedBy?.length || 0) + (a.replies?.length || 0) * 2;
          const scoreB = (b.likedBy?.length || 0) + (b.replies?.length || 0) * 2;
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

  const displayQuestions = useMemo(() => {
    let result = questions;
    
    // Filters
    if (filterBy === 'mine' && currentUser) {
      result = result.filter(q => q.authorId === currentUser.uid);
    } else if (filterBy === 'reported' && currentUser?.isAdmin) {
      result = result.filter(q => q.isReported);
    } else if (filterBy === 'unanswered') {
      result = result.filter(q => q.replies.length === 0);
    }

    // Search
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

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      setShowAuthModal(false);
      requestNotificationPermission();
      const isNewUser = (result.user.metadata.creationTime === result.user.metadata.lastSignInTime);
      if (isNewUser && result.user.email !== 'hungtien10a7@gmail.com') {
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
      triggerToast('Đã cập nhật tên hiển thị!');
    }
  };

  const handleAskQuestion = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) { setShowAuthModal(true); return; }
    if (!newQuestion.trim() || isSubmitting) return;

    const now = Date.now();
    if (now - lastPostTime < 10000 && !currentUser.isAdmin) {
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
      alert('Lỗi khi lưu dữ liệu!');
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
      alert('Cuộc thảo luận này đã bị khóa!');
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
  };

  const toggleLikeReply = async (qId: string, rId: string) => {
    if (!currentUser) { setShowAuthModal(true); return; }
    const questionRef = doc(db, "questions", qId);
    const snap = await getDoc(questionRef);
    if (!snap.exists()) return;
    const data = snap.data() as Question;
    const updatedReplies = data.replies.map(r => {
      if (r.id === rId) {
        const likedBy = r.likedBy || [];
        const hasLiked = likedBy.includes(currentUser.uid);
        return { ...r, likedBy: hasLiked ? likedBy.filter(id => id !== currentUser.uid) : [...likedBy, currentUser.uid] };
      }
      return r;
    });
    await updateDoc(questionRef, { replies: updatedReplies });
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
    triggerToast('Đã lưu thay đổi.');
  };

  const saveReplyEdit = async (qId: string, rId: string) => {
    if (!editContent.trim()) return;
    const questionRef = doc(db, "questions", qId);
    const snap = await getDoc(questionRef);
    if (!snap.exists()) return;
    const updatedReplies = (snap.data() as Question).replies.map(r => r.id === rId ? { ...r, content: editContent } : r);
    await updateDoc(questionRef, { replies: updatedReplies });
    setEditingReplyId(null);
    triggerToast('Đã lưu thay đổi.');
  };

  const reportContent = async (qId: string) => {
    if (!window.confirm('Báo cáo nội dung vi phạm?')) return;
    await updateDoc(doc(db, "questions", qId), { isReported: true });
    triggerToast('Đã gửi báo cáo!');
  };

  const toggleLock = async (q: Question) => {
    if (!currentUser?.isAdmin) return;
    await updateDoc(doc(db, "questions", q.id), { isLocked: !q.isLocked });
    triggerToast(q.isLocked ? 'Đã mở khóa thảo luận' : 'Đã khóa thảo luận');
  };

  return (
    <section id="qa" className="py-12 md:py-24 bg-slate-950/40 relative overflow-hidden border-t border-white/5 min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        
        {/* Profile & Header Area */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-12 animate-in fade-in duration-1000">
          <div className="space-y-3">
             <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-400 text-[10px] font-black uppercase tracking-widest">
                <Icons.Globe size={12} /> Community Hub
             </div>
             <h2 className="text-4xl md:text-7xl font-black text-white tracking-tighter italic leading-none">
               Thảo luận <span className="text-brand-500 text-glow-sm">PHTV</span>
             </h2>
             <p className="text-slate-500 font-medium text-sm md:text-lg max-w-lg">Góp ý, báo lỗi và tương tác cùng cộng đồng người dùng bộ gõ.</p>
          </div>

          <div className="flex items-center gap-4">
            {currentUser ? (
              <div className="flex items-center gap-4 p-2 pr-6 bg-white/5 rounded-3xl border border-white/10 group hover:border-brand-500/30 transition-all shadow-xl">
                <div className="relative">
                  {currentUser.photoURL ? (
                    <img src={currentUser.photoURL} alt={currentUser.username} className={`w-12 h-12 md:w-14 md:h-14 rounded-2xl object-cover ring-2 ${currentUser.isAdmin ? 'ring-brand-500 shadow-[0_0_15px_rgba(245,158,11,0.4)]' : 'ring-white/10'}`} />
                  ) : (
                    <div className={`w-12 h-12 md:w-14 md:h-14 rounded-2xl flex items-center justify-center text-white font-black text-xl shadow-2xl ${currentUser.isAdmin ? 'bg-brand-500' : 'bg-slate-700'}`}>
                      {getInitials(currentUser.username)}
                    </div>
                  )}
                  {currentUser.isAdmin && <div className="absolute -bottom-1 -right-1 bg-brand-500 text-white p-1 rounded-lg border-2 border-slate-900 shadow-lg"><Icons.Shield size={12} /></div>}
                </div>
                <div className="flex flex-col">
                  <span className="text-sm md:text-base font-black text-white tracking-tight flex items-center gap-1.5 uppercase">
                    {currentUser.username} 
                    {currentUser.isAdmin && <Icons.CheckCircle2 size={14} className="text-brand-400" />}
                  </span>
                  <div className="flex gap-3">
                    <button onClick={() => {setTempUsername(currentUser.username); setShowNamePrompt(true);}} className="text-[10px] font-black text-slate-500 hover:text-brand-400 uppercase transition-colors">Sửa tên</button>
                    <button onClick={() => signOut(auth)} className="text-[10px] font-black text-red-500/70 hover:text-red-400 uppercase transition-colors">Đăng xuất</button>
                  </div>
                </div>
              </div>
            ) : (
              <button onClick={() => setShowAuthModal(true)} className="group flex items-center gap-3 px-8 py-4 bg-white text-slate-950 rounded-[1.5rem] transition-all transform hover:scale-105 active:scale-95 font-black text-sm md:text-base shadow-2xl hover:shadow-white/10">
                <Icons.User size={20} className="group-hover:rotate-12 transition-transform" />
                <span>Đăng nhập Google</span>
              </button>
            )}
          </div>
        </div>

        {/* Toolbar: Premium Design */}
        <div className="flex flex-col gap-6 mb-12 animate-in slide-in-from-bottom-4 duration-700 delay-200">
           <div className="relative group overflow-hidden rounded-[2rem]">
              <div className="absolute inset-0 bg-brand-500/5 opacity-0 group-focus-within:opacity-100 transition-opacity"></div>
              <Icons.Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-brand-500 transition-colors" size={24} />
              <input 
                type="text" 
                placeholder="Tìm kiếm thảo luận, tính năng, lỗi..." 
                value={searchQuery}
                onChange={e => setSearchBy(e.target.value)}
                className="w-full bg-slate-900/40 border border-white/5 rounded-[2rem] py-5 pl-16 pr-8 text-white focus:outline-none focus:border-brand-500/30 transition-all text-lg md:text-xl shadow-inner placeholder:text-slate-700"
              />
           </div>
           
           <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="flex bg-slate-900/60 p-1.5 rounded-2xl border border-white/5 shadow-2xl backdrop-blur-md w-full sm:w-auto">
                 {[ 
                   { id: 'newest', label: 'Mới nhất', icon: Icons.RefreshCw },
                   { id: 'trending', label: 'Xu hướng', icon: Icons.Sparkles },
                   { id: 'popular', label: 'Yêu thích', icon: Icons.Heart }
                 ].map(tab => (
                   <button key={tab.id} onClick={() => setSortBy(tab.id as any)} className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-[11px] font-black uppercase tracking-widest transition-all ${sortBy === tab.id ? 'bg-white text-slate-950 shadow-xl scale-[1.03]' : 'text-slate-500 hover:text-white hover:bg-white/5'}`}>
                     <tab.icon size={14} />
                     {tab.label}
                   </button>
                 ))}
              </div>

              <div className="flex items-center gap-4 bg-slate-900/40 px-6 py-3 rounded-2xl border border-white/5 w-full sm:w-auto justify-center">
                 <Icons.Filter size={16} className="text-brand-500" />
                 <span className="text-[10px] font-black text-slate-600 uppercase tracking-widest">Lọc bài:</span>
                 <select 
                   value={filterBy} 
                   onChange={e => setFilterBy(e.target.value as any)}
                   className="bg-transparent text-white font-black text-xs uppercase tracking-tighter focus:outline-none cursor-pointer"
                 >
                    <option value="all" className="bg-slate-900">Tất cả bài viết</option>
                    <option value="mine" className="bg-slate-900">Bài của tôi</option>
                    <option value="unanswered" className="bg-slate-900">Chưa phản hồi</option>
                    {currentUser?.isAdmin && <option value="reported" className="bg-slate-900 text-red-400">Đã bị báo cáo (!)</option>}
                 </select>
              </div>
           </div>
        </div>

        {/* Post Form: Modern & Clean */}
        <div className="glass-panel rounded-[3rem] p-1.5 mb-20 shadow-2xl border border-white/5 overflow-hidden group/form animate-in zoom-in-95 duration-700 delay-300">
          <div className="bg-slate-900/40 rounded-[2.8rem] p-8 md:p-10 transition-all group-focus-within/form:bg-slate-900/60">
            <form onSubmit={handleAskQuestion} className="space-y-8">
              <div className="flex items-start gap-6">
                 <div className="hidden md:flex w-14 h-14 rounded-2xl bg-gradient-to-br from-slate-700 to-slate-800 items-center justify-center text-white font-black text-2xl shadow-xl border border-white/10 shrink-0">
                    {currentUser ? getInitials(currentUser.username) : <Icons.MessageSquare size={28} />}
                 </div>
                 <textarea 
                   placeholder={currentUser ? `Chào ${currentUser.username}, chia sẻ ý kiến của bạn nhé...` : "Vui lòng đăng nhập Google để tham gia thảo luận..."} 
                   value={newQuestion} 
                   onChange={(e) => setNewQuestion(e.target.value)} 
                   disabled={isSubmitting} 
                   className="w-full bg-transparent border-none p-0 text-white text-xl md:text-2xl focus:ring-0 placeholder:text-slate-700 min-h-[120px] resize-none leading-relaxed" 
                   required 
                 />
              </div>
              <div className="flex flex-col sm:flex-row items-center justify-between pt-6 border-t border-white/5 gap-6">
                <div className="flex items-center gap-6 text-slate-600">
                   <div className="flex items-center gap-2 hover:text-brand-400 cursor-help transition-colors" title="Sử dụng @tên để nhắc đến ai đó">
                      <Icons.AtSign size={18} />
                      <span className="text-[10px] font-black uppercase tracking-widest hidden lg:inline">Mentions</span>
                   </div>
                   <div className="flex items-center gap-2 hover:text-brand-400 cursor-help transition-colors" title="Viết `code` giữa hai dấu huyền">
                      <Icons.Terminal size={18} />
                      <span className="text-[10px] font-black uppercase tracking-widest hidden lg:inline">Code Support</span>
                   </div>
                </div>
                <button type="submit" disabled={isSubmitting || !newQuestion.trim()} className="w-full sm:w-auto flex items-center justify-center gap-4 px-12 py-5 bg-white text-slate-950 rounded-[1.5rem] font-black text-base transition-all transform hover:scale-[1.02] active:scale-95 shadow-[0_20px_40px_rgba(255,255,255,0.1)] disabled:opacity-50 disabled:cursor-not-allowed">
                  {isSubmitting ? <Icons.RefreshCw className="animate-spin" size={24} /> : <><span>Đăng thảo luận</span><Icons.Send size={20} /></>}
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Feed: High-quality threads */}
        <div className="space-y-16 pb-32">
          {displayQuestions.length === 0 ? (
            <div className="text-center py-40 bg-white/5 rounded-[4rem] border border-dashed border-white/10 animate-pulse">
               <Icons.MessageCircle size={64} className="mx-auto mb-6 text-slate-800" />
               <h3 className="text-xl font-black text-slate-600 uppercase tracking-[0.2em]">Không tìm thấy thảo luận nào</h3>
               <p className="text-slate-700 text-sm mt-2">Hãy là người đầu tiên khơi dậy cuộc trò chuyện!</p>
            </div>
          ) : (
            displayQuestions.map((q) => (
              <div key={q.id} className={`group animate-in fade-in slide-in-from-bottom-12 duration-1000 ${q.isPinned ? 'ring-2 ring-brand-500/40 rounded-[3rem] p-6 md:p-8 bg-brand-500/[0.03] shadow-2xl shadow-brand-500/10' : ''}`}>
                 <div className="flex gap-5 md:gap-8">
                    {/* Author Column */}
                    <div className="flex flex-col items-center">
                      <div className="relative group/avt">
                        <div className={`w-14 h-14 md:w-16 md:h-16 rounded-[1.5rem] flex items-center justify-center text-white font-black text-2xl shadow-2xl transition-all duration-500 group-hover:scale-110 ${
                          q.isAdmin 
                            ? 'bg-gradient-to-br from-brand-400 via-brand-600 to-purple-600 ring-2 ring-brand-400/50 shadow-[0_0_30px_rgba(245,158,11,0.3)]' 
                            : q.isPinned ? 'bg-brand-500' : 'bg-slate-800 border border-white/5'
                        }`}>
                          {q.authorPhoto ? <img src={q.authorPhoto} className="w-full h-full rounded-[1.5rem] object-cover" /> : getInitials(q.author)}
                        </div>
                        {q.isAdmin && <div className="absolute -bottom-1 -right-1 bg-brand-500 p-1 rounded-lg border-2 border-slate-900 text-white"><Icons.Award size={12} /></div>}
                      </div>
                      <div className="w-[3px] flex-1 bg-gradient-to-b from-white/10 via-white/[0.05] to-transparent my-4 rounded-full"></div>
                    </div>

                    {/* Content Column */}
                    <div className="flex-1 space-y-6 pb-8">
                      <div className="flex justify-between items-start">
                        <div className="space-y-1">
                          <div className="flex items-center gap-3 flex-wrap">
                            <h4 className={`font-black text-lg md:text-xl tracking-tight ${q.isAdmin ? 'text-brand-400 text-glow-sm' : 'text-white'}`}>{q.author}</h4>
                            {q.isAdmin && <span className="flex items-center gap-1.5 bg-brand-500/10 text-brand-500 text-[10px] px-3 py-1 rounded-full font-black uppercase tracking-tighter border border-brand-500/20"><Icons.ShieldCheck size={12} />Official</span>}
                            {q.isPinned && <div className="flex items-center gap-1.5 bg-white/5 text-slate-400 text-[10px] px-3 py-1 rounded-full font-black uppercase tracking-tighter border border-white/5"><Icons.Paperclip size={12} /> Ghim</div>}
                            <span className="text-xs text-slate-600 font-bold uppercase tracking-tighter">{formatRelativeTime(q.timestamp)}</span>
                          </div>
                          {q.isReported && <span className="text-[10px] text-red-500 font-black uppercase tracking-widest bg-red-500/10 px-3 py-1 rounded-full mt-2 inline-flex items-center gap-1.5"><Icons.Flag size={10} /> Đã bị báo cáo bởi cộng đồng</span>}
                        </div>
                        
                        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-all transform translate-x-2 group-hover:translate-x-0">
                          {currentUser?.isAdmin && (
                            <>
                              <button onClick={() => toggleLock(q)} className={`p-2.5 rounded-xl hover:bg-white/5 transition-all ${q.isLocked ? 'text-brand-500' : 'text-slate-700'}`} title={q.isLocked ? 'Mở khóa' : 'Khóa'}>{q.isLocked ? <Icons.Lock size={20} /> : <Icons.Unlock size={20} />}</button>
                              <button onClick={() => updateDoc(doc(db, "questions", q.id), { isPinned: !q.isPinned })} className={`p-2.5 rounded-xl hover:bg-white/5 transition-all ${q.isPinned ? 'text-brand-500' : 'text-slate-700'}`}><Icons.Paperclip size={20} /></button>
                            </>
                          )}
                          {(currentUser?.isAdmin || currentUser?.uid === q.authorId) && (
                            <>
                              <button onClick={() => {setEditingId(q.id); setEditContent(q.content);}} className="p-2.5 text-slate-700 hover:text-white rounded-xl hover:bg-white/5 transition-all"><Icons.Settings size={20} /></button>
                              <button onClick={() => deleteQuestion(q.id)} className="p-2.5 text-slate-700 hover:text-red-500 rounded-xl hover:bg-red-500/10 transition-all"><Icons.Trash2 size={20} /></button>
                            </>
                          )}
                          <button onClick={() => reportContent(q.id)} className="p-2.5 text-slate-700 hover:text-yellow-500 rounded-xl hover:bg-white/5 transition-all"><Icons.Flag size={20} /></button>
                        </div>
                      </div>

                      {editingId === q.id ? (
                        <div className="space-y-5 animate-in zoom-in-95 duration-300">
                          <textarea value={editContent} onChange={e => setEditContent(e.target.value)} className="w-full bg-slate-900 border border-white/10 rounded-[1.5rem] p-6 text-white text-lg focus:outline-none focus:border-brand-500/30 shadow-inner min-h-[150px]" />
                          <div className="flex gap-4"><button onClick={() => saveEdit(q.id)} className="px-8 py-3 bg-brand-600 text-white rounded-xl text-xs font-black shadow-xl shadow-brand-600/20 hover:bg-brand-500 transition-all">Lưu thay đổi</button><button onClick={() => setEditingId(null)} className="px-8 py-3 bg-white/5 text-slate-400 rounded-xl text-xs font-black hover:bg-white/10 transition-all">Hủy bỏ</button></div>
                        </div>
                      ) : (
                        <SmartContent content={q.content} className="text-slate-300 text-lg md:text-xl leading-relaxed font-medium bg-white/[0.02] p-6 md:p-8 rounded-[2rem] border border-white/5 shadow-inner" />
                      )}

                      <div className="flex items-center gap-10 px-2">
                         <button onClick={() => toggleLikeQuestion(q)} className={`flex items-center gap-2.5 font-black text-sm transition-all transform active:scale-75 ${q.likedBy?.includes(currentUser?.uid || '') ? 'text-brand-500 scale-110' : 'text-slate-600 hover:text-slate-400'}`}>
                           <Icons.ThumbsUp size={22} fill={q.likedBy?.includes(currentUser?.uid || '') ? 'currentColor' : 'none'} className="transition-all" /> 
                           <span className="tabular-nums text-lg">{q.likedBy?.length || 0}</span>
                         </button>
                         <button onClick={() => q.isLocked ? alert('Thảo luận này đã bị khóa!') : setReplyingTo({qId: q.id, name: q.author})} className={`flex items-center gap-2.5 font-black text-sm transition-all ${q.isLocked ? 'text-slate-800 cursor-not-allowed' : 'text-slate-600 hover:text-brand-400'}`}>
                           <Icons.MessageSquareReply size={22} /> 
                           <span className="text-lg">{q.replies?.length || 0} <span className="hidden sm:inline">Phản hồi</span></span>
                         </button>
                         <button onClick={() => {
                           navigator.clipboard.writeText(`${window.location.origin}${window.location.pathname}#community`);
                           triggerToast('Đã sao chép liên kết!');
                         }} className="flex items-center gap-2.5 text-slate-600 hover:text-white font-black text-sm transition-all">
                           <Icons.Share2 size={22} />
                           <span className="text-lg hidden sm:inline">Chia sẻ</span>
                         </button>
                      </div>

                      {/* Replies List */}
                      <div className="space-y-10 pt-10 border-l-4 border-white/5 ml-2 pl-8 md:pl-12">
                        {q.replies?.map((r) => (
                          <div key={r.id} className="flex gap-5 group/reply animate-in fade-in slide-in-from-left-6 duration-700">
                            <div className="relative shrink-0">
                              <div className={`w-12 h-12 md:w-14 md:h-14 rounded-2xl flex items-center justify-center text-white font-black text-lg shrink-0 shadow-2xl transition-all group-hover/reply:scale-110 ${
                                r.isAdmin 
                                  ? 'bg-gradient-to-br from-brand-500 to-purple-600 ring-2 ring-brand-400/30' 
                                  : 'bg-slate-800'
                              }`}>
                                {r.authorPhoto ? <img src={r.authorPhoto} className="w-full h-full rounded-2xl object-cover" /> : getInitials(r.author)}
                              </div>
                              {r.isAdmin && <div className="absolute -top-1 -right-1 bg-brand-500 text-[8px] p-0.5 rounded border border-slate-900 shadow-lg"><Icons.Shield size={8} /></div>}
                            </div>
                            <div className="flex-1 space-y-4">
                              <div className={`rounded-[2rem] p-6 md:p-8 border transition-all hover:shadow-2xl ${
                                r.isAdmin 
                                  ? 'bg-brand-500/10 border-brand-500/30 shadow-[0_15px_40px_rgba(245,158,11,0.08)]' 
                                  : 'bg-slate-900/80 border-white/10'
                              }`}>
                                 <div className="flex justify-between items-center mb-3">
                                   <div className="flex items-center gap-3 flex-wrap">
                                     <span className={`font-black text-base md:text-lg tracking-tight ${r.isAdmin ? 'text-brand-400 text-glow-sm' : 'text-white'}`}>
                                       {r.author} 
                                       {r.isAdmin && <Icons.CheckCircle2 size={16} className="text-brand-500 inline ml-1.5" />}
                                     </span>
                                     {r.replyToName && (
                                       <span className="text-[10px] md:text-xs text-slate-500 flex items-center gap-2 font-black bg-white/5 px-3 py-1.5 rounded-full uppercase tracking-widest border border-white/5">
                                         <Icons.ArrowRight size={12} className="text-brand-500" />
                                         {r.replyToName}
                                       </span>
                                     )}
                                     <span className="text-[10px] md:text-xs text-slate-700 font-bold uppercase tracking-tighter">{formatRelativeTime(r.timestamp)}</span>
                                   </div>
                                   <div className="flex items-center gap-1 opacity-0 group-hover/reply:opacity-100 transition-opacity">
                                     {(currentUser?.isAdmin || currentUser?.uid === r.authorId) && (
                                       <>
                                         <button onClick={() => {setEditingReplyId(r.id); setEditContent(r.content);}} className="p-2.5 text-slate-700 hover:text-white rounded-xl hover:bg-white/5 transition-all"><Icons.Settings size={18} /></button>
                                         <button onClick={() => deleteReply(q.id, r.id)} className="p-2.5 text-slate-700 hover:text-red-500 rounded-xl hover:bg-red-500/10 transition-all"><Icons.Trash2 size={18} /></button>
                                       </>
                                     )}
                                   </div>
                                 </div>
                                 
                                 {editingReplyId === r.id ? (
                                   <div className="space-y-4 animate-in zoom-in-95 duration-200">
                                     <textarea value={editContent} onChange={e => setEditContent(e.target.value)} className="w-full bg-slate-950 border border-white/10 rounded-2xl p-5 text-white focus:border-brand-500/30 outline-none shadow-inner" />
                                     <div className="flex gap-3">
                                       <button onClick={() => saveReplyEdit(q.id, r.id)} className="px-6 py-2 bg-brand-600 text-white rounded-xl text-xs font-black shadow-xl">Lưu</button>
                                       <button onClick={() => setEditingReplyId(null)} className="px-6 py-2 bg-white/5 text-slate-400 rounded-xl text-xs font-black">Hủy</button>
                                     </div>
                                   </div>
                                 ) : (
                                   <SmartContent content={r.content} className={`${r.isAdmin ? 'text-slate-100' : 'text-slate-300'} text-base md:text-lg leading-relaxed font-medium`} />
                                 )}
                              </div>
                              <div className="flex gap-8 px-4">
                                 <button onClick={() => toggleLikeReply(q.id, r.id)} className={`text-xs font-black uppercase flex items-center gap-2.5 transition-all transform active:scale-75 ${r.likedBy?.includes(currentUser?.uid || '') ? 'text-brand-500 scale-110' : 'text-slate-600 hover:text-slate-400'}`}>
                                   <Icons.ThumbsUp size={16} fill={r.likedBy?.includes(currentUser?.uid || '') ? 'currentColor' : 'none'} /> 
                                   <span className="tabular-nums">{r.likedBy?.length || 0}</span>
                                 </button>
                                 <button onClick={() => setReplyingTo({qId: q.id, rId: r.id, name: r.author})} className="text-xs font-black text-slate-600 hover:text-brand-400 uppercase tracking-widest transition-colors">Trả lời</button>
                                 <button onClick={() => reportContent(q.id)} className="text-xs font-black text-slate-800 hover:text-yellow-500 uppercase tracking-widest ml-auto opacity-0 group-hover/reply:opacity-100 transition-opacity">Báo cáo</button>
                              </div>
                            </div>
                          </div>
                        ))}

                        {/* Reply Input: Premium Experience */}
                        {replyingTo?.qId === q.id && (
                          <div className="flex gap-5 pt-10 animate-in slide-in-from-top-4 duration-500 border-t border-white/5">
                             <div className="hidden sm:flex w-14 h-14 rounded-2xl bg-brand-500/10 border border-brand-500/20 items-center justify-center text-brand-400 shrink-0 shadow-2xl shadow-brand-500/5"><Icons.MessageSquareReply size={24} /></div>
                             <div className="flex-1 space-y-6">
                                <div className="flex items-center justify-between bg-brand-500/5 px-6 py-3 rounded-2xl border border-brand-500/10">
                                   <span className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] flex items-center gap-2">Phản hồi <span className="text-brand-400 bg-brand-500/10 px-3 py-1 rounded-full border border-brand-500/20">{replyingTo.name}</span></span>
                                   <button onClick={() => setReplyingTo(null)} className="text-slate-600 hover:text-white transition-colors"><Icons.X size={16} /></button>
                                </div>
                                <textarea autoFocus value={replyContent} onChange={(e) => setReplyContent(e.target.value)} placeholder={`Viết phản hồi tâm huyết của bạn...`} className="w-full bg-slate-900/60 border border-white/5 rounded-[2rem] py-6 px-8 text-white text-lg focus:outline-none focus:border-brand-500/30 min-h-[150px] resize-none shadow-2xl" />
                                <div className="flex gap-4"><button onClick={() => handleReply(q.id)} className="flex-1 sm:flex-none px-12 py-5 bg-brand-600 hover:bg-brand-500 text-white rounded-[1.5rem] font-black shadow-2xl shadow-brand-600/30 transition-all transform hover:scale-105 active:scale-95">Gửi phản hồi</button><button onClick={() => {setReplyingTo(null); setReplyContent('');}} className="px-10 py-5 bg-white/5 text-slate-400 rounded-[1.5rem] font-black hover:bg-white/10 transition-all">Hủy bỏ</button></div>
                             </div>
                          </div>
                        )}
                      </div>
                    </div>
                 </div>
              </div>
            ))
          )}
          
          {hasMore && displayQuestions.length >= postsLimit && (
            <div className="text-center pt-20 pb-40">
               <button onClick={() => setPostsLimit(prev => prev + POSTS_PER_PAGE)} className="group px-12 py-6 bg-white text-slate-950 rounded-[2rem] font-black text-base transition-all transform hover:scale-110 active:scale-95 flex items-center gap-4 mx-auto shadow-[0_25px_60px_rgba(255,255,255,0.15)]">
                  Khám phá thêm thảo luận
                  <Icons.ChevronDown size={24} className="group-hover:translate-y-1.5 transition-transform" />
               </button>
            </div>
          )}
        </div>
      </div>

      {/* Modern Toast */}
      {showToast.show && (
        <div className="fixed bottom-12 left-1/2 -translate-x-1/2 z-[300] animate-in slide-in-from-bottom-12 duration-500">
          <div className="bg-white text-slate-950 px-10 py-5 rounded-[2.5rem] font-black shadow-[0_30px_80px_rgba(255,255,255,0.3)] flex items-center gap-4 border border-white/20">
             <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center text-white shadow-xl shadow-green-500/40"><Icons.Check size={20} /></div>
             <span className="tracking-tight text-xl">{showToast.message}</span>
          </div>
        </div>
      )}

      {/* Name Choice Modal */}
      {showNamePrompt && (
        <div className="fixed inset-0 z-[250] flex items-center justify-center p-6">
          <div className="absolute inset-0 bg-slate-950/95 backdrop-blur-3xl animate-in fade-in duration-500"></div>
          <div className="relative w-full max-w-lg bg-slate-900 rounded-[4rem] p-12 border border-white/10 shadow-[0_0_150px_rgba(0,0,0,0.8)] animate-in zoom-in-95 duration-500">
            <div className="text-center mb-12 space-y-4">
               <div className="w-24 h-24 bg-gradient-to-br from-brand-500 to-purple-600 rounded-[2rem] flex items-center justify-center mx-auto shadow-2xl rotate-3"><Icons.UserCheck size={48} className="text-white" /></div>
               <h3 className="text-4xl font-black text-white tracking-tighter uppercase italic">Bạn là ai?</h3>
               <p className="text-slate-500 font-medium text-lg italic">Chọn một danh xưng thật ấn tượng cho cộng đồng</p>
            </div>
            <input type="text" value={tempUsername} onChange={e => setTempUsername(e.target.value)} className="w-full bg-slate-950 border border-white/10 rounded-[2rem] py-6 px-10 text-white font-black mb-10 text-center text-3xl focus:border-brand-500/50 outline-none transition-all shadow-inner placeholder:text-slate-800" placeholder="Nhập tên..." />
            <button onClick={handleUpdateName} className="w-full py-6 bg-white text-slate-950 rounded-[2rem] font-black text-xl shadow-2xl hover:shadow-white/10 active:scale-95 transition-all transform hover:scale-[1.02]">Bắt đầu ngay</button>
          </div>
        </div>
      )}

      {/* Auth Modal */}
      {showAuthModal && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-6">
          <div className="absolute inset-0 bg-slate-950/95 backdrop-blur-2xl"></div>
          <div className="relative w-full max-w-md bg-slate-900 rounded-[4rem] p-12 border border-white/10 shadow-[0_0_150px_rgba(0,0,0,0.6)] animate-in zoom-in-95">
            <button onClick={() => setShowAuthModal(false)} className="absolute top-12 right-12 text-slate-600 hover:text-white transition-colors p-2"><Icons.X size={32} /></button>
            <div className="text-center mb-16 space-y-6">
               <div className="w-24 h-24 bg-brand-500/10 rounded-[2rem] flex items-center justify-center mx-auto text-brand-400 shadow-2xl border border-white/5"><Icons.MessageCircle size={48} /></div>
               <h3 className="text-4xl font-black text-white tracking-tighter uppercase italic leading-none">Tham gia<br/><span className="text-brand-500">Cộng đồng</span></h3>
               <p className="text-slate-500 font-medium italic">Để bình luận và tương tác cùng mọi người</p>
            </div>
            <button onClick={handleGoogleLogin} className="w-full py-6 bg-white text-slate-950 rounded-[2rem] font-black text-xl flex items-center justify-center gap-5 transition-all transform hover:scale-[1.02] active:scale-95 shadow-2xl">
               <svg className="w-8 h-8" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
               Tiếp tục với Google
            </button>
          </div>
        </div>
      )}
    </section>
  );
};