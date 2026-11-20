import type { App } from '../types';
import icon from '../../assets/apps/mynasmanager/app-icon.png';

const app: App = {
  slug: 'mynasmanager',
  name: 'My NAS Manager',
  route: '/MyNASManager/',
  icon: icon,
  links: {
    stores: { appStore: 'https://apps.apple.com/us/app/my-nas-manager/id6780180564' },
  },
  accent: '#0071e3',
  category: { vi: 'Quản lý Synology NAS', en: 'Synology NAS manager' },
  title: {
    vi: 'Synology NAS trong túi của bạn.',
    en: 'Your Synology NAS in your pocket.',
  },
  subtitle: {
    vi: 'Kiểm tra tình trạng máy, làm việc với tệp và quản lý tải xuống ngay trên iPhone và iPad.',
    en: 'Check its health, work with your files and manage downloads from iPhone and iPad.',
  },
  description: {
    vi: 'My NAS Manager theo dõi CPU, RAM, mạng và nhiệt độ, duyệt File Station, xem lưu trữ và S.M.A.R.T., quản lý Download Station, gói cài đặt và Hyper Backup. Chỉ kết nối tới NAS bạn nhập, không tài khoản, không theo dõi.',
    en: 'My NAS Manager monitors CPU, memory, network and temperature, browses File Station, shows storage and S.M.A.R.T. status, and manages Download Station, packages and Hyper Backup. It connects only to the NAS you enter, with no accounts or tracking.',
  },
  platforms: ['ios', 'ipados'],
  appCategory: 'UtilitiesApplication',
  facts: [
    {
      label: { vi: 'Nền tảng', en: 'Platforms' },
      value: { vi: 'iPhone, iPad', en: 'iPhone, iPad' },
    },
    {
      label: { vi: 'Máy chủ', en: 'Server' },
      value: { vi: 'Synology DSM', en: 'Synology DSM' },
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
      title: { vi: 'Quản trị', en: 'Management' },
      description: {
        vi: 'Bật, dừng gói cài đặt; xem Security Advisor, giao diện mạng và nhật ký; chạy Hyper Backup và khởi động lại DSM. Cấu hình SSH cần gói mua một lần.',
        en: 'Start or stop packages, read Security Advisor results, network interfaces and logs, run Hyper Backup jobs and restart DSM. SSH settings need the one-time purchase.',
      },
    },
    {
      title: { vi: 'Riêng tư từ thiết kế', en: 'Private by design' },
      description: {
        vi: 'Phiên đăng nhập lưu trong Keychain, hỗ trợ xác thực hai bước và HTTPS. Trên iPad có thanh bên, menu và phím tắt bàn phím.',
        en: 'Your session stays in the Keychain, with two-factor authentication and HTTPS. On iPad you get a sidebar, menu commands and keyboard shortcuts.',
      },
    },
  ],
  support: {
    vi: 'Gửi email nếu bạn cần hỗ trợ kết nối DSM hoặc SSH.',
    en: 'Email me if you need help with DSM or SSH connections.',
  },
};

export default app;
