// App Store artwork and owner-provided captures; see docs/appstore-artwork.json and docs/padnotesai-artwork.json.
import type { Product, ProductSlug } from '../types';
import storeImage0 from '../../vTTS/assets/appstore/header-1.jpg';
import storeImage1 from '../../vTTS/assets/appstore/ipad-1.jpg';
import storeImage2 from '../../vTTS/assets/appstore/ipad-2.jpg';
import storeImage3 from '../../vTTS/assets/appstore/ipad-3.jpg';
import storeImage4 from '../../vTTS/assets/appstore/iphone-1.jpg';
import storeImage5 from '../../vTTS/assets/appstore/iphone-2.jpg';
import storeImage6 from '../../vTTS/assets/appstore/iphone-3.jpg';
import storeImage7 from '../../vTTS/assets/appstore/mac-1.jpg';
import storeImage8 from '../../PadCodeAI/assets/current/v2/ipad-editor-mockup.webp';
import storeImage9 from '../../PadCodeAI/assets/current/v2/ipad-premium-mockup.webp';
import storeImage10 from '../../PadCodeAI/assets/current/v2/iphone-editor-mockup.webp';
import storeImage11 from '../../PadCodeAI/assets/current/v2/iphone-premium-mockup.webp';
import storeImage12 from '../../PadCodeAI/assets/current/v2/onboarding-mockup.webp';
import storeImage13 from '../../PadNotesAI/assets/current/en/ipad-editor.webp';
import storeImage14 from '../../PadNotesAI/assets/current/en/ipad-library.webp';
import storeImage15 from '../../PadNotesAI/assets/current/en/iphone-69-editor.webp';
import storeImage16 from '../../PadNotesAI/assets/current/en/iphone-69-library.webp';
import storeImage17 from '../../PadNotesAI/assets/current/en/mac-editor.webp';
import storeImage18 from '../../PadNotesAI/assets/current/en/mac-ai.webp';
import storeImage19 from '../../MyNASManager/assets/appstore/ipad-1.jpg';
import storeImage20 from '../../MyNASManager/assets/appstore/ipad-2.jpg';
import storeImage21 from '../../MyNASManager/assets/appstore/ipad-3.jpg';
import storeImage22 from '../../MyNASManager/assets/appstore/iphone-1.jpg';
import storeImage23 from '../../MyNASManager/assets/appstore/iphone-2.jpg';
import storeImage24 from '../../MyNASManager/assets/appstore/iphone-3.jpg';
import storeImage25 from '../../LunarV/assets/appstore/ipad-1.jpg';
import storeImage26 from '../../LunarV/assets/appstore/ipad-2.jpg';
import storeImage27 from '../../LunarV/assets/appstore/ipad-3.jpg';
import storeImage28 from '../../LunarV/assets/appstore/iphone-1.jpg';
import storeImage29 from '../../LunarV/assets/appstore/iphone-2.jpg';
import storeImage30 from '../../LunarV/assets/appstore/iphone-3.jpg';
import storeImage31 from '../../LunarV/assets/appstore/mac-1.jpg';
import storeImage32 from '../../LunarBlock/assets/appstore/ipad-1.jpg';
import storeImage33 from '../../LunarBlock/assets/appstore/ipad-2.jpg';
import storeImage34 from '../../LunarBlock/assets/appstore/ipad-3.jpg';
import storeImage35 from '../../LunarBlock/assets/appstore/iphone-1.jpg';
import storeImage36 from '../../LunarBlock/assets/appstore/iphone-2.jpg';
import storeImage37 from '../../LunarBlock/assets/appstore/iphone-3.jpg';
import storeImage38 from '../../LunarBlock/assets/appstore/mac-1.jpg';
import padNotesCurrentHero from '../../PadNotesAI/assets/current/hero-ai.webp';
import padNotesVi0 from '../../PadNotesAI/assets/current/vi/ipad-editor.webp';
import padNotesVi1 from '../../PadNotesAI/assets/current/vi/ipad-library.webp';
import padNotesVi2 from '../../PadNotesAI/assets/current/vi/iphone-69-editor.webp';
import padNotesVi3 from '../../PadNotesAI/assets/current/vi/iphone-69-library.webp';
import padNotesVi4 from '../../PadNotesAI/assets/current/vi/mac-editor.webp';
import padNotesVi5 from '../../PadNotesAI/assets/current/vi/mac-ai.webp';
import padCodeCurrentHero from '../../PadCodeAI/assets/current/v2/hero-devices.webp';
export const storeArtwork: Partial<Record<ProductSlug, Pick<Product, 'heroImage' | 'gallery'>>> = {
  vtts: {
    heroImage: storeImage0,
    gallery: [
      { src: storeImage1, alt: { vi: 'Giao diện iPad · 1', en: 'iPad experience · 1' } },
      { src: storeImage2, alt: { vi: 'Giao diện iPad · 2', en: 'iPad experience · 2' } },
      { src: storeImage3, alt: { vi: 'Giao diện iPad · 3', en: 'iPad experience · 3' } },
      { src: storeImage4, alt: { vi: 'Giao diện iPhone · 1', en: 'iPhone experience · 1' } },
      { src: storeImage5, alt: { vi: 'Giao diện iPhone · 2', en: 'iPhone experience · 2' } },
      { src: storeImage6, alt: { vi: 'Giao diện iPhone · 3', en: 'iPhone experience · 3' } },
      { src: storeImage7, alt: { vi: 'Giao diện Mac · 1', en: 'Mac experience · 1' } },
    ],
  },
  padcodeai: {
    heroImage: padCodeCurrentHero,
    gallery: [
      {
        src: storeImage8,
        alt: {
          vi: 'Editor C++ và terminal native trên iPad — bản 2.0',
          en: 'C++ editor and native terminal on iPad — version 2.0',
        },
      },
      {
        src: storeImage10,
        alt: {
          vi: 'Không gian soạn thảo trên iPhone — bản 2.0',
          en: 'iPhone coding workspace — version 2.0',
        },
      },
      {
        src: storeImage9,
        alt: {
          vi: 'Premium mua một lần trên iPad — bản 2.0',
          en: 'One-time Premium on iPad — version 2.0',
        },
      },
      {
        src: storeImage11,
        alt: {
          vi: 'Premium và khôi phục giao dịch trên iPhone',
          en: 'Premium and Restore Purchases on iPhone',
        },
      },
      {
        src: storeImage12,
        alt: {
          vi: 'Màn hình chào mừng và chọn ngôn ngữ native',
          en: 'Native welcome and language selection',
        },
      },
    ],
  },
  padnotesai: {
    heroImage: padNotesCurrentHero,
    gallery: [
      {
        src: storeImage13,
        localizedSrc: { vi: padNotesVi0, en: storeImage13 },
        alt: { vi: 'Ghi chú và viết tay trên iPad', en: 'Handwriting and notes on iPad' },
      },
      {
        src: storeImage14,
        localizedSrc: { vi: padNotesVi1, en: storeImage14 },
        alt: { vi: 'Thư viện sổ tay trên iPad', en: 'Notebook library on iPad' },
      },
      {
        src: storeImage15,
        localizedSrc: { vi: padNotesVi2, en: storeImage15 },
        alt: { vi: 'Ghi chú trên iPhone', en: 'Notes on iPhone' },
      },
      {
        src: storeImage16,
        localizedSrc: { vi: padNotesVi3, en: storeImage16 },
        alt: { vi: 'Thư viện sổ tay trên iPhone', en: 'Notebook library on iPhone' },
      },
      {
        src: storeImage17,
        localizedSrc: { vi: padNotesVi4, en: storeImage17 },
        alt: { vi: 'Không gian ghi chú trên Mac', en: 'Notebook workspace on Mac' },
      },
      {
        src: storeImage18,
        localizedSrc: { vi: padNotesVi5, en: storeImage18 },
        alt: { vi: 'Tóm tắt ghi chú bằng AI trên Mac', en: 'AI note summaries on Mac' },
      },
    ],
  },
  mynasmanager: {
    heroImage: storeImage19,
    gallery: [
      { src: storeImage19, alt: { vi: 'Giao diện iPad · 1', en: 'iPad experience · 1' } },
      { src: storeImage20, alt: { vi: 'Giao diện iPad · 2', en: 'iPad experience · 2' } },
      { src: storeImage21, alt: { vi: 'Giao diện iPad · 3', en: 'iPad experience · 3' } },
      { src: storeImage22, alt: { vi: 'Giao diện iPhone · 1', en: 'iPhone experience · 1' } },
      { src: storeImage23, alt: { vi: 'Giao diện iPhone · 2', en: 'iPhone experience · 2' } },
      { src: storeImage24, alt: { vi: 'Giao diện iPhone · 3', en: 'iPhone experience · 3' } },
    ],
  },
  lunarv: {
    heroImage: storeImage25,
    gallery: [
      { src: storeImage25, alt: { vi: 'Giao diện iPad · 1', en: 'iPad experience · 1' } },
      { src: storeImage26, alt: { vi: 'Giao diện iPad · 2', en: 'iPad experience · 2' } },
      { src: storeImage27, alt: { vi: 'Giao diện iPad · 3', en: 'iPad experience · 3' } },
      { src: storeImage28, alt: { vi: 'Giao diện iPhone · 1', en: 'iPhone experience · 1' } },
      { src: storeImage29, alt: { vi: 'Giao diện iPhone · 2', en: 'iPhone experience · 2' } },
      { src: storeImage30, alt: { vi: 'Giao diện iPhone · 3', en: 'iPhone experience · 3' } },
      { src: storeImage31, alt: { vi: 'Giao diện Mac · 1', en: 'Mac experience · 1' } },
    ],
  },
  lunarblock: {
    heroImage: storeImage32,
    gallery: [
      { src: storeImage32, alt: { vi: 'Giao diện iPad · 1', en: 'iPad experience · 1' } },
      { src: storeImage33, alt: { vi: 'Giao diện iPad · 2', en: 'iPad experience · 2' } },
      { src: storeImage34, alt: { vi: 'Giao diện iPad · 3', en: 'iPad experience · 3' } },
      { src: storeImage35, alt: { vi: 'Giao diện iPhone · 1', en: 'iPhone experience · 1' } },
      { src: storeImage36, alt: { vi: 'Giao diện iPhone · 2', en: 'iPhone experience · 2' } },
      { src: storeImage37, alt: { vi: 'Giao diện iPhone · 3', en: 'iPhone experience · 3' } },
      { src: storeImage38, alt: { vi: 'Giao diện Mac · 1', en: 'Mac experience · 1' } },
    ],
  },
};
