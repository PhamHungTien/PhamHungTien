import type { App } from '../types';
import icon from '../../assets/apps/padcodeai/app-icon.png';

const app: App = {
  slug: 'padcodeai',
  name: 'Pad Code AI',
  route: '/PadCodeAI/',
  icon: icon,
  links: {
    stores: { appStore: 'https://apps.apple.com/app/id6774398897' },
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
    vi: 'Viết, chạy và kiểm tra mã trên iPad và iPhone',
    en: 'Write, run and debug code on iPad and iPhone',
  },
  subtitle: {
    vi: 'Mở cả dự án, chạy mã ngay trên máy và quản lý thay đổi bằng Git. Dùng terminal, SSH, SFTP hoặc trợ lý AI khi cần.',
    en: 'Open a project, run code on the device and manage changes with Git. Use the terminal, SSH, SFTP or the optional AI assistant as needed.',
  },
  description: {
    vi: 'Pad Code AI là IDE cho iPad và iPhone. Chạy Python, C, C++ và JavaScript ngoại tuyến, xem trước web và quản lý dự án bằng Git.',
    en: 'Pad Code AI is an IDE for iPad and iPhone. Run Python, C, C++ and JavaScript offline, preview websites and manage projects with Git.',
  },
  platforms: ['ios', 'ipados'],
  requirements: 'iOS 17+, iPadOS 17+',
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
      label: { vi: 'Giá', en: 'Price' },
      value: { vi: 'Miễn phí, có gói Pro', en: 'Free, with optional Pro' },
    },
    {
      label: { vi: 'Giao diện', en: 'Interface' },
      value: { vi: '20 ngôn ngữ', en: '20 languages' },
    },
  ],
  features: [
    {
      title: { vi: 'Vibe Coding', en: 'Vibe Coding' },
      description: {
        vi: 'Mô tả thay đổi bạn muốn thực hiện. Chọn chế độ Hỏi, Lập kế hoạch, Sửa hoặc Tự động để đặt phạm vi thao tác của AI. Xem bản so sánh và hoàn tác thay đổi của trợ lý khi cần.',
        en: 'Describe the change you want to make. Choose Ask, Plan, Edit or Auto to control what the assistant can do. Review diffs and undo changes the assistant makes as needed.',
      },
    },
    {
      title: { vi: 'AI theo cách của bạn', en: 'AI your way' },
      description: {
        vi: 'Dùng Apple Intelligence trên thiết bị và khu vực được hỗ trợ, hoặc tải mô hình như Qwen và Gemma để dùng ngoại tuyến khi đủ bộ nhớ. Với nhà cung cấp AI trực tuyến, bạn cần khoá API và kết nối mạng.',
        en: 'Use Apple Intelligence on a supported device and in an eligible region, or download a model such as Qwen or Gemma for offline use where memory allows. Online providers require your own API key and an internet connection.',
      },
    },
    {
      title: { vi: 'Chạy mã ngay trên thiết bị', en: 'On-device runtimes' },
      description: {
        vi: 'Chạy C, C++, Python, JavaScript, TypeScript, Ruby, PHP, Lua và câu lệnh SQLite với dữ liệu nhập, đối số và tệp dự án. Python có điểm dừng, biểu đồ matplotlib và các gói tương thích như NumPy, pandas.',
        en: 'Run C, C++, Python, JavaScript, TypeScript, Ruby, PHP, Lua and SQLite queries with input, arguments and project files. Python supports breakpoints, matplotlib plots and compatible packages such as NumPy and pandas.',
      },
    },
    {
      title: { vi: 'Xem trước và LaTeX', en: 'Previews and LaTeX' },
      description: {
        vi: 'Xem trước HTML, CSS, JavaScript, Markdown và SVG. Dàn trang LaTeX có công thức, bảng, hình; in hoặc lưu mọi bản xem trước thành PDF.',
        en: 'Preview HTML, CSS, JavaScript, Markdown and SVG. Typeset LaTeX with math, tables and figures, and print or save any preview as PDF.',
      },
    },
    {
      title: { vi: 'SSH, SFTP và shell', en: 'SSH, SFTP and a shell' },
      description: {
        vi: 'Terminal SSH đầy đủ màu, chạy được vim, htop, tmux; duyệt và sửa tệp máy chủ qua SFTP. Shell cục bộ có ls, cd, grep, pipe cùng python3, node, gcc và npm.',
        en: 'A full-color SSH terminal that runs vim, htop and tmux, plus SFTP to browse and edit server files. The local shell has ls, cd, grep and pipes, with python3, node, gcc and npm.',
      },
    },
    {
      title: { vi: 'Soạn thảo và điều hướng mã', en: 'Code editing and navigation' },
      description: {
        vi: 'Tô màu cú pháp, gợi ý mã, đi tới định nghĩa, tìm tham chiếu, đổi tên, tìm và thay thế toàn dự án, thu gọn mã, snippet và chia đôi màn hình.',
        en: 'Syntax highlighting, completion, go to definition, find references, rename, project-wide search and replace, folding, snippets and a split editor.',
      },
    },
    {
      title: { vi: 'Git tích hợp', en: 'Git built in' },
      description: {
        vi: 'Clone qua HTTPS từ GitHub, GitLab, Bitbucket. Xem diff, commit, tạo nhánh, stash, push, pull; đăng nhập GitHub để mở cả kho riêng tư.',
        en: 'Clone over HTTPS from GitHub, GitLab and Bitbucket. Review diffs, commit, branch, stash, push and pull; sign in to GitHub to open private repositories too.',
      },
    },
    {
      title: { vi: 'Tính năng miễn phí và Pro', en: 'Free tools and optional Pro' },
      description: {
        vi: 'Trình soạn thảo, chạy mã, terminal, Git, xem trước web và chat AI dùng miễn phí. Pad Code AI Pro bỏ giới hạn mỗi ngày của agent AI và Vibe Coding, notebook, trình gỡ lỗi, SSH và SFTP, trình soạn thảo chia đôi và thay thế toàn dự án; công cụ nào cũng dùng thử miễn phí được mỗi ngày. Chọn gói năm có dùng thử miễn phí, gói tháng hoặc mua một lần.',
        en: 'The editor, running code, the terminal, Git, web previews and AI chat are free. Pad Code AI Pro removes the daily limits on the AI agent and Vibe Coding, notebooks, the debugger, SSH and SFTP, the split editor and project-wide replace; each can be tried free every day. Choose yearly with a free trial, monthly or a one-time purchase.',
      },
    },
  ],
  support: {
    vi: 'Gửi góp ý, báo lỗi hoặc đề xuất ngôn ngữ mới qua email hoặc fanpage Pad Code AI.',
    en: 'Send feedback, bug reports, or language requests by email or on the Pad Code AI Facebook page.',
  },
  faq: [
    {
      question: { vi: 'Có thể chạy mã khi không có mạng không?', en: 'Can I run code offline?' },
      answer: {
        vi: 'Các môi trường chạy tích hợp hoạt động ngoại tuyến. Bạn cần mạng khi tải thêm gói, kết nối máy chủ SSH, lấy mã từ kho Git từ xa hoặc dùng AI trực tuyến.',
        en: 'The bundled runtimes work offline. You need a connection to download additional packages, connect to an SSH server, fetch from a remote Git repository or use an online AI provider.',
      },
    },
    {
      question: { vi: 'Pad Code AI có chạy được Swift không?', en: 'Can Pad Code AI run Swift?' },
      answer: {
        vi: 'Bạn có thể soạn thảo tệp Swift. Để biên dịch và chạy trong ứng dụng, hãy chọn một ngôn ngữ có môi trường chạy tích hợp, chẳng hạn Python, JavaScript, C hoặc C++.',
        en: 'You can edit Swift files. To compile and run code in the app, choose a language with a bundled runtime, such as Python, JavaScript, C or C++.',
      },
    },
    {
      question: {
        vi: 'Có dùng được GitHub riêng tư không?',
        en: 'Can I open private GitHub repositories?',
      },
      answer: {
        vi: 'Đăng nhập GitHub trong ứng dụng để duyệt và sao chép kho mà tài khoản của bạn có quyền truy cập. Sau khi sao chép, bạn có thể xem thay đổi và commit trên thiết bị.',
        en: 'Sign in to GitHub in the app to browse and clone repositories your account can access. After cloning, you can review changes and commit on the device.',
      },
    },
  ],
};

export default app;
