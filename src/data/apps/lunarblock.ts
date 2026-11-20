import type { App } from '../types';
import icon from '../../assets/apps/lunarblock/app-icon.png';

const app: App = {
  slug: 'lunarblock',
  name: 'Lunar Block',
  route: '/LunarBlock/',
  icon: icon,
  links: {
    stores: { appStore: 'https://apps.apple.com/us/app/lunar-block-teris-3d/id6773545437' },
  },
  accent: '#2f9bff',
  category: { vi: 'Game xếp khối 3D', en: '3D block puzzle' },
  title: {
    vi: 'Xếp khối rơi kinh điển trong đấu trường 3D giữa không gian.',
    en: 'The classic falling-block puzzle in a 3D arena in deep space.',
  },
  subtitle: {
    vi: 'Khối pha lê phát sáng, vỡ theo vật lý thật, ba chế độ chơi và bảng xếp hạng Game Center.',
    en: 'Glowing crystal blocks, real physics on every clear, three modes and Game Center leaderboards.',
  },
  description: {
    vi: 'Lunar Block đưa thể loại xếp khối rơi vào một đấu trường 3D điện ảnh. Xếp, xoay, giữ và thả khối pha lê để phá hàng; mỗi lần phá hàng khối vỡ theo vật lý thật. Không quảng cáo, không cần tài khoản.',
    en: 'Lunar Block turns the falling-block puzzle into a cinematic 3D arena. Stack, spin, hold and drop crystal blocks to clear lines, and every clear shatters with real physics. No ads, no account.',
  },
  platforms: ['ios', 'ipados', 'macos'],
  requirements: 'iOS & iPadOS 16+, macOS 13+',
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
      title: { vi: 'Luật chơi hiện đại', en: 'Modern, precise rules' },
      description: {
        vi: 'Túi bảy khối, ô giữ, hàng chờ hai khối và bóng chiếu; wall kick, floor kick, thời gian khoá nhạy; combo, T-Spin, Lunar Quad, Back-to-Back và Perfect Clear.',
        en: 'A seven-piece bag, hold slot, two-piece queue and ghost piece; wall and floor kicks with responsive lock delay; combos, T-Spins, Lunar Quads, Back-to-Back and Perfect Clears.',
      },
    },
    {
      title: { vi: 'Đấu trường 3D điện ảnh', en: 'A cinematic 3D arena' },
      description: {
        vi: 'Khối pha lê phát sáng vỡ tung theo vật lý thật mỗi lần phá hàng, cú thả nhanh có lực và camera chuyển động theo nhịp chơi.',
        en: 'Glowing crystal blocks shatter with real physics on every clear, hard drops land with weight, and the camera moves with the action.',
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
    vi: 'Có góp ý gameplay hoặc điều khiển? Gửi mình qua email.',
    en: 'Have gameplay or control feedback? Send it by email.',
  },
};

export default app;
