import type { App } from '../types';
import icon from '../../assets/apps/lunarv/app-icon.png';

const app: App = {
  slug: 'lunarv',
  defaultLang: 'vi',
  legalTranslations: ['zh'],
  name: 'LunarV',
  route: '/LunarV/',
  icon: icon,
  links: {
    stores: {
      appStore: 'https://apps.apple.com/app/id6770913893',
    },
  },
  accent: '#6655d9',
  category: { vi: 'Lịch âm Việt Nam', en: 'Vietnamese lunar calendar' },
  title: {
    vi: 'Tra lịch âm Việt Nam và nhắc ngày giỗ',
    en: 'Vietnamese lunar dates and family reminders',
  },
  subtitle: {
    vi: 'Ngày âm, giờ hoàng đạo, chọn ngày tốt và nhắc giỗ trên iPhone, iPad, Mac và Apple Vision Pro.',
    en: 'Lunar dates, lucky hours, good-day finder and family reminders on iPhone, iPad, Mac and Apple Vision Pro.',
  },
  description: {
    vi: 'LunarV là lịch âm Việt Nam trên iPhone, iPad, Mac và Apple Vision Pro. Đổi ngày âm dương, tra Can Chi, xem giờ hoàng đạo và đặt nhắc giỗ.',
    en: 'LunarV is a Vietnamese lunar calendar for iPhone, iPad, Mac and Apple Vision Pro. Convert dates, look up Can Chi and set lunar anniversary reminders.',
  },
  platforms: ['ios', 'ipados', 'macos', 'visionos'],
  requirements: 'iOS 17+, iPadOS 17+, macOS 14+, visionOS 2+',
  appCategory: 'LifestyleApplication',
  facts: [
    {
      label: { vi: 'Nền tảng', en: 'Platforms' },
      value: { vi: 'iOS & iPadOS, macOS, visionOS', en: 'iOS & iPadOS, macOS, visionOS' },
    },
    {
      label: { vi: 'Ngôn ngữ', en: 'Languages' },
      value: {
        vi: 'Việt, Anh, Trung giản thể và phồn thể',
        en: 'Vietnamese, English, Simplified and Traditional Chinese',
      },
    },
    { label: { vi: 'Tài khoản', en: 'Account' }, value: { vi: 'Không cần', en: 'None needed' } },
    {
      label: { vi: 'Giá', en: 'Price' },
      value: { vi: 'Miễn phí, có Premium mua một lần', en: 'Free with a one-time Premium upgrade' },
    },
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
        vi: 'Xem ngày dương và ngày âm cùng nhau, kèm ngày lễ và ghi chú. Đổi ngày theo lịch Việt Nam hoặc tra lịch Trung Quốc trong khoảng 1901–2100.',
        en: 'View Gregorian and lunar dates together with holidays and notes. Convert dates using the Vietnamese calendar or look up Chinese lunar dates from 1901 to 2100.',
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
    vi: 'Nếu cần kiểm tra kết quả đổi ngày, hãy gửi email kèm ngày đã nhập và loại lịch bạn chọn.',
    en: 'For help with a conversion, email the date you entered and the calendar you selected.',
  },
  faq: [
    {
      question: {
        vi: 'LunarV tính lịch âm Việt Nam theo múi giờ nào?',
        en: 'Which time zone does LunarV use for Vietnamese lunar dates?',
      },
      answer: {
        vi: 'Lịch âm Việt Nam dùng múi giờ UTC+7. LunarV cũng có chế độ lịch Trung Quốc riêng. Chọn đúng loại lịch trước khi đổi ngày, nhất là khi tra ngày đầu tháng hoặc tháng nhuận.',
        en: 'The Vietnamese calendar uses UTC+7. LunarV also has a separate Chinese calendar mode. Check which calendar you selected, especially near the start of a lunar month or in a leap month.',
      },
    },
    {
      question: {
        vi: 'Có thể nhắc ngày giỗ hằng năm theo âm lịch không?',
        en: 'Can I set a yearly reminder for a lunar memorial date?',
      },
      answer: {
        vi: 'Khi tạo dịp gia đình, chọn ngày âm, đặt lặp hằng năm và chọn thời điểm nhắc trước. Bạn cũng có thể xuất dịp đó sang Lịch Apple.',
        en: 'When you create a family occasion, choose a lunar date, set it to repeat yearly and choose how far ahead to be reminded. You can also sync the occasion to Apple Calendar.',
      },
    },
    {
      question: { vi: 'LunarV Premium mở khoá gì?', en: 'What does LunarV Premium unlock?' },
      answer: {
        vi: 'Lịch, đổi ngày, tìm kiếm và công cụ có trong bản miễn phí. Gói Premium mua một lần bỏ giới hạn số dịp gia đình và ghi chú theo ngày.',
        en: 'The calendar, date conversion, search and tools are included for free. The one-time Premium purchase removes limits on family occasions and date notes.',
      },
    },
  ],
};

export default app;
