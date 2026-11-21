import type { App } from '../types';
import icon from '../../assets/apps/mynasmanager/app-icon.png';

const app: App = {
  slug: 'mynasmanager',
  name: 'My NAS Manager',
  route: '/MyNASManager/',
  icon: icon,
  links: {
    stores: { appStore: 'https://apps.apple.com/app/id6780180564' },
  },
  accent: '#0071e3',
  category: { vi: 'Quản lý Synology NAS', en: 'Synology NAS manager' },
  title: {
    vi: 'Quản lý Synology NAS từ iPhone và iPad',
    en: 'Manage your Synology NAS from iPhone and iPad',
  },
  subtitle: {
    vi: 'Theo dõi tình trạng ổ đĩa, duyệt tệp trong File Station và kiểm tra tác vụ Download Station.',
    en: 'Check drive health, browse files in File Station and manage Download Station tasks.',
  },
  description: {
    vi: 'My NAS Manager là ứng dụng Synology DSM cho iPhone và iPad. Theo dõi CPU, RAM và ổ đĩa, duyệt File Station và quản lý tác vụ tải xuống.',
    en: 'My NAS Manager is a Synology DSM client for iPhone and iPad. Monitor CPU, memory and drive health, browse File Station and manage downloads.',
  },
  platforms: ['ios', 'ipados'],
  requirements: 'iOS 17+, iPadOS 17+',
  appCategory: 'UtilitiesApplication',
  facts: [
    {
      label: { vi: 'Nền tảng', en: 'Platforms' },
      value: { vi: 'iPhone, iPad', en: 'iPhone, iPad' },
    },
    {
      label: { vi: 'Máy chủ', en: 'Server' },
      value: { vi: 'Synology DSM 7', en: 'Synology DSM 7' },
    },
    {
      label: { vi: 'Giao diện', en: 'Interface' },
      value: { vi: '15 ngôn ngữ', en: '15 languages' },
    },
    {
      label: { vi: 'Theo dõi', en: 'Tracking' },
      value: { vi: 'Không có', en: 'None' },
    },
  ],
  features: [
    {
      title: { vi: 'Tổng quan thời gian thực', en: 'Live overview' },
      description: {
        vi: 'CPU, RAM, mạng và nhiệt độ kèm biểu đồ trực tiếp, tiến trình nổi bật, thông tin hệ thống và hoạt động gần đây.',
        en: 'CPU, memory, network and temperature with live charts, top processes, system information and recent activity.',
      },
    },
    {
      title: { vi: 'File Station', en: 'File Station' },
      description: {
        vi: 'Duyệt thư mục chia sẻ, tải lên, tải xuống có tiến độ, thử lại và huỷ; đổi tên, sao chép, di chuyển, xoá nhiều mục, xem trước và tạo liên kết chia sẻ.',
        en: 'Browse shared folders, upload and download with progress, retry and cancel; rename, copy, move and delete many items, preview files and create share links.',
      },
    },
    {
      title: { vi: 'Lưu trữ', en: 'Storage' },
      description: {
        vi: 'Nhóm lưu trữ, volume và ổ đĩa với dung lượng, tình trạng, nhiệt độ và trạng thái S.M.A.R.T.',
        en: 'Storage pools, volumes and drives with usage, health, temperature and S.M.A.R.T. status.',
      },
    },
    {
      title: { vi: 'Download Station', en: 'Download Station' },
      description: {
        vi: 'Thêm link HTTP, FTP hoặc magnet; tạm dừng, tiếp tục, xoá và lọc tác vụ.',
        en: 'Add HTTP, FTP or magnet links, then pause, resume, delete and filter tasks.',
      },
    },
    {
      title: { vi: 'Quản trị DSM', en: 'DSM management' },
      description: {
        vi: 'Bật hoặc dừng gói cài đặt, xem Security Advisor, nhật ký và giao diện mạng. Với gói mua một lần, bạn có thể quản lý dịch vụ SSH và xem thông tin chẩn đoán trong giao diện terminal.',
        en: 'Start or stop packages and review Security Advisor, logs and network interfaces. The one-time purchase adds SSH service controls and a terminal-style diagnostic view.',
      },
    },
    {
      title: { vi: 'Đăng nhập thẳng vào DSM', en: 'Sign in directly to DSM' },
      description: {
        vi: 'Đăng nhập bằng tài khoản NAS của bạn qua địa chỉ DSM đã nhập. Ứng dụng hỗ trợ HTTPS và mã xác thực hai bước. Phiên DSM được lưu trong Apple Keychain.',
        en: 'Sign in with your NAS account at the DSM address you enter. The app supports HTTPS and two-factor codes and keeps the DSM session in Apple Keychain.',
      },
    },
  ],
  support: {
    vi: 'Để được hỗ trợ, gửi email kèm phiên bản DSM, phiên bản ứng dụng và thông báo lỗi. Giữ riêng mật khẩu và mã xác thực.',
    en: 'For support, email the DSM version, app version and error message. Keep passwords and verification codes private.',
  },
  faq: [
    {
      question: {
        vi: 'My NAS Manager hỗ trợ NAS nào?',
        en: 'Which NAS does My NAS Manager support?',
      },
      answer: {
        vi: 'Ứng dụng dành cho Synology NAS chạy DSM 7. Bạn cần địa chỉ DSM mà iPhone hoặc iPad truy cập được và tài khoản có quyền phù hợp với tác vụ cần thực hiện.',
        en: 'The app is built for Synology NAS devices running DSM 7. You need a reachable DSM address and an account with permission for the task you want to perform.',
      },
    },
    {
      question: {
        vi: 'Vì sao một mục như Download Station không xuất hiện?',
        en: 'Why is a feature such as Download Station unavailable?',
      },
      answer: {
        vi: 'Các mục hiển thị phụ thuộc vào phiên bản DSM, gói đã cài và quyền của tài khoản. Kiểm tra gói tương ứng trong Package Center và quyền hiện có trong DSM.',
        en: 'Availability depends on your DSM version, installed packages and account permissions. Check the corresponding package in Package Center and your account’s access in DSM.',
      },
    },
    {
      question: {
        vi: 'Chức năng SSH của ứng dụng làm được gì?',
        en: 'What can I do with the app’s SSH feature?',
      },
      answer: {
        vi: 'Bạn có thể bật hoặc tắt dịch vụ SSH của DSM, đổi cổng và xem thông tin chẩn đoán. Giao diện terminal trong ứng dụng dùng cho các lệnh chẩn đoán có sẵn.',
        en: 'You can turn the DSM SSH service on or off, change its port and view diagnostics. The in-app terminal view provides a set of built-in diagnostics.',
      },
    },
  ],
};

export default app;
