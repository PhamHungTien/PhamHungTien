import type { App } from '../types';
import icon from '../../assets/apps/lunarblock/app-icon.png';
import ipad1 from '../../assets/apps/lunarblock/appstore/ipad-1.jpg';
import ipad2 from '../../assets/apps/lunarblock/appstore/ipad-2.jpg';
import ipad3 from '../../assets/apps/lunarblock/appstore/ipad-3.jpg';
import iphone1 from '../../assets/apps/lunarblock/appstore/iphone-1.jpg';
import iphone2 from '../../assets/apps/lunarblock/appstore/iphone-2.jpg';
import iphone3 from '../../assets/apps/lunarblock/appstore/iphone-3.jpg';
import mac1 from '../../assets/apps/lunarblock/appstore/mac-1.jpg';

const app: App = {
  slug: 'lunarblock',
  name: 'Lunar Block',
  route: '/LunarBlock/',
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
  videoUrl: '/LunarBlock/lunarblock-demo.mp4',
  videoDescription: {
    vi: 'Xem video gameplay thực tế trải nghiệm xếp khối 3D trên quỹ đạo không gian với hiệu ứng âm thanh và va chạm sống động.',
    en: 'Watch gameplay action of 3D orbital block stacking with dynamic lighting and synthesized audio.',
  },
  links: {
    stores: { appStore: 'https://apps.apple.com/us/app/lunar-block-teris-3d/id6773545437' },
  },
  accent: '#f59e0b',
  category: { vi: 'Game xếp hình 3D', en: '3D puzzle game' },
  title: {
    vi: 'Xếp khối không gian 3D trên quỹ đạo ấn tượng.',
    en: 'Next-gen 3D orbital falling-block puzzle.',
  },
  subtitle: {
    vi: 'SceneKit 3D, khối pha lê, phím D-Pad công thái học, haptic và Line Fracture vật lý.',
    en: 'SceneKit 3D, crystal blocks, ergonomic D-Pad, haptics & physics line fractures.',
  },
  description: {
    vi: 'Lunar Block nâng tầm trải nghiệm xếp khối kinh điển thành một bàn cờ quỹ đạo 3D phát sáng. Tích hợp phím D-Pad công thái học, bóng chiếu khối trực quan (Ghost Piece), hiệu ứng vỡ khối vật lý Line Fracture, 3 chế độ chơi thử thách, hệ thống thăng hạng XP và bảng xếp hạng Game Center toàn cầu.',
    en: 'Lunar Block transforms classic falling-block puzzles into a glowing 3D orbital console. Built natively with SceneKit, featuring ergonomic D-Pad controls, instant ghost piece projection, physics-driven line fractures, 3 game modes, XP progression ranks, and global Game Center leaderboards.',
  },
  platforms: ['ios', 'ipados', 'macos', 'visionos'],
  requirements: 'iOS 16+, iPadOS 16+, macOS 13+, visionOS 1+',
  appCategory: 'GameApplication',
  facts: [
    {
      label: { vi: 'Thể loại', en: 'Genre' },
      value: { vi: 'Giải đố 3D', en: '3D Arcade Puzzle' },
    },
    {
      label: { vi: 'Đồ họa', en: 'Graphics' },
      value: { vi: 'SceneKit 60fps', en: 'SceneKit 60fps' },
    },
    {
      label: { vi: 'Chế độ', en: 'Modes' },
      value: { vi: 'Marathon, Sprint, Ultra', en: 'Marathon, Sprint, Ultra' },
    },
    {
      label: { vi: 'Xếp hạng', en: 'Ranking' },
      value: { vi: 'XP Ranks & Game Center', en: 'XP Ranks & Game Center' },
    },
  ],
  features: [
    {
      title: { vi: 'Ba chế độ, một thử thách mới', en: 'Three ways to chase your best' },
      description: {
        vi: 'Marathon sinh tồn, Sprint 40 hàng và Ultra 120 giây. Điều khiển bằng cảm ứng, bàn phím hoặc tay cầm; theo dõi kỷ lục qua Game Center.',
        en: 'Survive in Marathon, clear 40 lines in Sprint, or chase a score in 120-second Ultra. Play with touch, keyboard, or a controller, with Game Center leaderboards.',
      },
    },
    {
      title: { vi: 'Bàn cờ 3D Quỹ Đạo', en: '3D Orbital Console' },
      description: {
        vi: 'Khối pha lê trong suốt, vách ngăn neon phát sáng và góc quay camera điện ảnh linh hoạt theo từng nhịp rơi.',
        en: 'Crystal blocks, neon-glowing boundary rails, and dynamic cinematic camera tracking every drop.',
      },
    },
    {
      title: { vi: 'Vật lý vỡ khối Line Fracture', en: 'Physics Line Fracture' },
      description: {
        vi: 'Khi xóa hàng, từng khối vỡ vụn với hiệu ứng vật lý chân thực thay vì biến mất đơn điệu, hỗ trợ combo và điểm Tetris back-to-back.',
        en: 'Simultaneous physics-driven line fractures preserve cleared blocks with visceral impact, combos, and back-to-back Tetris scoring.',
      },
    },
    {
      title: { vi: 'Đa dạng chế độ chơi', en: 'Multiple Game Modes' },
      description: {
        vi: 'Thử thách sức bền với Marathon vô tận, bứt phá tốc độ với Sprint 40 dòng, hoặc ghi điểm tối đa trong Ultra 2 phút nghẹt thở.',
        en: 'Endless survival in Marathon mode, race against time in 40-Line Sprint, or chase high scores in intense 2-minute Ultra.',
      },
    },
    {
      title: { vi: 'Tiến trình XP & Game Center', en: 'XP Ranks & Leaderboards' },
      description: {
        vi: 'Tích lũy điểm kinh nghiệm để thăng hạng danh hiệu từ Novice lên Master, lưu kỷ lục cá nhân và so tài vị trí top 1 Game Center.',
        en: 'Earn XP to advance through rank tiers, preserve local personal bests, and climb the authenticated global Game Center leaderboard.',
      },
    },
    {
      title: { vi: 'Điều khiển mượt mà & Tay cầm', en: 'Fluid Controls & Gamepads' },
      description: {
        vi: 'Cụm D-Pad tròn cùng phím DROP chuyên biệt, hỗ trợ cử chỉ vuốt chạm, bàn phím ngoài và tay cầm chơi game MFi/PlayStation/Xbox.',
        en: 'Ergonomic circular D-Pad with dedicated DROP and CCW buttons, plus full touch gestures, external keyboard, and MFi/game controller support.',
      },
    },
  ],
  support: {
    vi: 'Có góp ý gameplay hoặc điều khiển? Gửi mình qua email.',
    en: 'Have gameplay or control feedback? Send it by email.',
  },
};

export default app;
