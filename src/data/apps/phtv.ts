import type { App } from '../types';
import icon from '../../assets/apps/phtv/app-icon.png';

const app: App = {
  slug: 'phtv',
  // PHTV's audience is Vietnamese, so /PHTV/ stays Vietnamese and English lives at /en/PHTV/.
  defaultLang: 'vi',
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
    vi: 'Gõ tiếng Việt bằng Telex và VNI trên Mac',
    en: 'Type Vietnamese on Mac with Telex and VNI',
  },
  subtitle: {
    vi: 'Gõ Telex, VNI hoặc Simple Telex, tạo phím gõ tắt và kiểm tra chính tả ngay trên Mac. PHTV miễn phí và mã nguồn mở.',
    en: 'Type with Telex, VNI or Simple Telex, create text shortcuts and check spelling on your Mac. PHTV is free and open source.',
  },
  description: {
    vi: 'PHTV là bộ gõ tiếng Việt miễn phí cho macOS 14+, có Telex, VNI, gõ tắt, kiểm tra chính tả và lịch sử clipboard. Tải cho cả Mac Apple Silicon và Intel.',
    en: 'PHTV is a free Vietnamese input method for macOS 14+ with Telex, VNI, text shortcuts, spell checking and clipboard history. For Apple Silicon and Intel Macs.',
  },
  platforms: ['macos'],
  requirements: 'macOS 14+',
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
      title: { vi: 'Xử lý phím ngay trên máy', en: 'On-device typing' },
      description: {
        vi: 'Bộ gõ xử lý nội dung ngay trên Mac. Khi bạn mở hoặc tìm GIF và sticker, PHTV kết nối dịch vụ Klipy. Kiểm tra cập nhật cũng cần Internet.',
        en: 'The typing engine processes text on your Mac. PHTV connects to Klipy when you open or search the GIF and sticker picker. Update checks also use the internet.',
      },
    },
    {
      title: { vi: 'Bộ gõ trên thanh menu', en: 'A native menu bar app' },
      description: {
        vi: 'PHTV viết bằng Swift cho macOS. Mở cài đặt, đổi kiểu gõ và chuyển Việt–Anh ngay từ thanh menu.',
        en: 'PHTV is written in Swift for macOS. Open settings, change your input method and switch between Vietnamese and English from the menu bar.',
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
      title: { vi: 'Bản PHTV Keyboard', en: 'The PHTV Keyboard edition' },
      description: {
        vi: 'PHTV Keyboard là bản dành cho App Store. Bản Mac chạy trong App Sandbox, có gõ tắt, clipboard và emoji. Bản iPhone và iPad có gợi ý từ, vuốt để gõ và thi gõ nhanh.',
        en: 'PHTV Keyboard is the edition designed for the App Store. The sandboxed Mac app includes text shortcuts, clipboard history and emoji. The iPhone and iPad keyboard has word suggestions, swipe typing and a typing race.',
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
        vi: 'Cấp một quyền theo hướng dẫn của PHTV. Tên mục là System & App Protection Override trên macOS 27.3+, Device Control and Data Access trên 27.0–27.2 hoặc Trợ năng trên các bản cũ hơn.',
        en: 'Follow the PHTV setup prompt to grant one permission. Look for System & App Protection Override on macOS 27.3+, Device Control and Data Access on 27.0–27.2, or Accessibility on earlier versions.',
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
        vi: 'Nội dung gõ được xử lý trên máy. PHTV dùng Internet để kiểm tra cập nhật và tải GIF, sticker từ Klipy khi bạn dùng trình chọn. PHTV Keyboard có thể kết nối Game Center khi bạn tham gia thi gõ nhanh.',
        en: 'Typing is processed on the device. PHTV uses the internet for update checks and to load GIFs and stickers from Klipy when you use the picker. PHTV Keyboard can connect to Game Center when you join the typing race.',
      },
    },
    {
      question: {
        vi: 'Vì sao PHTV cần quyền trong Cài đặt hệ thống?',
        en: 'Why does PHTV need a system permission?',
      },
      answer: {
        vi: 'Quyền này cho phép PHTV nhận phím và đưa chữ đã ghép dấu vào ô đang gõ. Trình thiết lập mở đúng mục theo phiên bản macOS. PHTV Keyboard cho Mac cũng cần quyền ghép chữ và chạy trong App Sandbox.',
        en: 'The permission lets PHTV receive keystrokes and insert composed Vietnamese text where you are typing. Setup opens the correct settings pane for your macOS version. PHTV Keyboard for Mac also needs permission to compose text and runs in the App Sandbox.',
      },
    },
    {
      question: {
        vi: 'PHTV và PHTV Keyboard khác nhau thế nào?',
        en: 'How do PHTV and PHTV Keyboard differ?',
      },
      answer: {
        vi: 'Hai bản dùng chung bộ máy gõ. Bản PHTV tải trực tiếp có GIF, sticker và tuỳ chỉnh nâng cao. PHTV Keyboard là bản dành cho App Store, với gõ tắt, clipboard và emoji trên Mac, cùng gợi ý từ và vuốt để gõ trên iPhone và iPad. Trên Mac, hãy chạy một bộ gõ tại một thời điểm.',
        en: 'Both share a typing engine. The direct-download PHTV edition adds GIFs, stickers and advanced settings. PHTV Keyboard is designed for the App Store, with text shortcuts, clipboard history and emoji on Mac, and word suggestions and swipe typing on iPhone and iPad. Run one input method at a time on your Mac.',
      },
    },
  ],
  community: 'phtv',
};

export default app;
