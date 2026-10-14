/**
 * PHTV community board (Firestore: questions, notifications). It predates the
 * per-app boards and keeps its richer model: labels, likes, pinned and locked
 * threads, admin replies and notifications. Rendered as an Astro island.
 */
import { useEffect, useMemo, useRef, useState, type SubmitEvent } from 'react';
import {
  ArrowRight,
  Bell,
  CheckCircle2,
  ChevronDown,
  Lock,
  MessageSquare,
  Pencil,
  Pin,
  Send,
  ShieldCheck,
  ThumbsUp,
  Trash2,
  Unlock,
  X,
  Search,
} from 'lucide-react';
import { onAuthStateChanged, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import {
  addDoc,
  arrayRemove,
  arrayUnion,
  collection,
  deleteDoc,
  doc,
  getDoc,
  limit,
  onSnapshot,
  orderBy,
  query,
  updateDoc,
  where,
} from 'firebase/firestore';
import type { Lang } from '../../data/types';
import { ADMIN_EMAILS, getFirebase } from '../../lib/firebase';
import { formatRelative } from './strings';
import { phtvText, type PhtvText } from './phtv-strings';
import './board.css';

type Label = 'bug' | 'enhancement' | 'feature' | 'question' | 'help' | null;
const LABELS: Exclude<Label, null>[] = ['bug', 'enhancement', 'feature', 'question', 'help'];
const POSTS_PER_PAGE = 15;
const OWNER_EMAIL = 'contact@phamhungtien.com';
const OWNER_NAME = 'Phạm Hùng Tiến';

interface Member {
  uid: string;
  username: string;
  email: string;
  photoURL?: string;
  isAdmin: boolean;
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
  label?: Label;
}

interface Notice {
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

// Badges follow the server-validated isAdmin flag, never a display name.
const adminReplies = (question: Question) =>
  (question.replies ?? []).filter((reply) => reply.isAdmin === true);

function status(question: Question, text: PhtvText) {
  const latest = [...adminReplies(question)].sort((a, b) => b.timestamp - a.timestamp)[0];
  if (question.isLocked && !latest) return { label: text.status.locked, tone: '', Icon: Lock };
  if (!latest) return { label: text.status.waiting, tone: '', Icon: MessageSquare };
  if (
    /(đã fix|đã sửa|fixed|resolved|đã xử lý|đã khắc phục|đã cập nhật|đã release|đã ra bản)/i.test(
      latest.content,
    )
  )
    return { label: text.status.resolved, tone: 'board-badge--resolved', Icon: CheckCircle2 };
  return { label: text.status.answered, tone: 'board-badge--answered', Icon: ShieldCheck };
}

const initials = (name: string) =>
  (name || '??')
    .split(' ')
    .map((part) => part[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

function Avatar({
  name,
  photo,
  admin,
  size = 40,
}: {
  name: string;
  photo?: string;
  admin?: boolean;
  size?: number;
}) {
  return (
    <span
      className={`board-avatar${admin ? ' board-avatar--admin' : ''}`}
      style={{ ['--avatar' as string]: `${size}px` }}
      aria-hidden="true"
    >
      {photo ? <img src={photo} alt="" referrerPolicy="no-referrer" /> : initials(name)}
    </span>
  );
}

/** Renders `code`, @mentions and links inside user text without using innerHTML. */
function RichText({ content }: { content: string }) {
  const parts = content.split(/(`[^`]+`|@[\p{L}\p{N}_]+|https?:\/\/[^\s]+)/gu);
  return (
    <p className="board-content">
      {parts.map((part, index) => {
        if (part.startsWith('`') && part.endsWith('`') && part.length > 1)
          return <code key={index}>{part.slice(1, -1)}</code>;
        if (part.startsWith('@'))
          return (
            <span key={index} className="board-mention">
              {part}
            </span>
          );
        if (/^https?:\/\//.test(part))
          return (
            <a key={index} href={part} target="_blank" rel="noopener noreferrer nofollow ugc">
              {part.length > 48 ? `${part.slice(0, 48)}…` : part}
            </a>
          );
        return part;
      })}
    </p>
  );
}

function preview(content: string, max = 280) {
  const normalized = content.replace(/\s+/g, ' ').trim();
  return normalized.length <= max ? content : `${normalized.slice(0, max).trimEnd()}…`;
}

export default function PhtvBoard({ lang }: { lang: Lang }) {
  const text = phtvText[lang];
  const [questions, setQuestions] = useState<Question[]>([]);
  const [notices, setNotices] = useState<Notice[]>([]);
  const [member, setMember] = useState<Member | null>(null);
  const [draft, setDraft] = useState('');
  const [label, setLabel] = useState<Label>(null);
  const [sortBy, setSortBy] = useState<'newest' | 'popular' | 'trending'>('newest');
  const [filterBy, setFilterBy] = useState<'all' | 'mine' | 'reported' | 'unanswered'>('all');
  const [search, setSearch] = useState('');
  const [expanded, setExpanded] = useState<Set<string>>(new Set());
  const [showNotices, setShowNotices] = useState(false);
  const [busy, setBusy] = useState(false);
  const [lastPostAt, setLastPostAt] = useState(0);
  const [toast, setToast] = useState('');
  const [postsLimit, setPostsLimit] = useState(POSTS_PER_PAGE);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(true);
  const [replyTo, setReplyTo] = useState<{
    qId: string;
    rId?: string;
    name?: string;
    authorId?: string;
  } | null>(null);
  const [replyDraft, setReplyDraft] = useState('');
  const [editing, setEditing] = useState<{ qId: string; rId?: string } | null>(null);
  const [editDraft, setEditDraft] = useState('');
  const [nameDraft, setNameDraft] = useState('');
  const authDialog = useRef<HTMLDialogElement>(null);
  const nameDialog = useRef<HTMLDialogElement>(null);

  const notify = (message: string) => {
    setToast(message);
    window.setTimeout(() => setToast(''), 3000);
  };

  useEffect(() => {
    const { auth } = getFirebase();
    return onAuthStateChanged(auth, (user) => {
      if (!user) return setMember(null);
      setMember({
        uid: user.uid,
        username:
          user.email === OWNER_EMAIL
            ? OWNER_NAME
            : user.displayName || user.email?.split('@')[0] || 'User',
        email: user.email ?? '',
        photoURL: user.photoURL ?? undefined,
        isAdmin: ADMIN_EMAILS.includes(user.email ?? ''),
      });
    });
  }, []);

  useEffect(() => {
    if (!member) return;
    const { db } = getFirebase();
    return onSnapshot(
      query(
        collection(db, 'notifications'),
        where('recipientId', '==', member.uid),
        orderBy('timestamp', 'desc'),
        limit(20),
      ),
      (snapshot) => setNotices(snapshot.docs.map((d) => ({ id: d.id, ...d.data() }) as Notice)),
    );
  }, [member]);

  useEffect(() => {
    const { db } = getFirebase();
    return onSnapshot(
      query(collection(db, 'questions'), orderBy('timestamp', 'desc'), limit(postsLimit)),
      (snapshot) => {
        let list = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }) as Question);
        if (sortBy === 'popular')
          list = list.sort((a, b) => (b.likedBy?.length ?? 0) - (a.likedBy?.length ?? 0));
        if (sortBy === 'trending') {
          const score = (q: Question) =>
            (q.likedBy?.length ?? 0) + (q.replies?.length ?? 0) * 2 + (q.viewCount ?? 0) * 0.5;
          list = list.sort((a, b) => score(b) - score(a));
        }
        setQuestions([...list.filter((q) => q.isPinned), ...list.filter((q) => !q.isPinned)]);
        setHasMore(snapshot.docs.length >= postsLimit);
        setLoading(false);
      },
      () => setLoading(false),
    );
  }, [sortBy, postsLimit]);

  const unread = useMemo(() => notices.filter((n) => !n.isRead).length, [notices]);
  const pending = useMemo(
    () => questions.filter((q) => adminReplies(q).length === 0).length,
    [questions],
  );

  const visible = useMemo(() => {
    let list = questions;
    if (filterBy === 'mine' && member) list = list.filter((q) => q.authorId === member.uid);
    else if (filterBy === 'reported' && member?.isAdmin) list = list.filter((q) => q.isReported);
    else if (filterBy === 'unanswered') list = list.filter((q) => adminReplies(q).length === 0);
    const needle = search.trim().toLowerCase();
    if (needle)
      list = list.filter(
        (q) =>
          q.content.toLowerCase().includes(needle) ||
          q.author.toLowerCase().includes(needle) ||
          (q.replies ?? []).some((r) => r.content.toLowerCase().includes(needle)),
      );
    return list;
  }, [questions, filterBy, search, member]);

  const requireMember = () => {
    if (member) return true;
    authDialog.current?.showModal();
    return false;
  };

  async function createNotice(
    recipientId: string,
    type: 'reply' | 'like',
    questionId: string,
    content: string,
  ) {
    if (!member || recipientId === member.uid) return;
    await addDoc(collection(getFirebase().db, 'notifications'), {
      recipientId,
      senderName: member.username,
      senderPhoto: member.photoURL ?? null,
      type,
      questionId,
      content,
      timestamp: Date.now(),
      isRead: false,
    });
  }

  async function signIn() {
    const { auth, googleProvider } = getFirebase();
    try {
      const result = await signInWithPopup(auth, googleProvider);
      authDialog.current?.close();
      const firstVisit = result.user.metadata.creationTime === result.user.metadata.lastSignInTime;
      if (firstVisit && result.user.email !== OWNER_EMAIL) {
        setNameDraft(result.user.displayName ?? '');
        nameDialog.current?.showModal();
      }
    } catch {
      notify(text.signInFailed);
    }
  }

  async function saveName(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    const user = getFirebase().auth.currentUser;
    if (!nameDraft.trim() || !user) return;
    await updateProfile(user, { displayName: nameDraft.trim() });
    setMember((prev) => (prev ? { ...prev, username: nameDraft.trim() } : prev));
    nameDialog.current?.close();
    notify(text.nameSaved);
  }

  async function ask(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!requireMember() || !member || !draft.trim() || busy) return;
    if (Date.now() - lastPostAt < 10_000 && !member.isAdmin) return notify(text.slowDown);
    setBusy(true);
    try {
      await addDoc(collection(getFirebase().db, 'questions'), {
        authorId: member.uid,
        author: member.username,
        authorPhoto: member.photoURL ?? null,
        content: draft,
        timestamp: Date.now(),
        replies: [],
        likedBy: [],
        isPinned: false,
        isReported: false,
        isLocked: false,
        viewCount: 0,
        isAdmin: member.isAdmin,
        label,
      });
      setDraft('');
      setLabel(null);
      setLastPostAt(Date.now());
      notify(text.posted);
    } catch {
      notify(text.postFailed);
    } finally {
      setBusy(false);
    }
  }

  async function sendReply(questionId: string) {
    if (!requireMember() || !member || !replyTo || !replyDraft.trim()) return;
    const ref = doc(getFirebase().db, 'questions', questionId);
    const snap = await getDoc(ref);
    if (snap.exists() && snap.data().isLocked && !member.isAdmin) return notify(text.lockedNotice);
    const reply: Reply = {
      id: Date.now().toString(),
      parentId: replyTo.rId || questionId,
      replyToName: replyTo.name,
      authorId: member.uid,
      author: member.isAdmin ? OWNER_NAME : member.username,
      ...(member.photoURL ? { authorPhoto: member.photoURL } : {}),
      content: replyDraft,
      timestamp: Date.now(),
      isAdmin: member.isAdmin,
      likedBy: [],
    };
    try {
      await updateDoc(ref, { replies: arrayUnion(reply) });
      const recipient = replyTo.authorId || snap.data()?.authorId;
      if (recipient) void createNotice(recipient, 'reply', questionId, replyDraft.slice(0, 50));
      setReplyDraft('');
    } catch {
      notify(text.replyFailed);
    }
  }

  async function likeQuestion(question: Question) {
    if (!requireMember() || !member) return;
    const liked = question.likedBy?.includes(member.uid);
    await updateDoc(doc(getFirebase().db, 'questions', question.id), {
      likedBy: liked ? arrayRemove(member.uid) : arrayUnion(member.uid),
    });
    if (!liked)
      void createNotice(question.authorId, 'like', question.id, question.content.slice(0, 50));
  }

  async function likeReply(questionId: string, replyId: string) {
    if (!requireMember() || !member) return;
    const ref = doc(getFirebase().db, 'questions', questionId);
    const snap = await getDoc(ref);
    if (!snap.exists()) return;
    let target: Reply | undefined;
    const replies = (snap.data() as Question).replies.map((reply) => {
      if (reply.id !== replyId) return reply;
      target = reply;
      const likes = reply.likedBy ?? [];
      return {
        ...reply,
        likedBy: likes.includes(member.uid)
          ? likes.filter((id) => id !== member.uid)
          : [...likes, member.uid],
      };
    });
    await updateDoc(ref, { replies });
    if (target && !target.likedBy.includes(member.uid))
      void createNotice(target.authorId, 'like', questionId, target.content.slice(0, 50));
  }

  async function removeQuestion(id: string) {
    if (!window.confirm(text.confirmDeletePost)) return;
    await deleteDoc(doc(getFirebase().db, 'questions', id));
    notify(text.deleted);
  }

  async function removeReply(questionId: string, replyId: string) {
    if (!window.confirm(text.confirmDeleteReply)) return;
    const ref = doc(getFirebase().db, 'questions', questionId);
    const snap = await getDoc(ref);
    if (!snap.exists()) return;
    await updateDoc(ref, {
      replies: (snap.data() as Question).replies.filter((r) => r.id !== replyId),
    });
    notify(text.deleted);
  }

  async function saveEdit() {
    if (!editing || !editDraft.trim()) return;
    const ref = doc(getFirebase().db, 'questions', editing.qId);
    if (editing.rId) {
      const snap = await getDoc(ref);
      if (!snap.exists()) return;
      const replies = (snap.data() as Question).replies.map((r) =>
        r.id === editing.rId ? { ...r, content: editDraft } : r,
      );
      await updateDoc(ref, { replies });
    } else {
      await updateDoc(ref, { content: editDraft });
    }
    setEditing(null);
    notify(text.saved);
  }

  async function report(id: string) {
    if (!window.confirm(text.confirmReport)) return;
    await updateDoc(doc(getFirebase().db, 'questions', id), { isReported: true });
    notify(text.reported);
  }

  async function toggleFlag(question: Question, field: 'isLocked' | 'isPinned') {
    if (!member?.isAdmin) return;
    await updateDoc(doc(getFirebase().db, 'questions', question.id), { [field]: !question[field] });
  }

  function openReply(question: Question, reply?: Reply) {
    if (!requireMember() || !member) return;
    if (question.isLocked && !member.isAdmin) return notify(text.lockedNotice);
    setExpanded((prev) => new Set(prev).add(question.id));
    if (replyTo?.qId !== question.id || replyTo?.rId !== reply?.id) setReplyDraft('');
    setReplyTo({
      qId: question.id,
      rId: reply?.id,
      name: reply?.author ?? question.author,
      authorId: reply?.authorId ?? question.authorId,
    });
  }

  function toggleThread(question: Question) {
    if (!(question.replies?.length > 0)) return openReply(question);
    const open = expanded.has(question.id);
    setExpanded((prev) => {
      const next = new Set(prev);
      if (open) next.delete(question.id);
      else next.add(question.id);
      return next;
    });
    if (open && replyTo?.qId === question.id) setReplyTo(null);
  }

  const editor = (
    <div className="board-form">
      <textarea
        value={editDraft}
        onChange={(e) => setEditDraft(e.target.value)}
        aria-label={text.edit}
        autoFocus
      />
      <div className="board-actions">
        <button className="board-primary" type="button" onClick={saveEdit}>
          {text.save}
        </button>
        <button className="board-secondary" type="button" onClick={() => setEditing(null)}>
          {text.cancel}
        </button>
      </div>
    </div>
  );

  return (
    <section className="board" aria-labelledby="phtv-board-heading">
      <header className="board-header">
        <div>
          <h2 id="phtv-board-heading">{text.title}</h2>
          <p className="board-muted">{text.summary(questions.length, pending)}</p>
        </div>
        {member ? (
          <div className="board-actions">
            <div style={{ position: 'relative' }}>
              <button
                className="board-icon"
                type="button"
                aria-label={text.notifications}
                aria-expanded={showNotices}
                onClick={() => setShowNotices(!showNotices)}
              >
                <Bell size={18} aria-hidden="true" />
                {unread > 0 && <span className="board-count">{unread}</span>}
              </button>
              {showNotices && (
                <div className="board-popover">
                  <div className="board-popover__head">
                    <span>{text.notifications}</span>
                    <button
                      className="board-icon"
                      type="button"
                      aria-label={text.close}
                      onClick={() => setShowNotices(false)}
                    >
                      <X size={16} aria-hidden="true" />
                    </button>
                  </div>
                  <div className="board-popover__list">
                    {notices.length === 0 ? (
                      <p className="board-empty">{text.noNotifications}</p>
                    ) : (
                      notices.map((notice) => (
                        <button
                          key={notice.id}
                          type="button"
                          className={`board-notification${notice.isRead ? '' : ' board-notification--unread'}`}
                          onClick={() => {
                            void updateDoc(doc(getFirebase().db, 'notifications', notice.id), {
                              isRead: true,
                            });
                            setShowNotices(false);
                          }}
                        >
                          <Avatar name={notice.senderName} photo={notice.senderPhoto} size={32} />
                          <span>
                            <strong>{notice.senderName}</strong>{' '}
                            {notice.type === 'reply' ? text.notifiedReply : text.notifiedLike}
                            <br />
                            <span className="board-muted">
                              {formatRelative(notice.timestamp, lang)}
                            </span>
                          </span>
                        </button>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>
            <div className="board-account">
              <Avatar
                name={member.username}
                photo={member.photoURL}
                admin={member.isAdmin}
                size={32}
              />
              <div className="board-account__meta">
                <strong>{member.username}</strong>
                <span className="board-account__links">
                  <button
                    className="board-link"
                    type="button"
                    onClick={() => {
                      setNameDraft(member.username);
                      nameDialog.current?.showModal();
                    }}
                  >
                    {text.rename}
                  </button>
                  <button
                    className="board-link"
                    type="button"
                    onClick={() => signOut(getFirebase().auth)}
                  >
                    {text.signOut}
                  </button>
                </span>
              </div>
            </div>
          </div>
        ) : (
          <button
            className="board-primary"
            type="button"
            onClick={() => authDialog.current?.showModal()}
          >
            {text.signIn}
          </button>
        )}
      </header>

      <div className="board-toolbar" style={{ ['--board-selects' as string]: 2 }}>
        <label className="board-field">
          <Search size={17} aria-hidden="true" />
          <input
            type="search"
            aria-label={text.search}
            placeholder={text.search}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </label>
        <select
          className="board-select"
          aria-label={text.sort}
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
        >
          <option value="newest">{text.sortNewest}</option>
          <option value="trending">{text.sortTrending}</option>
          <option value="popular">{text.sortPopular}</option>
        </select>
        <select
          className="board-select"
          aria-label={text.filter}
          value={filterBy}
          onChange={(e) => setFilterBy(e.target.value as typeof filterBy)}
        >
          <option value="all">{text.filterAll}</option>
          <option value="mine">{text.filterMine}</option>
          <option value="unanswered">{text.filterUnanswered}</option>
          {member?.isAdmin && <option value="reported">{text.filterReported}</option>}
        </select>
      </div>

      <form className="board-card board-form" onSubmit={ask}>
        <textarea
          aria-label={text.newPost}
          placeholder={member ? text.askPlaceholder : text.signInPlaceholder}
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onFocus={() => !member && authDialog.current?.showModal()}
          disabled={busy}
          maxLength={5000}
          required
        />
        <div className="board-form__row">
          <select
            className="board-select"
            aria-label={text.label}
            value={label ?? ''}
            onChange={(e) => setLabel((e.target.value || null) as Label)}
          >
            <option value="">{text.label}</option>
            {LABELS.map((id) => (
              <option key={id} value={id}>
                {text.labels[id]}
              </option>
            ))}
          </select>
          <button className="board-primary" disabled={busy || !draft.trim()}>
            <Send size={16} aria-hidden="true" />
            {text.post}
          </button>
        </div>
        <small className="board-muted">{text.publicNotice}</small>
      </form>

      {loading ? (
        <>
          <div className="board-skeleton" />
          <div className="board-skeleton" />
        </>
      ) : visible.length === 0 ? (
        <p className="board-empty">{text.empty}</p>
      ) : (
        visible.map((question) => {
          const meta = status(question, text);
          const replies = [...(question.replies ?? [])].sort((a, b) => a.timestamp - b.timestamp);
          const open = expanded.has(question.id);
          const canManage = Boolean(member?.isAdmin || member?.uid === question.authorId);
          const liked = Boolean(member && question.likedBy?.includes(member.uid));
          return (
            <article
              key={question.id}
              className={`board-card${question.isPinned ? ' board-card--pinned' : ''}`}
            >
              <header className="board-card__head">
                <div className="board-author">
                  <Avatar
                    name={question.author}
                    photo={question.authorPhoto}
                    admin={question.isAdmin === true}
                  />
                  <div>
                    <div className="board-author__name">
                      <strong>{question.author}</strong>
                      {question.isAdmin === true && (
                        <span className="board-badge board-badge--admin">Admin</span>
                      )}
                      {question.label && (
                        <span
                          className={`board-badge${question.label === 'bug' ? ' board-badge--bug' : ''}`}
                        >
                          {text.labels[question.label]}
                        </span>
                      )}
                      <span className={`board-badge ${meta.tone}`}>
                        <meta.Icon size={12} aria-hidden="true" />
                        {meta.label}
                      </span>
                      {question.isPinned && (
                        <span className="board-badge board-badge--pinned">
                          <Pin size={11} aria-hidden="true" />
                          {text.pinned}
                        </span>
                      )}
                    </div>
                    <span className="board-muted">
                      {formatRelative(question.timestamp, lang)} ·{' '}
                      <button
                        className="board-link"
                        type="button"
                        onClick={() => report(question.id)}
                      >
                        {text.report}
                      </button>
                    </span>
                  </div>
                </div>
                <div className="board-actions">
                  {member?.isAdmin && (
                    <>
                      <button
                        className="board-icon"
                        type="button"
                        aria-label={question.isLocked ? text.unlock : text.lock}
                        onClick={() => toggleFlag(question, 'isLocked')}
                      >
                        {question.isLocked ? (
                          <Lock size={15} aria-hidden="true" />
                        ) : (
                          <Unlock size={15} aria-hidden="true" />
                        )}
                      </button>
                      <button
                        className="board-icon"
                        type="button"
                        aria-label={question.isPinned ? text.unpin : text.pin}
                        onClick={() => toggleFlag(question, 'isPinned')}
                      >
                        <Pin size={15} aria-hidden="true" />
                      </button>
                    </>
                  )}
                  {canManage && (
                    <>
                      <button
                        className="board-icon"
                        type="button"
                        aria-label={text.edit}
                        onClick={() => {
                          setEditing({ qId: question.id });
                          setEditDraft(question.content);
                        }}
                      >
                        <Pencil size={15} aria-hidden="true" />
                      </button>
                      <button
                        className="board-icon board-icon--danger"
                        type="button"
                        aria-label={text.deletePost}
                        onClick={() => removeQuestion(question.id)}
                      >
                        <Trash2 size={15} aria-hidden="true" />
                      </button>
                    </>
                  )}
                </div>
              </header>

              {editing?.qId === question.id && !editing.rId ? (
                editor
              ) : (
                <RichText content={open ? question.content : preview(question.content)} />
              )}

              <div className="board-footer">
                <button
                  className="board-ghost"
                  type="button"
                  aria-pressed={liked}
                  onClick={() => likeQuestion(question)}
                >
                  <ThumbsUp size={15} fill={liked ? 'currentColor' : 'none'} aria-hidden="true" />
                  {question.likedBy?.length ?? 0}
                </button>
                <button
                  className="board-ghost"
                  type="button"
                  aria-expanded={open}
                  disabled={question.isLocked && !member?.isAdmin && !replies.length}
                  onClick={() => toggleThread(question)}
                >
                  <MessageSquare size={15} aria-hidden="true" />
                  {replies.length
                    ? open
                      ? text.hideReplies(replies.length)
                      : text.showReplies(replies.length)
                    : text.reply}
                </button>
              </div>

              {(open || replyTo?.qId === question.id) && (
                <div className="board-replies">
                  {replies.map((reply) => {
                    const replyLiked = Boolean(member && reply.likedBy?.includes(member.uid));
                    const canEditReply = Boolean(member?.isAdmin || member?.uid === reply.authorId);
                    return (
                      <div
                        key={reply.id}
                        className={`board-reply${reply.isAdmin ? ' board-reply--admin' : ''}`}
                      >
                        <header className="board-card__head">
                          <div className="board-author">
                            <Avatar
                              name={reply.author}
                              photo={reply.authorPhoto}
                              admin={reply.isAdmin}
                              size={32}
                            />
                            <div className="board-author__name">
                              <strong>{reply.author}</strong>
                              {reply.isAdmin && (
                                <span className="board-badge board-badge--admin">Admin</span>
                              )}
                              {reply.replyToName && (
                                <span className="board-muted">
                                  <ArrowRight
                                    size={12}
                                    aria-hidden="true"
                                    style={{ display: 'inline' }}
                                  />{' '}
                                  {reply.replyToName}
                                </span>
                              )}
                              <span className="board-muted">
                                {formatRelative(reply.timestamp, lang)}
                              </span>
                            </div>
                          </div>
                          {canEditReply && (
                            <div className="board-actions">
                              <button
                                className="board-icon"
                                type="button"
                                aria-label={text.edit}
                                onClick={() => {
                                  setEditing({ qId: question.id, rId: reply.id });
                                  setEditDraft(reply.content);
                                }}
                              >
                                <Pencil size={14} aria-hidden="true" />
                              </button>
                              <button
                                className="board-icon board-icon--danger"
                                type="button"
                                aria-label={text.deleteReply}
                                onClick={() => removeReply(question.id, reply.id)}
                              >
                                <Trash2 size={14} aria-hidden="true" />
                              </button>
                            </div>
                          )}
                        </header>
                        {editing?.rId === reply.id ? editor : <RichText content={reply.content} />}
                        <div className="board-actions">
                          <button
                            className="board-ghost"
                            type="button"
                            aria-pressed={replyLiked}
                            onClick={() => likeReply(question.id, reply.id)}
                          >
                            <ThumbsUp
                              size={13}
                              fill={replyLiked ? 'currentColor' : 'none'}
                              aria-hidden="true"
                            />
                            {reply.likedBy?.length ?? 0}
                          </button>
                          <button
                            className="board-ghost"
                            type="button"
                            onClick={() => openReply(question, reply)}
                          >
                            {text.reply}
                          </button>
                        </div>
                      </div>
                    );
                  })}

                  {replyTo?.qId === question.id ? (
                    <div className="board-form">
                      <div className="board-card__head">
                        <strong>{text.replyingTo(replyTo.name)}</strong>
                        <button
                          className="board-icon"
                          type="button"
                          aria-label={text.cancel}
                          onClick={() => setReplyTo(null)}
                        >
                          <X size={14} aria-hidden="true" />
                        </button>
                      </div>
                      <textarea
                        autoFocus
                        aria-label={text.yourReply}
                        placeholder={text.writeReply}
                        value={replyDraft}
                        onChange={(e) => setReplyDraft(e.target.value)}
                        maxLength={5000}
                      />
                      <div className="board-actions">
                        <button
                          className="board-primary"
                          type="button"
                          disabled={!replyDraft.trim()}
                          onClick={() => sendReply(question.id)}
                        >
                          <Send size={15} aria-hidden="true" />
                          {text.send}
                        </button>
                        <button
                          className="board-secondary"
                          type="button"
                          onClick={() => setReplyTo(null)}
                        >
                          {text.cancel}
                        </button>
                      </div>
                    </div>
                  ) : (
                    <button
                      className="board-ghost"
                      type="button"
                      onClick={() => openReply(question)}
                    >
                      <MessageSquare size={15} aria-hidden="true" />
                      {text.writeReplyCta}
                    </button>
                  )}
                </div>
              )}
            </article>
          );
        })
      )}

      {hasMore && visible.length >= postsLimit && (
        <button
          className="board-secondary"
          type="button"
          onClick={() => setPostsLimit((n) => n + POSTS_PER_PAGE)}
        >
          {text.loadMore}
          <ChevronDown size={16} aria-hidden="true" />
        </button>
      )}

      <dialog ref={authDialog} className="board-modal" aria-labelledby="phtv-auth-title">
        <h3 id="phtv-auth-title">{text.signInTitle}</h3>
        <button className="board-primary" type="button" onClick={signIn}>
          {text.continueGoogle}
        </button>
        <button
          className="board-secondary"
          type="button"
          onClick={() => authDialog.current?.close()}
        >
          {text.cancel}
        </button>
      </dialog>

      <dialog ref={nameDialog} className="board-modal" aria-labelledby="phtv-name-title">
        <form onSubmit={saveName}>
          <h3 id="phtv-name-title">{text.displayName}</h3>
          <input
            value={nameDraft}
            onChange={(e) => setNameDraft(e.target.value)}
            aria-label={text.displayName}
            maxLength={60}
          />
          <button className="board-primary" disabled={!nameDraft.trim()}>
            {text.save}
          </button>
        </form>
      </dialog>

      {toast && (
        <p className="board-toast" role="status">
          {toast}
        </p>
      )}
    </section>
  );
}
