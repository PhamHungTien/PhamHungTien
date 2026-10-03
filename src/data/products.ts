import type { Product, ProductSlug } from '../types';

import phtvIcon from '../../assets/phtv-icon.webp';
import phtvPreview from '../../assets/phtv-social-preview.webp';
import lunarvIcon from '../../assets/lunarv-icon.png';
import lunarvHero from '../../LunarV/assets/lunarv-ipad.jpg';
import lunarvVision from '../../LunarV/assets/lunarv-vision.jpg';
import lunarvReviewOne from '../../LunarV/assets/ui-review-1.png';
import lunarvReviewTwo from '../../LunarV/assets/ui-review-2.png';
import padCodeIcon from '../../PadCodeAI/assets/app-icon.png';
import padCodeHero from '../../PadCodeAI/assets/ipad-editor.png';
import padCodeTerminal from '../../PadCodeAI/assets/ipad-terminal.png';
import padCodePhone from '../../PadCodeAI/assets/iphone-home.png';
import padNotesIcon from '../../PadNotesAI/assets/app-icon.png';
import padNotesHero from '../../PadNotesAI/assets/ipad-editor.png';
import padNotesWorkspace from '../../PadNotesAI/assets/ipad-workspace.png';
import nasIcon from '../../MyNASManager/assets/app-icon.png';
import nasHero from '../../MyNASManager/assets/ipad-hero.png';
import nasDashboard from '../../MyNASManager/assets/ipad-screenshot3.png';
import nasPhoneOne from '../../MyNASManager/assets/iphone-screenshot1.png';
import nasPhoneTwo from '../../MyNASManager/assets/iphone-screenshot2.png';
import blockIcon from '../../LunarBlock/assets/app-icon.png';
import blockHero from '../../LunarBlock/assets/lunarblock-hero.png';
import blockShowcase from '../../LunarBlock/assets/lunarblock-showcase.png';
import blockModes from '../../LunarBlock/assets/lunarblock-modes.png';
import blockRank from '../../LunarBlock/assets/lunarblock-rank.png';
import vttsIcon from '../../vTTS/assets/app-icon.png';
import vttsMacHero from '../../vTTS/assets/mac-main.png';
import vttsPhoneScreenshot from '../../vTTS/assets/iphone-main.png';
import vttsPhoneLibrary from '../../vTTS/assets/iphone-library.png';

export const products: Product[] = [
  {
    slug: 'phtv',
    name: 'PHTV',
    route: '/PHTV/',
    icon: phtvIcon,
    heroImage: phtvPreview,
    gallery: [
      { src: phtvPreview, alt: { vi: 'Ảnh giới thiệu PHTV', en: 'PHTV preview image' } }
    ],
    accent: '#d71f2a',
    githubUrl: 'https://github.com/PhamHungTien/PHTV',
    isStandalone: true,
    category: { vi: 'Bộ gõ macOS', en: 'macOS input method' },
    title: {
      vi: 'Bộ gõ tiếng Việt nhanh, riêng tư cho macOS.',
      en: 'Fast, private Vietnamese typing for macOS.'
    },
    subtitle: {
      vi: 'Precision Hybrid Typing Vietnamese',
      en: 'Precision Hybrid Typing Vietnamese'
    },
    description: {
      vi: 'Gõ tiếng Việt ổn định, offline và linh hoạt trên Mac, với tải đúng bản Apple Silicon hoặc Intel.',
      en: 'A stable, offline, flexible Vietnamese input method for Mac, with correct Apple Silicon and Intel downloads.'
    },
    ctaLabel: { vi: 'Mở PHTV', en: 'Open PHTV' },
    secondaryCtaLabel: { vi: 'GitHub', en: 'GitHub' },
    platforms: { vi: 'macOS', en: 'macOS' },
    operatingSystem: 'macOS 14.0 or later',
    appCategory: 'UtilitiesApplication',
    facts: [
      { label: { vi: 'Nền tảng', en: 'Platform' }, value: { vi: 'macOS 14+', en: 'macOS 14+' } },
      { label: { vi: 'Kiến trúc', en: 'Architecture' }, value: { vi: 'Apple Silicon / Intel', en: 'Apple Silicon / Intel' } },
      { label: { vi: 'Riêng tư', en: 'Privacy' }, value: { vi: 'Xử lý offline', en: 'Offline processing' } }
    ],
    features: [
      {
        title: { vi: 'Offline và riêng tư', en: 'Offline and private' },
        description: { vi: 'Không gửi nội dung gõ lên máy chủ bên ngoài.', en: 'Does not send typing content to external servers.' }
      },
      {
        title: { vi: 'Gọn trên macOS', en: 'Native on macOS' },
        description: { vi: 'Thiết kế cho menu bar, phím tắt và quyền Accessibility của macOS.', en: 'Designed for the macOS menu bar, shortcuts, and Accessibility permissions.' }
      },
      {
        title: { vi: 'Tải đúng binary', en: 'Correct binary downloads' },
        description: { vi: 'Tách bản Apple Silicon và Intel để cài đặt rõ ràng hơn.', en: 'Separate Apple Silicon and Intel builds make installation clearer.' }
      }
    ],
    support: { vi: 'Thảo luận, báo lỗi hoặc gửi góp ý trên GitHub.', en: 'Discuss, report issues, or send feedback on GitHub.' }
  },
  {
    slug: 'vtts',
    name: 'vTTS',
    route: '/vTTS/',
    icon: vttsIcon,
    heroImage: vttsMacHero,
    gallery: [
      { src: vttsMacHero, alt: { vi: 'Giao diện vTTS trên macOS với tính năng Thư viện sách và quản lý tài liệu', en: 'vTTS interface on macOS with book library and document management' } },
      { src: vttsPhoneScreenshot, alt: { vi: 'Giao diện vTTS trên iPhone với danh sách 11 giọng đọc AI tiếng Việt tự nhiên', en: 'vTTS interface on iPhone with 11 natural Kokoro Vietnamese AI voices' } },
      { src: vttsPhoneLibrary, alt: { vi: 'Tính năng Thư viện đọc sách offline trên iPhone', en: 'Offline book library reading feature on iPhone' } }
    ],
    accent: '#6366f1',
    appStoreUrl: 'https://apps.apple.com/app/id6817003401',
    videoUrl: '/vTTS/vtts-demo.mp4',
    videoDescription: {
      vi: 'Xem video thực tế quá trình vTTS đọc văn bản tiếng Việt, đổi giọng đọc AI và xuất tệp âm thanh hoàn toàn ngoại tuyến trên máy.',
      en: 'Watch vTTS perform text-to-speech synthesis, voice switching, and audio export completely offline on device.'
    },
    category: { vi: 'Giọng đọc AI & Sách nói', en: 'AI Speech & Audiobooks' },
    title: {
      vi: 'Đọc văn bản & sách nói bằng AI ngoại tuyến trên thiết bị.',
      en: 'On-device AI speech synthesis & offline audiobook library.'
    },
    subtitle: {
      vi: '11 giọng đọc AI tự nhiên, thư viện sách thông minh, 100% bảo mật ngoại tuyến.',
      en: '11 natural AI voices, smart book library, 100% private & offline on Apple devices.'
    },
    description: {
      vi: 'vTTS là ứng dụng chuyển văn bản thành giọng nói và đọc sách nói AI hoạt động 100% offline trên iPhone, iPad, Mac và Apple Vision Pro. Tích hợp 11 giọng đọc tiếng Việt tự nhiên chuẩn Kokoro, tính năng Thư viện sách thông minh hỗ trợ tiểu thuyết hàng ngàn chương, xuất file âm thanh M4A/WAV và máy chủ LAN nội bộ tương thích OpenAI API.',
      en: 'vTTS is a 100% on-device AI text-to-speech and audiobook reader for iPhone, iPad, Mac, and Apple Vision Pro. Features 11 natural Vietnamese voices powered by Kokoro, a smart book library for multi-chapter novels, high-quality M4A/WAV audio export, and an OpenAI-compatible local LAN server.'
    },
    ctaLabel: { vi: 'Xem trên App Store', en: 'View on App Store' },
    platforms: { vi: 'iOS, iPadOS, macOS, visionOS', en: 'iOS, iPadOS, macOS, visionOS' },
    operatingSystem: 'iOS 17+, iPadOS 17+, macOS 14+, visionOS 1+',
    appCategory: 'UtilitiesApplication',
    facts: [
      { label: { vi: 'Giọng đọc', en: 'Voices' }, value: { vi: '11 Giọng AI (Nam & Nữ)', en: '11 AI Voices (M & F)' } },
      { label: { vi: 'Hoạt động', en: 'Operation' }, value: { vi: '100% Offline On-Device', en: '100% Offline On-Device' } },
      { label: { vi: 'Tính năng', en: 'Features' }, value: { vi: 'Văn bản & Thư viện sách', en: 'TTS & Book Library' } },
      { label: { vi: 'Xuất & LAN', en: 'Export & LAN' }, value: { vi: 'M4A, WAV, OpenAI API', en: 'M4A, WAV, OpenAI API' } }
    ],
    features: [
      {
        title: { vi: '11 Giọng đọc AI tiếng Việt tự nhiên', en: '11 Natural AI Voices' },
        description: { vi: 'Hệ thống 11 giọng đọc truyền cảm (Diễm Trinh, Hưng Thịnh, Mai Linh, Mạnh Dũng, Tuấn Ngọc...) với ngữ điệu ngắt nghỉ chuẩn xác, không bị robotic.', en: 'Choose from 11 expressive Vietnamese voices with natural cadence, correct tone marks, and zero robotic artifacts.' }
      },
      {
        title: { vi: 'Thư viện sách & Quản lý chương', en: 'Book Library & Chapters' },
        description: { vi: 'Tính năng Thư viện mới cho phép nhập sách, tiểu thuyết dài hàng ngàn chương, tìm kiếm theo tác giả, lưu mục yêu thích và tiếp tục nghe tiện lợi.', en: 'New Book Library manages long-form books and multi-chapter novels with author search, favorites, and seamless reading progress.' }
      },
      {
        title: { vi: '100% Ngoại tuyến & Bảo mật riêng tư', en: '100% Offline & Private' },
        description: { vi: 'Chạy hoàn toàn trên Neural Engine và Core ML của thiết bị. Miễn phí, không quảng cáo, không theo dõi, không gửi dữ liệu ra ngoài và không giới hạn số từ.', en: 'Runs entirely on-device via Apple Neural Engine and Core ML. Free, no ads, zero tracking, no cloud latency, and no word limits.' }
      },
      {
        title: { vi: 'Xuất file M4A & WAV chất lượng cao', en: 'M4A & WAV Export' },
        description: { vi: 'Dễ dàng chuyển đổi các đoạn văn hay từng chương sách thành tệp âm thanh M4A hoặc WAV chất lượng cao để nghe lại mọi lúc mọi nơi.', en: 'Easily export text snippets or full chapters to high-quality M4A or WAV audio files for listening anytime.' }
      },
      {
        title: { vi: 'LAN Server tương thích OpenAI API', en: 'LAN Server & Automation' },
        description: { vi: 'Biến máy Mac hay iPad thành trạm phát giọng đọc cục bộ qua giao thức HTTP tương thích chuẩn OpenAI TTS API, dễ dàng tích hợp Home Assistant và Smart Home.', en: 'Turn your Mac or iPad into an on-premise TTS server supporting the OpenAI audio/speech API format, ideal for Home Assistant and local automations.' }
      }
    ],
    support: { vi: 'Cần hỗ trợ, góp ý giọng đọc hoặc báo lỗi? Gửi email cho mình nhé.', en: 'Need support, voice suggestions, or found a bug? Send me an email.' }
  },
  {
    slug: 'padcodeai',
    name: 'Pad Code AI',
    route: '/PadCodeAI/',
    icon: padCodeIcon,
    heroImage: padCodeHero,
    gallery: [
      { src: padCodeHero, alt: { vi: 'Editor Pad Code AI trên iPad', en: 'Pad Code AI editor on iPad' } },
      { src: padCodeTerminal, alt: { vi: 'Terminal trong Pad Code AI', en: 'Pad Code AI terminal' } },
      { src: padCodePhone, alt: { vi: 'Pad Code AI trên iPhone', en: 'Pad Code AI on iPhone' } }
    ],
    accent: '#3d5afe',
    appStoreUrl: 'https://apps.apple.com/us/app/pad-code-ai-code-editor/id6774398897',
    category: { vi: 'IDE cho thiết bị Apple', en: 'IDE for Apple devices' },
    title: {
      vi: 'Viết và chạy code trên thiết bị Apple.',
      en: 'Write and run code on your Apple devices.'
    },
    subtitle: { vi: 'Editor, compiler offline, terminal và hỗ trợ AI.', en: 'Editor, offline compiler, terminal, and AI assistance.' },
    description: {
      vi: 'Pad Code AI đưa editor, terminal, quản lý workspace và hỗ trợ Apple Intelligence vào một giao diện gọn cho iPhone, iPad, Mac và Apple Vision Pro.',
      en: 'Pad Code AI combines an editor, terminal, workspace management, and Apple Intelligence support in a focused interface for iPhone, iPad, Mac, and Apple Vision Pro.'
    },
    ctaLabel: { vi: 'Tải trên App Store', en: 'Download on App Store' },
    platforms: { vi: 'iOS, iPadOS, macOS, visionOS', en: 'iOS, iPadOS, macOS, visionOS' },
    operatingSystem: 'iOS, iPadOS, macOS, visionOS',
    appCategory: 'DeveloperApplication',
    facts: [
      { label: { vi: 'Nền tảng', en: 'Platforms' }, value: { vi: 'iOS, iPadOS, macOS, visionOS', en: 'iOS, iPadOS, macOS, visionOS' } },
      { label: { vi: 'Ngôn ngữ', en: 'Languages' }, value: { vi: '24+ ngôn ngữ', en: '24+ languages' } },
      { label: { vi: 'Biên dịch', en: 'Execution' }, value: { vi: 'Trên thiết bị', en: 'On device' } },
    ],
    features: [
      {
        title: { vi: 'Local code runner', en: 'Local code runner' },
        description: { vi: 'Chạy thử thuật toán và đoạn code ngay trên thiết bị khi cần làm nhanh.', en: 'Run algorithms and snippets directly on device when you need to move quickly.' }
      },
      {
        title: { vi: 'Terminal tích hợp', en: 'Integrated terminal' },
        description: { vi: 'Đặt kết quả chạy, lệnh và editor trong cùng một workspace.', en: 'Keep command output, terminal work, and the editor in one workspace.' }
      },
      {
        title: { vi: 'Git và workspace', en: 'Git and workspaces' },
        description: { vi: 'Điều hướng tệp, quản lý dự án và làm việc với mã nguồn gọn hơn trên iPhone, iPad, Mac và Apple Vision Pro.', en: 'Navigate files, manage projects, and work with source code more cleanly across iPhone, iPad, Mac, and Apple Vision Pro.' }
      }
    ],
    support: { vi: 'Gửi góp ý về compiler, editor hoặc workflow qua email.', en: 'Send feedback about the compiler, editor, or workflow by email.' }
  },
  {
    slug: 'padnotesai',
    name: 'Pad Notes AI',
    route: '/PadNotesAI/',
    icon: padNotesIcon,
    heroImage: padNotesHero,
    gallery: [
      { src: padNotesHero, alt: { vi: 'Pad Notes AI editor', en: 'Pad Notes AI editor' } },
      { src: padNotesWorkspace, alt: { vi: 'Workspace Pad Notes AI', en: 'Pad Notes AI workspace' } }
    ],
    accent: '#7c3aed',
    appStoreUrl: 'https://apps.apple.com/us/app/pad-notes-ai/id6779363432',
    category: { vi: 'Ghi chú thông minh', en: 'Smart notes' },
    title: {
      vi: 'Viết tay, ghi chú và xử lý tài liệu.',
      en: 'Handwriting, notes, and documents.'
    },
    subtitle: { vi: 'Cho ghi chú, OCR và làm việc dài trên iPhone, iPad, Mac và Apple Vision Pro.', en: 'For notes, OCR, and long work sessions on iPhone, iPad, Mac, and Apple Vision Pro.' },
    description: {
      vi: 'Pad Notes AI kết hợp viết tay, nhận dạng chữ viết, ghi âm và trợ lý AI để biến ghi chú thành tài liệu dễ tìm, dễ hiểu trên các thiết bị Apple.',
      en: 'Pad Notes AI combines handwriting, recognition, audio capture, and an AI assistant so notes become searchable, understandable documents across Apple devices.'
    },
    ctaLabel: { vi: 'Tải trên App Store', en: 'Download on App Store' },
    platforms: { vi: 'iOS, iPadOS, macOS, visionOS', en: 'iOS, iPadOS, macOS, visionOS' },
    operatingSystem: 'iOS, iPadOS, macOS, visionOS',
    appCategory: 'ProductivityApplication',
    facts: [
      { label: { vi: 'Nền tảng', en: 'Platforms' }, value: { vi: 'iOS, iPadOS, macOS, visionOS', en: 'iOS, iPadOS, macOS, visionOS' } },
      { label: { vi: 'Nhập liệu', en: 'Input' }, value: { vi: 'Apple Pencil', en: 'Apple Pencil' } },
      { label: { vi: 'Xử lý', en: 'Processing' }, value: { vi: 'OCR + AI', en: 'OCR + AI' } },
    ],
    features: [
      {
        title: { vi: 'Viết tay tự nhiên', en: 'Natural handwriting' },
        description: { vi: 'Bút, màu và mẫu giấy được tổ chức cho việc ghi chép lâu dài.', en: 'Pens, colors, and paper templates are organized for long-form note-taking.' }
      },
      {
        title: { vi: 'OCR trên thiết bị', en: 'On-device OCR' },
        description: { vi: 'Chuyển nét viết thành văn bản mà vẫn giữ trải nghiệm riêng tư.', en: 'Convert handwriting into text while keeping the experience private.' }
      },
      {
        title: { vi: 'Trò chuyện với tài liệu', en: 'Talk to your notes' },
        description: { vi: 'Hỏi, tóm tắt và tìm ý chính trong trang ghi chú hoặc tài liệu.', en: 'Ask, summarize, and find key ideas inside notes or documents.' }
      }
    ],
    support: { vi: 'Cần hỗ trợ đồng bộ hoặc OCR? Gửi email cho mình.', en: 'Need help with sync or OCR? Send me an email.' }
  },
  {
    slug: 'mynasmanager',
    name: 'My NAS Manager',
    route: '/MyNASManager/',
    icon: nasIcon,
    heroImage: nasHero,
    gallery: [
      { src: nasHero, alt: { vi: 'My NAS Manager trên iPad', en: 'My NAS Manager on iPad' } },
      { src: nasDashboard, alt: { vi: 'Dashboard My NAS Manager', en: 'My NAS Manager dashboard' } },
      { src: nasPhoneOne, alt: { vi: 'My NAS Manager trên iPhone', en: 'My NAS Manager on iPhone' } },
      { src: nasPhoneTwo, alt: { vi: 'Quản lý file NAS trên iPhone', en: 'NAS file management on iPhone' } }
    ],
    accent: '#0071e3',
    appStoreUrl: 'https://apps.apple.com/us/app/my-nas-manager/id6780180564',
    category: { vi: 'Synology NAS client', en: 'Synology NAS client' },
    title: {
      vi: 'Quản lý Synology NAS trên thiết bị Apple.',
      en: 'Manage Synology NAS from your Apple devices.'
    },
    subtitle: { vi: 'Giám sát hệ thống, File Station và SSH trong một app.', en: 'System monitoring, File Station, and SSH in one app.' },
    description: {
      vi: 'My NAS Manager giúp theo dõi tài nguyên, duyệt file, quản lý gói DSM và truy cập terminal an toàn trên iPhone, iPad, Mac và Apple Vision Pro.',
      en: 'My NAS Manager helps you monitor resources, browse files, manage DSM packages, and access a secure terminal on iPhone, iPad, Mac, and Apple Vision Pro.'
    },
    ctaLabel: { vi: 'Tải về trên App Store', en: 'Download on App Store' },
    platforms: { vi: 'iOS, iPadOS, macOS, visionOS', en: 'iOS, iPadOS, macOS, visionOS' },
    operatingSystem: 'iOS, iPadOS, macOS, visionOS',
    appCategory: 'UtilitiesApplication',
    facts: [
      { label: { vi: 'Nền tảng', en: 'Platforms' }, value: { vi: 'iOS, iPadOS, macOS, visionOS', en: 'iOS, iPadOS, macOS, visionOS' } },
      { label: { vi: 'Máy chủ', en: 'Server' }, value: { vi: 'Synology DSM 7+', en: 'Synology DSM 7+' } },
      { label: { vi: 'Công cụ', en: 'Tools' }, value: { vi: 'Files + SSH + Packages', en: 'Files + SSH + Packages' } }
    ],
    features: [
      {
        title: { vi: 'Giám sát thời gian thực', en: 'Realtime monitoring' },
        description: { vi: 'Theo dõi CPU, RAM, nhiệt độ, mạng và trạng thái ổ đĩa.', en: 'Watch CPU, memory, temperature, network, and drive health.' }
      },
      {
        title: { vi: 'File Station di động', en: 'Mobile File Station' },
        description: { vi: 'Duyệt, tải lên, tải xuống và tạo link chia sẻ từ iPhone, iPad, Mac hoặc Apple Vision Pro.', en: 'Browse, upload, download, and create share links from iPhone, iPad, Mac, or Apple Vision Pro.' }
      },
      {
        title: { vi: 'Terminal SSH an toàn', en: 'Secure SSH terminal' },
        description: { vi: 'Chạy tác vụ quản trị nhanh khi cần xử lý từ xa.', en: 'Run quick administration tasks when you need remote control.' }
      }
    ],
    support: { vi: 'Gửi email nếu bạn cần hỗ trợ kết nối DSM hoặc SSH.', en: 'Email me if you need help with DSM or SSH connections.' }
  },
  {
    slug: 'lunarv',
    name: 'LunarV',
    route: '/LunarV/',
    icon: lunarvIcon,
    heroImage: lunarvHero,
    gallery: [
      { src: lunarvHero, alt: { vi: 'LunarV trên iPad', en: 'LunarV on iPad' } },
      { src: lunarvVision, alt: { vi: 'LunarV trên Apple Vision Pro', en: 'LunarV on Apple Vision Pro' } },
      { src: lunarvReviewOne, alt: { vi: 'Màn hình đánh giá LunarV', en: 'LunarV review screen' } },
      { src: lunarvReviewTwo, alt: { vi: 'Màn hình lịch LunarV', en: 'LunarV calendar screen' } }
    ],
    accent: '#6655d9',
    appStoreUrl: 'https://apps.apple.com/vn/app/lunarv-l%E1%BB%8Bch-%C3%A2m-vi%E1%BB%87t-nam/id6770913893?l=vi',
    category: { vi: 'Lịch âm Việt Nam', en: 'Vietnamese lunar calendar' },
    title: {
      vi: 'Lịch âm Việt Nam trên thiết bị Apple.',
      en: 'Vietnamese lunar calendar for Apple devices.'
    },
    subtitle: { vi: 'Ngày âm, dịp gia đình, widget và nhắc nhở.', en: 'Lunar dates, family moments, widgets, and reminders.' },
    description: {
      vi: 'LunarV gom lịch âm, lịch dương, can chi, tiết khí và nhắc dịp quan trọng vào một trải nghiệm đồng bộ cho iPhone, iPad, Mac và Apple Vision Pro.',
      en: 'LunarV brings lunar and solar dates, sexagenary cycles, solar terms, and personal reminders into one synced experience for iPhone, iPad, Mac, and Apple Vision Pro.'
    },
    ctaLabel: { vi: 'Xem trên App Store', en: 'View on App Store' },
    platforms: { vi: 'iOS, iPadOS, macOS, visionOS', en: 'iOS, iPadOS, macOS, visionOS' },
    operatingSystem: 'iOS, iPadOS, macOS, visionOS',
    appCategory: 'LifestyleApplication',
    facts: [
      { label: { vi: 'Phiên bản', en: 'Version' }, value: { vi: '1.0.1', en: '1.0.1' } },
      { label: { vi: 'Nền tảng', en: 'Platforms' }, value: { vi: 'iOS, iPadOS, macOS, visionOS', en: 'iOS, iPadOS, macOS, visionOS' } },
      { label: { vi: 'Phát hành', en: 'Release' }, value: { vi: 'App Store', en: 'App Store' } }
    ],
    features: [
      {
        title: { vi: 'Âm lịch và dương lịch', en: 'Lunar and solar dates' },
        description: { vi: 'Xem ngày âm, ngày dương, can chi và tiết khí trong cùng một nhịp đọc.', en: 'Read lunar dates, solar dates, cycles, and solar terms in one clear view.' }
      },
      {
        title: { vi: 'Dịp gia đình', en: 'Family moments' },
        description: { vi: 'Theo dõi ngày giỗ, sinh nhật và các dịp quan trọng theo âm hoặc dương lịch.', en: 'Track anniversaries, birthdays, and important dates using lunar or solar calendars.' }
      },
      {
        title: { vi: 'Widget đồng bộ', en: 'Synced widgets' },
        description: { vi: 'Thông tin ngày hiện tại được trình bày gọn trên màn hình chính và các nền tảng Apple.', en: 'Current-date context stays compact on Home Screen widgets and Apple platforms.' }
      }
    ],
    support: { vi: 'Cần hỗ trợ LunarV? Gửi email để mình kiểm tra.', en: 'Need help with LunarV? Send an email and I will take a look.' }
  },
  {
    slug: 'lunarblock',
    name: 'Lunar Block',
    route: '/LunarBlock/',
    icon: blockIcon,
    heroImage: blockHero,
    gallery: [
      { src: blockHero, alt: { vi: 'Bàn cờ xếp khối 3D Lunar Block với khối pha lê phát sáng', en: 'Lunar Block 3D falling-block puzzle with glowing crystal blocks' } },
      { src: blockShowcase, alt: { vi: 'Hiệu ứng vỡ khối Line Fracture và combo thả nhanh', en: 'Lunar Block line fracture effect and fast drop combos' } },
      { src: blockModes, alt: { vi: 'Đa dạng chế độ chơi: Marathon, Sprint 40 dòng và Ultra 2 phút', en: 'Multiple game modes: Marathon, Sprint 40L, and Ultra 2M' } },
      { src: blockRank, alt: { vi: 'Hệ thống tích luỹ XP thăng hạng danh hiệu và kỷ lục', en: 'XP ranking system, personal records, and achievements' } }
    ],
    videoUrl: '/LunarBlock/lunarblock-demo.mp4',
    videoDescription: {
      vi: 'Xem video gameplay thực tế trải nghiệm xếp khối 3D trên quỹ đạo không gian với hiệu ứng âm thanh và va chạm sống động.',
      en: 'Watch gameplay action of 3D orbital block stacking with dynamic lighting and synthesized audio.'
    },
    accent: '#f59e0b',
    appStoreUrl: 'https://apps.apple.com/us/app/lunar-block-teris-3d/id6773545437',
    category: { vi: 'Game xếp hình 3D', en: '3D puzzle game' },
    title: {
      vi: 'Xếp khối không gian 3D trên quỹ đạo ấn tượng.',
      en: 'Next-gen 3D orbital falling-block puzzle.'
    },
    subtitle: {
      vi: 'SceneKit 3D, khối pha lê, phím D-Pad công thái học, haptic và Line Fracture vật lý.',
      en: 'SceneKit 3D, crystal blocks, ergonomic D-Pad, haptics & physics line fractures.'
    },
    description: {
      vi: 'Lunar Block nâng tầm trải nghiệm xếp khối kinh điển thành một bàn cờ quỹ đạo 3D phát sáng. Tích hợp phím D-Pad công thái học, bóng chiếu khối trực quan (Ghost Piece), hiệu ứng vỡ khối vật lý Line Fracture, 3 chế độ chơi thử thách, hệ thống thăng hạng XP và bảng xếp hạng Game Center toàn cầu.',
      en: 'Lunar Block transforms classic falling-block puzzles into a glowing 3D orbital console. Built natively with SceneKit, featuring ergonomic D-Pad controls, instant ghost piece projection, physics-driven line fractures, 3 game modes, XP progression ranks, and global Game Center leaderboards.'
    },
    ctaLabel: { vi: 'Tải trên App Store', en: 'Download on App Store' },
    platforms: { vi: 'iOS, iPadOS, macOS, visionOS', en: 'iOS, iPadOS, macOS, visionOS' },
    operatingSystem: 'iOS 16+, iPadOS 16+, macOS 13+, visionOS 1+',
    appCategory: 'GameApplication',
    facts: [
      { label: { vi: 'Thể loại', en: 'Genre' }, value: { vi: 'Giải đố 3D', en: '3D Arcade Puzzle' } },
      { label: { vi: 'Đồ họa', en: 'Graphics' }, value: { vi: 'SceneKit 60fps', en: 'SceneKit 60fps' } },
      { label: { vi: 'Chế độ', en: 'Modes' }, value: { vi: 'Marathon, Sprint, Ultra', en: 'Marathon, Sprint, Ultra' } },
      { label: { vi: 'Xếp hạng', en: 'Ranking' }, value: { vi: 'XP Ranks & Game Center', en: 'XP Ranks & Game Center' } }
    ],
    features: [
      {
        title: { vi: 'Bàn cờ 3D Quỹ Đạo', en: '3D Orbital Console' },
        description: { vi: 'Khối pha lê trong suốt, vách ngăn neon phát sáng và góc quay camera điện ảnh linh hoạt theo từng nhịp rơi.', en: 'Crystal blocks, neon-glowing boundary rails, and dynamic cinematic camera tracking every drop.' }
      },
      {
        title: { vi: 'Vật lý vỡ khối Line Fracture', en: 'Physics Line Fracture' },
        description: { vi: 'Khi xóa hàng, từng khối vỡ vụn với hiệu ứng vật lý chân thực thay vì biến mất đơn điệu, hỗ trợ combo và điểm Tetris back-to-back.', en: 'Simultaneous physics-driven line fractures preserve cleared blocks with visceral impact, combos, and back-to-back Tetris scoring.' }
      },
      {
        title: { vi: 'Đa dạng chế độ chơi', en: 'Multiple Game Modes' },
        description: { vi: 'Thử thách sức bền với Marathon vô tận, bứt phá tốc độ với Sprint 40 dòng, hoặc ghi điểm tối đa trong Ultra 2 phút nghẹt thở.', en: 'Endless survival in Marathon mode, race against time in 40-Line Sprint, or chase high scores in intense 2-minute Ultra.' }
      },
      {
        title: { vi: 'Tiến trình XP & Game Center', en: 'XP Ranks & Leaderboards' },
        description: { vi: 'Tích lũy điểm kinh nghiệm để thăng hạng danh hiệu từ Novice lên Master, lưu kỷ lục cá nhân và so tài vị trí top 1 Game Center.', en: 'Earn XP to advance through rank tiers, preserve local personal bests, and climb the authenticated global Game Center leaderboard.' }
      },
      {
        title: { vi: 'Điều khiển mượt mà & Tay cầm', en: 'Fluid Controls & Gamepads' },
        description: { vi: 'Cụm D-Pad tròn cùng phím DROP chuyên biệt, hỗ trợ cử chỉ vuốt chạm, bàn phím ngoài và tay cầm chơi game MFi/PlayStation/Xbox.', en: 'Ergonomic circular D-Pad with dedicated DROP and CCW buttons, plus full touch gestures, external keyboard, and MFi/game controller support.' }
      }
    ],
    support: { vi: 'Có góp ý gameplay hoặc điều khiển? Gửi mình qua email.', en: 'Have gameplay or control feedback? Send it by email.' }
  }
];

export const productBySlug = new Map<ProductSlug, Product>(
  products.map((product) => [product.slug, product])
);

export const productRoutes = new Map<string, Product>(
  products.filter((product) => !product.isStandalone).map((product) => [product.route.toLowerCase(), product])
);

export const appProductRoutes = products.map((product) => product.route);

/**
 * Routes this app owns and must emit real HTML for. PHTV is excluded: it is a
 * separate Vite app deployed into /PHTV/ with its own index.html.
 */
export const prerenderRoutes = ['/', ...products.filter((product) => !product.isStandalone).map((product) => product.route)];
