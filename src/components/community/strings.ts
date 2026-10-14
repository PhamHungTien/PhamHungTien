import type { Lang } from '../../data/types';

/** Strings for both discussion boards. Kept beside the islands so they ship only with them. */
export const boardText = {
  en: {
    title: 'Discussions',
    about: (name: string) => `Questions, ideas and feedback about ${name}.`,
    startAbout: (name: string) => `Start a conversation about ${name}…`,
    member: 'Member',
    signIn: 'Sign in with Google',
    signOut: 'Sign out',
    search: 'Search discussions',
    filter: 'Filter discussions',
    category: 'Category',
    allTopics: 'All topics',
    categories: { question: 'Question', bug: 'Bug report', idea: 'Idea' },
    message: 'Your message',
    post: 'Post',
    publicNotice: 'Posts are public. Keep personal information out of your message.',
    loading: 'Loading discussions…',
    empty: 'No discussions yet. Start the first one.',
    noMatches: 'No discussion matches your search.',
    loadMore: 'Load more',
    replies: 'Replies',
    noReplies: 'No replies yet.',
    yourReply: 'Your reply',
    writeReply: 'Write a reply…',
    send: 'Reply',
    signInToReply: 'Sign in to reply.',
    deletePost: 'Delete post',
    deleteReply: 'Delete reply',
    confirmDelete: 'Delete this message?',
    loadFailed: 'Discussions are unavailable right now. Try again later.',
    connectFailed: 'Could not connect to the discussion service.',
    signInFailed: 'Sign-in did not finish. Allow the sign-in window and try again.',
    postFailed: 'Your post was not published. Try again.',
    replyFailed: 'Your reply was not sent. Try again.',
    repliesFailed: 'Replies could not be loaded. Try again.',
    deleteFailed: 'The message was not deleted.',
  },
  vi: {
    title: 'Thảo luận',
    about: (name: string) => `Câu hỏi, ý tưởng và góp ý về ${name}.`,
    startAbout: (name: string) => `Bắt đầu thảo luận về ${name}…`,
    member: 'Thành viên',
    signIn: 'Đăng nhập Google',
    signOut: 'Đăng xuất',
    search: 'Tìm thảo luận',
    filter: 'Lọc thảo luận',
    category: 'Phân loại',
    allTopics: 'Tất cả chủ đề',
    categories: { question: 'Câu hỏi', bug: 'Báo lỗi', idea: 'Ý tưởng' },
    message: 'Nội dung',
    post: 'Đăng bài',
    publicNotice: 'Bài viết được công khai. Đừng gửi thông tin cá nhân.',
    loading: 'Đang tải thảo luận…',
    empty: 'Chưa có thảo luận nào. Hãy bắt đầu cuộc thảo luận đầu tiên.',
    noMatches: 'Không có thảo luận nào khớp với tìm kiếm.',
    loadMore: 'Xem thêm',
    replies: 'Phản hồi',
    noReplies: 'Chưa có phản hồi.',
    yourReply: 'Phản hồi của bạn',
    writeReply: 'Viết phản hồi…',
    send: 'Gửi',
    signInToReply: 'Đăng nhập để phản hồi.',
    deletePost: 'Xoá bài viết',
    deleteReply: 'Xoá phản hồi',
    confirmDelete: 'Xoá nội dung này?',
    loadFailed: 'Hiện không tải được thảo luận. Hãy thử lại sau.',
    connectFailed: 'Không kết nối được dịch vụ thảo luận.',
    signInFailed: 'Chưa đăng nhập được. Hãy cho phép cửa sổ đăng nhập rồi thử lại.',
    postFailed: 'Bài viết chưa được đăng. Hãy thử lại.',
    replyFailed: 'Phản hồi chưa được gửi. Hãy thử lại.',
    repliesFailed: 'Không tải được phản hồi. Hãy thử lại.',
    deleteFailed: 'Chưa xoá được nội dung.',
  },
} satisfies Record<Lang, unknown>;

export const formatDate = (time: number, lang: Lang) =>
  new Intl.DateTimeFormat(lang === 'vi' ? 'vi-VN' : 'en', { dateStyle: 'medium' }).format(time);

/** "3 min", "2 h", "5 days" or a date, for activity timestamps. */
export function formatRelative(time: number, lang: Lang) {
  const minutes = Math.floor((Date.now() - time) / 60_000);
  const rtf = new Intl.RelativeTimeFormat(lang === 'vi' ? 'vi' : 'en', {
    numeric: 'auto',
    style: 'short',
  });
  if (minutes < 1) return lang === 'vi' ? 'Vừa xong' : 'Just now';
  if (minutes < 60) return rtf.format(-minutes, 'minute');
  if (minutes < 60 * 24) return rtf.format(-Math.floor(minutes / 60), 'hour');
  if (minutes < 60 * 24 * 7) return rtf.format(-Math.floor(minutes / 1440), 'day');
  return formatDate(time, lang);
}
