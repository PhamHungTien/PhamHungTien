import type { Locale } from './locales';

interface GuideCopy {
  indexTitle: string;
  indexDescription: string;
  readingTime: (minutes: number) => string;
  updated: string;
  breadcrumb: string;
  onThisPage: string;
  keepReading: string;
  videoInVietnamese: string;
  author: string;
  bio: string;
  explore: (appName: string) => string;
}

export const guideCopy: Record<Locale, GuideCopy> = {
  en: {
    indexTitle: 'App guides and tutorials',
    indexDescription:
      'Guides to Vietnamese typing with PHTV, offline reading with vTTS, lunar dates, NAS access, coding on iPad, note-taking and Lunar Block.',
    readingTime: (n) => `${n} min read`,
    updated: 'Updated',
    breadcrumb: 'Breadcrumb',
    onThisPage: 'On this page',
    keepReading: 'Keep reading',
    videoInVietnamese: 'Video in Vietnamese',
    author: 'Author',
    bio: 'Independent app developer from Bến Tre, Vietnam.',
    explore: (name) => `Explore ${name}`,
  },
  vi: {
    indexTitle: 'Hướng dẫn sử dụng ứng dụng',
    indexDescription:
      'Hướng dẫn gõ tiếng Việt với PHTV, nghe sách offline với vTTS, tra âm lịch, dùng NAS, lập trình trên iPad, ghi chú và chơi Lunar Block.',
    readingTime: (n) => `${n} phút đọc`,
    updated: 'Cập nhật',
    breadcrumb: 'Đường dẫn',
    onThisPage: 'Trong bài này',
    keepReading: 'Đọc tiếp',
    videoInVietnamese: 'Video tiếng Việt',
    author: 'Tác giả',
    bio: 'Nhà phát triển ứng dụng độc lập đến từ Bến Tre, Việt Nam.',
    explore: (name) => `Xem ${name}`,
  },
  ja: {
    indexTitle: 'アプリの使い方とチュートリアル',
    indexDescription:
      'Macでのベトナム語入力、vTTSでの読み上げ、iPadでのプログラミング、ノート、NAS、旧暦、Lunar Blockの使い方を紹介します。',
    readingTime: (n) => `約${n}分`,
    updated: '更新',
    breadcrumb: 'パンくずリスト',
    onThisPage: 'この記事の内容',
    keepReading: '関連記事',
    videoInVietnamese: '動画の音声はベトナム語です',
    author: '著者',
    bio: 'ベトナムのベンチェ出身の個人アプリ開発者です。',
    explore: (name) => `${name} の詳細`,
  },
  es: {
    indexTitle: 'Guías y tutoriales de las aplicaciones',
    indexDescription:
      'Aprende a escribir en vietnamita en Mac, escuchar libros con vTTS, programar en iPad, tomar notas, usar un NAS, consultar el calendario lunar y jugar a Lunar Block.',
    readingTime: (n) => `${n} min de lectura`,
    updated: 'Actualizado',
    breadcrumb: 'Ruta de navegación',
    onThisPage: 'En esta página',
    keepReading: 'Sigue leyendo',
    videoInVietnamese: 'Vídeo narrado en vietnamita',
    author: 'Autor',
    bio: 'Desarrollador independiente de aplicaciones de Bến Tre, Vietnam.',
    explore: (name) => `Conoce ${name}`,
  },
  zh: {
    indexTitle: '应用指南与教程',
    indexDescription:
      '了解如何在 Mac 上输入越南语、用 vTTS 离线听书、在 iPad 上编程和记笔记，以及远程访问 NAS、查询农历和玩 Lunar Block。',
    readingTime: (n) => `约 ${n} 分钟阅读`,
    updated: '更新于',
    breadcrumb: '面包屑导航',
    onThisPage: '本文目录',
    keepReading: '继续阅读',
    videoInVietnamese: '视频语言为越南语',
    author: '作者',
    bio: '来自越南槟椥的独立应用开发者。',
    explore: (name) => `了解 ${name}`,
  },
};
