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
  isAdmin?: boolean;
  viewCount?: number;
}

const ADMIN_EMAILS = ['admin@phtv.com', 'hungtien10a7@gmail.com'];
const POSTS_PER_PAGE = 12;

const getInitials = (name: string) => {
  if (!name) return '??';
  return name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2);
};

const formatRelativeTime = (timestamp: number) => {
  const diff = Date.now() - timestamp;
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  if (seconds < 60) return 'Vừa xong';
  if (minutes < 60) return `${minutes}p`;
  if (hours < 24) return `${hours}h`;
  if (days < 7) return `${days} ngày`;
  return new Date(timestamp).toLocaleDateString('vi-VN', { day: 'numeric', month: 'short' });
};

const SmartContent: React.FC<{ content: string, className?: string }> = ({ content, className }) => {
  const parts = content.split(/(`[^`]+`|@[a-zA-Z0-9_]+|https?:\/\/[^\s]+)/g);
  return (
    <div className={className}>
      {parts.map((part, i) => {
        if (part.startsWith('`') && part.endsWith('`')) {
          return <code key={i} className="bg-white/10 px-1.5 py-0.5 rounded text-brand-300 font-mono text-[0.9em] border border-white/5">{part.slice(1, -1)}</code>;
        }
        if (part.startsWith('@')) {
          return <span key={i} className="text-brand-400 font-black hover:underline cursor-pointer">@{part.slice(1)}</span>;
        }
        if (part.startsWith('http')) {
          return <a key={i} href={part} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline inline-flex items-center gap-1">{part.length > 30 ? part.substring(0, 30) + '...' : part} <Icons.ExternalLink size={10} /></a>;
        }
        return <span key={i} className="whitespace-pre-wrap">{part}</span>;
      })}
    </div>
  );
};

export const QASection: React.FC = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [newQuestion, setNewQuestion] = useState('');
  const [sortBy, setSortBy] = useState<'newest' | 'popular'>('newest');
  const [filterBy, setFilterBy] = useState<'all' | 'mine' | 'reported'>('all');
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

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const isAdmin = ADMIN_EMAILS.includes(user.email || '');
        setCurrentUser({
          uid: user.uid,
          username: user.email === 'hungtien10a7@gmail.com' ? 'Phạm Hùng Tiến' : (user.displayName || user.email?.split('@')[0] || 'User'),
          email: user.email || '',
          isAdmin: isAdmin,
          photoURL: user.photoURL || undefined
        });
      } else {
        setCurrentUser(null);
      }
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const q = query(collection(db, "questions"), orderBy("timestamp", "desc"), limit(postsLimit));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      let qList = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Question[];

      if (sortBy === 'popular') {
        qList = qList.sort((a, b) => (b.likedBy?.length || 0) - (a.likedBy?.length || 0));
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
    if (filterBy === 'mine' && currentUser) {
      result = result.filter(q => q.authorId === currentUser.uid);
    } else if (filterBy === 'reported' && currentUser?.isAdmin) {
      result = result.filter(q => q.isReported);
    }

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
      triggerToast('Đăng nhập thất bại');
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
      alert('Chậm lại một chút! Vui lòng đợi 10s.');
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
        isAdmin: currentUser.isAdmin,
        viewCount: 0
      });
      setNewQuestion('');
      setLastPostTime(Date.now());
      triggerToast('Đăng thảo luận thành công ✨');
    } catch (err) {
      alert('Lỗi khi gửi dữ liệu!');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReply = async (qId: string) => {
    if (!currentUser || !replyingTo) { setShowAuthModal(true); return; }
    if (!replyContent.trim()) return;

    const questionRef = doc(db, "questions", qId);
    const newReply: Reply = {
      id: Date.now().toString(),
      parentId: replyingTo.rId || qId,
      replyToName: replyingTo.name,
      authorId: currentUser.uid,
      author: currentUser.isAdmin ? 'PHTV Admin' : currentUser.username,
      authorPhoto: currentUser.photoURL || undefined,
      content: replyContent,
      timestamp: Date.now(),
      isAdmin: currentUser.isAdmin,
      likedBy: []
    };

    await updateDoc(questionRef, { replies: arrayUnion(newReply) });
    setReplyContent('');
    setReplyingTo(null);
    triggerToast('Đã gửi phản hồi!');
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
    if (!window.confirm('Xác nhận xóa thảo luận này?')) return;
    await deleteDoc(doc(db, "questions", id));
    triggerToast('Đã xóa thảo luận.');
  };

  const deleteReply = async (qId: string, rId: string) => {
    if (!window.confirm('Xác nhận xóa phản hồi này?')) return;
    const questionRef = doc(db, "questions", qId);
    const snap = await getDoc(questionRef);
    if (!snap.exists()) return;
    const updatedReplies = (snap.data() as Question).replies.filter(r => r.id !== rId);
    await updateDoc(questionRef, { replies: updatedReplies });
    triggerToast('Đã xóa phản hồi.');
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
        <span className={size.includes('w-8') ? 'text-xs' : 'text-xl'}>{getInitials(user.username)}</span>
      )}
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 py-12 md:py-24 flex flex-col lg:flex-row gap-8">
      
      {/* Sidebar - Left (Rules & Info) */}
      <aside className="w-full lg:w-80 shrink-0 space-y-6 order-2 lg:order-1">
        <div className="glass-panel rounded-[2rem] p-8 border border-white/5 shadow-2xl backdrop-blur-md">
           <h3 className="text-xl font-black text-white mb-6 flex items-center gap-3">
             <Icons.Info size={20} className="text-brand-400" />
             Thông tin
           </h3>
           <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5">
                 <span className="text-slate-400 text-sm font-bold">Thảo luận</span>
                 <span className="text-white font-black">{questions.length}</span>
              </div>
              <div className="p-4 bg-yellow-500/5 rounded-2xl border border-yellow-500/10">
                 <div className="flex items-center gap-2 text-yellow-500 mb-2">
                    <Icons.ShieldCheck size={16} />
                    <span className="text-[10px] font-black uppercase tracking-widest">Nội quy</span>
                 </div>
                 <p className="text-xs text-slate-400 leading-relaxed font-medium">
                   Hãy tôn trọng lẫn nhau, không spam, không quảng cáo và sử dụng ngôn từ văn minh. Chúc bạn có trải nghiệm tốt tại PHTV!
                 </p>
              </div>
           </div>
        </div>

        <div className="glass-panel rounded-[2rem] p-8 border border-white/5 shadow-2xl hidden md:block backdrop-blur-md">
           <h3 className="text-xl font-black text-white mb-6 flex items-center gap-3">
             <Icons.Award size={20} className="text-brand-400" />
             Nhà phát triển
           </h3>
           <div className="flex items-center gap-4 p-4 bg-gradient-to-br from-brand-500/10 to-purple-500/10 rounded-2xl border border-brand-500/20 group cursor-default">
              <div className="w-12 h-12 rounded-xl bg-brand-500 flex items-center justify-center text-white shadow-lg shadow-brand-500/20 transition-transform group-hover:rotate-12">
                 <Icons.User size={24} />
              </div>
              <div>
                 <h4 className="text-white font-black text-sm">Phạm Hùng Tiến</h4>
                 <p className="text-[10px] text-brand-400 font-bold uppercase tracking-tighter">Official Admin</p>
              </div>
           </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 order-1 lg:order-2 space-y-8">
        
        {/* Header Mobile / Desktop Mix */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 mb-12">
          <div className="text-center sm:text-left">
             <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter italic">Hỏi đáp <span className="text-brand-500">&</span> Thảo luận</h2>
             <p className="text-slate-500 text-sm md:text-base font-bold mt-2 uppercase tracking-widest">Cộng đồng PHTV Việt Nam</p>
          </div>
          
          <div className="flex items-center gap-3">
            {currentUser ? (
              <div className="flex items-center gap-3 p-1.5 pr-4 bg-white/5 rounded-2xl border border-white/10 group shadow-2xl backdrop-blur-md transition-all hover:bg-white/10">
                <Avatar user={{ username: currentUser.username, photoURL: currentUser.photoURL, isAdmin: currentUser.isAdmin }} size="w-10 h-10" isAdmin={currentUser.isAdmin} />
                <div className="flex flex-col">
                  <span className="text-xs font-black text-white flex items-center gap-1">
                    {currentUser.username} 
                    {currentUser.isAdmin && <Icons.CheckCircle2 size={10} className="text-brand-400" />}
                  </span>
                  <div className="flex gap-3">
                    <button onClick={() => {setTempUsername(currentUser.username); setShowNamePrompt(true);}} className="text-[9px] font-black text-brand-400 hover:text-white uppercase transition-colors">Sửa tên</button>
                    <button onClick={() => signOut(auth)} className="text-[9px] font-black text-red-500 hover:text-white uppercase transition-colors">Thoát</button>
                  </div>
                </div>
              </div>
            ) : (
              <button onClick={() => setShowAuthModal(true)} className="group flex items-center gap-3 px-8 py-4 bg-white text-slate-950 rounded-2xl transition-all transform hover:scale-105 active:scale-95 font-black text-sm shadow-[0_20px_40px_rgba(255,255,255,0.1)]">
                <Icons.User size={20} className="group-hover:rotate-12 transition-transform" />
                <span>Đăng nhập Google</span>
              </button>
            )}
          </div>
        </div>

        {/* Search & Toolbar */}
        <div className="space-y-6">
           <div className="relative group shadow-2xl">
              <Icons.Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-brand-500 transition-colors" size={24} />
              <input 
                type="text" 
                placeholder="Tìm thảo luận, lỗi, hoặc ID..." 
                value={searchQuery}
                onChange={e => setSearchBy(e.target.value)}
                className="w-full bg-slate-900/60 backdrop-blur-xl border border-white/5 rounded-[1.8rem] py-5 pl-16 pr-8 text-white focus:outline-none focus:border-brand-500/30 transition-all text-lg shadow-inner"
              />
           </div>
           
           <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex bg-white/5 p-1.5 rounded-2xl border border-white/5 shadow-xl backdrop-blur-md">
                 {[ 
                   { id: 'newest', label: 'Mới nhất', icon: Icons.RefreshCw },
                   { id: 'popular', label: 'Yêu thích', icon: Icons.Award }
                 ].map(tab => (
                   <button key={tab.id} onClick={() => setSortBy(tab.id as any)} className={`flex items-center gap-2 px-6 py-3 rounded-xl text-[11px] font-black uppercase tracking-widest transition-all ${sortBy === tab.id ? 'bg-white text-slate-950 shadow-xl scale-[1.02]' : 'text-slate-500 hover:text-white'}`}>
                     <tab.icon size={14} />
                     {tab.label}
                   </button>
                 ))}
              </div>

              <div className="flex items-center gap-3 bg-white/5 px-4 py-2.5 rounded-2xl border border-white/5 backdrop-blur-md">
                 <Icons.Filter size={16} className="text-slate-600" />
                 <select 
                   value={filterBy} 
                   onChange={e => setFilterBy(e.target.value as any)}
                   className="bg-transparent text-slate-400 font-black text-[11px] uppercase tracking-tighter focus:outline-none cursor-pointer hover:text-white"
                 >
                    <option value="all" className="bg-slate-900">Tất cả bài đăng</option>
                    <option value="mine" className="bg-slate-900">Bài của tôi</option>
                    {currentUser?.isAdmin && <option value="reported" className="bg-slate-900 text-red-400 font-black">Các bài bị báo cáo (!) </option>}
                 </select>
              </div>
           </div>
        </div>

        {/* Post Form */}
        <div className="glass-panel rounded-[2.8rem] p-2 shadow-2xl border border-white/5 overflow-hidden group/form relative backdrop-blur-xl">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand-500 via-purple-500 to-red-500 opacity-20 group-focus-within/form:opacity-100 transition-opacity"></div>
          <div className="bg-slate-900/40 rounded-[2.5rem] p-8 md:p-10 transition-all group-focus-within/form:bg-slate-900/60 shadow-inner">
            <form onSubmit={handleAskQuestion} className="space-y-8">
              <div className="flex items-start gap-5">
                 <Avatar user={{ username: currentUser?.username || 'User', photoURL: currentUser?.photoURL, isAdmin: currentUser?.isAdmin }} isAdmin={currentUser?.isAdmin} />
                 <div className="flex-1 pt-2">
                    <textarea 
                      placeholder={currentUser ? `Chào ${currentUser.username.split(' ')[0]}, bạn cần hỗ trợ hay báo lỗi gì?` : "Đăng nhập Google để tham gia thảo luận..."} 
                      value={newQuestion} 
                      onChange={(e) => setNewQuestion(e.target.value)} 
                      disabled={isSubmitting} 
                      className="w-full bg-transparent border-none p-0 text-white text-xl md:text-2xl focus:ring-0 placeholder:text-slate-700 min-h-[120px] resize-none font-medium leading-relaxed" 
                      required 
                    />
                 </div>
              </div>
              
              <div className="flex items-center justify-between pt-6 border-t border-white/5">
                <div className="flex items-center gap-6 text-slate-600">
                   <div className="flex items-center gap-2 hover:text-brand-400 cursor-help transition-colors group/hint">
                      <Icons.Terminal size={22} />
                      <span className="text-[10px] font-black uppercase tracking-tighter opacity-0 group-hover/hint:opacity-100 transition-opacity">Hỗ trợ code</span>
                   </div>
                   <div className="flex items-center gap-2 hover:text-brand-400 cursor-help transition-colors group/hint">
                      <Icons.Link2 size={22} />
                      <span className="text-[10px] font-black uppercase tracking-tighter opacity-0 group-hover/hint:opacity-100 transition-opacity">Hỗ trợ link</span>
                   </div>
                </div>
                <button type="submit" disabled={isSubmitting || !newQuestion.trim()} className="group flex items-center gap-3 px-12 py-5 bg-brand-600 hover:bg-brand-500 text-white rounded-[1.5rem] font-black transition-all transform hover:scale-[1.05] active:scale-95 shadow-xl shadow-brand-600/20 disabled:opacity-50">
                  {isSubmitting ? (
                    <Icons.RefreshCw className="animate-spin" size={20} />
                  ) : (
                    <>
                      <span>Đăng ngay</span>
                      <Icons.Send size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Feed */}
        <div className="space-y-16">
          {displayQuestions.length === 0 ? (
            <div className="text-center py-40 bg-white/5 rounded-[3.5rem] border border-dashed border-white/10 animate-pulse">
               <Icons.MessageSquare size={64} className="mx-auto mb-6 text-slate-800" />
               <p className="text-slate-600 font-black uppercase tracking-[0.2em] text-sm">Chưa có nội dung phù hợp</p>
            </div>
          ) : (
            displayQuestions.map((q) => (
              <div key={q.id} className={`group/card animate-in fade-in slide-in-from-bottom-12 duration-1000 ${q.isPinned ? 'ring-2 ring-brand-500/50 rounded-[3rem] p-6 md:p-10 bg-brand-500/5 shadow-[0_0_60px_rgba(139,92,246,0.1)]' : ''}`} onMouseEnter={() => incrementViews(q.id)}>
                 <div className="flex gap-6 md:gap-8">
                    <div className="flex flex-col items-center">
                      <Avatar user={{ username: q.author, photoURL: q.authorPhoto, isAdmin: q.isAdmin }} isAdmin={q.isAdmin} size="w-14 h-14 md:w-16 md:h-16" />
                      <div className="w-[2.5px] flex-1 bg-gradient-to-b from-white/10 via-white/5 to-transparent my-4 rounded-full"></div>
                    </div>
                    
                    <div className="flex-1 space-y-6 pb-12">
                      <div className="flex justify-between items-start gap-4">
                        <div className="space-y-1.5">
                          <div className="flex items-center gap-3 flex-wrap">
                            <h4 className={`font-black text-xl md:text-2xl tracking-tight transition-colors ${q.isAdmin ? 'text-brand-400 text-glow hover:text-brand-300' : 'text-white hover:text-brand-400'} cursor-pointer`}>{q.author}</h4>
                            {q.isAdmin && <span className="flex items-center gap-1.5 bg-brand-500/10 text-brand-500 text-[10px] px-3.5 py-1.5 rounded-full font-black uppercase tracking-tighter border border-brand-500/20 shadow-lg backdrop-blur-md"><Icons.ShieldCheck size={12} />Verified</span>}
                            {q.isPinned && <div className="flex items-center gap-1 bg-white/5 px-2.5 py-1.5 rounded-xl border border-white/5"><Icons.Paperclip size={16} className="text-brand-400 animate-bounce" /><span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Ghim</span></div>}
                            <span className="text-[11px] text-slate-600 font-bold uppercase tracking-widest ml-1">{formatRelativeTime(q.timestamp)}</span>
                          </div>
                          <div className="flex items-center gap-5 text-[10px] font-black text-slate-700 uppercase tracking-[0.15em]">
                             <span className="flex items-center gap-1.5"><Icons.Eye size={14} className="text-slate-800" /> {q.viewCount || 0} views</span>
                             <span className="flex items-center gap-1.5 text-red-500/40 hover:text-red-500 cursor-pointer transition-colors group/report" onClick={() => reportContent(q.id)}><Icons.Flag size={12} className="group-hover/report:animate-pulse" /> Report</span>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2 opacity-0 group-hover/card:opacity-100 transition-all transform translate-x-4 group-hover/card:translate-x-0">
                          {currentUser?.isAdmin && <button onClick={() => updateDoc(doc(db, "questions", q.id), { isPinned: !q.isPinned })} className={`p-3 rounded-2xl border transition-all ${q.isPinned ? 'text-brand-500 bg-brand-500/10 border-brand-500/20' : 'text-slate-600 border-white/5 hover:bg-white/5'}`} title="Ghim"><Icons.Paperclip size={20} /></button>}
                          {(currentUser?.isAdmin || currentUser?.uid === q.authorId) && (
                            <div className="flex bg-slate-900/80 backdrop-blur-xl border border-white/5 rounded-2xl p-1.5 shadow-2xl">
                              <button onClick={() => {setEditingId(q.id); setEditContent(q.content);}} className="p-3 text-slate-500 hover:text-white transition-all rounded-xl hover:bg-white/5"><Icons.Settings size={20} /></button>
                              <button onClick={() => deleteQuestion(q.id)} className="p-3 text-slate-500 hover:text-red-500 transition-all rounded-xl hover:bg-red-500/10"><Icons.Trash2 size={20} /></button>
                            </div>
                          )}
                        </div>
                      </div>

                      {editingId === q.id ? (
                        <div className="space-y-5 animate-in zoom-in-95 duration-300">
                          <textarea value={editContent} onChange={e => setEditContent(e.target.value)} className="w-full bg-slate-900/80 border border-white/10 rounded-[2rem] p-10 text-white text-xl focus:border-brand-500/30 outline-none shadow-2xl" />
                          <div className="flex gap-4"><button onClick={() => saveEdit(q.id)} className="px-10 py-4 bg-brand-600 text-white rounded-[1.2rem] font-black shadow-2xl shadow-brand-600/30 active:scale-95 transition-all">Lưu thay đổi</button><button onClick={() => setEditingId(null)} className="px-10 py-4 bg-white/5 text-slate-400 rounded-[1.2rem] font-black hover:bg-white/10 transition-all">Hủy</button></div>
                        </div>
                      ) : (
                        <SmartContent content={q.content} className="text-slate-200 text-lg md:text-2xl leading-relaxed font-medium bg-slate-900/30 rounded-[2.5rem] p-10 md:p-12 border border-white/5 shadow-inner hover:bg-slate-900/40 transition-colors backdrop-blur-sm" />
                      )}

                      <div className="flex items-center gap-12 px-6">
                         <button onClick={() => toggleLikeQuestion(q)} className={`flex items-center gap-3 font-black text-sm transition-all transform active:scale-75 ${q.likedBy?.includes(currentUser?.uid || '') ? 'text-brand-500 scale-110' : 'text-slate-600 hover:text-slate-400'}`}>
                           <Icons.ThumbsUp size={24} fill={q.likedBy?.includes(currentUser?.uid || '') ? 'currentColor' : 'none'} className="transition-transform group-active:rotate-12" /> 
                           <span className="text-lg">{q.likedBy?.length || 0}</span>
                         </button>
                         <button onClick={() => setReplyingTo({qId: q.id, name: q.author})} className="flex items-center gap-3 text-slate-600 hover:text-brand-400 font-black text-sm transition-all group/replybtn">
                           <Icons.MessageSquareReply size={24} className="group-hover/replybtn:-translate-y-1 transition-transform" /> 
                           <span className="text-lg">{q.replies?.length || 0}</span>
                         </button>
                         <button onClick={() => {
                           navigator.clipboard.writeText(`${window.location.origin}${window.location.pathname}#community`);
                           triggerToast('Đã sao chép liên kết!');
                         }} className="flex items-center gap-3 text-slate-600 hover:text-white font-black text-sm transition-all transform active:scale-90">
                           <Icons.Link2 size={24} />
                           <span className="hidden sm:inline uppercase tracking-widest text-[10px]">Chia sẻ</span>
                         </button>
                      </div>

                      {/* Replies Container */}
                      <div className="space-y-12 pt-12 border-l-2 border-white/5 ml-4 md:ml-8 pl-10 md:pl-16 relative">
                        {q.replies?.map((r) => (
                          <div key={r.id} className="flex gap-6 group/reply animate-in fade-in slide-in-from-left-8 duration-700">
                            <Avatar user={{ username: r.author, photoURL: r.authorPhoto, isAdmin: r.isAdmin }} isAdmin={r.isAdmin} size="w-12 h-12 md:w-14 md:h-14" />
                            <div className="flex-1 space-y-5">
                              <div className={`rounded-[2.2rem] p-8 md:p-10 border transition-all shadow-xl backdrop-blur-md ${
                                r.isAdmin 
                                  ? 'bg-brand-500/10 border-brand-500/30 shadow-[0_20px_50px_rgba(139,92,246,0.1)]' 
                                  : 'bg-slate-900/60 border-white/5'
                              }`}>
                                 <div className="flex justify-between items-center mb-4">
                                   <div className="flex items-center gap-3 flex-wrap">
                                     <span className={`font-black text-lg ${r.isAdmin ? 'text-brand-400 text-glow' : 'text-white'}`}>{r.author} {r.isAdmin && <Icons.CheckCircle2 size={16} className="text-brand-500 inline" />}</span>
                                     {r.replyToName && <span className="text-[10px] md:text-[11px] text-brand-400/80 font-black bg-brand-500/5 px-3 py-1.5 rounded-full uppercase tracking-widest flex items-center gap-2 border border-brand-500/10 shadow-sm"><Icons.ArrowRight size={12} /> {r.replyToName}</span>}
                                     <span className="text-[10px] md:text-[11px] text-slate-700 font-bold uppercase tracking-widest ml-2">{formatRelativeTime(r.timestamp)}</span>
                                   </div>
                                   <div className="flex items-center gap-1 opacity-0 group-hover/reply:opacity-100 transition-opacity">
                                     {(currentUser?.isAdmin || currentUser?.uid === r.authorId) && (
                                       <div className="flex bg-black/20 rounded-xl p-1 border border-white/5">
                                         <button onClick={() => {setEditingReplyId(r.id); setEditContent(r.content);}} className="p-2 text-slate-600 hover:text-white rounded-lg transition-all"><Icons.Settings size={18} /></button>
                                         <button onClick={() => deleteReply(q.id, r.id)} className="p-2 text-slate-600 hover:text-red-500 rounded-lg transition-all"><Icons.Trash2 size={18} /></button>
                                       </div>
                                     )}
                                   </div>
                                 </div>
                                 {editingReplyId === r.id ? (
                                   <div className="space-y-5 animate-in zoom-in-95 duration-200">
                                     <textarea autoFocus value={editContent} onChange={e => setEditContent(e.target.value)} className="w-full bg-slate-950 border border-white/10 rounded-2xl p-6 text-white text-lg focus:border-brand-500/30 outline-none shadow-inner" />
                                     <div className="flex gap-3"><button onClick={() => saveReplyEdit(q.id, r.id)} className="px-8 py-3 bg-brand-600 text-white rounded-xl font-black shadow-xl">Lưu thay đổi</button><button onClick={() => setEditingReplyId(null)} className="px-8 py-3 bg-white/5 text-slate-400 rounded-xl font-black">Hủy</button></div>
                                   </div>
                                 ) : <SmartContent content={r.content} className={`${r.isAdmin ? 'text-slate-100' : 'text-slate-300'} text-base md:text-lg leading-relaxed font-medium`} />}
                              </div>
                              <div className="flex gap-10 px-6">
                                 <button onClick={() => toggleLikeReply(q.id, r.id)} className={`text-[11px] font-black uppercase flex items-center gap-2.5 transition-all transform active:scale-75 ${r.likedBy?.includes(currentUser?.uid || '') ? 'text-brand-500 scale-110' : 'text-slate-600 hover:text-slate-400'}`}>
                                   <Icons.ThumbsUp size={18} fill={r.likedBy?.includes(currentUser?.uid || '') ? 'currentColor' : 'none'} /> {r.likedBy?.length || 0}
                                 </button>
                                 <button onClick={() => setReplyingTo({qId: q.id, rId: r.id, name: r.author})} className="text-[11px] font-black text-slate-600 hover:text-brand-400 uppercase transition-all transform active:scale-95">Trả lời</button>
                                 <button onClick={() => reportContent(q.id)} className="text-[11px] font-black text-slate-700 hover:text-yellow-500 uppercase transition-all opacity-0 group-hover/reply:opacity-100">Báo cáo</button>
                              </div>
                            </div>
                          </div>
                        ))}
                        
                        {/* Final Nested Reply Input */}
                        {replyingTo?.qId === q.id && (
                          <div className="flex gap-6 pt-10 animate-in slide-in-from-top-6 duration-500">
                             <Avatar user={{ username: currentUser?.username || 'User', photoURL: currentUser?.photoURL, isAdmin: currentUser?.isAdmin }} isAdmin={currentUser?.isAdmin} size="w-12 h-12 md:w-14 md:h-14" />
                             <div className="flex-1 space-y-6">
                                <div className="flex items-center gap-4">
                                   <span className="text-[11px] font-black text-slate-500 uppercase tracking-[0.25em] bg-white/5 px-4 py-2 rounded-2xl border border-white/5">Đang phản hồi <span className="text-brand-400 ml-2">@{replyingTo.name}</span></span>
                                </div>
                                <textarea autoFocus value={replyContent} onChange={(e) => setReplyContent(e.target.value)} placeholder={`Gửi câu trả lời chuyên nghiệp của bạn...`} className="w-full bg-slate-900 border border-white/5 rounded-[2.5rem] py-8 px-10 text-white text-lg md:text-xl focus:outline-none focus:border-brand-500/30 min-h-[150px] resize-none shadow-[0_30px_80px_rgba(0,0,0,0.5)] backdrop-blur-3xl" />
                                <div className="flex gap-5"><button onClick={() => handleReply(q.id)} className="px-12 py-5 bg-brand-600 hover:bg-brand-500 text-white rounded-[1.5rem] font-black text-sm shadow-2xl shadow-brand-600/40 transition-all transform hover:scale-105 active:scale-95">Gửi phản hồi</button><button onClick={() => {setReplyingTo(null); setReplyContent('');}} className="px-12 py-5 bg-white/5 text-slate-400 rounded-[1.5rem] font-black text-sm hover:bg-white/10 transition-all transform hover:scale-105 active:scale-95">Hủy bỏ</button></div>
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
            <div className="text-center pt-24 pb-40">
               <button onClick={() => setPostsLimit(prev => prev + POSTS_PER_PAGE)} className="group px-14 py-7 bg-slate-900 border border-white/10 text-white rounded-[2.5rem] font-black text-base transition-all transform hover:scale-[1.03] active:scale-95 flex items-center gap-5 mx-auto shadow-[0_40px_100px_rgba(0,0,0,0.6)] border-b-brand-500/50 border-b-2">
                  <span className="tracking-[0.3em] uppercase ml-2">Tải thêm nội dung</span>
                  <Icons.ChevronDown size={28} className="group-hover:translate-y-2 transition-transform text-brand-500" />
               </button>
            </div>
          )}
        </div>
      </main>

      {/* Auth & Other Modals remain same but with enhanced design */}
      {showAuthModal && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-6">
          <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-3xl" onClick={() => setShowAuthModal(false)}></div>
          <div className="relative w-full max-w-sm bg-slate-900 rounded-[4.5rem] p-16 border border-white/10 shadow-[0_0_150px_rgba(0,0,0,0.7)] animate-in zoom-in-95">
            <button onClick={() => setShowAuthModal(false)} className="absolute top-12 right-12 text-slate-600 hover:text-white p-2 transition-colors"><Icons.X size={32} /></button>
            <div className="text-center mb-16">
               <div className="w-28 h-28 bg-gradient-to-br from-brand-500/20 to-purple-500/20 rounded-[2.5rem] flex items-center justify-center mx-auto mb-12 text-brand-400 shadow-3xl border border-white/5 ring-1 ring-white/10"><Icons.User size={56} /></div>
               <h3 className="text-4xl font-black text-white tracking-tighter leading-tight mb-4 italic">Tham gia thảo luận</h3>
               <p className="text-slate-500 text-base font-medium leading-relaxed uppercase tracking-widest text-[10px]">Cộng đồng PHTV Việt Nam</p>
            </div>
            <button onClick={handleGoogleLogin} className="w-full py-7 bg-white text-slate-950 rounded-[2rem] font-black text-xl flex items-center justify-center gap-5 transition-all transform hover:scale-[1.03] active:scale-95 shadow-[0_30px_60px_rgba(255,255,255,0.1)]">
               <svg className="w-8 h-8" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
               Đăng nhập ngay
            </button>
          </div>
        </div>
      )}

      {/* Name Choice Modal */}
      {showNamePrompt && (
        <div className="fixed inset-0 z-[250] flex items-center justify-center p-6">
          <div className="absolute inset-0 bg-slate-950/95 backdrop-blur-3xl"></div>
          <div className="relative w-full max-w-lg bg-slate-900 rounded-[4.5rem] p-16 border border-white/10 shadow-3xl animate-in zoom-in-95">
            <div className="text-center mb-14">
               <h3 className="text-4xl font-black text-white tracking-tighter mb-4 italic">Danh tính cộng đồng</h3>
               <p className="text-slate-500 text-base font-medium leading-relaxed">Chọn một tên hiển thị thật ấn tượng để bắt đầu thảo luận cùng mọi người</p>
            </div>
            <input type="text" value={tempUsername} onChange={e => setTempUsername(e.target.value)} className="w-full bg-slate-950 border border-white/10 rounded-[2rem] py-7 px-10 text-white font-black mb-12 text-center text-3xl focus:border-brand-500/50 outline-none transition-all shadow-inner" placeholder="Tên của bạn..." />
            <button onClick={handleUpdateName} className="w-full py-7 bg-brand-600 hover:bg-brand-500 text-white rounded-[2.2rem] font-black text-xl shadow-2xl shadow-brand-600/40 active:scale-95 transition-all transform hover:scale-[1.03]">Hoàn tất thiết lập</button>
          </div>
        </div>
      )}

      {/* Toast Notification */}
      {showToast.show && (
        <div className="fixed bottom-14 left-1/2 -translate-x-1/2 z-[300] animate-in slide-in-from-bottom-12 fade-in duration-500">
          <div className="bg-white text-slate-950 px-14 py-7 rounded-[3rem] font-black shadow-[0_40px_100px_rgba(255,255,255,0.35)] flex items-center gap-6 border border-white/20">
             <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center text-white shadow-2xl shadow-green-500/50"><Icons.Check size={28} /></div>
             <span className="tracking-tight text-2xl italic">{showToast.message}</span>
          </div>
        </div>
      )}
    </div>
  );
};
