/**
 * Discussion board for the App Store apps (Firestore: appDiscussions/{app}/posts).
 * Rendered as an Astro island; see components/app/Discussions.astro.
 */
import { useEffect, useState, type SubmitEvent } from 'react';
import { LogOut, MessageCircle, Search, Send, Trash2 } from 'lucide-react';
import type { User } from 'firebase/auth';
import type { DiscussionLang as Lang } from './strings';
import { ADMIN_EMAILS, getFirebase } from '../../lib/firebase';
import { boardText, formatDate } from './strings';
import './board.css';

type Category = 'question' | 'bug' | 'idea';

interface Message {
  id: string;
  authorId: string;
  author: string;
  content: string;
  createdAt: number;
  category?: Category;
}

const isAdmin = (user: User | null) =>
  Boolean(user?.emailVerified && ADMIN_EMAILS.includes(user.email ?? ''));

function Thread({
  app,
  post,
  user,
  lang,
}: {
  app: string;
  post: Message;
  user: User | null;
  lang: Lang;
}) {
  const text = boardText[lang];
  const [open, setOpen] = useState(false);
  const [replies, setReplies] = useState<Message[]>([]);
  const [content, setContent] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const repliesPath = `appDiscussions/${app}/posts/${post.id}/replies`;

  useEffect(() => {
    if (!open) return;
    let stop: (() => void) | undefined;
    let disposed = false;
    import('firebase/firestore').then(({ collection, limit, onSnapshot, orderBy, query }) => {
      if (disposed) return;
      stop = onSnapshot(
        query(collection(getFirebase().db, repliesPath), orderBy('createdAt', 'asc'), limit(100)),
        (snapshot) =>
          setReplies(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }) as Message)),
        () => setError(text.repliesFailed),
      );
    });
    return () => {
      disposed = true;
      stop?.();
    };
  }, [open, repliesPath, text]);

  async function remove(replyId?: string) {
    if (!window.confirm(text.confirmDelete)) return;
    try {
      const { deleteDoc, doc } = await import('firebase/firestore');
      const path = replyId ? `${repliesPath}/${replyId}` : `appDiscussions/${app}/posts/${post.id}`;
      await deleteDoc(doc(getFirebase().db, path));
    } catch {
      setError(text.deleteFailed);
    }
  }

  async function reply(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!user || busy || !content.trim()) return;
    setBusy(true);
    setError('');
    try {
      const { addDoc, collection } = await import('firebase/firestore');
      await addDoc(collection(getFirebase().db, repliesPath), {
        authorId: user.uid,
        author: user.displayName || text.member,
        content: content.trim(),
        createdAt: Date.now(),
      });
      setContent('');
    } catch {
      setError(text.replyFailed);
    } finally {
      setBusy(false);
    }
  }

  const canDelete = (authorId: string) => user?.uid === authorId || isAdmin(user);

  return (
    <article className="board-card">
      <header className="board-card__head">
        <div>
          <strong>{post.author}</strong>
          <span className="board-muted">
            {formatDate(post.createdAt, lang)} · {text.categories[post.category ?? 'question']}
          </span>
        </div>
        {canDelete(post.authorId) && (
          <button
            className="board-icon"
            type="button"
            aria-label={text.deletePost}
            onClick={() => remove()}
          >
            <Trash2 size={16} aria-hidden="true" />
          </button>
        )}
      </header>
      <p className="board-content">{post.content}</p>
      <button
        className="board-ghost"
        type="button"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
      >
        <MessageCircle size={16} aria-hidden="true" />
        {text.replies}
      </button>
      {open && (
        <div className="board-replies">
          {replies.length === 0 && <p className="board-muted">{text.noReplies}</p>}
          {replies.map((item) => (
            <div key={item.id} className="board-reply">
              <header className="board-card__head">
                <div>
                  <strong>{item.author}</strong>
                  <span className="board-muted">{formatDate(item.createdAt, lang)}</span>
                </div>
                {canDelete(item.authorId) && (
                  <button
                    className="board-icon"
                    type="button"
                    aria-label={text.deleteReply}
                    onClick={() => remove(item.id)}
                  >
                    <Trash2 size={14} aria-hidden="true" />
                  </button>
                )}
              </header>
              <p className="board-content">{item.content}</p>
            </div>
          ))}
          {user ? (
            <form className="board-form" onSubmit={reply}>
              <textarea
                aria-label={text.yourReply}
                placeholder={text.writeReply}
                value={content}
                onChange={(event) => setContent(event.target.value)}
                maxLength={5000}
                required
              />
              <button className="board-primary" disabled={busy || !content.trim()}>
                <Send size={16} aria-hidden="true" />
                {text.send}
              </button>
            </form>
          ) : (
            <p className="board-muted">{text.signInToReply}</p>
          )}
        </div>
      )}
      {error && (
        <p role="alert" className="board-error">
          {error}
        </p>
      )}
    </article>
  );
}

export default function AppBoard({ app, name, lang }: { app: string; name: string; lang: Lang }) {
  const text = boardText[lang];
  const [ready, setReady] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [posts, setPosts] = useState<Message[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState<Category>('question');
  const [filter, setFilter] = useState<'all' | Category>('all');
  const [search, setSearch] = useState('');
  const [busy, setBusy] = useState(false);
  const [limitCount, setLimitCount] = useState(20);

  useEffect(() => {
    let stopAuth: (() => void) | undefined;
    let stopPosts: (() => void) | undefined;
    let disposed = false;
    Promise.all([import('firebase/auth'), import('firebase/firestore')])
      .then(([authSdk, store]) => {
        if (disposed) return;
        const { auth, db } = getFirebase();
        setReady(true);
        stopAuth = authSdk.onAuthStateChanged(auth, setUser);
        stopPosts = store.onSnapshot(
          store.query(
            store.collection(db, `appDiscussions/${app}/posts`),
            store.orderBy('createdAt', 'desc'),
            store.limit(limitCount),
          ),
          (snapshot) => {
            setPosts(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }) as Message));
            setLoaded(true);
          },
          () => {
            setLoaded(true);
            setError(text.loadFailed);
          },
        );
      })
      .catch(() => !disposed && setError(text.connectFailed));
    return () => {
      disposed = true;
      stopAuth?.();
      stopPosts?.();
    };
  }, [app, limitCount, text]);

  async function signIn() {
    if (!ready || busy) return;
    setBusy(true);
    setError('');
    try {
      const { signInWithPopup } = await import('firebase/auth');
      const { auth, googleProvider } = getFirebase();
      await signInWithPopup(auth, googleProvider);
    } catch {
      setError(text.signInFailed);
    } finally {
      setBusy(false);
    }
  }

  async function signOutUser() {
    const { signOut } = await import('firebase/auth');
    await signOut(getFirebase().auth);
  }

  async function submit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!user || busy || !content.trim()) return;
    setBusy(true);
    setError('');
    try {
      const { addDoc, collection } = await import('firebase/firestore');
      await addDoc(collection(getFirebase().db, `appDiscussions/${app}/posts`), {
        authorId: user.uid,
        author: user.displayName || text.member,
        content: content.trim(),
        category,
        createdAt: Date.now(),
      });
      setContent('');
    } catch {
      setError(text.postFailed);
    } finally {
      setBusy(false);
    }
  }

  const query = search.trim().toLowerCase();
  const visible = posts.filter(
    (post) =>
      (filter === 'all' || post.category === filter) &&
      `${post.author} ${post.content}`.toLowerCase().includes(query),
  );

  return (
    <section className="board" aria-labelledby="board-heading">
      <header className="board-header">
        <div>
          <h2 id="board-heading">{text.title}</h2>
          <p className="board-muted">{text.about(name)}</p>
        </div>
        {user ? (
          <div className="board-account">
            <strong>{user.displayName || text.member}</strong>
            <button
              className="board-icon"
              type="button"
              aria-label={text.signOut}
              onClick={signOutUser}
            >
              <LogOut size={16} aria-hidden="true" />
            </button>
          </div>
        ) : (
          <button
            className="board-primary"
            type="button"
            disabled={!ready || busy}
            onClick={signIn}
          >
            {text.signIn}
          </button>
        )}
      </header>

      <div className="board-toolbar">
        <label className="board-field">
          <Search size={17} aria-hidden="true" />
          <input
            type="search"
            aria-label={text.search}
            placeholder={text.search}
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
        </label>
        <select
          className="board-select"
          aria-label={text.filter}
          value={filter}
          onChange={(event) => setFilter(event.target.value as typeof filter)}
        >
          <option value="all">{text.allTopics}</option>
          <option value="question">{text.categories.question}</option>
          <option value="bug">{text.categories.bug}</option>
          <option value="idea">{text.categories.idea}</option>
        </select>
      </div>

      {user && (
        <form className="board-card board-form" onSubmit={submit}>
          <textarea
            aria-label={text.message}
            placeholder={text.startAbout(name)}
            value={content}
            onChange={(event) => setContent(event.target.value)}
            maxLength={5000}
            required
          />
          <div className="board-form__row">
            <select
              className="board-select"
              aria-label={text.category}
              value={category}
              onChange={(event) => setCategory(event.target.value as Category)}
            >
              <option value="question">{text.categories.question}</option>
              <option value="bug">{text.categories.bug}</option>
              <option value="idea">{text.categories.idea}</option>
            </select>
            <button className="board-primary" disabled={busy || !content.trim()}>
              <Send size={16} aria-hidden="true" />
              {text.post}
            </button>
          </div>
          <small className="board-muted">{text.publicNotice}</small>
        </form>
      )}

      {error && (
        <p role="alert" className="board-error">
          {error}
        </p>
      )}
      {!loaded && !error && (
        <p role="status" className="board-muted">
          {text.loading}
        </p>
      )}
      {loaded && !error && visible.length === 0 && (
        <p className="board-empty">{posts.length ? text.noMatches : text.empty}</p>
      )}
      {visible.map((post) => (
        <Thread key={post.id} app={app} post={post} user={user} lang={lang} />
      ))}
      {posts.length === limitCount && (
        <button
          className="board-ghost"
          type="button"
          onClick={() => setLimitCount(limitCount + 20)}
        >
          {text.loadMore}
        </button>
      )}
    </section>
  );
}
