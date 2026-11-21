import type { App } from '../types';
import icon from '../../assets/apps/lunarblock/app-icon.png';

const app: App = {
  slug: 'lunarblock',
  name: 'Lunar Block',
  route: '/LunarBlock/',
  icon: icon,
  links: {
    stores: { appStore: 'https://apps.apple.com/app/id6773545437' },
  },
  accent: '#2f9bff',
  category: { vi: 'Trò chơi xếp khối 3D', en: '3D block puzzle' },
  title: {
    vi: 'Xếp khối pha lê trong đấu trường 3D',
    en: 'Stack and clear crystal blocks in a 3D arena',
  },
  subtitle: {
    vi: 'Thử ba chế độ Marathon, Sprint và Ultra trên iPhone, iPad hoặc Mac. Điều khiển bằng cảm ứng, bàn phím hoặc tay cầm.',
    en: 'Play Marathon, Sprint and Ultra on iPhone, iPad or Mac with touch, keyboard or controller input.',
  },
  description: {
    vi: 'Lunar Block là trò chơi xếp khối rơi 3D cho iPhone, iPad và Mac. Xoay, giữ và thả khối pha lê để xoá hàng trong Marathon, Sprint và Ultra.',
    en: 'Lunar Block is a 3D falling-block puzzle for iPhone, iPad and Mac. Rotate, hold and drop crystal blocks to clear lines in Marathon, Sprint and Ultra.',
  },
  platforms: ['ios', 'ipados', 'macos'],
  requirements: 'iOS 16+, iPadOS 16+, macOS 13+',
  appCategory: 'GameApplication',
  facts: [
    {
      label: { vi: 'Thể loại', en: 'Genre' },
      value: { vi: 'Xếp khối 3D', en: '3D block puzzle' },
    },
    {
      label: { vi: 'Chế độ', en: 'Modes' },
      value: { vi: 'Marathon, Sprint, Ultra', en: 'Marathon, Sprint, Ultra' },
    },
    {
      label: { vi: 'Khung hình', en: 'Frame rate' },
      value: { vi: 'Tới 120 Hz', en: 'Up to 120 Hz' },
    },
    {
      label: { vi: 'Quảng cáo', en: 'Ads' },
      value: { vi: 'Không có', en: 'None' },
    },
  ],
  features: [
    {
      title: { vi: 'Ba cách chơi', en: 'Three ways to play' },
      description: {
        vi: 'Marathon trụ vững qua 20 cấp tốc độ, Sprint phá 40 hàng nhanh nhất có thể, Ultra ghi điểm cao nhất trong hai phút.',
        en: 'Survive 20 speed levels in Marathon, clear 40 lines as fast as you can in Sprint, or score as much as possible in two minutes of Ultra.',
      },
    },
    {
      title: { vi: 'Xoay, giữ và tính trước', en: 'Rotate, hold and plan ahead' },
      description: {
        vi: 'Xem khối sắp rơi và bóng chiếu vị trí đáp, hoặc giữ một khối để dùng sau. Trò chơi tính điểm cho combo, T-Spin, xoá bốn hàng và xoá sạch bàn.',
        en: 'Check the next pieces and their landing guide, or hold a piece for later. Score with combos, T-Spins, four-line clears and Perfect Clears.',
      },
    },
    {
      title: { vi: 'Đấu trường 3D', en: 'A 3D arena' },
      description: {
        vi: 'Khối pha lê phát sáng vỡ thành mảnh khi bạn xoá hàng. Camera và hiệu ứng va chạm phản hồi theo thao tác trong lúc chơi.',
        en: 'Glowing crystal blocks shatter when you clear a line. The camera and impact effects respond to the action as you play.',
      },
    },
    {
      title: { vi: 'Điều khiển theo cách của bạn', en: 'Play your way' },
      description: {
        vi: 'Vuốt, chạm hoặc D-pad trên màn hình, bố cục cho người thuận tay trái, cùng bàn phím và tay cầm trên iPhone, iPad và Mac.',
        en: 'Swipe, tap or an on-screen D-pad, a left-handed layout, plus keyboard and game controller support on iPhone, iPad and Mac.',
      },
    },
    {
      title: { vi: 'Tiến bộ lâu dài', en: 'Progress that lasts' },
      description: {
        vi: 'Tích XP để leo 11 cấp hạng Lunar, giữ kỷ lục cá nhân cho từng chế độ và so tài qua bảng xếp hạng, thành tích Game Center.',
        en: 'Earn XP to climb 11 lunar ranks, keep personal records for every mode, and compete on Game Center leaderboards and achievements.',
      },
    },
    {
      title: { vi: 'Chăm chút từng chi tiết', en: 'Designed with care' },
      description: {
        vi: 'Mượt 120 Hz trên ProMotion, âm thanh tổng hợp nguyên bản và nhạc nền ambient phát cùng nhạc của bạn, phản hồi rung, Giảm chuyển động, VoiceOver và tự lưu lượt chơi.',
        en: 'Smooth 120 Hz on ProMotion, original synthesized sound and an ambient soundtrack that plays alongside your music, haptics, Reduce Motion, VoiceOver and automatic saves.',
      },
    },
  ],
  support: {
    vi: 'Gửi email nếu bạn có góp ý về cách chơi, điều khiển hoặc khả năng tiếp cận.',
    en: 'Email feedback about gameplay, controls or accessibility.',
  },
  faq: [
    {
      question: {
        vi: 'Marathon, Sprint và Ultra khác nhau thế nào?',
        en: 'What is the difference between Marathon, Sprint and Ultra?',
      },
      answer: {
        vi: 'Marathon tăng tốc dần và chơi đến khi hết chỗ. Sprint tính thời gian để xoá 40 hàng. Ultra tính điểm bạn ghi được trong hai phút.',
        en: 'Marathon gets faster as you play and ends when you run out of room. Sprint times how quickly you clear 40 lines. Ultra measures your score in two minutes.',
      },
    },
    {
      question: {
        vi: 'Có thể chơi ngoại tuyến không?',
        en: 'Can I play offline?',
      },
      answer: {
        vi: 'Bạn có thể chơi và lưu kỷ lục cá nhân trên thiết bị khi không có mạng. Bảng xếp hạng và thành tích Game Center sử dụng tài khoản Game Center của Apple.',
        en: 'You can play and keep personal records locally while offline. Game Center leaderboards and achievements use your Apple Game Center account.',
      },
    },
    {
      question: {
        vi: 'Làm sao xem các nút điều khiển?',
        en: 'Where can I find the controls?',
      },
      answer: {
        vi: 'Mở mục Cách chơi để xem thao tác cảm ứng, phím tắt và nút tay cầm. Trong cài đặt, bạn có thể chọn bố cục cho người thuận tay trái.',
        en: 'Open How to Play for the touch gestures, keyboard shortcuts and controller buttons. A left-handed layout is available in Settings.',
      },
    },
  ],
};

export default app;
