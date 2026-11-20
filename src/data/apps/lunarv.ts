import type { App } from '../types';
import appStore from '../appstore.json';
import icon from '../../assets/apps/lunarv/app-icon.png';

const app: App = {
  slug: 'lunarv',
  defaultLang: 'vi',
  legalLangs: ['vi', 'en'],
  name: 'LunarV',
  route: '/LunarV/',
  icon: icon,
  links: {
    stores: {
      appStore:
        'https://apps.apple.com/vn/app/lunarv-l%E1%BB%8Bch-%C3%A2m-vi%E1%BB%87t-nam/id6770913893?l=vi',
    },
  },
  accent: '#6655d9',
  category: { vi: 'Lịch âm Việt Nam', en: 'Vietnamese lunar calendar' },
  title: {
    vi: 'Lịch âm Việt Nam gọn gàng và chính xác.',
    en: 'A clear, accurate Vietnamese lunar calendar.',
  },
  subtitle: {
    vi: 'Ngày âm, giờ hoàng đạo, chọn ngày tốt và nhắc giỗ trên iPhone, iPad, Mac và Apple Vision Pro.',
    en: 'Lunar dates, lucky hours, good-day finder and family reminders on iPhone, iPad, Mac and Apple Vision Pro.',
  },
  description: {
    vi: 'LunarV cho xem ngày âm, Can Chi, tiết khí, giờ hoàng đạo, chọn ngày tốt và ghi nhớ những dịp quan trọng của gia đình. Mọi thứ tính ngay trên thiết bị, không cần tài khoản.',
    en: 'LunarV shows lunar dates, Can Chi, solar terms and lucky hours, finds good days and remembers the occasions that matter to your family. Everything is computed on device, with no account.',
  },
  platforms: ['ios', 'ipados', 'macos', 'visionos'],
  appCategory: 'LifestyleApplication',
  facts: [
    {
      label: { vi: 'Phiên bản', en: 'Version' },
      value: { vi: appStore.apps.lunarv.version, en: appStore.apps.lunarv.version },
    },
    {
      label: { vi: 'Nền tảng', en: 'Platforms' },
      value: { vi: 'iOS & iPadOS, macOS, visionOS', en: 'iOS & iPadOS, macOS, visionOS' },
    },
    {
      label: { vi: 'Ngôn ngữ', en: 'Languages' },
      value: { vi: 'Việt, Anh, Trung', en: 'Vietnamese, English, Chinese' },
    },
    { label: { vi: 'Tài khoản', en: 'Account' }, value: { vi: 'Không cần', en: 'None needed' } },
  ],
  features: [
    {
      title: { vi: 'Hôm nay trong một cái nhìn', en: 'Today at a glance' },
      description: {
        vi: 'Ngày âm, Can Chi ngày, tháng, năm, tiết khí, con giáp và pha trăng; đánh giá ngày, giờ hoàng đạo kế tiếp và việc nên làm, nên tránh.',
        en: 'Lunar date, Can Chi for day, month and year, solar term, zodiac and moon phase, with a day score, the next lucky hour and what to do or avoid.',
      },
    },
    {
      title: { vi: 'Chọn ngày tốt', en: 'Good day finder' },
      description: {
        vi: 'Tìm ngày Hoàng đạo trong 30, 60 hoặc 90 ngày cho cưới hỏi, động thổ, khai trương, nhập trạch, xuất hành; tự loại Tam nương, Nguyệt kỵ và ngày xung tuổi.',
        en: 'Find auspicious days in the next 30, 60 or 90 days for weddings, groundbreaking, openings, moving and travel, skipping Tam nương, Nguyệt kỵ and days that clash with your age.',
      },
    },
    {
      title: { vi: 'Lịch tháng âm dương', en: 'Solar and lunar month' },
      description: {
        vi: 'Lưới tháng song song dương lịch và âm lịch, có ngày lễ và ghi chú. Đổi ngày, tìm ngày lễ và văn khấn trong tích tắc; có cả lịch Trung Quốc 1901–2100.',
        en: 'A month grid with Gregorian and lunar dates side by side, holidays and notes. Convert dates and search holidays and prayers in seconds; the Chinese calendar covers 1901–2100.',
      },
    },
    {
      title: { vi: 'Nhắc giỗ và dịp gia đình', en: 'Family reminders' },
      description: {
        vi: 'Lưu ngày giỗ, sinh nhật, ngày rằm theo âm hoặc dương lịch, lặp hằng năm, tháng hay tuần; nhắc trước và đồng bộ sang Apple Calendar nếu muốn.',
        en: 'Save memorial days, birthdays and full-moon days by lunar or solar date, repeating yearly, monthly or weekly, with advance reminders and optional Apple Calendar sync.',
      },
    },
    {
      title: { vi: 'Công cụ văn hoá', en: 'Cultural tools' },
      description: {
        vi: 'Thư viện văn khấn, tra tuổi xông đất, xem sao hạn, hợp khắc tuổi, thước Lỗ Ban, la bàn phong thuỷ và gieo quẻ Khổng Minh, mang tính tham khảo.',
        en: 'A prayer library, first-visitor finder, yearly stars, age compatibility, Lu Ban ruler, feng shui compass and Kongming oracle, offered as cultural reference.',
      },
    },
    {
      title: { vi: 'Widget và thanh menu', en: 'Widgets and menu bar' },
      description: {
        vi: 'Widget màn hình chính, màn hình khoá và Desktop; ngày âm trên thanh menu Mac; phím tắt Siri, Spotlight và giờ quốc tế cập nhật từng phút.',
        en: 'Home Screen, Lock Screen and desktop widgets, the lunar date in the Mac menu bar, Siri Shortcuts, Spotlight and live world clocks.',
      },
    },
  ],
  support: {
    vi: 'Cần hỗ trợ LunarV? Gửi email để mình kiểm tra.',
    en: 'Need help with LunarV? Send an email and I will take a look.',
  },
};

export default app;
