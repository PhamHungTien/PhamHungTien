import type { App } from '../types';
import icon from '../../assets/apps/padcodeai/app-icon.png';
import currentV2IpadEditorMockup from '../../assets/apps/padcodeai/current/v2/ipad-editor-mockup.webp';
import currentV2IphoneEditorMockup from '../../assets/apps/padcodeai/current/v2/iphone-editor-mockup.webp';
import featureRun from '../../assets/apps/padcodeai/current/v2/feature-run.webp';
import featureWeb from '../../assets/apps/padcodeai/current/v2/feature-web.webp';
import featureGit from '../../assets/apps/padcodeai/current/v2/feature-git.webp';
import featureAi from '../../assets/apps/padcodeai/current/v2/feature-ai.webp';
import currentV2OnboardingMockup from '../../assets/apps/padcodeai/current/v2/onboarding-mockup.webp';
import currentV2HeroDevices from '../../assets/apps/padcodeai/current/v2/hero-devices.webp';

const app: App = {
  slug: 'padcodeai',
  name: 'Pad Code AI',
  route: '/PadCodeAI/',
  icon: icon,
  heroImage: currentV2HeroDevices,
  gallery: [
    {
      src: currentV2IpadEditorMockup,
      alt: {
        vi: 'Editor C++ và terminal native trên iPad — bản 2.0',
        en: 'C++ editor and native terminal on iPad — version 2.0',
      },
    },
    {
      src: featureRun,
      alt: {
        vi: 'Chạy Python ngay trên iPad, kết quả hiện trong terminal',
        en: 'Running Python on iPad with output in the terminal',
      },
    },
    {
      src: featureWeb,
      alt: {
        vi: 'Xem trước HTML, CSS và JavaScript ngay trong ứng dụng',
        en: 'Live preview of HTML, CSS and JavaScript inside the app',
      },
    },
    {
      src: featureGit,
      alt: {
        vi: 'Source Control: xem thay đổi, commit và đẩy lên GitHub',
        en: 'Source Control: review changes, commit and push to GitHub',
      },
    },
    {
      src: featureAi,
      alt: {
        vi: 'Trợ lý AI tuỳ chọn: giải thích, refactor, viết test, sửa lỗi',
        en: 'Optional AI assistant: explain, refactor, write tests, fix',
      },
    },
    {
      src: currentV2IphoneEditorMockup,
      alt: {
        vi: 'Không gian soạn thảo trên iPhone — bản 2.0',
        en: 'iPhone coding workspace — version 2.0',
      },
    },
    {
      src: currentV2OnboardingMockup,
      alt: {
        vi: 'Màn hình chào mừng và chọn ngôn ngữ native',
        en: 'Native welcome and language selection',
      },
    },
  ],
  links: {
    stores: { appStore: 'https://apps.apple.com/us/app/pad-code-ai-code-editor/id6774398897' },
    community: 'https://www.facebook.com/PadCodeAI',
  },
  accent: '#a3162b',
  tutorial: {
    youtubeId: '_GN8XpwSNNw',
    title: { vi: 'Pad Code AI trong một phút', en: 'Pad Code AI in a minute' },
    description: {
      vi: 'Gợi ý code thông minh, chạy code ngay trên máy, xem trước web, đồng bộ GitHub và trợ lý AI tuỳ chọn. Có phụ đề tiếng Việt và tiếng Anh.',
      en: 'Smart completion, code that runs on your device, instant web preview, GitHub sync and an optional AI assistant. Subtitles in English and Vietnamese.',
    },
  },
  category: { vi: 'IDE cho iPad và iPhone', en: 'IDE for iPad and iPhone' },
  title: {
    vi: 'Viết và chạy code thật trên iPad và iPhone.',
    en: 'Write and run real code on iPad and iPhone.',
  },
  subtitle: {
    vi: 'Trình biên dịch thật chạy offline, terminal tương tác, Git và trợ lý AI.',
    en: 'Real compilers that run offline, an interactive terminal, Git, and an AI assistant.',
  },
  description: {
    vi: 'Pad Code AI biên dịch và chạy C, C++, Python, JavaScript, TypeScript, Ruby, PHP, Lua và SQL ngay trên thiết bị, không cần máy chủ hay kết nối mạng. Editor hỗ trợ 43 ngôn ngữ, terminal chờ bạn nhập liệu như trên máy tính, kèm Git và trợ lý AI.',
    en: 'Pad Code AI compiles and runs C, C++, Python, JavaScript, TypeScript, Ruby, PHP, Lua, and SQL right on your device, with no server or internet connection. The editor supports 43 languages, the terminal waits for your input like a computer does, and Git and an AI assistant are built in.',
  },
  platforms: ['ios', 'ipados'],
  appCategory: 'DeveloperApplication',
  facts: [
    {
      label: { vi: 'Nền tảng', en: 'Platforms' },
      value: { vi: 'iPad, iPhone', en: 'iPad, iPhone' },
    },
    {
      label: { vi: 'Chạy trên máy', en: 'Runs on device' },
      value: { vi: '9 ngôn ngữ', en: '9 languages' },
    },
    {
      label: { vi: 'Soạn thảo', en: 'Editing' },
      value: { vi: '43 ngôn ngữ', en: '43 languages' },
    },
    {
      label: { vi: 'Giao diện', en: 'Interface' },
      value: { vi: '20 ngôn ngữ (2.0)', en: '20 languages (2.0)' },
    },
  ],
  features: [
    {
      title: { vi: 'Cấu hình chạy trực quan', en: 'Visual Run Configuration' },
      description: {
        vi: 'Chọn file khởi chạy, tham số, biến môi trường, thư mục làm việc và thời gian chờ; mở đúng dòng lỗi từ chẩn đoán.',
        en: 'Choose entry files, arguments, environment variables, working directories, and timeouts; jump to the exact error location from diagnostics.',
      },
    },
    {
      title: { vi: 'Xem trước web trong 2.0', en: 'Web preview in 2.0' },
      description: {
        vi: 'Xem trước HTML, CSS và JavaScript trình duyệt bằng WebKit. Swift/SwiftUI, Metal và OpenGL native chưa hỗ trợ xem trước đồ họa.',
        en: 'Preview HTML, CSS and browser JavaScript with WebKit. Swift/SwiftUI, Metal and native OpenGL graphical previews are not supported.',
      },
    },
    {
      title: { vi: 'Premium mua một lần từ 2.0', en: 'One-time Premium from 2.0' },
      description: {
        vi: 'Premium mở khóa chia đôi trình soạn thảo và thay thế hàng loạt trong dự án, không đăng ký định kỳ. Soạn thảo, chạy mã được hỗ trợ, xem trước web, Git và xuất tệp vẫn miễn phí. Giá địa phương hiển thị trên App Store trước khi xác nhận.',
        en: 'Premium unlocks split editing and bulk workspace replacement without a subscription. Editing, supported runners, web preview, Git and export stay free. The App Store shows your local price before confirmation.',
      },
    },
    {
      title: { vi: 'Trình biên dịch thật, chạy offline', en: 'Real compilers, fully offline' },
      description: {
        vi: 'Clang cho C/C++, CPython, Ruby, PHP, Lua, TypeScript, runtime JavaScript kiểu Node.js và SQLite được tích hợp sẵn trong ứng dụng. Không máy chủ, không mô phỏng kết quả.',
        en: 'Clang for C/C++, CPython, Ruby, PHP, Lua, TypeScript, a Node.js-style JavaScript runtime, and SQLite ship inside the app. No server, and no simulated output.',
      },
    },
    {
      title: { vi: 'Terminal tương tác', en: 'Interactive terminal' },
      description: {
        vi: 'input(), scanf, cin hay io.read đều chờ bạn nhập như trên máy tính; ^D để kết thúc nhập. Truyền tham số, đọc ghi tệp trong dự án và dừng chương trình ngay lập tức.',
        en: 'input(), scanf, cin, and io.read wait for you just like on a computer, and ^D ends input. Pass arguments, read and write project files, and stop any program instantly.',
      },
    },
    {
      title: { vi: 'Báo lỗi đúng dòng', en: 'Errors on the exact line' },
      description: {
        vi: 'Lỗi biên dịch và exception được đánh dấu ngay tại dòng gây lỗi trong editor.',
        en: 'Compiler errors and exceptions are marked on the failing line in the editor.',
      },
    },
    {
      title: { vi: 'Editor cho cảm ứng và bàn phím', en: 'An editor for touch and keyboard' },
      description: {
        vi: 'Tô màu 43 ngôn ngữ, thanh phím lập trình, gập code, minimap, outline, tìm kiếm trong dự án, thay thế trong tệp, cùng menu bar và phím tắt đầy đủ.',
        en: 'Highlighting for 43 languages, a coding keyboard bar, folding, a minimap, outlines, workspace search, in-file replacement, and a full menu bar with keyboard shortcuts.',
      },
    },
    {
      title: { vi: 'Git và dự án', en: 'Git and projects' },
      description: {
        vi: 'Mở thư mục từ ứng dụng Tệp, clone từ GitHub, xem thay đổi, commit, push, stash và xuất dự án thành ZIP.',
        en: 'Open folders from the Files app, clone from GitHub, review changes, commit, push, stash, and export projects as ZIP.',
      },
    },
    {
      title: { vi: 'Trợ lý AI trong tầm kiểm soát', en: 'An AI assistant you control' },
      description: {
        vi: 'Giải thích, refactor, viết test và sửa lỗi bằng một chạm. Thay đổi được hiển thị dạng diff để xem trước khi áp dụng. Dùng model trên máy hoặc API key của riêng bạn; không gửi gì khi bạn chưa đồng ý.',
        en: 'Explain, refactor, write tests, and fix bugs in one tap. Changes appear as a diff to review before applying. Use the on-device model or your own API key; nothing is sent without your permission.',
      },
    },
  ],
  support: {
    vi: 'Gửi góp ý, báo lỗi hoặc đề xuất ngôn ngữ mới qua email hoặc fanpage Pad Code AI.',
    en: 'Send feedback, bug reports, or language requests by email or on the Pad Code AI Facebook page.',
  },
};

export default app;
