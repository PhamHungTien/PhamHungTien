import type { GuideLang } from './locales';

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
  appStore: string;
  googlePlay: string;
  descriptions?: { padcodeai: string; vtts: string };
}

export const guideCopy: Record<GuideLang, GuideCopy> = {
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
    appStore: 'Download on the App Store',
    googlePlay: 'Get it on Google Play',
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
    appStore: 'Tải trên App Store',
    googlePlay: 'Tải trên Google Play',
  },
  ja: {
    indexTitle: 'Pad Code AI と vTTS の使い方',
    indexDescription:
      'iPadでコードを書いて実行する方法や、vTTSで電子書籍を読み上げて音声に書き出す手順を、日本語のガイドで紹介します。',
    readingTime: (n) => `約${n}分`,
    updated: '更新',
    breadcrumb: 'パンくずリスト',
    onThisPage: 'この記事の内容',
    keepReading: '関連記事',
    videoInVietnamese: '動画の音声はベトナム語です',
    author: '著者',
    bio: 'ベトナムのベンチェ出身の個人アプリ開発者です。',
    explore: (name) => `${name} の詳細（英語）`,
    appStore: 'App Storeでダウンロード',
    googlePlay: 'Google Playで入手',
    descriptions: {
      padcodeai: 'iPadとiPhoneでコードを書いて実行できる開発環境です。',
      vtts: '書籍や文書を端末上で読み上げるアプリです。',
    },
  },
  es: {
    indexTitle: 'Guías de Pad Code AI y vTTS',
    indexDescription:
      'Aprende a programar en iPad con Pad Code AI y a escuchar libros, crear voces y exportar audiolibros con vTTS. Guías prácticas en español.',
    readingTime: (n) => `${n} min de lectura`,
    updated: 'Actualizado',
    breadcrumb: 'Ruta de navegación',
    onThisPage: 'En esta página',
    keepReading: 'Sigue leyendo',
    videoInVietnamese: 'Vídeo narrado en vietnamita',
    author: 'Autor',
    bio: 'Desarrollador independiente de aplicaciones de Bến Tre, Vietnam.',
    explore: (name) => `Conoce ${name} (en inglés)`,
    appStore: 'Descargar en App Store',
    googlePlay: 'Descargar en Google Play',
    descriptions: {
      padcodeai: 'Un entorno para escribir y ejecutar código en iPad y iPhone.',
      vtts: 'Una app que lee libros y documentos en voz alta en tu dispositivo.',
    },
  },
};
