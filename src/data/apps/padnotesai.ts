import type { App } from '../types';
import icon from '../../assets/apps/padnotesai/app-icon.png';

const app: App = {
  slug: 'padnotesai',
  name: 'Pad Notes AI',
  route: '/PadNotesAI/',
  icon: icon,
  links: {
    stores: { appStore: 'https://apps.apple.com/app/id6779363432' },
  },
  accent: '#7c3aed',
  category: { vi: 'Viết tay và chú thích PDF', en: 'Handwriting and PDF notes' },
  title: {
    vi: 'Ghi chú và ôn bài trong cùng một sổ tay',
    en: 'Handwrite, annotate PDFs and study in one notebook',
  },
  subtitle: {
    vi: 'Viết bằng Apple Pencil, che đáp án để tự ôn và tạo câu hỏi từ trang đã chọn. Dùng trên iPhone, iPad và Mac.',
    en: 'Write with Apple Pencil, cover answers for self-testing and generate questions from selected pages. Available on iPhone, iPad and Mac.',
  },
  description: {
    vi: 'Pad Notes AI giúp bạn viết tay, chú thích PDF, ghi âm và ôn bài bằng băng dính che đáp án trên iPhone, iPad và Mac. Dùng miễn phí tới 20 sổ tay.',
    en: 'Pad Notes AI combines handwriting, PDF annotation, audio recording and memorization tape on iPhone, iPad and Mac. Start with up to 20 free notebooks.',
  },
  platforms: ['ios', 'ipados', 'macos'],
  requirements: 'iOS 17+, iPadOS 17+, macOS 14+',
  appCategory: 'UtilitiesApplication',
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
        vi: 'Chọn trong 15 kiểu bìa, 19 mẫu trang và 12 màu giấy, có mẫu Cornell và nhật ký đọc sách. Sắp xếp sổ theo thư mục, ghim sổ thường dùng và tìm lại nội dung bằng từ khoá.',
        en: 'Choose from 15 covers, 19 page templates and 12 paper colors, including Cornell and reading-journal layouts. Organize notebooks in folders, pin favorites and find content by keyword.',
      },
    },
    {
      title: { vi: 'Nhập, đánh dấu và xuất PDF', en: 'Import, annotate and export PDFs' },
      description: {
        vi: 'Nhập tài liệu PDF, viết hoặc tô sáng ngay trên trang. Ứng dụng giữ kích thước gốc của trang PDF. Xuất trang đã chọn hoặc cả sổ tay để chia sẻ.',
        en: 'Import a PDF and write or highlight directly on the page. The app keeps the PDF’s original page sizes. Export selected pages or the whole notebook to share.',
      },
    },
    {
      title: { vi: 'Trợ lý cho ghi chú', en: 'An assistant for your notes' },
      description: {
        vi: 'Ghi âm cùng lúc khi viết, chuyển lời thành chữ và dùng mốc thời gian để nghe lại. Trợ lý có thể tóm tắt, giải thích hoặc tạo câu hỏi ôn tập dựa trên các trang bạn chọn.',
        en: 'Record while you write, transcribe speech and jump to a timestamp to listen again. The assistant can summarize, explain or generate study questions from pages you select.',
      },
    },
  ],
  support: {
    vi: 'Nếu cần hỗ trợ nhập PDF, nhận dạng chữ hoặc đồng bộ, hãy gửi email kèm phiên bản ứng dụng và mô tả vấn đề.',
    en: 'For help with PDF import, text recognition or sync, email your app version and a description of the issue.',
  },
  faq: [
    {
      question: {
        vi: 'Có cần Apple Pencil để dùng Pad Notes AI không?',
        en: 'Do I need an Apple Pencil to use Pad Notes AI?',
      },
      answer: {
        vi: 'Bạn có thể gõ chữ, nhập PDF và vẽ bằng cảm ứng. Apple Pencil là tuỳ chọn cho thao tác viết tay trên iPad tương thích.',
        en: 'You can type notes, import PDFs and draw with touch. Apple Pencil is optional for handwriting on compatible iPads.',
      },
    },
    {
      question: {
        vi: 'Trợ lý AI xử lý ghi chú ở đâu?',
        en: 'Where does the AI assistant process my notes?',
      },
      answer: {
        vi: 'Chọn chế độ ngoại tuyến cơ bản hoặc Apple Intelligence trên thiết bị tương thích để xử lý trên máy. Nếu chọn nhà cung cấp trực tuyến, bạn dùng khoá API riêng và nội dung được chọn sẽ gửi tới nhà cung cấp đó.',
        en: 'Choose the basic offline mode or Apple Intelligence on a compatible device to process notes locally. If you opt for an online provider, you supply your own API key and the selected content is sent to that provider.',
      },
    },
    {
      question: { vi: 'Sổ tay đồng bộ qua đâu?', en: 'How do I sync my notebooks?' },
      answer: {
        vi: 'Bạn có thể bật đồng bộ iCloud và dùng cùng một Tài khoản Apple trên các thiết bị. Nếu không bật iCloud, sổ tay lưu trên thiết bị và bạn có thể tạo bản sao lưu.',
        en: 'Enable iCloud sync and use the same Apple Account on your devices. With iCloud off, notebooks are stored on the device and you can make a backup.',
      },
    },
  ],
};

export default app;
