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
    platforms: { vi: 'macOS 14+', en: 'macOS 14+' },
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
      vi: 'Lịch âm Việt Nam, dễ đọc trên mọi thiết bị Apple.',
      en: 'A Vietnamese lunar calendar that stays readable across Apple devices.'
    },
    subtitle: { vi: 'Ngày âm, dịp gia đình, widget và nhắc nhở.', en: 'Lunar dates, family moments, widgets, and reminders.' },
    description: {
      vi: 'LunarV gom lịch âm, lịch dương, can chi, tiết khí và nhắc dịp quan trọng vào một trải nghiệm đồng bộ cho iPhone, iPad, Mac và Apple Vision Pro.',
      en: 'LunarV brings lunar and solar dates, sexagenary cycles, solar terms, and personal reminders into one synced experience for iPhone, iPad, Mac, and Apple Vision Pro.'
    },
    ctaLabel: { vi: 'Xem trên App Store', en: 'View on App Store' },
    platforms: { vi: 'iPhone, iPad, Mac, Vision Pro', en: 'iPhone, iPad, Mac, Vision Pro' },
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
      vi: 'Viết và chạy code trực tiếp trên iPhone, iPad và Mac.',
      en: 'Write and run code directly on iPhone, iPad, and Mac.'
    },
    subtitle: { vi: 'Editor, compiler offline, terminal và hỗ trợ AI.', en: 'Editor, offline compiler, terminal, and AI assistance.' },
    description: {
      vi: 'Pad Code AI đưa editor, terminal, quản lý workspace và hỗ trợ Apple Intelligence vào một giao diện gọn cho iPhone, iPad và Mac.',
      en: 'Pad Code AI combines an editor, terminal, workspace management, and Apple Intelligence support in a focused interface for iPhone, iPad, and Mac.'
    },
    ctaLabel: { vi: 'Tải trên App Store', en: 'Download on App Store' },
    platforms: { vi: 'iPhone, iPad, Mac', en: 'iPhone, iPad, Mac' },
    facts: [
      { label: { vi: 'Nền tảng', en: 'Platforms' }, value: { vi: 'iPhone, iPad, Mac', en: 'iPhone, iPad, Mac' } },
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
        description: { vi: 'Điều hướng tệp, quản lý dự án và làm việc với mã nguồn gọn hơn trên iPhone, iPad và Mac.', en: 'Navigate files, manage projects, and work with source code more cleanly across iPhone, iPad, and Mac.' }
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
      vi: 'Ghi chú viết tay, OCR offline và AI trong cùng một workspace.',
      en: 'Handwriting, offline OCR, and AI in one focused workspace.'
    },
    subtitle: { vi: 'Cho ghi chú, OCR và làm việc dài trên iPhone, iPad và Mac.', en: 'For notes, OCR, and long work sessions on iPhone, iPad, and Mac.' },
    description: {
      vi: 'Pad Notes AI kết hợp viết tay, nhận dạng chữ viết, ghi âm và trợ lý AI để biến ghi chú thành tài liệu dễ tìm, dễ hiểu trên các thiết bị Apple.',
      en: 'Pad Notes AI combines handwriting, recognition, audio capture, and an AI assistant so notes become searchable, understandable documents across Apple devices.'
    },
    ctaLabel: { vi: 'Tải trên App Store', en: 'Download on App Store' },
    platforms: { vi: 'iPhone, iPad, Mac', en: 'iPhone, iPad, Mac' },
    facts: [
      { label: { vi: 'Nền tảng', en: 'Platforms' }, value: { vi: 'iPhone, iPad, Mac', en: 'iPhone, iPad, Mac' } },
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
      vi: 'Quản lý Synology NAS từ iPhone, iPad và Mac rõ ràng hơn.',
      en: 'Manage Synology NAS from iPhone, iPad, and Mac with more clarity.'
    },
    subtitle: { vi: 'Giám sát hệ thống, File Station và SSH trong một app.', en: 'System monitoring, File Station, and SSH in one app.' },
    description: {
      vi: 'My NAS Manager giúp theo dõi tài nguyên, duyệt file, quản lý gói DSM và truy cập terminal an toàn trên iPhone, iPad và Mac.',
      en: 'My NAS Manager helps you monitor resources, browse files, manage DSM packages, and access a secure terminal on iPhone, iPad, and Mac.'
    },
    ctaLabel: { vi: 'Tải về trên App Store', en: 'Download on App Store' },
    platforms: { vi: 'iPhone, iPad, Mac', en: 'iPhone, iPad, Mac' },
    facts: [
      { label: { vi: 'Nền tảng', en: 'Platforms' }, value: { vi: 'iPhone, iPad, Mac', en: 'iPhone, iPad, Mac' } },
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
        description: { vi: 'Duyệt, tải lên, tải xuống và tạo link chia sẻ từ iPhone, iPad hoặc Mac.', en: 'Browse, upload, download, and create share links from iPhone, iPad, or Mac.' }
      },
      {
        title: { vi: 'Terminal SSH an toàn', en: 'Secure SSH terminal' },
        description: { vi: 'Chạy tác vụ quản trị nhanh khi cần xử lý từ xa.', en: 'Run quick administration tasks when you need remote control.' }
      }
    ],
    support: { vi: 'Gửi email nếu bạn cần hỗ trợ kết nối DSM hoặc SSH.', en: 'Email me if you need help with DSM or SSH connections.' }
  },
  {
    slug: 'lunarblock',
    name: 'Lunar Block',
    route: '/LunarBlock/',
    icon: blockIcon,
    heroImage: blockHero,
    gallery: [
      { src: blockHero, alt: { vi: 'Lunar Block gameplay', en: 'Lunar Block gameplay' } },
      { src: blockShowcase, alt: { vi: 'Hiệu ứng Line Fracture Lunar Block', en: 'Lunar Block Line Fracture effect' } }
    ],
    accent: '#f59e0b',
    appStoreUrl: 'https://apps.apple.com/us/app/lunar-block-teris-3d/id6773545437',
    category: { vi: 'Game xếp hình 3D', en: '3D puzzle game' },
    title: {
      vi: 'Xếp hình cổ điển trong một bảng điều khiển orbital 3D.',
      en: 'Classic block stacking inside a 3D orbital console.'
    },
    subtitle: { vi: 'SceneKit, haptic, âm thanh tổng hợp và hiệu ứng vỡ khối.', en: 'SceneKit, haptics, synthesized audio, and line fracture effects.' },
    description: {
      vi: 'Lunar Block biến lưới chơi quen thuộc thành một không gian 3D phát sáng, điều khiển mượt và giàu phản hồi xúc giác.',
      en: 'Lunar Block turns a familiar playfield into a glowing 3D space with smooth controls and layered haptic feedback.'
    },
    ctaLabel: { vi: 'Tải trên App Store', en: 'Download on App Store' },
    platforms: { vi: 'iPhone, iPad, Mac, Vision Pro', en: 'iPhone, iPad, Mac, Vision Pro' },
    facts: [
      { label: { vi: 'Thể loại', en: 'Genre' }, value: { vi: 'Giải đố 3D', en: '3D puzzle' } },
      { label: { vi: 'Đồ họa', en: 'Graphics' }, value: { vi: 'SceneKit', en: 'SceneKit' } },
      { label: { vi: 'Cảm giác', en: 'Feel' }, value: { vi: 'Haptic + Synth', en: 'Haptic + Synth' } }
    ],
    features: [
      {
        title: { vi: 'Bàn cờ 3D', en: '3D board' },
        description: { vi: 'Khối pha lê, khung phát sáng và camera động tạo chiều sâu cho lối chơi.', en: 'Crystal blocks, luminous rails, and camera movement add depth to play.' }
      },
      {
        title: { vi: 'Line Fracture', en: 'Line Fracture' },
        description: { vi: 'Hàng được dọn bằng hiệu ứng vỡ khối vật lý thay vì biến mất đơn điệu.', en: 'Cleared lines fracture with physical shard effects instead of simply disappearing.' }
      },
      {
        title: { vi: 'Điều khiển đa dạng', en: 'Flexible controls' },
        description: { vi: 'D-pad tròn, vuốt chạm và bàn phím ngoài cho nhiều kiểu chơi.', en: 'Circular D-pad, touch gestures, and keyboard support fit different play styles.' }
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
