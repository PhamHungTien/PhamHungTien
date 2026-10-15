import type { App } from '../types';
import icon from '../../assets/apps/phtv/app-icon.webp';
import settingBogo from '../../assets/apps/phtv/latest/setting-bogo.jpg';
import menubar from '../../assets/apps/phtv/latest/menubar.png';
import picker from '../../assets/apps/phtv/latest/picker.jpg';
import settingClipboard from '../../assets/apps/phtv/latest/setting-clipboard.jpg';
import settingPhimtat from '../../assets/apps/phtv/latest/setting-phimtat.jpg';

const app: App = {
  slug: 'phtv',
  // PHTV's audience is Vietnamese, so /PHTV/ stays Vietnamese and English lives at /en/PHTV/.
  defaultLang: 'vi',
  legalLangs: ['vi', 'en'],
  name: 'PHTV',
  route: '/PHTV/',
  icon,
  heroImage: settingBogo,
  gallery: [
    { src: settingBogo, alt: { vi: 'Thiết lập bộ gõ', en: 'Input settings' } },
    { src: menubar, alt: { vi: 'Menu bar', en: 'Menu bar' } },
    { src: picker, alt: { vi: 'PHTV Picker', en: 'PHTV Picker' } },
    { src: settingClipboard, alt: { vi: 'Lịch sử Clipboard', en: 'Clipboard history' } },
    { src: settingPhimtat, alt: { vi: 'Phím tắt', en: 'Shortcuts' } },
  ],
  links: {
    source: 'https://github.com/PhamHungTien/PHTV',
    community: 'https://www.facebook.com/PHTVInput/',
  },
  accent: '#d71f2a',
  category: { vi: 'Bộ gõ tiếng Việt cho macOS', en: 'Vietnamese input method for macOS' },
  title: {
    vi: 'Gõ tiếng Việt theo cách của bạn.',
    en: 'Type Vietnamese your way.',
  },
  subtitle: {
    vi: 'Bộ gõ macOS viết 100% bằng Swift: nhanh, riêng tư và hoạt động hoàn toàn trên máy. Miễn phí và mã nguồn mở.',
    en: 'A 100% Swift input method for macOS: fast, private and fully on your Mac. Free and open source.',
  },
  description: {
    vi: 'PHTV là bộ gõ tiếng Việt mã nguồn mở cho macOS 14+, hỗ trợ Telex, VNI, gõ tắt, kiểm tra chính tả và bản riêng cho Apple Silicon và Intel.',
    en: 'PHTV is an open-source Vietnamese input method for macOS 14+, with Telex, VNI, macros, spell checking and separate Apple Silicon and Intel builds.',
  },
  platforms: ['macos'],
  requirements: 'macOS 14.0 or later',
  appCategory: 'UtilitiesApplication',
  facts: [
    { label: { vi: 'Hệ điều hành', en: 'System' }, value: { vi: 'macOS 14+', en: 'macOS 14+' } },
    {
      label: { vi: 'Kiến trúc', en: 'Architecture' },
      value: { vi: 'Apple Silicon và Intel', en: 'Apple Silicon and Intel' },
    },
    { label: { vi: 'Giá', en: 'Price' }, value: { vi: 'Miễn phí', en: 'Free' } },
    {
      label: { vi: 'Giấy phép', en: 'License' },
      value: { vi: 'Mã nguồn mở', en: 'Open source' },
    },
  ],
  features: [
    {
      title: { vi: 'Offline và riêng tư', en: 'Offline and private' },
      description: {
        vi: 'Xử lý hoàn toàn trên máy, không gửi nội dung gõ đi đâu. Chỉ trình chọn GIF cần Internet để tải ảnh.',
        en: 'Everything runs on your Mac and nothing you type leaves it. Only the GIF picker uses the Internet.',
      },
    },
    {
      title: { vi: 'Nhanh và native', en: 'Fast and native' },
      description: {
        vi: 'Viết 100% bằng Swift, tối ưu cho macOS với độ trễ thấp và hoạt động ổn định trên mọi ứng dụng.',
        en: 'Written 100% in Swift and tuned for macOS, with low latency in every app.',
      },
    },
    {
      title: { vi: 'Gõ thông minh', en: 'Smarter typing' },
      description: {
        vi: 'Kiểm tra chính tả, Quick Telex, tự khôi phục từ tiếng Anh, gõ tắt và nhiều tuỳ chỉnh cho người gõ song ngữ.',
        en: 'Spell checking, Quick Telex, automatic English restore, macros and fine controls for bilingual typing.',
      },
    },
    {
      title: { vi: 'Telex, VNI và Simple Telex', en: 'Telex, VNI and Simple Telex' },
      description: {
        vi: 'Chọn kiểu gõ quen thuộc. Chuyển Việt/Anh bằng Control + Shift hoặc từ menu bar.',
        en: 'Use the method you know. Switch Vietnamese/English with Control + Shift or from the menu bar.',
      },
    },
    {
      title: { vi: 'PHTV Picker và Clipboard', en: 'PHTV Picker and clipboard' },
      description: {
        vi: 'Chèn emoji, sticker, GIF và lấy lại nội dung đã sao chép từ lịch sử clipboard.',
        en: 'Insert emoji, stickers and GIFs, and bring back anything from your clipboard history.',
      },
    },
    {
      title: { vi: 'Tải đúng bản cho máy Mac', en: 'The right build for your Mac' },
      description: {
        vi: 'Bản Apple Silicon và Intel tách riêng, hoặc cài bằng Homebrew để tự chọn đúng.',
        en: 'Separate Apple Silicon and Intel builds, or install with Homebrew to pick the right one automatically.',
      },
    },
  ],
  support: {
    vi: 'Báo lỗi hoặc góp ý trong mục Thảo luận, trên GitHub, hoặc gửi email.',
    en: 'Report a bug or share an idea in Discussions, on GitHub, or by email.',
  },
  install: {
    githubRepo: 'PhamHungTien/PHTV',
    homebrew: 'brew install --cask phtv',
    steps: [
      {
        vi: 'Tắt tính năng tự sửa lỗi chính tả của macOS.',
        en: 'Turn off macOS auto-correct.',
      },
      {
        vi: 'Cấp quyền Accessibility cho PHTV khi được hỏi.',
        en: 'Grant PHTV Accessibility access when asked.',
      },
      {
        vi: 'Dùng Control + Shift để chuyển giữa tiếng Việt và tiếng Anh.',
        en: 'Use Control + Shift to switch between Vietnamese and English.',
      },
    ],
  },
  tutorial: {
    youtubeId: 'VaE4dZncBRs',
    title: { vi: 'Hướng dẫn cài đặt và gõ tiếng Việt', en: 'Install and type Vietnamese' },
    description: {
      vi: 'Cài bằng Homebrew hoặc file DMG, đi qua trình thiết lập 6 bước, cấp quyền và gõ Telex. Có phụ đề tiếng Việt.',
      en: 'Install with Homebrew or the DMG, walk through the six-step setup, grant access and type with Telex. Narrated in Vietnamese with subtitles.',
    },
  },
  faq: [
    {
      question: {
        vi: 'PHTV tương thích với phiên bản macOS nào?',
        en: 'Which macOS versions does PHTV support?',
      },
      answer: {
        vi: 'macOS 14 Sonoma trở lên. Có bản riêng cho Apple Silicon và Intel.',
        en: 'macOS 14 Sonoma and later, with separate builds for Apple Silicon and Intel.',
      },
    },
    {
      question: {
        vi: 'Cách dễ nhất để cài và cập nhật PHTV?',
        en: 'What is the easiest way to install and update PHTV?',
      },
      answer: {
        vi: 'Dùng Homebrew: `brew install --cask phtv` để cài, `brew upgrade --cask --greedy phtv` để cập nhật và `brew uninstall --cask phtv` để gỡ. Nếu tải tay, chọn đúng bản Apple Silicon hoặc Intel.',
        en: 'Use Homebrew: `brew install --cask phtv` to install, `brew upgrade --cask --greedy phtv` to update and `brew uninstall --cask phtv` to remove. If you download manually, pick the Apple Silicon or Intel build.',
      },
    },
    {
      question: {
        vi: 'Làm sao chuyển giữa tiếng Việt và tiếng Anh?',
        en: 'How do I switch between Vietnamese and English?',
      },
      answer: {
        vi: 'Nhấn phím tắt đã cấu hình (mặc định Control + Shift) hoặc chọn ngôn ngữ từ biểu tượng trên menu bar.',
        en: 'Press the configured shortcut (Control + Shift by default) or choose the language from the menu bar icon.',
      },
    },
    {
      question: { vi: 'Nên chọn kiểu gõ nào?', en: 'Which typing method should I use?' },
      answer: {
        vi: 'Telex phổ biến và dễ học (ow = ơ, uw = ư, aa = â). VNI dùng số 1–9 cho dấu. Simple Telex là các biến thể đơn giản của Telex.',
        en: 'Telex is the most common (ow = ơ, uw = ư, aa = â). VNI uses the digits 1–9 for marks. Simple Telex offers lighter Telex variants.',
      },
    },
    {
      question: {
        vi: 'PHTV có gửi dữ liệu lên Internet không?',
        en: 'Does PHTV send my typing to the Internet?',
      },
      answer: {
        vi: 'Không. PHTV hoạt động offline và không thu thập dữ liệu cá nhân. Chỉ trình chọn GIF cần Internet để tải GIF từ Klipy.',
        en: 'No. PHTV works offline and collects no personal data. Only the GIF picker connects to Klipy to fetch GIFs.',
      },
    },
    {
      question: {
        vi: 'Vì sao PHTV cần quyền Accessibility?',
        en: 'Why does PHTV need Accessibility access?',
      },
      answer: {
        vi: 'Để nhận phím gõ, chuyển ngôn ngữ và hoạt động trên mọi ứng dụng. Đây là yêu cầu chuẩn của mọi bộ gõ trên macOS.',
        en: 'To read keystrokes, switch languages and work in every app. Every macOS input method needs it.',
      },
    },
  ],
  community: 'phtv',
};

export default app;
