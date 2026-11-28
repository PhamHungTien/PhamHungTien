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
    vi: 'Ubuntu Linux thật cho việc lập trình trên iPad và iPhone',
    en: 'Real Ubuntu Linux for coding on iPad and iPhone',
  },
  subtitle: {
    vi: 'Pad Code AI chạy Ubuntu 26.04 LTS ngay trên máy, không cần máy chủ hay tài khoản. Terminal bash có apt, khoảng 60 công cụ tải một lần rồi dùng ngoại tuyến, trình gỡ lỗi, LaTeX và Git.',
    en: 'Pad Code AI runs Ubuntu 26.04 LTS on the device, with no server and no account. A bash terminal with apt, about 60 tools you download once and use offline, a debugger, LaTeX and Git.',
  },
  description: {
    vi: 'Pad Code AI là IDE cho iPad và iPhone chạy Ubuntu Linux thật ngay trên máy: Python, C, C++, JavaScript, Go, Rust, Java và nhiều hơn, terminal có apt, dùng ngoại tuyến.',
    en: 'Pad Code AI is an IDE for iPad and iPhone that runs real Ubuntu Linux on the device: Python, C, C++, JavaScript, Go, Rust, Java and more, a terminal with apt, offline.',
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
      label: { vi: 'Linux', en: 'Linux' },
      value: { vi: 'Ubuntu 26.04 LTS', en: 'Ubuntu 26.04 LTS' },
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
      title: { vi: 'Ubuntu Linux thật trên máy', en: 'Real Ubuntu Linux on the device' },
      description: {
        vi: 'Ubuntu 26.04 LTS cho arm64 chạy ngay trong ứng dụng, không cần máy chủ. Mỗi thẻ terminal là một shell bash có sudo apt install và cả kho gói của Ubuntu; dự án nằm ở /workspace và thay đổi hiện ngay trong trình soạn thảo.',
        en: "Ubuntu 26.04 LTS for arm64 runs inside the app, with no server. Every terminal tab is a bash shell with sudo apt install and all of Ubuntu's archive; the project lives at /workspace and changes show up in the editor right away.",
      },
    },
    {
      title: { vi: 'Khoảng 60 công cụ, dùng ngoại tuyến', en: 'About 60 tools, offline' },
      description: {
        vi: 'Python, Node.js, C và C++ (gcc, Clang), Java, Go, Rust, Ruby, PHP, .NET, Zig, Android SDK, trình biên dịch cho vi điều khiển, CMake, GDB, PostgreSQL, Redis… Tải một lần rồi dùng không cần mạng; ứng dụng gợi ý công cụ mà tệp đang cần. pip install numpy pandas matplotlib chạy được trong terminal, script hay notebook.',
        en: 'Python, Node.js, C and C++ (gcc, Clang), Java, Go, Rust, Ruby, PHP, .NET, Zig, the Android SDK, microcontroller toolchains, CMake, GDB, PostgreSQL, Redis and more. Download once and use them without the internet; the app suggests the tool a file needs. pip install numpy pandas matplotlib works in a terminal, a script or a notebook.',
      },
    },
    {
      title: {
        vi: 'Gỡ lỗi và gợi ý mã từ công cụ thật',
        en: 'A debugger and code intelligence from the real tools',
      },
      description: {
        vi: 'Gỡ lỗi Python, JavaScript và TypeScript: điểm dừng có điều kiện, logpoint, chạy từng bước, xem biến, call stack, biểu thức theo dõi và Chạy tới con trỏ. Gợi ý mã từ Jedi, Clang và TypeScript, định dạng bằng Black và Prettier, cùng đi tới định nghĩa, đổi tên và tìm thay toàn dự án.',
        en: 'Debug Python, JavaScript and TypeScript: conditional breakpoints, logpoints, stepping, variables, the call stack, watch expressions and Run to Cursor. Completion from Jedi, Clang and TypeScript, formatting with Black and Prettier, plus go to definition, rename and project-wide search and replace.',
      },
    },
    {
      title: { vi: 'Xem trước web và LaTeX', en: 'Web previews and LaTeX' },
      description: {
        vi: 'Trang web được phục vụ từ máy chủ web của Linux và tự tải lại khi lưu; dự án web khởi động dev server của chúng. LaTeX được dàn trang thành PDF thật bằng TeX Live, tự tải gói ngôn ngữ mà tài liệu cần, rồi lưu, chia sẻ hoặc in.',
        en: "Web pages are served from Linux's web server and reload when you save; web projects start their dev servers. LaTeX is typeset into real PDFs with TeX Live, which downloads the language packages a document needs, ready to save, share or print.",
      },
    },
    {
      title: { vi: 'Vibe Coding', en: 'Vibe Coding' },
      description: {
        vi: 'Mô tả thay đổi bạn muốn thực hiện. Chọn chế độ Hỏi, Lập kế hoạch, Sửa hoặc Tự động để đặt phạm vi thao tác của AI; ở chế độ Tự động, trợ lý chạy lệnh và kiểm thử ngay trong Linux. Coding agent dòng lệnh cũng mở được trong thẻ terminal riêng, đăng nhập bằng tài khoản của bạn.',
        en: 'Describe the change you want to make. Choose Ask, Plan, Edit or Auto to control what the assistant can do; in Auto it runs commands and tests in Linux. Command-line coding agents open in a terminal tab of their own, signed in with your own account.',
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
      title: { vi: 'Git, SSH và SFTP', en: 'Git, SSH and SFTP' },
      description: {
        vi: 'Clone qua HTTPS từ GitHub, GitLab, Bitbucket; xem diff, commit, tạo nhánh, stash, push, pull, đăng nhập GitHub để mở kho riêng tư. Terminal SSH đầy đủ màu chạy được vim, htop, tmux, cùng SFTP để duyệt và sửa tệp trên máy chủ.',
        en: 'Clone over HTTPS from GitHub, GitLab and Bitbucket; review diffs, commit, branch, stash, push and pull, and sign in to GitHub to open private repositories. A full-color SSH terminal runs vim, htop and tmux, with SFTP to browse and edit server files.',
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
        vi: 'Có. Tải Linux và các công cụ bạn cần một lần, sau đó chạy mã, terminal, gỡ lỗi và LaTeX đều không cần mạng. Bạn cần mạng khi tải thêm gói, kết nối máy chủ SSH, lấy mã từ kho Git từ xa hoặc dùng AI trực tuyến.',
        en: 'Yes. Download Linux and the tools you need once; after that, running code, the terminal, the debugger and LaTeX work without a connection. You need one to download more packages, connect to an SSH server, fetch from a remote Git repository or use an online AI provider.',
      },
    },
    {
      question: { vi: 'Linux chiếm bao nhiêu dung lượng?', en: 'How much space does Linux take?' },
      answer: {
        vi: 'Lần đầu, Linux kèm Python tải khoảng 310 MB. Công cụ khác chỉ tải khi bạn chọn và có thể xoá bất cứ lúc nào trong Cài đặt › Run & Terminal. Bản thân ứng dụng nhẹ vì không mang sẵn môi trường chạy.',
        en: 'The first download, Linux with Python, is about 310 MB. Other tools download only when you pick them and can be removed any time in Settings › Run & Terminal. The app itself stays small because it carries no runtimes.',
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
