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

const ADMIN_EMAILS = ['admin@phtv.com', 'phamhungtien.contact@gmail.com', 'hungtien10a7@gmail.com'];
const ADMIN_NAME_KEYS = ['pham hung tien'];
const POSTS_PER_PAGE = 15;

const normalizeIdentity = (value?: string) =>
  (value || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim();

const isAdminIdentity = (author?: string, email?: string, isAdmin?: boolean) => {
  if (isAdmin) return true;

  const normalizedEmail = (email || '').toLowerCase().trim();
  if (normalizedEmail && ADMIN_EMAILS.includes(normalizedEmail)) return true;

  const normalizedAuthor = normalizeIdentity(author);
  return normalizedAuthor ? ADMIN_NAME_KEYS.includes(normalizedAuthor) : false;
};

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

const getContentPreview = (content: string, maxLength = 180) => {
  const normalized = content.replace(/\s+/g, ' ').trim();
  if (normalized.length <= maxLength) return normalized;
  return `${normalized.slice(0, maxLength).trimEnd()}...`;
};

const getOrderedReplies = (question: Question) =>
  [...(question.replies || [])].sort((a, b) => {
    const aIsAdmin = isAdminIdentity(a.author, a.authorEmail, a.isAdmin);
    const bIsAdmin = isAdminIdentity(b.author, b.authorEmail, b.isAdmin);
    if (aIsAdmin !== bIsAdmin) return aIsAdmin ? -1 : 1;
    return a.timestamp - b.timestamp;
  });

const getLatestAdminReply = (question: Question) =>
  [...(question.replies || [])]
    .filter((reply) => isAdminIdentity(reply.author, reply.authorEmail, reply.isAdmin))
    .sort((a, b) => b.timestamp - a.timestamp)[0] ?? null;

const getQuestionStatusMeta = (question: Question) => {
  const latestAdminReply = getLatestAdminReply(question);

  if (question.isLocked && !latestAdminReply) {
    return {
      label: 'Đã khóa',
      note: 'Thảo luận đã khóa',
      icon: Icons.Lock,
      containerClassName: 'border-white/[0.06] bg-white/[0.022]',
      badgeClassName: 'border-white/[0.06] bg-white/[0.04] text-slate-300'
    };
  }

  if (!latestAdminReply) {
    return {
      label: 'Chưa phản hồi',
      note: 'Đang chờ admin xem',
      icon: Icons.MessageSquareReply,
      containerClassName: 'border-white/[0.055] bg-white/[0.022]',
      badgeClassName: 'border-white/[0.06] bg-white/[0.04] text-slate-300'
    };
  }

  if (/(đã fix|đã sửa|fixed|resolved|đã xử lý|đã khắc phục|đã cập nhật|đã release|đã ra bản)/i.test(latestAdminReply.content)) {
    return {
      label: 'Đã xử lý',
      note: 'Admin xác nhận đã xử lý',
      icon: Icons.CheckCircle2,
      containerClassName: 'border-emerald-300/16 bg-emerald-400/[0.055]',
      badgeClassName: 'border-emerald-300/16 bg-emerald-400/[0.12] text-emerald-200'
    };
  }

  return {
    label: 'Đã phản hồi',
    note: 'Admin đã có cập nhật',
    icon: Icons.ShieldCheck,
    containerClassName: 'border-rose-300/16 bg-rose-400/[0.055]',
    badgeClassName: 'border-rose-300/16 bg-rose-400/[0.12] text-rose-200'
  };
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
  const [visibleQuestions, setVisibleQuestions] = useState<Set<string>>(new Set());
  
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
  const viewedQuestionsRef = useRef<Set<string>>(new Set());

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
          username: user.email === 'phamhungtien.contact@gmail.com' ? 'Phạm Hùng Tiến' : (user.displayName || user.email?.split('@')[0] || 'User'),
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
    else if (filterBy === 'unanswered') result = result.filter(q => !q.replies.some(r => isAdminIdentity(r.author, r.authorEmail, r.isAdmin)));

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

  const communityStats = useMemo(() => {
    const responded = questions.filter((question) => question.replies.some((reply) => isAdminIdentity(reply.author, reply.authorEmail, reply.isAdmin))).length;
    const locked = questions.filter((question) => question.isLocked).length;
    const pending = Math.max(questions.length - responded, 0);
    const totalReplies = questions.reduce((sum, question) => sum + (question.replies?.length || 0), 0);

    return {
      total: questions.length,
      responded,
      pending,
      locked,
      totalReplies
    };
  }, [questions]);

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
      if (result.user.metadata.creationTime === result.user.metadata.lastSignInTime && result.user.email !== 'phamhungtien.contact@gmail.com') {
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

    // EmailJS Notification Logic - Direct (Unlimited until EmailJS quota hits)
    const targetEmail = replyingTo.authorEmail;
    const fallbackEmail = "phamhungtien.contact@gmail.com";
    const actualRecipient = targetEmail || fallbackEmail;
    
    if (actualRecipient !== currentUser.email) {
      console.log(`✉️ Attempting to send email to ${actualRecipient}`);
      
      emailjs.send(
        "PHTV Community", 
        "template_qd4vozb", 
        {
          to_email: actualRecipient,
          recipient_name: replyingTo.name || "Thành viên PHTV",
          recipient_email: actualRecipient, 
          sender_name: currentUser.username,
          message: replyContent,
          link: window.location.href
        }
      ).then(
        () => console.log("✅ Email sent successfully to:", actualRecipient),
        (err) => console.error("❌ Email failed to send:", err)
      );
    } else {
      console.log("⏭️ Skipping email (Self-reply or current user)");
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

  const incrementViewsOnce = async (id: string) => {
    if (viewedQuestionsRef.current.has(id)) return;
    viewedQuestionsRef.current.add(id);

    try {
      await updateDoc(doc(db, "questions", id), { viewCount: increment(1) });
    } catch (error) {
      viewedQuestionsRef.current.delete(id);
      console.error('Failed to increment question views', error);
    }
  };

  const openReplyComposer = (question: Question, reply?: Reply) => {
    if (!currentUser) {
      setShowAuthModal(true);
      return;
    }

    if (question.isLocked && !currentUser.isAdmin) {
      triggerToast('Thảo luận này đã khóa.');
      return;
    }

    setVisibleQuestions((prev) => {
      const next = new Set(prev);
      next.add(question.id);
      return next;
    });

    const nextReplyTarget = {
      qId: question.id,
      rId: reply?.id,
      name: reply?.author || question.author,
      authorId: reply?.authorId || question.authorId,
      authorEmail: reply?.authorEmail || question.authorEmail
    };

    if (replyingTo?.qId !== nextReplyTarget.qId || replyingTo?.rId !== nextReplyTarget.rId) {
      setReplyContent('');
    }

    setReplyingTo(nextReplyTarget);
  };

  const toggleQuestionReplies = (question: Question) => {
    const hasReplies = (question.replies?.length || 0) > 0;
    if (!hasReplies) {
      openReplyComposer(question);
      return;
    }

    const isOpen = visibleQuestions.has(question.id);
    setVisibleQuestions((prev) => {
      const next = new Set(prev);
      if (isOpen) next.delete(question.id);
      else next.add(question.id);
      return next;
    });

    if (isOpen && replyingTo?.qId === question.id) {
      setReplyingTo(null);
      setReplyContent('');
    }
  };

  const togglePin = async (question: Question) => {
    if (!currentUser?.isAdmin) return;
    await updateDoc(doc(db, "questions", question.id), { isPinned: !question.isPinned });
    triggerToast(question.isPinned ? 'Đã bỏ ghim.' : 'Đã ghim thảo luận.');
  };

  const Avatar: React.FC<{
    user: { username: string; photoURL?: string; isAdmin?: boolean };
    size?: string;
    isAdmin?: boolean;
  }> = ({ user, size = "w-10 h-10", isAdmin }) => {
    const showAdminStyle = user.isAdmin ?? isAdmin;

    return (
      <div className={`${size} rounded-2xl flex items-center justify-center text-white font-black overflow-hidden shadow-lg shrink-0 ${
        showAdminStyle
          ? 'bg-gradient-to-br from-rose-400 via-rose-500 to-pink-600 ring-1 ring-rose-300/40'
          : 'bg-slate-800 border border-white/5'
      }`}>
        {user.photoURL ? (
          <img src={user.photoURL} alt={user.username} className="w-full h-full object-cover" />
        ) : (
          <span className={size.includes('w-8') ? 'text-[9px]' : 'text-sm'}>{getInitials(user.username)}</span>
        )}
      </div>
    );
  };

  const SkeletonCard = () => (
    <div className="rounded-[1.5rem] p-6 md:p-8 bg-white/[0.018] border border-white/5 animate-pulse space-y-6">
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
    <div className="mx-auto min-h-screen max-w-6xl px-4 py-6 md:px-6 md:py-10">
      <div className="grid gap-5 lg:grid-cols-[280px_minmax(0,1fr)] lg:items-start">
        <aside className="order-2 space-y-4 lg:order-1 lg:sticky lg:top-24">
          <section className="rounded-[2rem] border border-white/[0.055] bg-[linear-gradient(180deg,rgba(15,23,42,0.72),rgba(8,11,18,0.66))] p-5 shadow-[0_18px_52px_rgba(2,6,23,0.34)] backdrop-blur">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.24em] text-slate-500">Tổng quan</p>
                <h3 className="mt-1 text-lg font-black tracking-tight text-white">Tình trạng thảo luận</h3>
              </div>
              <span className="rounded-full border border-emerald-400/15 bg-emerald-400/10 px-2.5 py-1 text-[10px] font-bold text-emerald-300">
                Live
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-2xl border border-white/[0.055] bg-white/[0.022] p-3">
                <p className="text-[10px] font-semibold text-slate-400">Tổng bài</p>
                <p className="mt-2 text-2xl font-black text-white tabular-nums">{communityStats.total}</p>
              </div>
              <div className="rounded-2xl border border-emerald-400/12 bg-emerald-400/[0.045] p-3">
                <p className="text-[10px] font-semibold text-emerald-200">Đã phản hồi</p>
                <p className="mt-2 text-2xl font-black text-white tabular-nums">{communityStats.responded}</p>
              </div>
              <div className="rounded-2xl border border-white/[0.055] bg-white/[0.022] p-3">
                <p className="text-[10px] font-semibold text-slate-400">Đang chờ</p>
                <p className="mt-2 text-2xl font-black text-white tabular-nums">{communityStats.pending}</p>
              </div>
              <div className="rounded-2xl border border-white/[0.055] bg-white/[0.022] p-3">
                <p className="text-[10px] font-semibold text-slate-400">Phản hồi</p>
                <p className="mt-2 text-2xl font-black text-white tabular-nums">{communityStats.totalReplies}</p>
              </div>
            </div>

            <div className="mt-4 rounded-2xl border border-white/[0.055] bg-white/[0.022] p-4">
              <div className="flex items-center gap-2 text-sm font-semibold text-white">
                <Icons.ShieldCheck size={15} className="text-rose-400" />
                Lưu ý ngắn
              </div>
              <p className="mt-2 text-sm leading-6 text-slate-400">
                Ưu tiên mô tả rõ lỗi, bước tái hiện và phiên bản đang dùng để admin phản hồi nhanh hơn.
              </p>
            </div>
          </section>

          <section className="rounded-[2rem] border border-white/[0.055] bg-[linear-gradient(180deg,rgba(15,23,42,0.72),rgba(8,11,18,0.66))] p-5 shadow-[0_18px_52px_rgba(2,6,23,0.34)] backdrop-blur">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-rose-500/15 text-rose-300">
                <Icons.MessageSquare size={18} />
              </div>
              <div>
                <h3 className="text-base font-black tracking-tight text-white">Kênh hỗ trợ</h3>
                <p className="text-sm text-slate-400">Cần trao đổi nhanh hơn thì vào Discord.</p>
              </div>
            </div>

            <a
              href="https://discord.gg/hm2C4tbaDz"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 flex items-center justify-between rounded-2xl border border-[#5865F2]/25 bg-[#5865F2]/10 px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#5865F2]/15"
            >
              <span>Vào Discord hỗ trợ</span>
              <Icons.ArrowRight size={15} className="text-[#aeb7ff]" />
            </a>

          </section>
        </aside>

        <main className="order-1 space-y-5 lg:order-2">
          <section className="rounded-[2rem] border border-white/[0.055] bg-[linear-gradient(180deg,rgba(15,23,42,0.72),rgba(8,11,18,0.66))] p-5 shadow-[0_18px_52px_rgba(2,6,23,0.34)] backdrop-blur md:p-6">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
              <div className="space-y-3">
                <div className="inline-flex items-center gap-2 rounded-full border border-white/[0.055] bg-white/[0.022] px-3 py-1 text-[10px] font-black uppercase tracking-[0.24em] text-slate-400">
                  <Icons.Info size={12} className="text-rose-400" />
                  Thảo luận PHTV
                </div>
                <div>
                  <h2 className="text-3xl font-black tracking-tight text-white md:text-[2.15rem]">
                    Gọn, rõ và tập trung vào việc xử lý vấn đề.
                  </h2>
                </div>
                <div className="flex flex-wrap gap-2 text-xs">
                  <span className="rounded-full border border-white/[0.055] bg-white/[0.022] px-3 py-1.5 text-slate-300">
                    {communityStats.responded} bài đã có phản hồi admin
                  </span>
                  <span className="rounded-full border border-white/[0.055] bg-white/[0.022] px-3 py-1.5 text-slate-300">
                    {communityStats.pending} bài đang chờ
                  </span>
                  <span className="rounded-full border border-white/[0.055] bg-white/[0.022] px-3 py-1.5 text-slate-300">
                    {communityStats.locked} bài đã khóa
                  </span>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3 lg:justify-end">
                {currentUser ? (
                  <>
                    <div className="relative">
                      <button
                        onClick={() => setShowNotifs(!showNotifs)}
                        className={`relative flex h-11 w-11 items-center justify-center rounded-2xl border transition ${
                          showNotifs
                            ? 'border-white bg-white text-slate-950'
                            : 'border-white/[0.055] bg-white/[0.022] text-slate-300 hover:bg-white/[0.04] hover:text-white'
                        }`}
                        aria-label="Xem thông báo"
                      >
                        <Icons.Bell size={16} />
                        {unreadCount > 0 && (
                          <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-rose-500 px-1 text-[9px] font-black text-white">
                            {unreadCount}
                          </span>
                        )}
                      </button>

                      {showNotifs && (
                        <div className="fixed inset-x-4 top-24 z-[150] overflow-hidden rounded-[1.5rem] border border-white/[0.06] bg-slate-900 shadow-[0_24px_80px_rgba(0,0,0,0.65)] sm:absolute sm:inset-x-auto sm:right-0 sm:top-14 sm:w-[340px]">
                          <div className="flex items-center justify-between border-b border-white/5 px-4 py-3">
                            <span className="text-sm font-semibold text-white">Thông báo</span>
                            <button onClick={() => setShowNotifs(false)} className="text-slate-500 transition hover:text-white">
                              <Icons.X size={16} />
                            </button>
                          </div>
                          <div className="max-h-[360px] overflow-y-auto custom-scrollbar">
                            {notifications.length === 0 ? (
                              <div className="p-8 text-center text-sm text-slate-500">Chưa có thông báo nào.</div>
                            ) : (
                              notifications.map((notification) => (
                                <button
                                  key={notification.id}
                                  onClick={() => {
                                    markNotifRead(notification.id);
                                    setShowNotifs(false);
                                  }}
                                  className={`flex w-full items-start gap-3 border-b border-white/5 px-4 py-3 text-left transition ${
                                    notification.isRead
                                      ? 'bg-transparent opacity-60'
                                      : 'bg-rose-500/[0.04] hover:bg-rose-500/[0.08]'
                                  }`}
                                >
                                  <Avatar user={{ username: notification.senderName, photoURL: notification.senderPhoto }} size="w-8 h-8" />
                                  <div className="min-w-0 flex-1">
                                    <p className="text-sm leading-5 text-white">
                                      <span className="font-semibold">{notification.senderName}</span>{' '}
                                      {notification.type === 'reply' ? 'đã phản hồi bạn.' : 'đã tương tác với bài viết.'}
                                    </p>
                                    <p className="mt-1 text-xs text-slate-400">{formatRelativeTime(notification.timestamp)}</p>
                                  </div>
                                </button>
                              ))
                            )}
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="flex items-center gap-3 rounded-[1.4rem] border border-white/[0.055] bg-white/[0.022] px-3 py-2">
                      <Avatar user={currentUser} size="w-9 h-9" isAdmin={currentUser.isAdmin} />
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <p className="truncate text-sm font-semibold text-white">{currentUser.username}</p>
                          {currentUser.isAdmin && <Icons.CheckCircle2 size={14} className="text-rose-400" />}
                        </div>
                        <div className="mt-1 flex items-center gap-3 text-xs text-slate-400">
                          <button
                            onClick={() => {
                              setTempUsername(currentUser.username);
                              setShowNamePrompt(true);
                            }}
                            className="transition hover:text-white"
                          >
                            Sửa tên
                          </button>
                          <button onClick={() => signOut(auth)} className="transition hover:text-white">
                            Đăng xuất
                          </button>
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  <button
                    onClick={() => setShowAuthModal(true)}
                    className="inline-flex items-center gap-2 rounded-2xl bg-white px-4 py-3 text-sm font-semibold text-slate-950 transition hover:opacity-90"
                  >
                    <Icons.User size={15} />
                    Đăng nhập Google
                  </button>
                )}
              </div>
            </div>

            <div className="mt-5 grid gap-3 xl:grid-cols-[minmax(0,1fr)_auto_auto]">
              <label className="relative block">
                <Icons.Search className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
                <input
                  id="search-input"
                  name="search"
                  type="text"
                  placeholder="Tìm nội dung, thành viên hoặc tình trạng xử lý..."
                  value={searchQuery}
                  onChange={(e) => setSearchBy(e.target.value)}
                  className="w-full rounded-2xl border border-white/[0.055] bg-white/[0.022] py-3 pl-11 pr-4 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-rose-400/30"
                />
              </label>

              <div className="grid grid-cols-3 gap-1 rounded-2xl border border-white/[0.055] bg-white/[0.022] p-1">
                {[
                  { id: 'newest', label: 'Mới nhất', icon: Icons.RefreshCw },
                  { id: 'trending', label: 'Xu hướng', icon: Icons.Sparkles },
                  { id: 'popular', label: 'Yêu thích', icon: Icons.Award }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setSortBy(tab.id as typeof sortBy)}
                    className={`flex items-center justify-center gap-2 rounded-xl px-3 py-2 text-xs font-semibold transition ${
                      sortBy === tab.id
                        ? 'bg-white text-slate-950'
                        : 'text-slate-300 hover:bg-white/[0.04] hover:text-white'
                    }`}
                  >
                    <tab.icon size={14} />
                    <span>{tab.label}</span>
                  </button>
                ))}
              </div>

              <label className="flex items-center gap-2 rounded-2xl border border-white/[0.055] bg-white/[0.022] px-4 py-3 text-sm text-slate-300">
                <Icons.Filter size={14} className="text-rose-400" />
                <select
                  id="filter-select"
                  name="filter"
                  value={filterBy}
                  onChange={(e) => setFilterBy(e.target.value as typeof filterBy)}
                  className="w-full bg-transparent text-sm text-white outline-none"
                >
                  <option value="all" className="bg-slate-900">Tất cả</option>
                  <option value="mine" className="bg-slate-900">Bài của tôi</option>
                  <option value="unanswered" className="bg-slate-900">Chưa có phản hồi admin</option>
                  {currentUser?.isAdmin && <option value="reported" className="bg-slate-900">Bài bị báo cáo</option>}
                </select>
              </label>
            </div>
          </section>

          <section className="rounded-[2rem] border border-white/[0.055] bg-[linear-gradient(180deg,rgba(15,23,42,0.72),rgba(8,11,18,0.66))] p-5 shadow-[0_18px_52px_rgba(2,6,23,0.34)] backdrop-blur md:p-6">
            <form onSubmit={handleAskQuestion} className="space-y-4">
              <div className="flex items-start gap-3">
                <Avatar
                  user={{ username: currentUser?.username || 'User', photoURL: currentUser?.photoURL, isAdmin: currentUser?.isAdmin }}
                  size="w-10 h-10"
                  isAdmin={currentUser?.isAdmin}
                />
                <div className="min-w-0 flex-1">
                  <textarea
                    id="new-question-input"
                    name="question"
                    placeholder={currentUser ? 'Mô tả ngắn gọn vấn đề hoặc câu hỏi của bạn...' : 'Đăng nhập Google để bắt đầu thảo luận...'}
                    value={newQuestion}
                    onChange={(e) => setNewQuestion(e.target.value)}
                    disabled={isSubmitting}
                    className="min-h-[110px] w-full resize-none rounded-[1.5rem] border border-white/[0.055] bg-white/[0.022] px-4 py-3 text-sm leading-6 text-white outline-none transition placeholder:text-slate-500 focus:border-rose-400/30"
                    required
                  />
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <span className="mr-1 text-xs font-semibold text-slate-400">Phân loại:</span>
                {LABELS.map((label) => (
                  <button
                    key={label.id}
                    type="button"
                    onClick={() => setSelectedLabel(selectedLabel === label.id ? null : label.id)}
                    className={`rounded-full border px-3 py-1.5 text-xs font-semibold transition ${
                      selectedLabel === label.id
                        ? `${label.bg} ${label.color} border-transparent`
                        : 'border-white/[0.06] bg-white/[0.022] text-slate-300 hover:bg-white/[0.05]'
                    }`}
                  >
                    {label.label}
                  </button>
                ))}
              </div>

              <div className="flex flex-col gap-3 border-t border-white/[0.055] pt-4 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-sm text-slate-400">
                  Viết rõ lỗi, bước tái hiện hoặc phiên bản để người khác và admin dễ hỗ trợ hơn.
                </p>
                <button
                  type="submit"
                  disabled={isSubmitting || !newQuestion.trim()}
                  className="inline-flex items-center justify-center gap-2 rounded-2xl bg-white px-4 py-3 text-sm font-semibold text-slate-950 transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {isSubmitting ? <Icons.RefreshCw className="animate-spin" size={15} /> : <Icons.Send size={15} />}
                  <span>Đăng thảo luận</span>
                </button>
              </div>
            </form>
          </section>

          <section className="space-y-4 pb-20">
            {isLoading ? (
              <div className="space-y-4">
                {[1, 2, 3].map((index) => <SkeletonCard key={index} />)}
              </div>
            ) : displayQuestions.length === 0 ? (
              <div className="rounded-[2rem] border border-dashed border-white/[0.06] bg-white/[0.018] px-6 py-20 text-center">
                <Icons.MessageSquare size={34} className="mx-auto text-slate-600" />
                <p className="mt-4 text-base font-semibold text-white">Chưa có nội dung phù hợp.</p>
                <p className="mt-2 text-sm text-slate-400">Thử đổi bộ lọc hoặc đăng câu hỏi mới.</p>
              </div>
            ) : (
              displayQuestions.map((question) => {
                const labelInfo = LABELS.find((label) => label.id === question.label);
                const latestAdminReply = getLatestAdminReply(question);
                const orderedReplies = getOrderedReplies(question);
                const statusMeta = getQuestionStatusMeta(question);
                const StatusIcon = statusMeta.icon;
                const replyCount = question.replies?.length || 0;
                const isExpanded = visibleQuestions.has(question.id);
                const hasManagePermission = Boolean(currentUser?.isAdmin || currentUser?.uid === question.authorId);
                const questionIsAdmin = isAdminIdentity(question.author, question.authorEmail, question.isAdmin);

                return (
                  <article
                    key={question.id}
                    className={`rounded-[2rem] border bg-[linear-gradient(180deg,rgba(15,23,42,0.72),rgba(8,11,18,0.66))] p-5 shadow-[0_18px_52px_rgba(2,6,23,0.34)] backdrop-blur transition md:p-6 ${
                      question.isPinned ? 'border-rose-300/16' : 'border-white/[0.055]'
                    }`}
                    onPointerEnter={() => incrementViewsOnce(question.id)}
                  >
                    <div className="flex gap-4">
                      <Avatar
                        user={{ username: question.author, photoURL: question.authorPhoto, isAdmin: questionIsAdmin }}
                        size="w-11 h-11"
                        isAdmin={questionIsAdmin}
                      />

                      <div className="min-w-0 flex-1 space-y-4">
                        <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                          <div className="min-w-0">
                            <div className="flex flex-wrap items-center gap-2">
                              <h3 className={`text-base font-black tracking-tight ${questionIsAdmin ? 'text-rose-300' : 'text-white'}`}>
                                {question.author}
                              </h3>
                              {questionIsAdmin && (
                                <span className="rounded-full border border-rose-300/16 bg-rose-400/10 px-2 py-1 text-[10px] font-black uppercase tracking-[0.18em] text-rose-200">
                                  Admin
                                </span>
                              )}
                              {labelInfo && (
                                <span className={`rounded-full px-2.5 py-1 text-[10px] font-black uppercase ${labelInfo.bg} ${labelInfo.color}`}>
                                  {labelInfo.label}
                                </span>
                              )}
                              {question.isPinned && (
                                <span className="inline-flex items-center gap-1 rounded-full border border-rose-300/16 bg-rose-400/10 px-2.5 py-1 text-[10px] font-black uppercase tracking-[0.18em] text-rose-200">
                                  <Icons.Paperclip size={11} />
                                  Ghim
                                </span>
                              )}
                            </div>

                            <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-slate-400">
                              <span>{formatRelativeTime(question.timestamp)}</span>
                              <span className="inline-flex items-center gap-1">
                                <Icons.Eye size={13} />
                                {question.viewCount || 0}
                              </span>
                              <button onClick={() => reportContent(question.id)} className="transition hover:text-white">
                                Báo cáo
                              </button>
                            </div>
                          </div>

                          <div className="flex flex-wrap items-center gap-2">
                            {currentUser?.isAdmin && (
                              <>
                                <button
                                  onClick={() => toggleLock(question)}
                                  className="rounded-xl border border-white/[0.055] bg-white/[0.022] p-2 text-slate-300 transition hover:bg-white/[0.04] hover:text-white"
                                  aria-label={question.isLocked ? 'Mở khóa' : 'Khóa'}
                                >
                                  {question.isLocked ? <Icons.Lock size={14} /> : <Icons.Unlock size={14} />}
                                </button>
                                <button
                                  onClick={() => togglePin(question)}
                                  className="rounded-xl border border-white/[0.055] bg-white/[0.022] p-2 text-slate-300 transition hover:bg-white/[0.04] hover:text-white"
                                  aria-label={question.isPinned ? 'Bỏ ghim' : 'Ghim'}
                                >
                                  <Icons.Paperclip size={14} />
                                </button>
                              </>
                            )}
                            {hasManagePermission && (
                              <>
                                <button
                                  onClick={() => {
                                    setEditingId(question.id);
                                    setEditContent(question.content);
                                  }}
                                  className="rounded-xl border border-white/[0.055] bg-white/[0.022] p-2 text-slate-300 transition hover:bg-white/[0.04] hover:text-white"
                                  aria-label="Sửa bài viết"
                                >
                                  <Icons.Settings size={14} />
                                </button>
                                <button
                                  onClick={() => deleteQuestion(question.id)}
                                  className="rounded-xl border border-white/[0.055] bg-white/[0.022] p-2 text-slate-300 transition hover:border-red-400/25 hover:bg-red-500/10 hover:text-red-300"
                                  aria-label="Xóa bài viết"
                                >
                                  <Icons.Trash2 size={14} />
                                </button>
                              </>
                            )}
                          </div>
                        </div>

                        {editingId === question.id ? (
                          <div className="space-y-3">
                            <textarea
                              value={editContent}
                              onChange={(e) => setEditContent(e.target.value)}
                              className="w-full rounded-[1.5rem] border border-white/[0.055] bg-white/[0.022] px-4 py-3 text-sm leading-6 text-white outline-none focus:border-rose-400/30"
                            />
                            <div className="flex flex-wrap gap-2">
                              <button onClick={() => saveEdit(question.id)} className="rounded-xl bg-white px-4 py-2 text-sm font-semibold text-slate-950">
                                Lưu
                              </button>
                              <button onClick={() => setEditingId(null)} className="rounded-xl border border-white/[0.055] bg-white/[0.022] px-4 py-2 text-sm text-slate-300">
                                Hủy
                              </button>
                            </div>
                          </div>
                        ) : (
                          <div className="rounded-[1.5rem] border border-white/[0.055] bg-white/[0.022] p-4">
                            <SmartContent content={question.content} className="text-sm leading-7 text-slate-200" />
                          </div>
                        )}

                        <div className={`rounded-[1.5rem] border p-4 ${statusMeta.containerClassName}`}>
                          <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                            <div className="min-w-0 flex-1">
                              <div className="flex flex-wrap items-center gap-2">
                                <span className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-[11px] font-semibold ${statusMeta.badgeClassName}`}>
                                  <StatusIcon size={14} />
                                  {statusMeta.label}
                                </span>
                                <span className="text-sm text-slate-300">{statusMeta.note}</span>
                              </div>

                              <div className="mt-3 space-y-2">
                                {latestAdminReply ? (
                                  <>
                                    <p className="text-sm leading-6 text-slate-200">
                                      {getContentPreview(latestAdminReply.content)}
                                    </p>
                                    <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400">
                                      <span className="font-semibold text-white">{latestAdminReply.author}</span>
                                      <span>{formatRelativeTime(latestAdminReply.timestamp)}</span>
                                    </div>
                                  </>
                                ) : (
                                  <p className="text-sm leading-6 text-slate-400">
                                    Admin chưa phản hồi trên thảo luận này.
                                  </p>
                                )}
                              </div>
                            </div>

                            <button
                              onClick={() => {
                                if (!isExpanded) toggleQuestionReplies(question);
                              }}
                              className="inline-flex items-center gap-2 self-start rounded-xl border border-white/[0.055] bg-white/[0.022] px-3 py-2 text-sm text-slate-300 transition hover:bg-white/[0.04] hover:text-white"
                            >
                              <Icons.MessageSquareReply size={14} />
                              {replyCount > 0 ? 'Mở thảo luận' : 'Phản hồi'}
                            </button>
                          </div>
                        </div>

                        <div className="flex flex-wrap items-center gap-3 border-t border-white/[0.055] pt-1">
                          <button
                            onClick={() => toggleLikeQuestion(question)}
                            className={`inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-semibold transition ${
                              question.likedBy?.includes(currentUser?.uid || '')
                                ? 'bg-rose-500/10 text-rose-300'
                                : 'text-slate-400 hover:bg-white/[0.022] hover:text-white'
                            }`}
                          >
                            <Icons.ThumbsUp
                              size={15}
                              fill={question.likedBy?.includes(currentUser?.uid || '') ? 'currentColor' : 'none'}
                            />
                            <span>{question.likedBy?.length || 0}</span>
                          </button>

                          <button
                            onClick={() => toggleQuestionReplies(question)}
                            className={`inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-semibold transition ${
                              question.isLocked && !currentUser?.isAdmin
                                ? 'cursor-not-allowed text-slate-600'
                                : 'text-slate-400 hover:bg-white/[0.022] hover:text-white'
                            }`}
                          >
                            <Icons.MessageSquareReply size={15} />
                            <span>
                              {replyCount > 0
                                ? isExpanded
                                  ? `Ẩn ${replyCount} phản hồi`
                                  : `Xem ${replyCount} phản hồi`
                                : 'Phản hồi'}
                            </span>
                          </button>

                        </div>

                        {(isExpanded || replyingTo?.qId === question.id) && (
                          <div className="space-y-4 border-t border-white/[0.055] pt-5">
                            {orderedReplies.length > 0 && (
                              <div className="space-y-3">
                                {orderedReplies.map((reply) => {
                                  const replyIsAdmin = isAdminIdentity(reply.author, reply.authorEmail, reply.isAdmin);

                                  return (
                                    <div key={reply.id} className="flex gap-3">
                                      <Avatar
                                        user={{ username: reply.author, photoURL: reply.authorPhoto, isAdmin: replyIsAdmin }}
                                        size="w-9 h-9"
                                        isAdmin={replyIsAdmin}
                                      />
                                      <div className="min-w-0 flex-1">
                                        <div className={`rounded-[1.4rem] border p-4 ${replyIsAdmin ? 'border-rose-300/16 bg-rose-400/[0.045]' : 'border-white/[0.055] bg-white/[0.022]'}`}>
                                          <div className="mb-2 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                                            <div className="flex flex-wrap items-center gap-2 text-sm">
                                              <span className={`font-semibold ${replyIsAdmin ? 'text-rose-200' : 'text-white'}`}>
                                                {reply.author}
                                              </span>
                                              {replyIsAdmin && (
                                                <span className="rounded-full border border-rose-300/16 bg-rose-400/10 px-2 py-1 text-[10px] font-black uppercase tracking-[0.18em] text-rose-200">
                                                  Admin
                                                </span>
                                              )}
                                              {reply.replyToName && (
                                                <span className="inline-flex items-center gap-1 text-xs text-slate-400">
                                                  <Icons.ArrowRight size={12} />
                                                  {reply.replyToName}
                                                </span>
                                              )}
                                              <span className="text-xs text-slate-500">{formatRelativeTime(reply.timestamp)}</span>
                                            </div>

                                            {(currentUser?.isAdmin || currentUser?.uid === reply.authorId) && (
                                              <div className="flex items-center gap-2">
                                                <button
                                                  onClick={() => {
                                                    setEditingReplyId(reply.id);
                                                    setEditContent(reply.content);
                                                  }}
                                                  className="rounded-xl border border-white/[0.055] bg-white/[0.022] p-2 text-slate-300 transition hover:bg-white/[0.04] hover:text-white"
                                                  aria-label="Sửa phản hồi"
                                                >
                                                  <Icons.Settings size={13} />
                                                </button>
                                                <button
                                                  onClick={() => deleteReply(question.id, reply.id)}
                                                  className="rounded-xl border border-white/[0.055] bg-white/[0.022] p-2 text-slate-300 transition hover:border-red-400/25 hover:bg-red-500/10 hover:text-red-300"
                                                  aria-label="Xóa phản hồi"
                                                >
                                                  <Icons.Trash2 size={13} />
                                                </button>
                                              </div>
                                            )}
                                          </div>

                                          {editingReplyId === reply.id ? (
                                            <div className="space-y-3">
                                              <textarea
                                                autoFocus
                                                value={editContent}
                                                onChange={(e) => setEditContent(e.target.value)}
                                                className="w-full rounded-[1.25rem] border border-white/[0.055] bg-slate-950 px-4 py-3 text-sm leading-6 text-white outline-none focus:border-rose-400/30"
                                              />
                                              <div className="flex flex-wrap gap-2">
                                                <button onClick={() => saveReplyEdit(question.id, reply.id)} className="rounded-xl bg-white px-4 py-2 text-sm font-semibold text-slate-950">
                                                  Lưu
                                                </button>
                                                <button onClick={() => setEditingReplyId(null)} className="rounded-xl border border-white/[0.055] bg-white/[0.022] px-4 py-2 text-sm text-slate-300">
                                                  Hủy
                                                </button>
                                              </div>
                                            </div>
                                          ) : (
                                            <SmartContent content={reply.content} className="text-sm leading-6 text-slate-200" />
                                          )}
                                        </div>

                                        <div className="mt-2 flex flex-wrap items-center gap-3 px-2">
                                          <button
                                            onClick={() => toggleLikeReply(question.id, reply.id)}
                                            className={`inline-flex items-center gap-2 text-xs font-semibold transition ${
                                              reply.likedBy?.includes(currentUser?.uid || '')
                                                ? 'text-rose-300'
                                                : 'text-slate-400 hover:text-white'
                                            }`}
                                          >
                                            <Icons.ThumbsUp
                                              size={13}
                                              fill={reply.likedBy?.includes(currentUser?.uid || '') ? 'currentColor' : 'none'}
                                            />
                                            <span>{reply.likedBy?.length || 0}</span>
                                          </button>
                                          <button onClick={() => openReplyComposer(question, reply)} className="text-xs font-semibold text-slate-400 transition hover:text-white">
                                            Trả lời
                                          </button>
                                        </div>
                                      </div>
                                    </div>
                                  );
                                })}
                              </div>
                            )}

                            {replyingTo?.qId === question.id ? (
                              <div className="rounded-[1.5rem] border border-white/[0.055] bg-white/[0.022] p-4">
                                <div className="mb-3 flex items-center justify-between gap-3">
                                  <p className="text-sm font-semibold text-white">
                                    Đang phản hồi {replyingTo.name ? `@${replyingTo.name}` : 'thảo luận này'}
                                  </p>
                                  <button
                                    onClick={() => {
                                      setReplyingTo(null);
                                      setReplyContent('');
                                    }}
                                    className="text-slate-500 transition hover:text-white"
                                  >
                                    <Icons.X size={14} />
                                  </button>
                                </div>

                                <textarea
                                  id="reply-input"
                                  name="reply"
                                  autoFocus
                                  value={replyContent}
                                  onChange={(e) => setReplyContent(e.target.value)}
                                  placeholder="Viết phản hồi của bạn..."
                                  className="min-h-[110px] w-full resize-none rounded-[1.25rem] border border-white/[0.055] bg-slate-950 px-4 py-3 text-sm leading-6 text-white outline-none focus:border-rose-400/30"
                                />

                                <div className="mt-3 flex flex-wrap gap-2">
                                  <button
                                    onClick={() => handleReply(question.id)}
                                    className="rounded-xl bg-white px-4 py-2 text-sm font-semibold text-slate-950"
                                  >
                                    Gửi phản hồi
                                  </button>
                                  <button
                                    onClick={() => {
                                      setReplyingTo(null);
                                      setReplyContent('');
                                    }}
                                    className="rounded-xl border border-white/[0.055] bg-white/[0.022] px-4 py-2 text-sm text-slate-300"
                                  >
                                    Hủy
                                  </button>
                                </div>
                              </div>
                            ) : (
                              <button
                                onClick={() => openReplyComposer(question)}
                                className="inline-flex items-center gap-2 text-sm font-semibold text-rose-300 transition hover:text-rose-200"
                              >
                                <Icons.MessageSquare size={15} />
                                Viết phản hồi
                              </button>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </article>
                );
              })
            )}

            {hasMore && displayQuestions.length >= postsLimit && (
              <div className="pt-4 text-center">
                <button
                  onClick={() => setPostsLimit((prev) => prev + POSTS_PER_PAGE)}
                  className="inline-flex items-center gap-2 rounded-2xl border border-white/[0.055] bg-white/[0.022] px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/[0.04]"
                >
                  <span>Tải thêm thảo luận</span>
                  <Icons.ChevronDown size={15} />
                </button>
              </div>
            )}
          </section>
        </main>
      </div>

      {/* Modals */}
      {showAuthModal && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-6"><div className="absolute inset-0 bg-slate-950/90 backdrop-blur-3xl" onClick={() => setShowAuthModal(false)}></div><div className="relative w-full max-w-sm bg-slate-900 rounded-[3.5rem] p-12 border border-white/[0.06] shadow-2xl animate-in zoom-in-95"><button onClick={() => setShowAuthModal(false)} className="absolute top-10 right-10 text-slate-600 p-2"><Icons.X size={28} /></button><div className="text-center mb-10"><div className="w-20 h-20 bg-gradient-to-br from-rose-500/20 to-pink-500/20 rounded-[2rem] flex items-center justify-center mx-auto mb-10 text-rose-400 shadow-3xl"><Icons.User size={48} /></div><h3 className="text-4xl font-black text-white tracking-tighter leading-none mb-4 uppercase">Chào bạn!</h3><p className="text-slate-500 text-sm font-medium leading-relaxed uppercase tracking-widest text-[9px]">Cộng đồng PHTV Việt Nam</p></div><button onClick={handleGoogleLogin} className="w-full py-6 bg-white text-slate-950 rounded-[1.5rem] font-black text-lg flex items-center justify-center gap-4 transition-all active:scale-95 shadow-2xl"><svg className="w-7 h-7" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>Đăng nhập ngay</button></div></div>
      )}
      {showNamePrompt && (
        <div className="fixed inset-0 z-[250] flex items-center justify-center p-6"><div className="absolute inset-0 bg-slate-950/95 backdrop-blur-3xl animate-in fade-in duration-1000"></div><div className="relative w-full max-w-lg bg-slate-900 rounded-[4rem] p-12 md:p-16 border border-white/[0.06] shadow-3xl animate-in zoom-in-95 duration-500"><div className="text-center mb-12 space-y-4"><div className="w-24 h-24 bg-gradient-to-br from-rose-500 to-pink-600 rounded-[2rem] flex items-center justify-center mx-auto shadow-2xl rotate-3"><Icons.UserCheck size={48} className="text-white" /></div><h3 className="text-4xl font-black text-white tracking-tighter uppercase italic leading-none">Bạn là ai?</h3><p className="text-slate-500 text-lg font-medium italic">Chọn một danh xưng thật đẳng cấp cho cộng đồng</p></div><input id="username-input" name="username" type="text" value={tempUsername} onChange={e => setTempUsername(e.target.value)} className="w-full bg-slate-950 border border-white/[0.06] rounded-[2rem] py-6 px-10 text-white font-black mb-10 text-center text-3xl focus:border-brand-500/50 outline-none transition-all shadow-inner placeholder:text-slate-800" placeholder="Nhập tên..." /><button onClick={handleUpdateName} className="w-full py-6 bg-white text-slate-950 rounded-[2rem] font-black text-xl shadow-2xl active:scale-95 transition-all transform hover:scale-[1.02]">Bắt đầu ngay</button></div></div>
      )}
      {showToast.show && (
        <div className="fixed bottom-12 left-1/2 -translate-x-1/2 z-[300] animate-in slide-in-from-bottom-12 fade-in duration-500"><div className="bg-white text-slate-950 px-12 py-6 rounded-[2.5rem] font-black shadow-3xl flex items-center gap-5 border border-white/20"><div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center text-white shadow-xl"><Icons.Check size={22} /></div><span className="tracking-tight text-xl italic">{showToast.message}</span></div></div>
      )}
    </div>
  );
};
