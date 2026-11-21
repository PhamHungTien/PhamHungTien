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
  category: { vi: 'Văn bản thành giọng nói', en: 'Offline text to speech' },
  title: {
    vi: 'Nghe sách và tài liệu khi không có mạng',
    en: 'Listen to books and documents offline',
  },
  subtitle: {
    vi: 'Chọn giọng đọc tiếng Việt, tiếng Anh hoặc một trong 15 ngôn ngữ khác. Nghe trên iPhone, iPad, Mac và Android.',
    en: 'Choose a voice in English, Vietnamese or 15 other languages. Listen on iPhone, iPad, Mac and Android.',
  },
  description: {
    vi: 'vTTS đọc EPUB, PDF, DOCX và văn bản bằng giọng có sẵn cho 17 ngôn ngữ. Nghe ngoại tuyến, chỉnh tốc độ, hẹn giờ tắt hoặc xuất âm thanh.',
    en: 'vTTS reads EPUB, PDF, DOCX and text aloud with built-in voices for 17 languages. Listen offline, change speed, set a sleep timer or export audio.',
  },
  platforms: ['ios', 'ipados', 'macos', 'android'],
  requirements: 'iOS 17+, iPadOS 17+, macOS 14+, Android 8+',
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
        vi: 'Dán văn bản hoặc nhập EPUB, PDF, DOCX và TXT. Có nhận dạng văn bản trên thiết bị cho PDF quét. Mỗi sách lưu vị trí nghe, ngôn ngữ, giọng và tốc độ riêng.',
        en: 'Paste text or import EPUB, PDF, DOCX and TXT. Use on-device text recognition for scanned PDFs. Each book remembers its own position, language, voice and speed.',
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
      title: { vi: 'Phòng thu giọng', en: 'Voice Studio' },
      description: {
        vi: 'Tạo giọng đọc từ bản thu của bạn ngay trên thiết bị. Khi bạn lưu, vTTS giữ hồ sơ giọng và xóa bản thu tạm của Phòng thu giọng.',
        en: 'Create a reading voice from your own recording on the device. When you save, vTTS keeps the voice profile and deletes the temporary Voice Studio recording.',
      },
    },
    {
      title: { vi: 'Dịch rồi nghe', en: 'Translate and listen' },
      description: {
        vi: 'Bản dịch được xử lý trên thiết bị và lưu thành sách mới. Trên thiết bị Apple, tính năng này cần iOS/iPadOS 18 hoặc macOS 15 trở lên. Android cần tải gói ngôn ngữ cho cặp dịch trước.',
        en: 'Translations run on the device and save as new books. On Apple devices, translation requires iOS/iPadOS 18 or macOS 15 or later. Android requires a language download for the translation pair first.',
      },
    },
    {
      title: { vi: 'Xuất âm thanh và sách nói', en: 'Audio and audiobook export' },
      description: {
        vi: 'Xuất tệp M4A, MP3, AAC, WAV hoặc sách nói M4B kèm mục lục chương.',
        en: 'Export M4A, MP3, AAC or WAV audio, or save a book as an M4B audiobook with chapter markers.',
      },
    },
    {
      title: { vi: 'Sao lưu và iCloud', en: 'Backup and iCloud' },
      description: {
        vi: 'Sao lưu thư viện ra tệp và khôi phục khi cần. Trên thiết bị Apple, bạn có thể chọn đồng bộ sách, vị trí nghe, hoạt động, bản nháp, lịch sử và từ điển phát âm qua iCloud.',
        en: 'Back up your library to a file and restore it when needed. On Apple devices, you can choose to sync books, reading positions, activity, drafts, history and your pronunciation dictionary with iCloud.',
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
    vi: 'Nếu cần hỗ trợ hoặc gặp lỗi phát âm, hãy gửi mô tả, phiên bản ứng dụng và một ví dụ ngắn mà bạn có thể chia sẻ.',
    en: 'For help or to report a pronunciation issue, send a description, your app version and a short example that you can share.',
  },
  faq: [
    {
      question: {
        vi: 'Có cần Internet để nghe sách không?',
        en: 'Do I need the internet to listen to a book?',
      },
      answer: {
        vi: 'Giọng đọc có sẵn khi cài ứng dụng. Bạn có thể nghe văn bản và sách đã nhập khi không có mạng. Một số tính năng tuỳ chọn như đồng bộ iCloud và tải gói ngôn ngữ dịch cần kết nối.',
        en: 'Voices come with the app. You can listen to text and imported books offline. Optional features such as iCloud sync and translation language downloads need a connection.',
      },
    },
    {
      question: {
        vi: 'Có thể nghe bản PDF chỉ toàn ảnh chụp không?',
        en: 'Can vTTS read a scanned PDF?',
      },
      answer: {
        vi: 'Khi nhập PDF quét, hãy chọn nhận dạng văn bản. Bạn có thể kiểm tra chữ được nhận dạng trước khi nghe, nhất là với trang mờ hoặc bố cục nhiều cột.',
        en: 'Choose text recognition when importing a scanned PDF. Review the recognized text before listening, especially on blurry pages or in multi-column layouts.',
      },
    },
    {
      question: { vi: 'vTTS Premium có thuê bao không?', en: 'Is vTTS Premium a subscription?' },
      answer: {
        vi: 'Premium là giao dịch mua một lần qua cửa hàng trên thiết bị. Gói này bỏ giới hạn nghe, lưu sách, xuất âm thanh và mở máy chủ mạng nội bộ.',
        en: 'Premium is a one-time purchase through your device’s store. It removes limits on listening, library size and exports and unlocks the local-network server.',
      },
    },
  ],
};

export default app;
