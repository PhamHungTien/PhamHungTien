import type { App } from '../types';
import icon from '../../assets/apps/padnotesai/app-icon.png';
import currentEnIpadEditor from '../../assets/apps/padnotesai/current/en/ipad-editor.webp';
import currentEnIpadLibrary from '../../assets/apps/padnotesai/current/en/ipad-library.webp';
import currentEnIphone69Editor from '../../assets/apps/padnotesai/current/en/iphone-69-editor.webp';
import currentEnIphone69Library from '../../assets/apps/padnotesai/current/en/iphone-69-library.webp';
import currentEnMacEditor from '../../assets/apps/padnotesai/current/en/mac-editor.webp';
import currentEnMacAi from '../../assets/apps/padnotesai/current/en/mac-ai.webp';
import currentHeroAi from '../../assets/apps/padnotesai/current/hero-ai.webp';
import currentViIpadEditor from '../../assets/apps/padnotesai/current/vi/ipad-editor.webp';
import currentViIpadLibrary from '../../assets/apps/padnotesai/current/vi/ipad-library.webp';
import currentViIphone69Editor from '../../assets/apps/padnotesai/current/vi/iphone-69-editor.webp';
import currentViIphone69Library from '../../assets/apps/padnotesai/current/vi/iphone-69-library.webp';
import currentViMacEditor from '../../assets/apps/padnotesai/current/vi/mac-editor.webp';
import currentViMacAi from '../../assets/apps/padnotesai/current/vi/mac-ai.webp';

const app: App = {
  slug: 'padnotesai',
  name: 'Pad Notes AI',
  route: '/PadNotesAI/',
  icon: icon,
  heroImage: currentHeroAi,
  gallery: [
    {
      src: currentEnIpadEditor,
      localizedSrc: { vi: currentViIpadEditor, en: currentEnIpadEditor },
      alt: { vi: 'Ghi chú và viết tay trên iPad', en: 'Handwriting and notes on iPad' },
    },
    {
      src: currentEnIpadLibrary,
      localizedSrc: { vi: currentViIpadLibrary, en: currentEnIpadLibrary },
      alt: { vi: 'Thư viện sổ tay trên iPad', en: 'Notebook library on iPad' },
    },
    {
      src: currentEnIphone69Editor,
      localizedSrc: { vi: currentViIphone69Editor, en: currentEnIphone69Editor },
      alt: { vi: 'Ghi chú trên iPhone', en: 'Notes on iPhone' },
    },
    {
      src: currentEnIphone69Library,
      localizedSrc: { vi: currentViIphone69Library, en: currentEnIphone69Library },
      alt: { vi: 'Thư viện sổ tay trên iPhone', en: 'Notebook library on iPhone' },
    },
    {
      src: currentEnMacEditor,
      localizedSrc: { vi: currentViMacEditor, en: currentEnMacEditor },
      alt: { vi: 'Không gian ghi chú trên Mac', en: 'Notebook workspace on Mac' },
    },
    {
      src: currentEnMacAi,
      localizedSrc: { vi: currentViMacAi, en: currentEnMacAi },
      alt: { vi: 'Tóm tắt ghi chú bằng AI trên Mac', en: 'AI note summaries on Mac' },
    },
  ],
  links: {
    stores: { appStore: 'https://apps.apple.com/us/app/pad-notes-ai/id6779363432' },
  },
  accent: '#7c3aed',
  category: { vi: 'Ghi chú thông minh', en: 'Smart notes' },
  title: {
    vi: 'Viết tay, ghi chú và xử lý tài liệu.',
    en: 'Handwriting, notes, and documents.',
  },
  subtitle: {
    vi: 'Cho ghi chú, OCR và làm việc dài trên iPhone, iPad và Mac.',
    en: 'For notes, OCR, and long work sessions on iPhone, iPad, and Mac.',
  },
  description: {
    vi: 'Pad Notes AI kết hợp viết tay, nhận dạng chữ viết, ghi âm và trợ lý AI để biến ghi chú thành tài liệu dễ tìm, dễ hiểu trên các thiết bị Apple.',
    en: 'Pad Notes AI combines handwriting, recognition, audio capture, and an AI assistant so notes become searchable, understandable documents across Apple devices.',
  },
  platforms: ['ios', 'ipados', 'macos'],
  appCategory: 'ProductivityApplication',
  facts: [
    {
      label: { vi: 'Nền tảng', en: 'Platforms' },
      value: { vi: 'iOS & iPadOS, macOS', en: 'iOS & iPadOS, macOS' },
    },
    {
      label: { vi: 'Nhập liệu', en: 'Input' },
      value: { vi: 'Apple Pencil', en: 'Apple Pencil' },
    },
    { label: { vi: 'Xử lý', en: 'Processing' }, value: { vi: 'OCR + AI', en: 'OCR + AI' } },
  ],
  features: [
    {
      title: { vi: 'Khôi phục ghi âm & bảo vệ ghi chú', en: 'Audio recovery & safer notes' },
      description: {
        vi: 'Khôi phục bản ghi bị gián đoạn, lưu khóa Gemini trong Keychain và xuất PDF từng trang với bộ nhớ được tối ưu.',
        en: 'Recover interrupted recordings, keep Gemini keys in Keychain, and export PDFs page by page with optimized memory use.',
      },
    },
    {
      title: { vi: 'Viết tay tự nhiên', en: 'Natural handwriting' },
      description: {
        vi: 'Bút, màu và mẫu giấy được tổ chức cho việc ghi chép lâu dài.',
        en: 'Pens, colors, and paper templates are organized for long-form note-taking.',
      },
    },
    {
      title: { vi: 'OCR trên thiết bị', en: 'On-device OCR' },
      description: {
        vi: 'Chuyển nét viết thành văn bản mà vẫn giữ trải nghiệm riêng tư.',
        en: 'Convert handwriting into text while keeping the experience private.',
      },
    },
    {
      title: { vi: 'Trò chuyện với tài liệu', en: 'Talk to your notes' },
      description: {
        vi: 'Hỏi, tóm tắt và tìm ý chính trong trang ghi chú hoặc tài liệu.',
        en: 'Ask, summarize, and find key ideas inside notes or documents.',
      },
    },
  ],
  support: {
    vi: 'Cần hỗ trợ đồng bộ hoặc OCR? Gửi email cho mình.',
    en: 'Need help with sync or OCR? Send me an email.',
  },
};

export default app;
