import type { App } from '../types';
import icon from '../../assets/apps/padcodeai/app-icon.png';

const app: App = {
  slug: 'padcodeai',
  name: 'Pad Code AI',
  route: '/PadCodeAI/',
  legalLangs: ['en', 'vi'],
  icon: icon,
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
    vi: 'Xưởng lập trình hoàn chỉnh trên iPad và iPhone.',
    en: 'A complete coding studio on iPad and iPhone.',
  },
  subtitle: {
    vi: 'Trình soạn thảo, môi trường chạy mã ngay trên máy, terminal, Git và một AI cùng bạn xây dựng ứng dụng.',
    en: 'An editor, on-device runtimes, a terminal, Git and an AI that builds with you.',
  },
  description: {
    vi: 'Pad Code AI chạy C, C++, Python, JavaScript, TypeScript, Ruby, PHP, Lua và SQLite ngay trên thiết bị với trình biên dịch tích hợp. Kèm agent AI miễn phí, SSH và SFTP, shell cho dự án, LaTeX và Git.',
    en: 'Pad Code AI runs C, C++, Python, JavaScript, TypeScript, Ruby, PHP, Lua and SQLite on your device with bundled compilers. It adds a free AI agent, SSH and SFTP, a project shell, LaTeX and Git.',
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
      label: { vi: 'Agent AI', en: 'AI agent' },
      value: { vi: 'Miễn phí', en: 'Free' },
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
        vi: 'Mô tả ứng dụng hoặc thay đổi bằng lời của bạn. AI lập kế hoạch, viết tệp và chạy mã để tự kiểm tra. Chọn mức Hỏi, Lập kế hoạch, Sửa hoặc Tự động; mọi thay đổi đều xem được dạng diff và hoàn tác được.',
        en: 'Describe the app or change you want. The AI plans it, writes the files and runs the code to check its work. Pick Ask, Plan, Edit or Auto, and review or undo every change as a diff.',
      },
    },
    {
      title: { vi: 'AI theo cách của bạn', en: 'AI your way' },
      description: {
        vi: 'Apple Intelligence chạy riêng tư trên máy, kể cả tác vụ agent. Hoặc dùng khoá API của bạn với nhà cung cấp bên thứ ba, hay tải mô hình mở như Qwen, Gemma để dùng ngoại tuyến.',
        en: 'Apple Intelligence runs privately on device, agent tasks included. Or bring your own key for a third-party provider, or download open models such as Qwen and Gemma to use offline.',
      },
    },
    {
      title: { vi: 'Trình biên dịch tích hợp', en: 'Bundled compilers' },
      description: {
        vi: 'C, C++, Python, JavaScript, TypeScript, Ruby, PHP, Lua và SQLite chạy ngoại tuyến, có nhập liệu, đối số và tệp dự án. Python có điểm dừng, biểu đồ matplotlib và gói như NumPy, pandas.',
        en: 'C, C++, Python, JavaScript, TypeScript, Ruby, PHP, Lua and SQLite run offline with input, arguments and project files. Python adds breakpoints, matplotlib plots and packages such as NumPy and pandas.',
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
      title: { vi: 'Trình soạn thảo thực thụ', en: 'A real editor' },
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
      title: { vi: 'Miễn phí là chính', en: 'Free where it counts' },
      description: {
        vi: 'Agent AI và Vibe Coding miễn phí. Chia đôi trình soạn thảo và thay thế toàn dự án có lượt dùng thử mỗi ngày; mua một lần để bỏ giới hạn, không thuê bao.',
        en: 'The AI agent and Vibe Coding are free. The split editor and project-wide replace have a daily free allowance; a one-time purchase removes the limit, with no subscription.',
      },
    },
  ],
  support: {
    vi: 'Gửi góp ý, báo lỗi hoặc đề xuất ngôn ngữ mới qua email hoặc fanpage Pad Code AI.',
    en: 'Send feedback, bug reports, or language requests by email or on the Pad Code AI Facebook page.',
  },
};

export default app;
