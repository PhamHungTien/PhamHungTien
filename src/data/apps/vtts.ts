import type { App } from '../types';
import icon from '../../assets/apps/vtts/app-icon.png';

const app: App = {
  slug: 'vtts',
  name: 'vTTS',
  route: '/vTTS/',
  icon: icon,
  links: {
    stores: {
      appStore: 'https://apps.apple.com/app/id6817003401',
      googlePlay: 'https://play.google.com/store/apps/details?id=com.phamhungtien.vtts',
    },
    community: 'https://www.facebook.com/vTTSOffline',
  },
  accent: '#9255bd',
  tutorial: {
    youtubeId: 'nWz8zGtZRMo',
    title: { vi: 'Hướng dẫn nghe sách với vTTS', en: 'Listen to books with vTTS' },
    description: {
      vi: 'Thêm sách EPUB, nghe và theo dõi câu đang đọc, đổi giọng, ngôn ngữ, tốc độ, nhạc nền và hẹn giờ tắt. Có phụ đề tiếng Việt.',
      en: 'Import an EPUB, follow the highlighted sentence, change voice, language and speed, add background music and a sleep timer. Narrated in Vietnamese with subtitles.',
    },
  },
  category: { vi: 'Đọc sách & văn bản', en: 'Books & text to speech' },
  title: {
    vi: 'Để trang sách cất thành lời.',
    en: 'Let your books speak to you.',
  },
  subtitle: {
    vi: 'Nghe sách và văn bản bằng 17 ngôn ngữ, ngay trên thiết bị và không cần mạng.',
    en: 'Listen to books and text in 17 languages, on your device and offline.',
  },
  description: {
    vi: 'vTTS đọc sách và văn bản trên iPhone, iPad và Mac với giọng đọc có sẵn trong ứng dụng, dùng được khi không có mạng. Nhập EPUB, PDF, DOCX, theo dõi đoạn đang đọc, thêm nhạc nền, dịch sách và xuất sách nói M4B. Có cả bản Android.',
    en: 'vTTS reads books and text aloud on iPhone, iPad and Mac with voices built into the app and ready offline. Import EPUB, PDF and DOCX, follow the highlighted passage, add background music, translate books and export M4B audiobooks. Also on Android.',
  },
  platforms: ['ios', 'ipados', 'macos', 'android'],
  requirements: 'iOS & iPadOS 17+, macOS 14+; Android',
  appCategory: 'UtilitiesApplication',
  facts: [
    {
      label: { vi: 'Ngôn ngữ đọc', en: 'Speech languages' },
      value: { vi: '17 ngôn ngữ', en: '17 languages' },
    },
    {
      label: { vi: 'Giọng đọc', en: 'Speech' },
      value: { vi: 'Trên thiết bị', en: 'On device' },
    },
    {
      label: { vi: 'Định dạng', en: 'Formats' },
      value: { vi: 'EPUB, PDF, DOCX, TXT', en: 'EPUB, PDF, DOCX, TXT' },
    },
    {
      label: { vi: 'Premium', en: 'Premium' },
      value: { vi: 'Mua một lần', en: 'One-time purchase' },
    },
  ],
  features: [
    {
      title: { vi: 'Nghe theo cách của bạn', en: 'Listen your way' },
      description: {
        vi: 'Giọng đọc và giao diện 17 ngôn ngữ, gồm tiếng Việt và tiếng Anh. Đoạn đang đọc được làm nổi bật; chạm vào một câu để nghe từ đó.',
        en: 'Voices and interface in 17 languages, including English and Vietnamese. The passage being read is highlighted; tap any sentence to listen from there.',
      },
    },
    {
      title: { vi: 'Sách và tài liệu', en: 'Books and documents' },
      description: {
        vi: 'Dán văn bản hoặc nhập EPUB, PDF, DOCX, TXT và các định dạng khác. Mỗi sách nhớ vị trí, ngôn ngữ, giọng và tốc độ riêng.',
        en: 'Paste text or import EPUB, PDF, DOCX, TXT and more. Each book remembers its own position, language, voice and speed.',
      },
    },
    {
      title: { vi: 'Nhạc nền và hẹn giờ', en: 'Music and sleep timer' },
      description: {
        vi: 'Chỉnh tốc độ ngay khi nghe, thêm nhạc nền và hẹn giờ tắt.',
        en: 'Change speed while listening, add background music and set a sleep timer.',
      },
    },
    {
      title: { vi: 'Dấu trang, ghi chú, thống kê', en: 'Bookmarks, notes and stats' },
      description: {
        vi: 'Tìm trong sách, thêm dấu trang và ghi chú; theo dõi thời gian nghe, mục tiêu mỗi ngày, chuỗi ngày và thành tựu.',
        en: 'Search within books, add bookmarks and notes, and track listening time, daily goals, streaks and achievements.',
      },
    },
    {
      title: { vi: 'Dịch rồi nghe', en: 'Translate and listen' },
      description: {
        vi: 'Dịch văn bản và sách ngay trên thiết bị; bản dịch được lưu thành sách mới, giữ nguyên bản gốc. Cần iOS/iPadOS 18 hoặc macOS 15 trở lên.',
        en: 'Translate text and books on your device; the translation is saved as a new book and the original stays intact. Requires iOS/iPadOS 18 or macOS 15 or later.',
      },
    },
    {
      title: { vi: 'Xuất âm thanh và sách nói', en: 'Audio and audiobook export' },
      description: {
        vi: 'Xuất M4A, MP3, AAC, WAV hoặc sách nói M4B có chương.',
        en: 'Export M4A, MP3, AAC or WAV audio, or an M4B audiobook with chapters.',
      },
    },
    {
      title: { vi: 'Sao lưu và iCloud', en: 'Backup and iCloud' },
      description: {
        vi: 'Sao lưu thư viện ra tệp và khôi phục khi cần. Tự chọn dữ liệu đồng bộ iCloud: hoạt động, sách và vị trí đọc, bản nháp, lịch sử, từ điển phát âm.',
        en: 'Back up your library to a file and restore it when needed. Choose what syncs with iCloud: activity, books and positions, drafts, history and your pronunciation dictionary.',
      },
    },
    {
      title: { vi: 'Riêng tư, ngoại tuyến', en: 'Private and offline' },
      description: {
        vi: 'Giọng đọc được tạo trên thiết bị, không cần dịch vụ đám mây. Máy chủ LAN là tuỳ chọn, mặc định tắt và có mã truy cập.',
        en: 'Speech is generated on your device without a cloud service. The optional LAN server is off by default and protected by an access token.',
      },
    },
    {
      title: { vi: 'Dùng thử miễn phí', en: 'Free to try' },
      description: {
        vi: 'Bản miễn phí có giới hạn sử dụng. vTTS Premium mua một lần để nghe, lưu sách và xuất âm thanh không giới hạn, kèm máy chủ LAN. Không thuê bao.',
        en: 'The free version has usage limits. vTTS Premium is a one-time purchase for unlimited listening, library storage and exports, plus LAN hosting. No subscription.',
      },
    },
  ],
  support: {
    vi: 'Cần hỗ trợ hoặc có đoạn đọc chưa tốt? Gửi mô tả và phiên bản ứng dụng; bạn không cần gửi cả cuốn sách hay tài liệu riêng tư.',
    en: 'Need help or found a passage that sounds wrong? Send a description and your app version; there is no need to send an entire book or private document.',
  },
};

export default app;
