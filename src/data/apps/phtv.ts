import type { App } from '../types';
import icon from '../../assets/apps/phtv/app-icon.png';

const app: App = {
  slug: 'phtv',
  // PHTV's audience is Vietnamese, so /PHTV/ stays Vietnamese and English lives at /en/PHTV/.
  defaultLang: 'vi',
  legalLangs: ['vi', 'en'],
  name: 'PHTV',
  route: '/PHTV/',
  icon,
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
    vi: 'PHTV là bộ gõ tiếng Việt mã nguồn mở cho macOS 14+, hỗ trợ Telex, VNI, gõ tắt, kiểm tra chính tả, PHTV Picker và lịch sử Clipboard. PHTV Keyboard là bản trên App Store cho Mac, iPhone và iPad.',
    en: 'PHTV is an open-source Vietnamese input method for macOS 14+, with Telex, VNI, macros, spell checking, PHTV Picker and clipboard history. PHTV Keyboard is the App Store edition for Mac, iPhone and iPad.',
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
      value: { vi: 'Mã nguồn mở (AGPLv3)', en: 'Open source (AGPLv3)' },
    },
    {
      label: { vi: 'Phiên bản', en: 'Editions' },
      value: { vi: 'PHTV · PHTV Keyboard', en: 'PHTV · PHTV Keyboard' },
    },
  ],
  features: [
    {
      title: { vi: 'Offline và riêng tư', en: 'Offline and private' },
      description: {
        vi: 'Xử lý hoàn toàn trên máy, không gửi nội dung gõ đi đâu. Chỉ trình chọn GIF và kiểm tra cập nhật cần Internet.',
        en: 'Everything runs on your Mac and nothing you type leaves it. Only the GIF picker and update checks use the Internet.',
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
      title: { vi: 'PHTV Keyboard trên App Store', en: 'PHTV Keyboard on the App Store' },
      description: {
        vi: 'Bản cho Mac chạy trong App Sandbox với một quyền duy nhất, có gõ tắt, Clipboard và emoji. Bản cho iPhone và iPad là bàn phím có gợi ý từ, vuốt để gõ, giao diện tuỳ chỉnh và thi gõ nhanh. Sắp có trên App Store.',
        en: 'The Mac edition runs in the App Sandbox with a single permission, plus text shortcuts, clipboard history and emoji. On iPhone and iPad it is a keyboard with word suggestions, swipe typing, custom themes and a typing race. Coming to the App Store.',
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
        vi: 'Cấp quyền cho PHTV khi được hỏi (Trợ năng, hoặc System & App Protection Override trên macOS 27.3 trở lên).',
        en: 'Grant PHTV access when asked (Accessibility, or System & App Protection Override on macOS 27.3 and later).',
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
        vi: 'Không. PHTV hoạt động offline và không thu thập dữ liệu cá nhân; chỉ trình chọn GIF tải ảnh từ Klipy và kiểm tra cập nhật cần Internet. PHTV Keyboard gõ chữ không cần Internet; chỉ phần Thi gõ nhanh kết nối Game Center khi bạn đăng nhập.',
        en: 'No. PHTV works offline and collects no personal data; only the GIF picker (images from Klipy) and update checks use the Internet. PHTV Keyboard types without the Internet; only its typing race connects to Game Center when you sign in.',
      },
    },
    {
      question: {
        vi: 'Vì sao PHTV cần quyền Accessibility?',
        en: 'Why does PHTV need Accessibility access?',
      },
      answer: {
        vi: 'PHTV nhận phím qua Trợ năng để chuyển ngôn ngữ và hoạt động trên mọi ứng dụng; trên macOS 27.3 trở lên, quyền này nằm trong mục System & App Protection Override. Quyền chỉ dùng để xử lý phím ngay lúc gõ. PHTV Keyboard cho Mac cũng cần quyền này để ghép chữ, nhưng chạy trong App Sandbox và không đọc nội dung của ứng dụng khác.',
        en: "PHTV reads keystrokes through Accessibility to switch languages and work in every app; on macOS 27.3 and later it is listed under System & App Protection Override. It is used only to process keys as you type. PHTV Keyboard for Mac needs the same permission to compose letters, but runs in the App Sandbox and does not read other apps' content.",
      },
    },
    {
      question: {
        vi: 'PHTV và PHTV Keyboard khác nhau thế nào?',
        en: 'How do PHTV and PHTV Keyboard differ?',
      },
      answer: {
        vi: 'Dùng chung bộ máy gõ. PHTV là bản mã nguồn mở cho Mac, tải từ đây hoặc Homebrew, có thêm GIF, Sticker và nhiều tuỳ chỉnh nâng cao. PHTV Keyboard là bản trên App Store: trên Mac chạy trong App Sandbox, có gõ tắt, Clipboard và emoji; trên iPhone và iPad là bàn phím tiếng Việt có gợi ý từ và vuốt để gõ. Trên Mac chỉ nên chạy một trong hai.',
        en: 'They share one typing engine. PHTV is the open-source Mac edition, downloaded here or with Homebrew, with GIFs, stickers and many advanced options. PHTV Keyboard is the App Store edition: on the Mac it runs in the App Sandbox with text shortcuts, clipboard history and emoji; on iPhone and iPad it is a Vietnamese keyboard with word suggestions and swipe typing. On a Mac, run only one of them.',
      },
    },
  ],
  community: 'phtv',
};

export default app;
