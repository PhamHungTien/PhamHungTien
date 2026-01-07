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
  limit
} from 'firebase/firestore';

interface User {
  uid: string;
  username: string;
  isAdmin: boolean;
  email: string;
}

interface Reply {
  id: string;
  parentId?: string;
  replyToName?: string;
  authorId: string;
  author: string;
  content: string;
  timestamp: number;
  isAdmin: boolean;
  likedBy: string[];
}

interface Question {
  id: string;
  authorId: string;
  author: string;
  content: string;
  timestamp: number;
  replies: Reply[];
  likedBy: string[];
  isPinned?: boolean;
  isReported?: boolean;
  isAdmin?: boolean;
}

const ADMIN_EMAILS = ['admin@phtv.com', 'hungtien10a7@gmail.com'];
const POSTS_PER_PAGE = 10;

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
  if (minutes < 60) return `${minutes} phút trước`;
  if (hours < 24) return `${hours} giờ trước`;
  if (days < 7) return `${days} ngày trước`;
  return new Date(timestamp).toLocaleDateString('vi-VN');
};

const SmartContent: React.FC<{ content: string, className?: string }> = ({ content, className }) => {
  // Regex for code blocks and mentions
  const parts = content.split(/(`[^`]+`|@[a-zA-Z0-9_]+)/g);
  return (
    <div className={className}>
      {parts.map((part, i) => {
        if (part.startsWith('`') && part.endsWith('`')) {
          return <code key={i} className="bg-white/10 px-1.5 py-0.5 rounded text-brand-300 font-mono text-[0.9em]">{part.slice(1, -1)}</code>;
        }
        if (part.startsWith('@')) {
          return <span key={i} className="text-brand-400 font-bold hover:underline cursor-pointer">{part}</span>;
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
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const isAdmin = ADMIN_EMAILS.includes(user.email || '');
        setCurrentUser({
          uid: user.uid,
          username: user.email === 'hungtien10a7@gmail.com' ? 'Phạm Hùng Tiến' : (user.displayName || user.email?.split('@')[0] || 'User'),
          email: user.email || '',
          isAdmin: isAdmin
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
      alert('Lỗi: ' + err.message);
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
      alert('Vui lòng đợi 10 giây giữa mỗi lần đăng bài.');
      return;
    }

    setIsSubmitting(true);
    try {
      await addDoc(collection(db, "questions"), {
        authorId: currentUser.uid,
        author: currentUser.username,
        content: newQuestion,
        timestamp: Date.now(),
        replies: [],
        likedBy: [],
        isPinned: false,
        isReported: false,
        isAdmin: currentUser.isAdmin
      });
      setNewQuestion('');
      setLastPostTime(Date.now());
      triggerToast('Đăng bài thành công!');
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
    const newReply: Reply = {
      id: Date.now().toString(),
      parentId: replyingTo.rId || qId,
      replyToName: replyingTo.name,
      authorId: currentUser.uid,
      author: currentUser.isAdmin ? 'PHTV Admin' : currentUser.username,
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
    if (!window.confirm('Xóa bài viết này?')) return;
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

  const reportContent = async (qId: string, rId?: string) => {
    if (!window.confirm('Báo cáo nội dung này?')) return;
    const questionRef = doc(db, "questions", qId);
    await updateDoc(questionRef, { isReported: true });
    triggerToast('Cảm ơn bạn đã báo cáo!');
  };

  return (
    <section id="qa" className="py-24 bg-slate-950/40 relative overflow-hidden border-t border-white/5 scroll-mt-24" ref={scrollRef}>
      <div className="max-w-4xl mx-auto px-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="space-y-4">
             <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-400 text-xs font-bold uppercase tracking-widest">PHTV Community</div>
             <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter italic">Hỏi đáp <span className="text-brand-500">&</span> Thảo luận</h2>
          </div>
          <div className="flex items-center gap-3">
            {currentUser ? (
              <div className="flex items-center gap-3 p-1.5 pr-4 bg-white/5 rounded-2xl border border-white/10 group">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-white shadow-lg transition-transform group-hover:scale-105 ${currentUser.isAdmin ? 'bg-brand-500 shadow-brand-500/30' : 'bg-slate-700'}`}>
                   {currentUser.isAdmin ? <Icons.Shield size={20} /> : <span className="font-black">{getInitials(currentUser.username)}</span>}
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-black text-white flex items-center gap-1">{currentUser.username} {currentUser.isAdmin && <Icons.CheckCircle2 size={10} className="text-brand-400" />}</span>
                  <div className="flex gap-2">
                    <button onClick={() => {setTempUsername(currentUser.username); setShowNamePrompt(true);}} className="text-[9px] font-black text-brand-400 hover:text-white uppercase">Sửa tên</button>
                    <button onClick={() => signOut(auth)} className="text-[9px] font-black text-red-500 hover:text-white uppercase">Thoát</button>
                  </div>
                </div>
              </div>
            ) : (
              <button onClick={() => setShowAuthModal(true)} className="group flex items-center gap-3 px-6 py-3 bg-white text-slate-950 rounded-2xl transition-all transform hover:scale-105 active:scale-95 font-black text-sm shadow-xl shadow-white/5">
                <Icons.User size={18} />
                <span>Đăng nhập Google</span>
              </button>
            )}
          </div>
        </div>

        {/* Toolbar */}
        <div className="flex flex-col gap-6 mb-12">
           <div className="relative group">
              <Icons.Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-brand-500 transition-colors" size={20} />
              <input 
                type="text" 
                placeholder="Tìm kiếm nội dung thảo luận..." 
                value={searchQuery}
                onChange={e => setSearchBy(e.target.value)}
                className="w-full bg-slate-900/50 border border-white/5 rounded-2xl py-4 pl-14 pr-6 text-white focus:outline-none focus:border-brand-500/30 transition-all text-lg shadow-inner"
              />
           </div>
           
           <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex bg-white/5 p-1 rounded-xl border border-white/5 shadow-lg">
                 {[ 
                   { id: 'newest', label: 'Mới nhất', icon: Icons.RefreshCw },
                   { id: 'popular', label: 'Yêu thích', icon: Icons.Heart }
                 ].map(tab => (
                   <button key={tab.id} onClick={() => setSortBy(tab.id as any)} className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${sortBy === tab.id ? 'bg-white text-slate-950 shadow-xl scale-105' : 'text-slate-500 hover:text-white'}`}>
                     <tab.icon size={12} />
                     {tab.label}
                   </button>
                 ))}
              </div>

              <div className="flex items-center gap-2">
                 <Icons.Filter size={14} className="text-slate-600" />
                 <select 
                   value={filterBy} 
                   onChange={e => setFilterBy(e.target.value as any)}
                   className="bg-transparent text-slate-400 font-bold text-xs uppercase tracking-tighter focus:outline-none cursor-pointer hover:text-white"
                 >
                    <option value="all" className="bg-slate-900">Tất cả</option>
                    <option value="mine" className="bg-slate-900">Của tôi</option>
                    {currentUser?.isAdmin && <option value="reported" className="bg-slate-900 text-red-400 font-black">Báo cáo (!) </option>}
                 </select>
              </div>
           </div>
        </div>

        {/* Post Form */}
        <div className="glass-panel rounded-[2.5rem] p-1.5 mb-16 shadow-2xl border border-white/5 overflow-hidden group">
          <div className="bg-slate-900/40 rounded-[2.2rem] p-8 transition-colors group-focus-within:bg-slate-900/60">
            <form onSubmit={handleAskQuestion} className="space-y-6">
              <textarea 
                placeholder={currentUser ? "Bạn có thắc mắc hay góp ý gì cho PHTV?" : "Vui lòng đăng nhập Google để thảo luận..."} 
                value={newQuestion} 
                onChange={(e) => setNewQuestion(e.target.value)} 
                disabled={isSubmitting} 
                className="w-full bg-transparent border-none p-0 text-white text-xl focus:ring-0 placeholder:text-slate-700 min-h-[100px] resize-none" 
                required 
              />
              <div className="flex items-center justify-between pt-4 border-t border-white/5">
                <div className="flex items-center gap-4 text-slate-600">
                   <Icons.AtSign size={18} className="hover:text-brand-500 cursor-help" title="Hỗ trợ @mention" />
                   <Icons.Terminal size={18} className="hover:text-brand-500 cursor-help" title="Hỗ trợ `code` blocks" />
                </div>
                <button type="submit" disabled={isSubmitting || !newQuestion.trim()} className="flex items-center gap-3 px-10 py-4 bg-brand-600 hover:bg-brand-500 text-white rounded-2xl font-black transition-all transform hover:scale-[1.02] active:scale-95 shadow-xl shadow-brand-600/20 disabled:opacity-50">
                  {isSubmitting ? <Icons.RefreshCw className="animate-spin" size={18} /> : <><span>Đăng bài</span><Icons.Send size={18} /></>}
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Feed */}
        <div className="space-y-12">
          {displayQuestions.length === 0 ? (
            <div className="text-center py-32 bg-white/5 rounded-[3rem] border border-dashed border-white/10 opacity-50">
               <Icons.MessageSquare size={48} className="mx-auto mb-4 text-slate-700" />
               <p className="text-slate-500 font-black uppercase tracking-widest text-xs">Không có dữ liệu phù hợp</p>
            </div>
          ) : (
            displayQuestions.map((q) => (
              <div key={q.id} className={`group animate-in fade-in slide-in-from-bottom-8 duration-700 ${q.isPinned ? 'ring-2 ring-brand-500/50 rounded-[2.5rem] p-6 bg-brand-500/5' : ''}`}>
                 <div className="flex gap-4 md:gap-6">
                    <div className="flex flex-col items-center">
                      <div className={`w-12 h-12 md:w-14 md:h-14 rounded-[1.3rem] flex items-center justify-center text-white font-black text-xl shadow-2xl transition-all duration-500 group-hover:scale-105 ${ 
                        q.isAdmin 
                          ? 'bg-gradient-to-br from-brand-400 via-brand-600 to-purple-600 ring-2 ring-brand-400/50 shadow-[0_0_25px_rgba(245,158,11,0.3)]' 
                          : q.isPinned ? 'bg-brand-500' : 'bg-slate-800'
                      }`}>
                        {getInitials(q.author)}
                      </div>
                      <div className="w-[2px] flex-1 bg-gradient-to-b from-white/10 to-transparent my-3"></div>
                    </div>
                    <div className="flex-1 space-y-5 pb-12">
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="flex items-center gap-2 flex-wrap">
                            <h4 className={`font-black text-lg tracking-tight ${q.isAdmin ? 'text-brand-400 text-glow' : 'text-white'}`}>{q.author}</h4>
                            {q.isAdmin && <span className="flex items-center gap-1 bg-brand-500/10 text-brand-500 text-[9px] px-2 py-0.5 rounded-full font-black uppercase tracking-tighter border border-brand-500/20"><Icons.Shield size={10} />Official</span>}
                            {q.isPinned && <Icons.Paperclip size={14} className="text-brand-400" />}
                            <span className="text-[10px] text-slate-600 font-bold uppercase">{formatRelativeTime(q.timestamp)}</span>
                          </div>
                          {q.isReported && <span className="text-[9px] text-red-500 font-black uppercase tracking-widest bg-red-500/10 px-2 py-0.5 rounded-full mt-1 inline-block">Đã bị báo cáo</span>}
                        </div>
                        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          {currentUser?.isAdmin && <button onClick={() => updateDoc(doc(db, "questions", q.id), { isPinned: !q.isPinned })} className={`p-2 rounded-xl hover:bg-white/5 transition-all ${q.isPinned ? 'text-brand-500' : 'text-slate-700'}`}><Icons.Paperclip size={18} /></button>}
                          {(currentUser?.isAdmin || currentUser?.uid === q.authorId) && (
                            <>
                              <button onClick={() => {setEditingId(q.id); setEditContent(q.content);}} className="p-2 text-slate-700 hover:text-white rounded-xl hover:bg-white/5 transition-all"><Icons.Settings size={18} /></button>
                              <button onClick={() => deleteQuestion(q.id)} className="p-2 text-slate-700 hover:text-red-500 rounded-xl hover:bg-red-500/10 transition-all"><Icons.Trash2 size={18} /></button>
                            </>
                          )}
                          <button onClick={() => reportContent(q.id)} className="p-2 text-slate-700 hover:text-yellow-500 rounded-xl hover:bg-white/5 transition-all"><Icons.Flag size={18} /></button>
                        </div>
                      </div>

                      {editingId === q.id ? (
                        <div className="space-y-4 animate-in zoom-in-95 duration-300">
                          <textarea value={editContent} onChange={e => setEditContent(e.target.value)} className="w-full bg-slate-900 border border-white/10 rounded-2xl p-6 text-white focus:outline-none focus:border-brand-500/30" />
                          <div className="flex gap-3"><button onClick={() => saveEdit(q.id)} className="px-6 py-2.5 bg-brand-600 text-white rounded-xl text-xs font-black shadow-lg shadow-brand-600/20">Lưu thay đổi</button><button onClick={() => setEditingId(null)} className="px-6 py-2.5 bg-white/5 text-slate-400 rounded-xl text-xs font-black">Hủy</button></div>
                        </div>
                      ) : (
                        <SmartContent content={q.content} className="text-slate-300 text-lg leading-relaxed" />
                      )}

                      <div className="flex items-center gap-8 px-1">
                         <button onClick={() => toggleLikeQuestion(q)} className={`flex items-center gap-2 font-black text-sm transition-all transform active:scale-90 ${q.likedBy?.includes(currentUser?.uid || '') ? 'text-brand-500' : 'text-slate-600 hover:text-slate-400'}`}>
                           <Icons.ThumbsUp size={18} fill={q.likedBy?.includes(currentUser?.uid || '') ? 'currentColor' : 'none'} className="transition-transform group-active:scale-125" /> 
                           <span>{q.likedBy?.length || 0}</span>
                         </button>
                         <button onClick={() => setReplyingTo({qId: q.id, name: q.author})} className="flex items-center gap-2 text-slate-600 hover:text-brand-400 font-black text-sm transition-all">
                           <Icons.MessageSquareReply size={18} /> 
                           <span>{q.replies?.length || 0} Phản hồi</span>
                         </button>
                         <button onClick={() => {
                           navigator.clipboard.writeText(`${window.location.origin}${window.location.pathname}#qa`);
                           triggerToast('Đã sao chép liên kết cộng đồng!');
                         }} className="flex items-center gap-2 text-slate-600 hover:text-white font-black text-sm transition-all">
                           <Icons.Share2 size={18} />
                         </button>
                      </div>

                      {/* Replies */}
                      <div className="space-y-8 pt-8 border-l-2 border-white/5 ml-2 pl-6 md:pl-10">
                        {q.replies?.map((r) => (
                          <div key={r.id} className="flex gap-4 md:gap-6 group/reply animate-in fade-in slide-in-from-left-4 duration-500">
                            <div className={`w-10 h-10 md:w-12 md:h-12 rounded-[1.1rem] flex items-center justify-center text-white font-black text-sm shrink-0 shadow-lg transition-transform group-hover/reply:scale-105 ${
                              r.isAdmin ? 'bg-gradient-to-br from-brand-500 to-purple-600 ring-1 ring-brand-400/50' : 'bg-slate-800'
                            }`}>
                              {getInitials(r.author)}
                            </div>
                            <div className="flex-1 space-y-3">
                              <div className={`rounded-[1.5rem] p-5 md:p-6 border transition-all ${
                                r.isAdmin 
                                  ? 'bg-brand-500/10 border-brand-500/30 shadow-[0_10px_30px_rgba(245,158,11,0.05)]' 
                                  : 'bg-slate-900/80 border-white/10'
                              }`}>
                                 <div className="flex justify-between items-center mb-2">
                                   <div className="flex items-center gap-3 flex-wrap">
                                     <span className={`font-black text-sm md:text-base ${r.isAdmin ? 'text-brand-400' : 'text-white'}`}>
                                       {r.author} 
                                       {r.isAdmin && <Icons.CheckCircle2 size={14} className="text-brand-500 inline ml-1" />}
                                     </span>
                                     {r.replyToName && (
                                       <span className="text-[10px] md:text-xs text-slate-500 flex items-center gap-1.5 font-black bg-white/5 px-2 py-1 rounded-full uppercase tracking-tighter">
                                         <Icons.ArrowRight size={10} />
                                         {r.replyToName}
                                       </span>
                                     )}
                                     <span className="text-[10px] md:text-xs text-slate-600 font-bold uppercase">{formatRelativeTime(r.timestamp)}</span>
                                   </div>
                                   <div className="flex items-center gap-1 opacity-0 group-hover/reply:opacity-100 transition-opacity">
                                     {(currentUser?.isAdmin || currentUser?.uid === r.authorId) && (
                                       <>
                                         <button onClick={() => {setEditingReplyId(r.id); setEditContent(r.content);}} className="p-2 text-slate-600 hover:text-white rounded-lg hover:bg-white/5"><Icons.Settings size={14} /></button>
                                         <button onClick={() => deleteReply(q.id, r.id)} className="p-2 text-slate-600 hover:text-red-500 rounded-lg hover:bg-red-500/10"><Icons.Trash2 size={14} /></button>
                                       </>
                                     )}
                                   </div>
                                 </div>
                                 {editingReplyId === r.id ? (
                                   <div className="space-y-3 animate-in zoom-in-95 duration-200">
                                     <textarea value={editContent} onChange={e => setEditContent(e.target.value)} className="w-full bg-slate-950 border border-white/10 rounded-xl p-4 text-sm text-white focus:border-brand-500/30 outline-none" />
                                     <div className="flex gap-2">
                                       <button onClick={() => saveReplyEdit(q.id, r.id)} className="px-5 py-2 bg-brand-600 text-white rounded-xl text-xs font-black shadow-lg">Lưu</button>
                                       <button onClick={() => setEditingReplyId(null)} className="px-5 py-2 bg-white/5 text-slate-400 rounded-xl text-xs font-black">Hủy</button>
                                     </div>
                                   </div>
                                 ) : (
                                   <SmartContent content={r.content} className={`${r.isAdmin ? 'text-slate-100' : 'text-slate-300'} text-sm md:text-base leading-relaxed`} />
                                 )}
                              </div>
                              <div className="flex gap-6 px-3">
                                 <button onClick={() => toggleLikeReply(q.id, r.id)} className={`text-[11px] font-black uppercase flex items-center gap-2 transition-all active:scale-90 ${r.likedBy?.includes(currentUser?.uid || '') ? 'text-brand-500' : 'text-slate-600 hover:text-slate-400'}`}>
                                   <Icons.ThumbsUp size={14} fill={r.likedBy?.includes(currentUser?.uid || '') ? 'currentColor' : 'none'} /> 
                                   <span>{r.likedBy?.length || 0} Thích</span>
                                 </button>
                                 <button onClick={() => setReplyingTo({qId: q.id, rId: r.id, name: r.author})} className="text-[11px] font-black text-slate-600 hover:text-brand-400 uppercase transition-colors">Phản hồi</button>
                                 <button onClick={() => reportContent(q.id, r.id)} className="text-[11px] font-black text-slate-700 hover:text-yellow-500 uppercase">Báo cáo</button>
                              </div>
                            </div>
                          </div>
                        ))}
                        {replyingTo?.qId === q.id && (
                          <div className="flex gap-4 pt-4 animate-in slide-in-from-top-2 duration-300">
                             <div className="w-10 h-10 rounded-xl bg-brand-500/20 flex items-center justify-center text-brand-400 shrink-0 shadow-lg shadow-brand-500/5"><Icons.User size={18} /></div>
                             <div className="flex-1 space-y-4">
                                <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest flex items-center gap-2">Đang trả lời <span className="bg-brand-500/10 text-brand-400 px-2 py-0.5 rounded-full">{replyingTo.name}</span></span>
                                <textarea autoFocus value={replyContent} onChange={(e) => setReplyContent(e.target.value)} placeholder={`Viết phản hồi (hỗ trợ code \\\`...\\\
 và @mention)...`} className="w-full bg-slate-900 border border-white/10 rounded-2xl py-4 px-5 text-white text-sm focus:outline-none focus:border-brand-500/30 min-h-[100px] resize-none shadow-inner" />
                                <div className="flex gap-3"><button onClick={() => handleReply(q.id)} className="px-8 py-3 bg-brand-600 hover:bg-brand-500 text-white rounded-xl text-xs font-black shadow-xl shadow-brand-600/20 transition-all transform hover:scale-105">Gửi phản hồi</button><button onClick={() => {setReplyingTo(null); setReplyContent('');}} className="px-8 py-3 bg-white/5 text-slate-400 rounded-xl text-xs font-black hover:bg-white/10 transition-all">Hủy bỏ</button></div>
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
            <div className="text-center pt-12 pb-24">
               <button onClick={() => setPostsLimit(prev => prev + POSTS_PER_PAGE)} className="group px-10 py-5 bg-slate-900 border border-white/10 text-white rounded-3xl font-black text-sm transition-all transform hover:scale-105 active:scale-95 flex items-center gap-3 mx-auto shadow-2xl">
                  Tải thêm thảo luận
                  <Icons.ChevronDown size={20} className="group-hover:translate-y-1 transition-transform" />
               </button>
            </div>
          )}
        </div>
      </div>

      {/* Auth Modal */}
      {showAuthModal && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-6">
          <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-xl" onClick={() => setShowAuthModal(false)}></div>
          <div className="relative w-full max-w-sm bg-slate-900 rounded-[3.5rem] p-12 border border-white/10 shadow-[0_0_100px_rgba(0,0,0,0.5)] animate-in zoom-in-95">
            <button onClick={() => setShowAuthModal(false)} className="absolute top-10 right-10 text-slate-600 hover:text-white p-2 transition-colors"><Icons.X size={24} /></button>
            <div className="text-center mb-12">
               <div className="w-20 h-20 bg-gradient-to-br from-brand-500/20 to-purple-500/20 rounded-3xl flex items-center justify-center mx-auto mb-8 text-brand-400 shadow-2xl border border-white/5"><Icons.User size={40} /></div>
               <h3 className="text-3xl font-black text-white tracking-tighter">Tham gia thảo luận</h3>
               <p className="text-slate-500 text-sm mt-3 font-medium">Kết nối với cộng đồng người dùng PHTV</p>
            </div>
            <button onClick={handleGoogleLogin} className="w-full py-5 bg-white text-slate-950 rounded-2xl font-black text-lg flex items-center justify-center gap-4 transition-all transform hover:scale-[1.02] active:scale-95 shadow-[0_20px_40px_rgba(255,255,255,0.1)]">
               <svg className="w-6 h-6" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
               Tiếp tục với Google
            </button>
          </div>
        </div>
      )}

      {/* Name Choice Modal */}
      {showNamePrompt && (
        <div className="fixed inset-0 z-[250] flex items-center justify-center p-6">
          <div className="absolute inset-0 bg-slate-950/95 backdrop-blur-3xl"></div>
          <div className="relative w-full max-w-md bg-slate-900 rounded-[3.5rem] p-12 border border-white/10 shadow-2xl animate-in zoom-in-95">
            <div className="text-center mb-10">
               <h3 className="text-3xl font-black text-white tracking-tighter">Tên hiển thị cộng đồng</h3>
               <p className="text-slate-500 text-sm mt-3 font-medium">Bạn muốn mọi người gọi mình là gì?</p>
            </div>
            <input type="text" value={tempUsername} onChange={e => setTempUsername(e.target.value)} className="w-full bg-slate-950 border border-white/10 rounded-2xl py-5 px-8 text-white font-black mb-8 text-center text-xl focus:border-brand-500/50 outline-none transition-all shadow-inner" placeholder="Nhập tên của bạn" />
            <button onClick={handleUpdateName} className="w-full py-5 bg-brand-600 hover:bg-brand-500 text-white rounded-2xl font-black text-lg shadow-xl shadow-brand-600/30 active:scale-95 transition-all transform hover:scale-[1.02]">Hoàn tất thiết lập</button>
          </div>
        </div>
      )}

      {/* Toast Notification */}
      {showToast.show && (
        <div className="fixed bottom-12 left-1/2 -translate-x-1/2 z-[300] animate-in slide-in-from-bottom-12 fade-in duration-500">
          <div className="bg-white text-slate-950 px-10 py-5 rounded-[2rem] font-black shadow-[0_25px_60px_rgba(255,255,255,0.25)] flex items-center gap-4 border border-white/20">
             <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white shadow-lg shadow-green-500/40"><Icons.Check size={18} /></div>
             <span className="tracking-tight text-lg">{showToast.message}</span>
          </div>
        </div>
      )}
    </section>
  );
};
