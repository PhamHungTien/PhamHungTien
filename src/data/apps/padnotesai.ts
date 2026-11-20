import type { App } from '../types';
import icon from '../../assets/apps/padnotesai/app-icon.png';

const app: App = {
  slug: 'padnotesai',
  name: 'Pad Notes AI',
  route: '/PadNotesAI/',
  icon: icon,
  links: {
    stores: { appStore: 'https://apps.apple.com/us/app/pad-notes-ai/id6779363432' },
  },
  accent: '#7c3aed',
  category: { vi: 'Sổ tay thông minh', en: 'Smart notebooks' },
  title: {
    vi: 'Viết tay, ghi chú, PDF và AI trong một sổ tay.',
    en: 'Handwriting, notes, PDFs and AI in one notebook.',
  },
  subtitle: {
    vi: 'Viết bằng Apple Pencil, học thuộc với băng dính và nhờ trợ lý tóm tắt trên iPhone, iPad và Mac.',
    en: 'Write with Apple Pencil, study with memorization tape and ask the assistant to summarize, on iPhone, iPad and Mac.',
  },
  description: {
    vi: 'Pad Notes AI kết hợp viết tay, ghi chú văn bản, chú thích PDF và trợ lý AI tập trung vào ghi chú trong một không gian làm việc. Miễn phí tới 20 sổ tay; mua trọn đời một lần để không giới hạn.',
    en: 'Pad Notes AI brings handwriting, typed notes, PDF annotation and a note-focused AI assistant into one workspace. Up to 20 notebooks are free; a one-time lifetime purchase removes the limit.',
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
      value: { vi: 'Apple Pencil, cảm ứng', en: 'Apple Pencil, touch' },
    },
    {
      label: { vi: 'Mẫu trang', en: 'Page templates' },
      value: { vi: '19 mẫu', en: '19 templates' },
    },
    {
      label: { vi: 'Miễn phí', en: 'Free' },
      value: { vi: '20 sổ tay', en: '20 notebooks' },
    },
  ],
  features: [
    {
      title: { vi: 'Băng dính học thuộc', en: 'Memorization tape' },
      description: {
        vi: 'Che định nghĩa, công thức hay đáp án bằng băng thẳng, khung hoặc tự do với tám hoạ tiết. Tự nhớ lại rồi chạm để bóc; Che tất cả và Bóc tất cả biến trang thành bài tự kiểm tra.',
        en: 'Cover definitions, formulas or answers with straight, box or freehand tape in eight patterns. Recall, then tap to peel it back; Cover All and Reveal All turn a page into a self-test.',
      },
    },
    {
      title: { vi: 'Viết và sáng tạo', en: 'Write and create' },
      description: {
        vi: 'Apple Pencil trên iPad tương thích hoặc vẽ bằng cảm ứng; chỉnh mực, độ dày, tô sáng, thêm chữ và ảnh. Giữ nét để thành hình học chỉnh được, tẩy cả nét hoặc một phần.',
        en: 'Apple Pencil on compatible iPads or touch drawing; adjust ink and size, highlight, add text and images. Hold a stroke to make an editable shape, and erase whole strokes or part of one.',
      },
    },
    {
      title: { vi: 'Sổ tay theo phong cách riêng', en: 'Notebooks your way' },
      description: {
        vi: '15 kiểu bìa, 19 mẫu trang và 12 màu giấy: kẻ dòng, chấm, ô vuông, Cornell, lịch, nhạc và nhật ký đọc sách. Thư mục, ghim, tìm kiếm, nhập và xuất PDF.',
        en: '15 covers, 19 page templates and 12 paper colors: ruled, dotted, grid, Cornell, planner, music and reading journal. Folders, pins, search, and PDF import and export.',
      },
    },
    {
      title: { vi: 'Trợ lý cho ghi chú', en: 'An assistant for your notes' },
      description: {
        vi: 'Ghi âm, chuyển lời thành chữ, dịch; nhờ trợ lý tóm tắt, giải thích hoặc tạo câu hỏi ôn tập từ trang đã chọn. Dùng AI của Apple trên máy, khoá API của bạn, hoặc chế độ ngoại tuyến cơ bản.',
        en: 'Record audio, transcribe and translate; ask the assistant to summarize, explain or write study questions from selected pages. Use Apple on-device AI, your own API key, or a basic offline mode.',
      },
    },
  ],
  support: {
    vi: 'Cần hỗ trợ đồng bộ hoặc OCR? Gửi email cho mình.',
    en: 'Need help with sync or OCR? Send me an email.',
  },
};

export default app;
