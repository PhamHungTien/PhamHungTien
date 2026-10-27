import type { App } from '../types';
import icon from '../../assets/apps/lunarv/app-icon.png';
import ipad1 from '../../assets/apps/lunarv/appstore/ipad-1.jpg';
import ipad2 from '../../assets/apps/lunarv/appstore/ipad-2.jpg';
import ipad3 from '../../assets/apps/lunarv/appstore/ipad-3.jpg';
import iphone1 from '../../assets/apps/lunarv/appstore/iphone-1.jpg';
import iphone2 from '../../assets/apps/lunarv/appstore/iphone-2.jpg';
import iphone3 from '../../assets/apps/lunarv/appstore/iphone-3.jpg';
import mac1 from '../../assets/apps/lunarv/appstore/mac-1.jpg';

const app: App = {
  slug: 'lunarv',
  defaultLang: 'vi',
  legalLangs: ['vi', 'en'],
  name: 'LunarV',
  route: '/LunarV/',
  icon: icon,
  heroImage: ipad1,
  gallery: [
    { src: ipad1, alt: { vi: 'Giao diện iPad · 1', en: 'iPad experience · 1' } },
    { src: ipad2, alt: { vi: 'Giao diện iPad · 2', en: 'iPad experience · 2' } },
    { src: ipad3, alt: { vi: 'Giao diện iPad · 3', en: 'iPad experience · 3' } },
    { src: iphone1, alt: { vi: 'Giao diện iPhone · 1', en: 'iPhone experience · 1' } },
    { src: iphone2, alt: { vi: 'Giao diện iPhone · 2', en: 'iPhone experience · 2' } },
    { src: iphone3, alt: { vi: 'Giao diện iPhone · 3', en: 'iPhone experience · 3' } },
    { src: mac1, alt: { vi: 'Giao diện Mac · 1', en: 'Mac experience · 1' } },
  ],
  links: {
    stores: {
      appStore:
        'https://apps.apple.com/vn/app/lunarv-l%E1%BB%8Bch-%C3%A2m-vi%E1%BB%87t-nam/id6770913893?l=vi',
    },
  },
  accent: '#6655d9',
  category: { vi: 'Lịch âm Việt Nam', en: 'Vietnamese lunar calendar' },
  title: {
    vi: 'Lịch âm Việt Nam trên thiết bị Apple.',
    en: 'Vietnamese lunar calendar for Apple devices.',
  },
  subtitle: {
    vi: 'Ngày âm, dịp gia đình, widget và nhắc nhở.',
    en: 'Lunar dates, family moments, widgets, and reminders.',
  },
  description: {
    vi: 'LunarV gom lịch âm, lịch dương, can chi, tiết khí và nhắc dịp quan trọng vào một trải nghiệm đồng bộ cho iPhone, iPad và Mac.',
    en: 'LunarV brings lunar and solar dates, sexagenary cycles, solar terms, and personal reminders into one synced experience for iPhone, iPad, and Mac.',
  },
  platforms: ['ios', 'ipados', 'macos'],
  appCategory: 'LifestyleApplication',
  facts: [
    { label: { vi: 'Phiên bản', en: 'Version' }, value: { vi: '1.0.1', en: '1.0.1' } },
    {
      label: { vi: 'Nền tảng', en: 'Platforms' },
      value: { vi: 'iOS & iPadOS, macOS', en: 'iOS & iPadOS, macOS' },
    },
    { label: { vi: 'Phát hành', en: 'Release' }, value: { vi: 'App Store', en: 'App Store' } },
  ],
  features: [
    {
      title: { vi: 'Lịch âm được cập nhật', en: 'Updated lunar calendar' },
      description: {
        vi: 'Tra cứu lịch âm dương, chuyển đổi ngày nhanh chóng và xem widget ngay trên màn hình chính.',
        en: 'Browse the lunar and solar calendar, convert dates quickly, and check widgets on your Home Screen.',
      },
    },
    {
      title: { vi: 'Âm lịch và dương lịch', en: 'Lunar and solar dates' },
      description: {
        vi: 'Xem ngày âm, ngày dương, can chi và tiết khí trong cùng một nhịp đọc.',
        en: 'Read lunar dates, solar dates, cycles, and solar terms in one clear view.',
      },
    },
    {
      title: { vi: 'Dịp gia đình', en: 'Family moments' },
      description: {
        vi: 'Theo dõi ngày giỗ, sinh nhật và các dịp quan trọng theo âm hoặc dương lịch.',
        en: 'Track anniversaries, birthdays, and important dates using lunar or solar calendars.',
      },
    },
    {
      title: { vi: 'Widget đồng bộ', en: 'Synced widgets' },
      description: {
        vi: 'Thông tin ngày hiện tại được trình bày gọn trên màn hình chính và các nền tảng Apple.',
        en: 'Current-date context stays compact on Home Screen widgets and Apple platforms.',
      },
    },
  ],
  support: {
    vi: 'Cần hỗ trợ LunarV? Gửi email để mình kiểm tra.',
    en: 'Need help with LunarV? Send an email and I will take a look.',
  },
};

export default app;
