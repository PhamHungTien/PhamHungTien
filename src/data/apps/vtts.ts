import type { App } from '../types';
import icon from '../../assets/apps/vtts/app-icon.png';
import header1 from '../../assets/apps/vtts/appstore/header-1.jpg';
import ipad1 from '../../assets/apps/vtts/appstore/ipad-1.jpg';
import ipad2 from '../../assets/apps/vtts/appstore/ipad-2.jpg';
import ipad3 from '../../assets/apps/vtts/appstore/ipad-3.jpg';
import iphone1 from '../../assets/apps/vtts/appstore/iphone-1.jpg';
import iphone2 from '../../assets/apps/vtts/appstore/iphone-2.jpg';
import iphone3 from '../../assets/apps/vtts/appstore/iphone-3.jpg';
import mac1 from '../../assets/apps/vtts/appstore/mac-1.jpg';

const app: App = {
  slug: 'vtts',
  name: 'vTTS',
  route: '/vTTS/',
  icon: icon,
  heroImage: header1,
  gallery: [
    { src: ipad1, alt: { vi: 'Giao diện iPad · 1', en: 'iPad experience · 1' } },
    { src: ipad2, alt: { vi: 'Giao diện iPad · 2', en: 'iPad experience · 2' } },
    { src: ipad3, alt: { vi: 'Giao diện iPad · 3', en: 'iPad experience · 3' } },
    { src: iphone1, alt: { vi: 'Giao diện iPhone · 1', en: 'iPhone experience · 1' } },
    { src: iphone2, alt: { vi: 'Giao diện iPhone · 2', en: 'iPhone experience · 2' } },
    { src: iphone3, alt: { vi: 'Giao diện iPhone · 3', en: 'iPhone experience · 3' } },
    { src: mac1, alt: { vi: 'Giao diện Mac · 1', en: 'Mac experience · 1' } },
  ],
  links: {
    stores: { appStore: 'https://apps.apple.com/app/id6817003401' },
    community: 'https://www.facebook.com/vTTSOffline',
  },
  accent: '#9255bd',
  videoUrl: '/media/vtts/promo-real-16x9.mp4',
  videoPosters: {
    vi: '/media/vtts/promo-real-poster.webp',
    en: '/media/vtts/promo-real-poster.webp',
  },
  videoPortrait: false,
  videoDescription: {
    vi: 'Theo dõi đoạn đang đọc, khám phá thư viện và điều khiển từ Dynamic Island, màn hình khóa. Cảnh hệ thống được quay trên iPhone thật.',
    en: 'Meet vTTS in 30 seconds. Turn your books and words into a listening experience.',
  },
  tutorial: {
    youtubeId: 'nWz8zGtZRMo',
    title: { vi: 'Hướng dẫn nghe sách với vTTS', en: 'Listen to books with vTTS' },
    description: {
      vi: 'Thêm sách EPUB, nghe và theo dõi câu đang đọc, đổi giọng, ngôn ngữ, tốc độ, nhạc nền và hẹn giờ tắt. Có phụ đề tiếng Việt.',
      en: 'Import an EPUB, follow the highlighted sentence, change voice, language and speed, add background music and a sleep timer. Narrated in Vietnamese with subtitles.',
    },
  },
  category: {
    vi: 'Đọc sách & văn bản',
    en: 'Books & text to speech',
  },
  title: {
    vi: 'Để trang sách cất thành lời.',
    en: 'Let your books speak to you.',
  },
  subtitle: {
    vi: 'Nghe sách và văn bản bằng giọng Việt, Anh ngay trên thiết bị. Theo dõi từng đoạn, thêm nhạc nền và nghe tiếp từ nơi đã dừng.',
    en: 'Listen to books and text in Vietnamese and English, on your device. Follow each passage, add background music, and pick up where you left off.',
  },
  description: {
    vi: 'vTTS đọc sách EPUB và văn bản ngoại tuyến trên iPhone, iPad và Mac. Giọng Việt và Anh, điều chỉnh tốc độ khi phát, nhạc nền, hẹn giờ và xuất âm thanh.',
    en: 'vTTS reads EPUB books and text offline on iPhone, iPad, and Mac. Vietnamese and English voices, live speed adjustment, background music, sleep timer, and audio export.',
  },
  platforms: ['ios', 'ipados', 'macos'],
  requirements: 'iOS & iPadOS 17+, macOS 14+',
  appCategory: 'UtilitiesApplication',
  facts: [
    {
      label: {
        vi: 'Ngôn ngữ đọc',
        en: 'Speech languages',
      },
      value: {
        vi: 'Tiếng Việt & Anh',
        en: 'Vietnamese & English',
      },
    },
    {
      label: {
        vi: 'Xử lý giọng đọc',
        en: 'Speech processing',
      },
      value: {
        vi: 'Trên thiết bị',
        en: 'On device',
      },
    },
    {
      label: {
        vi: 'Thư viện',
        en: 'Library',
      },
      value: {
        vi: 'Sách EPUB',
        en: 'EPUB books',
      },
    },
    {
      label: {
        vi: 'Xuất âm thanh',
        en: 'Audio export',
      },
      value: {
        vi: 'WAV · M4A · AAC · MP3',
        en: 'WAV · M4A · AAC · MP3',
      },
    },
  ],
  features: [
    {
      title: { vi: 'Sách nói M4B, widget & Siri', en: 'M4B audiobooks, widgets & Siri' },
      description: {
        vi: 'Xuất cả sách thành M4B có chương, dùng nhạc nền của bạn, điều khiển từ widget và tiếp tục nghe bằng Siri.',
        en: 'Export a whole book as a chaptered M4B audiobook, add your own background music, and continue listening with widgets and Siri.',
      },
    },
    {
      title: {
        vi: 'Giọng Việt và Anh, ngay trên thiết bị',
        en: 'Vietnamese and English, on device',
      },
      description: {
        vi: 'Chọn giọng đọc và kéo thanh tốc độ ngay khi đang nghe. Giọng đọc được tạo từ tài nguyên đi kèm ứng dụng, không cần tải thêm mô hình.',
        en: 'Choose a voice and adjust speed while listening. Speech uses resources bundled with the app, with no additional model downloads.',
      },
    },
    {
      title: {
        vi: 'Thư viện sách của bạn',
        en: 'Your own book library',
      },
      description: {
        vi: 'Nhập EPUB, tìm theo tên sách hoặc tác giả, lưu yêu thích và nghe tiếp từ nơi đã dừng. Chạm vào một đoạn để bắt đầu nghe từ đó.',
        en: 'Import EPUB books, search by title or author, save favorites, and pick up where you left off. Tap a passage to start listening there.',
      },
    },
    {
      title: {
        vi: 'Văn bản và tài liệu',
        en: 'Text and documents',
      },
      description: {
        vi: 'Dán văn bản hoặc nhập TXT, Markdown, HTML, RTF, PDF, DOCX, ODT và FB2. Xem lại lịch sử đọc. Khả năng nhập phụ thuộc nội dung tệp; tệp được bảo vệ có thể không được hỗ trợ.',
        en: 'Paste text or import TXT, Markdown, HTML, RTF, PDF, DOCX, ODT, and FB2. Revisit reading history. Import support depends on file content; protected files may not be supported.',
      },
    },
    {
      title: {
        vi: 'Nhạc nền và hẹn giờ tắt',
        en: 'Background music and sleep timer',
      },
      description: {
        vi: 'Thêm nhạc piano, điều chỉnh âm lượng riêng và chọn thời gian dừng phù hợp với bạn.',
        en: 'Add piano music, set its volume independently, and choose when listening stops.',
      },
    },
    {
      title: {
        vi: 'Xuất âm thanh theo ý bạn',
        en: 'Export audio your way',
      },
      description: {
        vi: 'Lưu âm thanh dưới dạng WAV, M4A, AAC hoặc MP3. Chọn xuất kèm nhạc nền hoặc chỉ giữ giọng đọc.',
        en: 'Save audio as WAV, M4A, AAC, or MP3. Include background music or export speech on its own.',
      },
    },
    {
      title: {
        vi: 'Điều khiển từ màn hình khóa',
        en: 'Lock Screen playback controls',
      },
      description: {
        vi: 'Tạm dừng và tiếp tục bằng trình phát hệ thống. Hỗ trợ Dynamic Island trên iPhone tương thích.',
        en: 'Pause and resume with system media controls, including Dynamic Island on compatible iPhones.',
      },
    },
    {
      title: {
        vi: 'Xử lý ngoại tuyến',
        en: 'Offline speech processing',
      },
      description: {
        vi: 'Không cần internet để tạo giọng đọc. Sách, bản nháp và lịch sử được lưu trên thiết bị; bạn chủ động chọn nội dung muốn xuất hoặc chia sẻ.',
        en: 'Generate speech without an internet connection. Books, drafts, and history are stored on your device; you choose what to export or share.',
      },
    },
    {
      title: {
        vi: 'Máy chủ LAN tùy chọn',
        en: 'Optional LAN server',
      },
      description: {
        vi: 'API đọc văn bản trong mạng nội bộ, mặc định tắt và yêu cầu token. Trên iPhone/iPad, cần giữ ứng dụng ở màn hình trước. Chỉ bật trong mạng bạn tin cậy.',
        en: 'A local-network speech API, off by default and protected by a token. On iPhone/iPad, keep the app in the foreground. Enable it only on a network you trust.',
      },
    },
  ],
  support: {
    vi: 'Cần hỗ trợ hoặc có đoạn đọc chưa tốt? Gửi mô tả và phiên bản ứng dụng; bạn không cần gửi cả cuốn sách hay tài liệu riêng tư.',
    en: 'Need help or found a passage that sounds wrong? Send a description and your app version; there is no need to send an entire book or private document.',
  },
};

export default app;
