import { useEffect, useState } from 'react';
import { MessageCircle, Send, Search, Trash2, LogOut } from 'lucide-react';
import type { User, Auth } from 'firebase/auth';
import type { Firestore } from 'firebase/firestore';
import type { Lang } from '../types';

type Post = {
  id: string;
  authorId: string;
  author: string;
  content: string;
  createdAt: number;
  category?: string;
};
type Connection = { auth: Auth; db: Firestore };
const config = {
  apiKey: 'AIzaSyC9n94D10gIhWOcMDIxY9VGVd74Z_KwV9s',
  authDomain: 'phtv-12f95.firebaseapp.com',
  projectId: 'phtv-12f95',
  appId: '1:284029899446:web:e35d687e96984da208cc17',
};
const isAdmin = (user: User | null) =>
  !!user?.emailVerified &&
  ['contact@phamhungtien.com', 'hungtien10a7@gmail.com'].includes(user.email ?? '');

function Thread({
  post,
  app,
  connection,
  user,
  lang,
}: {
  post: Post;
  app: string;
  connection: Connection;
  user: User | null;
  lang: Lang;
}) {
  const [open, setOpen] = useState(false);
  const [replies, setReplies] = useState<Post[]>([]);
  const [content, setContent] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const vi = lang === 'vi';
  const path = `appDiscussions/${app}/posts/${post.id}/replies`;
  useEffect(() => {
    if (!open) return;
    let stop: (() => void) | undefined;
    let disposed = false;
    import('firebase/firestore').then(({ collection, onSnapshot, query, orderBy, limit }) => {
      if (disposed) return;
      stop = onSnapshot(
        query(collection(connection.db, path), orderBy('createdAt', 'asc'), limit(100)),
        (snapshot) => {
          setReplies(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }) as Post));
        },
        () =>
          setError(
            vi
              ? 'Không thể tải phản hồi. Hãy thử lại.'
              : 'Could not load replies. Please try again.',
          ),
      );
    });
    return () => {
      disposed = true;
      stop?.();
    };
  }, [open, path, connection.db, vi]);
  async function remove(id?: string) {
    if (!window.confirm(vi ? 'Xóa nội dung này?' : 'Delete this message?')) return;
    try {
      const { deleteDoc, doc } = await import('firebase/firestore');
      await deleteDoc(
        doc(connection.db, id ? `${path}/${id}` : `appDiscussions/${app}/posts/${post.id}`),
      );
    } catch {
      setError(vi ? 'Không thể xóa nội dung.' : 'Could not delete this message.');
    }
  }
  async function reply(event: React.FormEvent) {
    event.preventDefault();
    if (!user || busy || !content.trim()) return;
    setBusy(true);
    setError('');
    try {
      const { addDoc, collection } = await import('firebase/firestore');
      await addDoc(collection(connection.db, path), {
        authorId: user.uid,
        author: user.displayName || 'Member',
        content: content.trim(),
        createdAt: Date.now(),
      });
      setContent('');
    } catch {
      setError(
        vi
          ? 'Không thể gửi phản hồi. Hãy thử lại.'
          : 'Could not send your reply. Please try again.',
      );
    } finally {
      setBusy(false);
    }
  }
  const date = (time: number) =>
    new Intl.DateTimeFormat(vi ? 'vi-VN' : 'en', { dateStyle: 'medium' }).format(time);
  return (
    <article className="discussion-post">
      <header>
        <div>
          <strong>{post.author}</strong>
          <span>
            {date(post.createdAt)} ·{' '}
            {post.category === 'bug'
              ? vi
                ? 'Báo lỗi'
                : 'Bug report'
              : post.category === 'idea'
                ? vi
                  ? 'Ý tưởng'
                  : 'Idea'
                : vi
                  ? 'Câu hỏi'
                  : 'Question'}
          </span>
        </div>
        {(user?.uid === post.authorId || isAdmin(user)) && (
          <button
            className="discussion-icon"
            aria-label={vi ? 'Xóa bài viết' : 'Delete post'}
            onClick={() => remove()}
          >
            <Trash2 size={16} />
          </button>
        )}
      </header>
      <p>{post.content}</p>
      <button
        className="discussion-reply-toggle"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
      >
        <MessageCircle size={16} />
        {vi ? 'Phản hồi' : 'Replies'}
      </button>
      {open && (
        <div className="discussion-replies">
          {replies.length === 0 && (
            <p className="discussion-muted">{vi ? 'Chưa có phản hồi.' : 'No replies yet.'}</p>
          )}
          {replies.map((item) => (
            <div key={item.id} className="discussion-reply">
              <header>
                <strong>{item.author}</strong>
                <span>{date(item.createdAt)}</span>
                {(user?.uid === item.authorId || isAdmin(user)) && (
                  <button
                    className="discussion-icon"
                    aria-label={vi ? 'Xóa phản hồi' : 'Delete reply'}
                    onClick={() => remove(item.id)}
                  >
                    <Trash2 size={14} />
                  </button>
                )}
              </header>
              <p>{item.content}</p>
            </div>
          ))}
          {user ? (
            <form onSubmit={reply}>
              <textarea
                aria-label={vi ? 'Phản hồi của bạn' : 'Your reply'}
                placeholder={vi ? 'Viết phản hồi…' : 'Write a reply…'}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                maxLength={5000}
                required
              />
              <button className="discussion-primary" disabled={busy || !content.trim()}>
                <Send size={16} />
                {vi ? 'Gửi' : 'Reply'}
              </button>
            </form>
          ) : (
            <p className="discussion-muted">
              {vi ? 'Đăng nhập để phản hồi.' : 'Sign in to reply.'}
            </p>
          )}
        </div>
      )}
      {error && <p role="alert">{error}</p>}
    </article>
  );
}

export default function DiscussionSection({
  app,
  name,
  lang,
}: {
  app: string;
  name: string;
  lang: Lang;
}) {
  const vi = lang === 'vi';
  const [connection, setConnection] = useState<Connection | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('question');
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [busy, setBusy] = useState(false);
  const [limitCount, setLimitCount] = useState(20);
  useEffect(() => {
    let disposed = false;
    let stopAuth: (() => void) | undefined;
    let stopPosts: (() => void) | undefined;
    Promise.all([import('firebase/app'), import('firebase/auth'), import('firebase/firestore')])
      .then(([sdk, authSdk, store]) => {
        if (disposed) return;
        const instance = sdk.getApps().length ? sdk.getApp() : sdk.initializeApp(config);
        const auth = authSdk.getAuth(instance);
        const db = store.getFirestore(instance);
        setConnection({ auth, db });
        stopAuth = authSdk.onAuthStateChanged(auth, setUser);
        stopPosts = store.onSnapshot(
          store.query(
            store.collection(db, `appDiscussions/${app}/posts`),
            store.orderBy('createdAt', 'desc'),
            store.limit(limitCount),
          ),
          (snapshot) => {
            setPosts(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }) as Post));
            setLoaded(true);
          },
          () => {
            setLoaded(true);
            setError(
              vi
                ? 'Không thể tải thảo luận. Hãy thử lại sau.'
                : 'Discussions are unavailable. Please try again later.',
            );
          },
        );
      })
      .catch(() => {
        if (!disposed) setError(vi ? 'Không thể kết nối.' : 'Could not connect.');
      });
    return () => {
      disposed = true;
      stopAuth?.();
      stopPosts?.();
    };
  }, [app, limitCount, vi]);
  async function login() {
    if (!connection || busy) return;
    setBusy(true);
    setError('');
    try {
      const { signInWithPopup, GoogleAuthProvider } = await import('firebase/auth');
      await signInWithPopup(connection.auth, new GoogleAuthProvider());
    } catch {
      setError(
        vi
          ? 'Chưa đăng nhập được. Hãy cho phép cửa sổ đăng nhập rồi thử lại.'
          : 'Sign-in did not finish. Allow the sign-in window and try again.',
      );
    } finally {
      setBusy(false);
    }
  }
  async function submit(event: React.FormEvent) {
    event.preventDefault();
    if (!user || !connection || busy || !content.trim()) return;
    setBusy(true);
    setError('');
    try {
      const { collection, addDoc } = await import('firebase/firestore');
      await addDoc(collection(connection.db, `appDiscussions/${app}/posts`), {
        authorId: user.uid,
        author: user.displayName || 'Member',
        content: content.trim(),
        category,
        createdAt: Date.now(),
      });
      setContent('');
    } catch {
      setError(
        vi ? 'Không thể đăng bài. Hãy thử lại.' : 'Could not publish your post. Please try again.',
      );
    } finally {
      setBusy(false);
    }
  }
  const visible = posts.filter(
    (post) =>
      (filter === 'all' || post.category === filter) &&
      `${post.author} ${post.content}`.toLowerCase().includes(search.toLowerCase()),
  );
  return (
    <section
      id="community"
      className="product-section discussion-section"
      aria-labelledby="discussion-heading"
    >
      <div className="discussion-heading">
        <div>
          <h2 id="discussion-heading">{vi ? 'Thảo luận' : 'Discussions'}</h2>
          <p>
            {vi
              ? `Câu hỏi, ý tưởng và phản hồi về ${name}.`
              : `Questions, ideas and feedback about ${name}.`}
          </p>
        </div>
        {user ? (
          <div className="discussion-account">
            <strong>{user.displayName || 'Member'}</strong>
            <button
              className="discussion-icon"
              aria-label={vi ? 'Đăng xuất' : 'Sign out'}
              onClick={async () => {
                const { signOut } = await import('firebase/auth');
                if (connection) await signOut(connection.auth);
              }}
            >
              <LogOut size={16} />
            </button>
          </div>
        ) : (
          <button className="discussion-primary" disabled={!connection || busy} onClick={login}>
            {vi ? 'Đăng nhập Google' : 'Sign in with Google'}
          </button>
        )}
      </div>
      <div className="discussion-filters">
        <label>
          <Search size={17} />
          <input
            type="search"
            aria-label={vi ? 'Tìm thảo luận' : 'Search discussions'}
            placeholder={vi ? 'Tìm thảo luận…' : 'Search discussions…'}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </label>
        <select
          aria-label={vi ? 'Lọc thảo luận' : 'Filter discussions'}
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="all">{vi ? 'Tất cả' : 'All topics'}</option>
          <option value="question">{vi ? 'Câu hỏi' : 'Questions'}</option>
          <option value="bug">{vi ? 'Báo lỗi' : 'Bug reports'}</option>
          <option value="idea">{vi ? 'Ý tưởng' : 'Ideas'}</option>
        </select>
      </div>
      {user && (
        <form className="discussion-composer" onSubmit={submit}>
          <textarea
            aria-label={vi ? 'Nội dung thảo luận' : 'Discussion message'}
            placeholder={vi ? `Chia sẻ về ${name}…` : `Start a conversation about ${name}…`}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            maxLength={5000}
            required
          />
          <div>
            <select
              aria-label={vi ? 'Loại bài viết' : 'Post category'}
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="question">{vi ? 'Câu hỏi' : 'Question'}</option>
              <option value="bug">{vi ? 'Báo lỗi' : 'Bug report'}</option>
              <option value="idea">{vi ? 'Ý tưởng' : 'Idea'}</option>
            </select>
            <button className="discussion-primary" disabled={busy || !content.trim()}>
              <Send size={16} />
              {vi ? 'Đăng bài' : 'Post discussion'}
            </button>
          </div>
          <small>
            {vi
              ? 'Bài viết được công khai. Không gửi thông tin cá nhân.'
              : 'Posts are public. Keep personal information out of your message.'}
          </small>
        </form>
      )}
      {error && (
        <p role="alert" className="discussion-error">
          {error}
        </p>
      )}
      {!loaded && !error && <p role="status">{vi ? 'Đang tải…' : 'Loading discussions…'}</p>}
      {loaded && !error && visible.length === 0 && (
        <p className="discussion-empty">
          {posts.length
            ? vi
              ? 'Không tìm thấy bài phù hợp.'
              : 'No matching discussions.'
            : vi
              ? 'Hãy bắt đầu cuộc thảo luận đầu tiên.'
              : 'Start the first conversation.'}
        </p>
      )}
      {connection &&
        visible.map((post) => (
          <Thread
            key={post.id}
            post={post}
            app={app}
            connection={connection}
            user={user}
            lang={lang}
          />
        ))}
      {posts.length === limitCount && (
        <button className="discussion-reply-toggle" onClick={() => setLimitCount(limitCount + 20)}>
          {vi ? 'Xem thêm' : 'Load more'}
        </button>
      )}
    </section>
  );
}
