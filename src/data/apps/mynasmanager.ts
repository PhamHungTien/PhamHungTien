import type { App } from '../types';
import icon from '../../assets/apps/mynasmanager/app-icon.png';
import ipad1 from '../../assets/apps/mynasmanager/appstore/ipad-1.jpg';
import ipad2 from '../../assets/apps/mynasmanager/appstore/ipad-2.jpg';
import ipad3 from '../../assets/apps/mynasmanager/appstore/ipad-3.jpg';
import iphone1 from '../../assets/apps/mynasmanager/appstore/iphone-1.jpg';
import iphone2 from '../../assets/apps/mynasmanager/appstore/iphone-2.jpg';
import iphone3 from '../../assets/apps/mynasmanager/appstore/iphone-3.jpg';

const app: App = {
  slug: 'mynasmanager',
  name: 'My NAS Manager',
  route: '/MyNASManager/',
  icon: icon,
  heroImage: ipad1,
  gallery: [
    { src: ipad1, alt: { vi: 'Giao diện iPad · 1', en: 'iPad experience · 1' } },
    { src: ipad2, alt: { vi: 'Giao diện iPad · 2', en: 'iPad experience · 2' } },
    { src: ipad3, alt: { vi: 'Giao diện iPad · 3', en: 'iPad experience · 3' } },
    { src: iphone1, alt: { vi: 'Giao diện iPhone · 1', en: 'iPhone experience · 1' } },
    { src: iphone2, alt: { vi: 'Giao diện iPhone · 2', en: 'iPhone experience · 2' } },
    { src: iphone3, alt: { vi: 'Giao diện iPhone · 3', en: 'iPhone experience · 3' } },
  ],
  links: {
    stores: { appStore: 'https://apps.apple.com/us/app/my-nas-manager/id6780180564' },
  },
  accent: '#0071e3',
  category: { vi: 'Synology NAS client', en: 'Synology NAS client' },
  title: {
    vi: 'Quản lý Synology NAS trên thiết bị Apple.',
    en: 'Manage Synology NAS from your Apple devices.',
  },
  subtitle: {
    vi: 'Giám sát hệ thống, File Station và SSH trong một app.',
    en: 'System monitoring, File Station, and SSH in one app.',
  },
  description: {
    vi: 'My NAS Manager giúp theo dõi tài nguyên, duyệt file, quản lý gói DSM và truy cập terminal an toàn trên iPhone, iPad và Mac.',
    en: 'My NAS Manager helps you monitor resources, browse files, manage DSM packages, and access a secure terminal on iPhone, iPad, and Mac.',
  },
  platforms: ['ios', 'ipados', 'macos'],
  appCategory: 'UtilitiesApplication',
  facts: [
    {
      label: { vi: 'Nền tảng', en: 'Platforms' },
      value: { vi: 'iOS & iPadOS, macOS', en: 'iOS & iPadOS, macOS' },
    },
    {
      label: { vi: 'Máy chủ', en: 'Server' },
      value: { vi: 'Synology DSM 7+', en: 'Synology DSM 7+' },
    },
    {
      label: { vi: 'Công cụ', en: 'Tools' },
      value: { vi: 'Files + SSH + Packages', en: 'Files + SSH + Packages' },
    },
  ],
  features: [
    {
      title: { vi: 'Bảy ngôn ngữ & chế độ demo', en: 'Seven languages & demo mode' },
      description: {
        vi: 'Hỗ trợ Việt, Anh, Đức, Tây Ban Nha, Pháp, Nhật và Trung giản thể. Trải nghiệm giao diện bằng dữ liệu mô phỏng trước khi kết nối NAS.',
        en: 'Supports Vietnamese, English, German, Spanish, French, Japanese, and Simplified Chinese. Explore the interface with simulated data before connecting a NAS.',
      },
    },
    {
      title: { vi: 'Giám sát thời gian thực', en: 'Realtime monitoring' },
      description: {
        vi: 'Theo dõi CPU, RAM, nhiệt độ, mạng và trạng thái ổ đĩa.',
        en: 'Watch CPU, memory, temperature, network, and drive health.',
      },
    },
    {
      title: { vi: 'File Station di động', en: 'Mobile File Station' },
      description: {
        vi: 'Duyệt, tải lên, tải xuống và tạo link chia sẻ từ iPhone, iPad hoặc Mac.',
        en: 'Browse, upload, download, and create share links from iPhone, iPad, or Mac.',
      },
    },
    {
      title: { vi: 'Quản lý SSH & terminal mô phỏng', en: 'SSH management & terminal simulator' },
      description: {
        vi: 'Bật/tắt dịch vụ SSH, thay đổi cổng và chạy các lệnh quản trị cơ bản như ls, df, top, uptime qua terminal mô phỏng.',
        en: 'Toggle SSH services, change ports, and execute basic commands such as ls, df, top, and uptime through the terminal simulator.',
      },
    },
  ],
  support: {
    vi: 'Gửi email nếu bạn cần hỗ trợ kết nối DSM hoặc SSH.',
    en: 'Email me if you need help with DSM or SSH connections.',
  },
};

export default app;
