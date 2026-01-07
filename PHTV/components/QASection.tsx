import React, { useState, useEffect, useMemo } from 'react';
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
  startAfter,
  QueryDocumentSnapshot,
  DocumentData
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

// Helper to render content with basic markdown (code blocks)
const SmartContent: React.FC<{ content: string, className?: string }> = ({ content, className }) => {
  const parts = content.split(/(`[^`]+`)/g);
  return (
    <div className={className}>
      {parts.map((part, i) => {
        if (part.startsWith('`') && part.endsWith('`')) {
          return <code key={i} className="bg-white/10 px-1.5 py-0.5 rounded text-brand-300 font-mono text-[0.9em]">{part.slice(1, -1)}</code>;
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
  const [searchQuery, setSearchBy] = useState('');
  
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showNamePrompt, setShowNamePrompt] = useState(false);
  const [tempUsername, setTempUsername] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [lastPostTime, setLastPostTime] = useState(0);
  const [showToast, setShowToast] = useState(false);
  const [postsLimit, setPostsLimit] = useState(POSTS_PER_PAGE);
  const [hasMore, setHasMore] = useState(true);
  
  const [replyingTo, setReplyingTo] = useState<{qId: string, rId?: string, name?: string} | null>(null);
  const [replyContent, setReplyContent] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingReplyId, setEditingReplyId] = useState<string | null>(null);
  const [editContent, setEditContent] = useState('');

  // Listen to Auth state
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

  // Listen to Firestore Questions (Real-time with Limit)
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
      
      // Separate pinned and non-pinned
      const pinned = qList.filter(q => q.isPinned);
      const others = qList.filter(q => !q.isPinned);
      setQuestions([...pinned, ...others]);
      setHasMore(snapshot.docs.length >= postsLimit);
    });
    return () => unsubscribe();
  }, [sortBy, postsLimit]);

  const filteredQuestions = useMemo(() => {
    if (!searchQuery.trim()) return questions;
    const lowSearch = searchQuery.toLowerCase();
    return questions.filter(q => 
      q.content.toLowerCase().includes(lowSearch) || 
      q.author.toLowerCase().includes(lowSearch) ||
      q.replies.some(r => r.content.toLowerCase().includes(lowSearch))
    );
  }, [questions, searchQuery]);

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
      alert('Lỗi đăng nhập Google: ' + err.message);
    }
  };

  const handleUpdateName = async () => {
    if (!tempUsername.trim()) return;
    if (auth.currentUser) {
      await updateProfile(auth.currentUser, { displayName: tempUsername });
      setCurrentUser(prev => prev ? { ...prev, username: tempUsername } : null);
      setShowNamePrompt(false);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
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
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    } catch (err) {
      alert('Lỗi khi đăng bài!');
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
  };

  const deleteReply = async (qId: string, rId: string) => {
    if (!window.confirm('Xóa phản hồi này?')) return;
    const questionRef = doc(db, "questions", qId);
    const snap = await getDoc(questionRef);
    if (!snap.exists()) return;
    const updatedReplies = (snap.data() as Question).replies.filter(r => r.id !== rId);
    await updateDoc(questionRef, { replies: updatedReplies });
  };

  const saveEdit = async (id: string) => {
    if (!editContent.trim()) return;
    await updateDoc(doc(db, "questions", id), { content: editContent });
    setEditingId(null);
  };

  const saveReplyEdit = async (qId: string, rId: string) => {
    if (!editContent.trim()) return;
    const questionRef = doc(db, "questions", qId);
    const snap = await getDoc(questionRef);
    if (!snap.exists()) return;
    const updatedReplies = (snap.data() as Question).replies.map(r => r.id === rId ? { ...r, content: editContent } : r);
    await updateDoc(questionRef, { replies: updatedReplies });
    setEditingReplyId(null);
  };

  return (
    <section id="qa" className="py-24 bg-slate-950/40 relative overflow-hidden border-t border-white/5">
      <div className="max-w-4xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="space-y-4">
             <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-400 text-xs font-bold uppercase tracking-widest">Community</div>
             <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter">Cộng đồng <span className="text-brand-500">PHTV</span></h2>
          </div>
          <div className="flex items-center gap-3">
            {currentUser ? (
              <div className="flex items-center gap-3 p-1 pr-4 bg-white/5 rounded-2xl border border-white/10 group">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-white shadow-lg ${currentUser.isAdmin ? 'bg-brand-500' : 'bg-slate-700'}`}>
                   {currentUser.isAdmin ? <Icons.Shield size={20} /> : <span className="font-bold">{getInitials(currentUser.username)}</span>}
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-white">{currentUser.username}</span>
                  <div className="flex gap-2">
                    <button onClick={() => {setTempUsername(currentUser.username); setShowNamePrompt(true);}} className="text-[10px] text-brand-400 font-bold hover:underline opacity-0 group-hover:opacity-100 transition-opacity uppercase">Sửa tên</button>
                    <button onClick={() => signOut(auth)} className="text-[10px] text-red-400 font-bold hover:underline opacity-0 group-hover:opacity-100 transition-opacity uppercase">Đăng xuất</button>
                  </div>
                </div>
              </div>
            ) : (
              <button onClick={() => setShowAuthModal(true)} className="group flex items-center gap-2 px-5 py-2.5 bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white rounded-2xl border border-white/10 transition-all text-sm font-bold">
                <Icons.User size={16} className="group-hover:text-brand-500" />
                <span>Đăng nhập</span>
              </button>
            )}
          </div>
        </div>

        {/* Toolbar: Search & Sort */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
           <div className="relative flex-1">
              <Icons.Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600" size={18} />
              <input 
                type="text" 
                placeholder="Tìm kiếm thảo luận..." 
                value={searchQuery}
                onChange={e => setSearchBy(e.target.value)}
                className="w-full bg-white/5 border border-white/5 rounded-xl py-3 pl-12 pr-4 text-white focus:outline-none focus:border-brand-500/30 transition-all"
              />
           </div>
           <div className="flex bg-white/5 p-1 rounded-xl border border-white/5">
              <button onClick={() => setSortBy('newest')} className={`px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${sortBy === 'newest' ? 'bg-white text-slate-950' : 'text-slate-500'}`}>Mới nhất</button>
              <button onClick={() => setSortBy('popular')} className={`px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${sortBy === 'popular' ? 'bg-white text-slate-950' : 'text-slate-500'}`}>Yêu thích</button>
           </div>
        </div>

        {/* Post Form */}
        <div className="glass-panel rounded-[2.5rem] p-1 md:p-1.5 mb-16 shadow-2xl border border-white/5 overflow-hidden">
          <div className="bg-slate-900/40 rounded-[2.3rem] p-8">
            <form onSubmit={handleAskQuestion} className="space-y-6">
              <textarea placeholder={currentUser ? "Chia sẻ ý kiến hoặc câu hỏi của bạn (hỗ trợ `code` block)..." : "Vui lòng đăng nhập Google để thảo luận..."} value={newQuestion} onChange={(e) => setNewQuestion(e.target.value)} disabled={isSubmitting} className="w-full bg-slate-950/30 border border-white/5 rounded-[1.5rem] py-5 px-6 text-white text-lg focus:outline-none focus:border-brand-500/30 transition-all min-h-[120px] resize-none" required />
              <div className="flex justify-end pt-2">
                <button type="submit" disabled={isSubmitting || !newQuestion.trim()} className="flex items-center gap-3 px-10 py-4 bg-white text-slate-950 rounded-2xl font-black transition-all hover:scale-[1.02] active:scale-95 disabled:opacity-50">
                  {isSubmitting ? <Icons.RefreshCw className="animate-spin" size={18} /> : <><span>Đăng bài</span><Icons.Send size={18} /></>}
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Feed */}
        <div className="space-y-10">
          {filteredQuestions.length === 0 ? (
            <div className="text-center py-20 text-slate-600 font-bold uppercase tracking-widest text-xs">Không tìm thấy kết quả</div>
          ) : (
            filteredQuestions.map((q) => (
              <div key={q.id} className={`group animate-in fade-in slide-in-from-bottom-8 duration-700 ${q.isPinned ? 'ring-2 ring-brand-500/50 rounded-[2.5rem] p-4 bg-brand-500/5' : ''}`}>
                 <div className="flex gap-4 md:gap-6">
                    <div className="flex flex-col items-center">
                      <div className={`w-12 h-12 md:w-14 md:h-14 rounded-[1.2rem] flex items-center justify-center text-white font-black text-xl shadow-xl transition-all duration-500 ${
                        q.isAdmin 
                          ? 'bg-gradient-to-br from-brand-400 via-brand-600 to-purple-600 ring-2 ring-brand-400/50 shadow-[0_0_20px_rgba(245,158,11,0.3)] scale-110' 
                          : q.isPinned ? 'bg-brand-500' : 'bg-gradient-to-br from-slate-600 to-slate-800'
                      }`}>
                        {getInitials(q.author)}
                      </div>
                      <div className="w-[2px] flex-1 bg-white/5 my-2"></div>
                    </div>
                    <div className="flex-1 space-y-4 pb-12 border-b border-white/5 group-last:border-none">
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className={`font-black text-lg tracking-tight ${q.isAdmin ? 'text-brand-400' : 'text-white'}`}>{q.author}</h4>
                            {q.isAdmin && <span className="flex items-center gap-1 bg-brand-500/10 text-brand-500 text-[9px] px-2 py-0.5 rounded-full font-black uppercase tracking-tighter border border-brand-500/20"><Icons.Shield size={10} />Official</span>}
                            {q.isPinned && <Icons.Paperclip size={14} className="text-brand-400" />}
                            <span className="text-[10px] text-slate-500 font-bold uppercase">{formatRelativeTime(q.timestamp)}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-1">
                          {currentUser?.isAdmin && <button onClick={() => updateDoc(doc(db, "questions", q.id), { isPinned: !q.isPinned })} className={`p-2 transition-all ${q.isPinned ? 'text-brand-500' : 'text-slate-700'}`}><Icons.Paperclip size={18} /></button>}
                          {(currentUser?.isAdmin || currentUser?.uid === q.authorId) && (
                            <>
                              <button onClick={() => {setEditingId(q.id); setEditContent(q.content);}} className="p-2 text-slate-700 hover:text-white"><Icons.Settings size={18} /></button>
                              <button onClick={() => deleteQuestion(q.id)} className="p-2 text-slate-700 hover:text-red-500"><Icons.Trash2 size={18} /></button>
                            </>
                          )}
                        </div>
                      </div>
                      {editingId === q.id ? (
                        <div className="space-y-4">
                          <textarea value={editContent} onChange={e => setEditContent(e.target.value)} className="w-full bg-slate-900 border border-white/10 rounded-xl p-4 text-white" />
                          <div className="flex gap-2"><button onClick={() => saveEdit(q.id)} className="px-4 py-2 bg-brand-600 text-white rounded-lg text-xs font-bold">Lưu</button><button onClick={() => setEditingId(null)} className="px-4 py-2 bg-white/5 text-slate-400 rounded-lg text-xs font-bold">Hủy</button></div>
                        </div>
                      ) : (
                        <SmartContent content={q.content} className="text-slate-300 text-lg leading-relaxed bg-white/5 rounded-[1.5rem] p-6 border border-white/5" />
                      )}
                      <div className="flex gap-6 px-2">
                         <button onClick={() => toggleLikeQuestion(q)} className={`flex items-center gap-2 font-black text-sm ${q.likedBy?.includes(currentUser?.uid || '') ? 'text-brand-500' : 'text-slate-500'}`}><Icons.ThumbsUp size={18} fill={q.likedBy?.includes(currentUser?.uid || '') ? 'currentColor' : 'none'} /> {q.likedBy?.length || 0}</button>
                         <button onClick={() => setReplyingTo({qId: q.id, name: q.author})} className="flex items-center gap-2 text-slate-500 font-black text-sm hover:text-brand-400 transition-colors"><Icons.MessageSquareReply size={18} /> {q.replies?.length || 0} Phản hồi</button>
                      </div>
                      <div className="space-y-4 pt-4 border-l border-white/5 ml-2 pl-6">
                        {q.replies?.map((r) => (
                          <div key={r.id} className="flex gap-4 group/reply">
                            <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-white font-black text-[10px] shrink-0 ${r.isAdmin ? 'bg-gradient-to-br from-brand-500 to-purple-600 ring-1 ring-brand-400/50 shadow-lg' : 'bg-slate-800'}`}>{getInitials(r.author)}</div>
                            <div className="flex-1 space-y-2">
                              <div className={`rounded-xl p-3 border transition-all ${r.isAdmin ? 'bg-brand-500/5 border-brand-500/20' : 'bg-slate-900/60 border-white/5'}`}>
                                 <div className="flex justify-between items-center mb-1">
                                   <div className="flex items-center gap-2">
                                     <span className={`text-xs font-black ${r.isAdmin ? 'text-brand-400 flex items-center gap-1' : 'text-white'}`}>{r.author} {r.isAdmin && <Icons.CheckCircle2 size={12} className="text-brand-500" />}</span>
                                     {r.replyToName && <span className="text-[10px] text-slate-500 flex items-center gap-1"><Icons.ArrowRight size={8} /><span className="text-brand-400/70">{r.replyToName}</span></span>}
                                   </div>
                                   <div className="flex items-center gap-1 opacity-0 group-hover/reply:opacity-100 transition-opacity">
                                     {(currentUser?.isAdmin || currentUser?.uid === r.authorId) && (
                                       <><button onClick={() => {setEditingReplyId(r.id); setEditContent(r.content);}} className="p-1 text-slate-600 hover:text-white"><Icons.Settings size={12} /></button><button onClick={() => deleteReply(q.id, r.id)} className="p-1 text-slate-600 hover:text-red-500"><Icons.Trash2 size={12} /></button></>
                                     )}
                                   </div>
                                 </div>
                                 {editingReplyId === r.id ? (
                                   <div className="space-y-2">
                                     <textarea value={editContent} onChange={e => setEditContent(e.target.value)} className="w-full bg-slate-950 border border-white/10 rounded-lg p-2 text-xs text-white" />
                                     <div className="flex gap-2"><button onClick={() => saveReplyEdit(q.id, r.id)} className="px-3 py-1 bg-brand-600 text-white rounded text-[10px] font-bold">Lưu</button><button onClick={() => setEditingReplyId(null)} className="px-3 py-1 bg-white/5 text-slate-400 rounded text-[10px] font-bold">Hủy</button></div>
                                   </div>
                                 ) : <SmartContent content={r.content} className={`${r.isAdmin ? 'text-slate-200' : 'text-slate-400'} text-xs leading-relaxed`} />}
                              </div>
                              <div className="flex gap-4 px-2">
                                 <button onClick={() => toggleLikeReply(q.id, r.id)} className={`text-[10px] font-black uppercase flex items-center gap-1 ${r.likedBy?.includes(currentUser?.uid || '') ? 'text-brand-500' : 'text-slate-600'}`}><Icons.ThumbsUp size={12} fill={r.likedBy?.includes(currentUser?.uid || '') ? 'currentColor' : 'none'} /> {r.likedBy?.length || 0}</button>
                                 <button onClick={() => setReplyingTo({qId: q.id, rId: r.id, name: r.author})} className="text-[10px] font-black text-slate-600 hover:text-brand-400 uppercase">Phản hồi</button>
                                 <span className="text-[10px] text-slate-700 font-bold uppercase">{formatRelativeTime(r.timestamp)}</span>
                              </div>
                            </div>
                          </div>
                        ))}
                        {replyingTo?.qId === q.id && (
                          <div className="flex gap-4 pt-2 animate-in slide-in-from-top-2 duration-300">
                             <div className="w-8 h-8 rounded-lg bg-brand-500/20 flex items-center justify-center text-brand-400 shrink-0"><Icons.User size={16} /></div>
                             <div className="flex-1 space-y-3">
                                <span className="text-[10px] font-black text-slate-500 uppercase">Trả lời <span className="text-brand-400">{replyingTo.name}</span></span>
                                <textarea autoFocus value={replyContent} onChange={(e) => setReplyContent(e.target.value)} placeholder={`Viết phản hồi...`} className="w-full bg-slate-900/50 border border-white/10 rounded-xl py-3 px-4 text-white text-sm focus:outline-none min-h-[80px] resize-none" />
                                <div className="flex gap-2"><button onClick={() => handleReply(q.id)} className="px-6 py-2 bg-brand-600 text-white rounded-xl text-xs font-black">Gửi</button><button onClick={() => {setReplyingTo(null); setReplyContent('');}} className="px-6 py-2 bg-white/5 text-slate-400 rounded-xl text-xs font-black">Hủy</button></div>
                             </div>
                          </div>
                        )}
                      </div>
                    </div>
                 </div>
              </div>
            ))
          )}
          
          {hasMore && filteredQuestions.length > 0 && (
            <div className="text-center pt-8">
               <button onClick={() => setPostsLimit(prev => prev + POSTS_PER_PAGE)} className="px-8 py-4 bg-white/5 hover:bg-white/10 text-white rounded-2xl font-black text-sm transition-all border border-white/5 flex items-center gap-2 mx-auto">
                  Tải thêm thảo luận
                  <Icons.ChevronDown size={18} />
               </button>
            </div>
          )}
        </div>
      </div>

      {/* Auth Modal (Google Only) */}
      {showAuthModal && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-6">
          <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-xl" onClick={() => setShowAuthModal(false)}></div>
          <div className="relative w-full max-w-sm bg-slate-900 rounded-[3rem] p-12 border border-white/10 shadow-2xl animate-in zoom-in-95">
            <button onClick={() => setShowAuthModal(false)} className="absolute top-8 right-8 text-slate-600"><Icons.X size={24} /></button>
            <div className="text-center mb-10">
               <div className="w-16 h-16 bg-brand-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6 text-brand-400"><Icons.User size={32} /></div>
               <h3 className="text-2xl font-black text-white">Tham gia cộng đồng</h3>
               <p className="text-slate-500 text-sm mt-2">Vui lòng đăng nhập để thảo luận</p>
            </div>
            <button onClick={handleGoogleLogin} className="w-full py-5 bg-white text-slate-950 rounded-2xl font-black text-lg flex items-center justify-center gap-3 transition-transform active:scale-95 shadow-xl">
               <svg className="w-6 h-6" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
               Đăng nhập bằng Google
            </button>
          </div>
        </div>
      )}

      {/* Name Choice Modal */}
      {showNamePrompt && (
        <div className="fixed inset-0 z-[250] flex items-center justify-center p-6">
          <div className="absolute inset-0 bg-slate-950/95 backdrop-blur-2xl"></div>
          <div className="relative w-full max-w-md bg-slate-900 rounded-[3rem] p-12 border border-white/10 shadow-2xl animate-in zoom-in-95">
            <div className="text-center mb-8">
               <h3 className="text-2xl font-black text-white">Tên hiển thị của bạn</h3>
               <p className="text-slate-500 text-sm mt-2">Chọn một cái tên thật ngầu để bắt đầu thảo luận</p>
            </div>
            <input type="text" value={tempUsername} onChange={e => setTempUsername(e.target.value)} className="w-full bg-slate-950 border border-white/10 rounded-2xl py-4 px-6 text-white font-bold mb-6 text-center" placeholder="Nhập tên của bạn" />
            <button onClick={handleUpdateName} className="w-full py-5 bg-brand-600 text-white rounded-2xl font-black text-lg shadow-xl active:scale-95 transition-transform">Xác nhận tên</button>
          </div>
        </div>
      )}

      {/* Toast Notification */}
      {showToast && (
        <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[300] animate-in slide-in-from-bottom-10 fade-in duration-500">
          <div className="bg-white text-slate-950 px-8 py-4 rounded-2xl font-bold shadow-2xl flex items-center gap-3">
             <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center text-white"><Icons.Check size={14} /></div>
             Thao tác thành công!
          </div>
        </div>
      )}
    </section>
  );
};