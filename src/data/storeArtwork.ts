// Artwork downloaded from Apple; see docs/appstore-artwork.json for provenance.
import type { Product, ProductSlug } from '../types';
import storeImage0 from '../../vTTS/assets/appstore/header-1.jpg';
import storeImage1 from '../../vTTS/assets/appstore/ipad-1.jpg';
import storeImage2 from '../../vTTS/assets/appstore/ipad-2.jpg';
import storeImage3 from '../../vTTS/assets/appstore/ipad-3.jpg';
import storeImage4 from '../../vTTS/assets/appstore/iphone-1.jpg';
import storeImage5 from '../../vTTS/assets/appstore/iphone-2.jpg';
import storeImage6 from '../../vTTS/assets/appstore/iphone-3.jpg';
import storeImage7 from '../../vTTS/assets/appstore/mac-1.jpg';
import storeImage8 from '../../PadCodeAI/assets/appstore/ipad-1.jpg';
import storeImage9 from '../../PadCodeAI/assets/appstore/ipad-2.jpg';
import storeImage10 from '../../PadCodeAI/assets/appstore/iphone-1.jpg';
import storeImage11 from '../../PadCodeAI/assets/appstore/iphone-2.jpg';
import storeImage12 from '../../PadCodeAI/assets/appstore/iphone-3.jpg';
import storeImage13 from '../../PadNotesAI/assets/appstore/ipad-1.jpg';
import storeImage14 from '../../PadNotesAI/assets/appstore/ipad-2.jpg';
import storeImage15 from '../../PadNotesAI/assets/appstore/iphone-1.jpg';
import storeImage16 from '../../PadNotesAI/assets/appstore/iphone-2.jpg';
import storeImage17 from '../../PadNotesAI/assets/appstore/iphone-3.jpg';
import storeImage18 from '../../PadNotesAI/assets/appstore/mac-1.jpg';
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
export const storeArtwork: Partial<Record<ProductSlug, Pick<Product, 'heroImage' | 'gallery'>>> = {
  vtts: { heroImage: storeImage0, gallery: [
    { src: storeImage1, alt: { vi: 'Giao diện iPad · 1', en: 'iPad experience · 1' } },
    { src: storeImage2, alt: { vi: 'Giao diện iPad · 2', en: 'iPad experience · 2' } },
    { src: storeImage3, alt: { vi: 'Giao diện iPad · 3', en: 'iPad experience · 3' } },
    { src: storeImage4, alt: { vi: 'Giao diện iPhone · 1', en: 'iPhone experience · 1' } },
    { src: storeImage5, alt: { vi: 'Giao diện iPhone · 2', en: 'iPhone experience · 2' } },
    { src: storeImage6, alt: { vi: 'Giao diện iPhone · 3', en: 'iPhone experience · 3' } },
    { src: storeImage7, alt: { vi: 'Giao diện Mac · 1', en: 'Mac experience · 1' } },
  ] },
  padcodeai: { heroImage: storeImage8, gallery: [
    { src: storeImage8, alt: { vi: 'Giao diện iPad · 1', en: 'iPad experience · 1' } },
    { src: storeImage9, alt: { vi: 'Giao diện iPad · 2', en: 'iPad experience · 2' } },
    { src: storeImage10, alt: { vi: 'Giao diện iPhone · 1', en: 'iPhone experience · 1' } },
    { src: storeImage11, alt: { vi: 'Giao diện iPhone · 2', en: 'iPhone experience · 2' } },
    { src: storeImage12, alt: { vi: 'Giao diện iPhone · 3', en: 'iPhone experience · 3' } },
  ] },
  padnotesai: { heroImage: storeImage13, gallery: [
    { src: storeImage13, alt: { vi: 'Giao diện iPad · 1', en: 'iPad experience · 1' } },
    { src: storeImage14, alt: { vi: 'Giao diện iPad · 2', en: 'iPad experience · 2' } },
    { src: storeImage15, alt: { vi: 'Giao diện iPhone · 1', en: 'iPhone experience · 1' } },
    { src: storeImage16, alt: { vi: 'Giao diện iPhone · 2', en: 'iPhone experience · 2' } },
    { src: storeImage17, alt: { vi: 'Giao diện iPhone · 3', en: 'iPhone experience · 3' } },
    { src: storeImage18, alt: { vi: 'Giao diện Mac · 1', en: 'Mac experience · 1' } },
  ] },
  mynasmanager: { heroImage: storeImage19, gallery: [
    { src: storeImage19, alt: { vi: 'Giao diện iPad · 1', en: 'iPad experience · 1' } },
    { src: storeImage20, alt: { vi: 'Giao diện iPad · 2', en: 'iPad experience · 2' } },
    { src: storeImage21, alt: { vi: 'Giao diện iPad · 3', en: 'iPad experience · 3' } },
    { src: storeImage22, alt: { vi: 'Giao diện iPhone · 1', en: 'iPhone experience · 1' } },
    { src: storeImage23, alt: { vi: 'Giao diện iPhone · 2', en: 'iPhone experience · 2' } },
    { src: storeImage24, alt: { vi: 'Giao diện iPhone · 3', en: 'iPhone experience · 3' } },
  ] },
  lunarv: { heroImage: storeImage25, gallery: [
    { src: storeImage25, alt: { vi: 'Giao diện iPad · 1', en: 'iPad experience · 1' } },
    { src: storeImage26, alt: { vi: 'Giao diện iPad · 2', en: 'iPad experience · 2' } },
    { src: storeImage27, alt: { vi: 'Giao diện iPad · 3', en: 'iPad experience · 3' } },
    { src: storeImage28, alt: { vi: 'Giao diện iPhone · 1', en: 'iPhone experience · 1' } },
    { src: storeImage29, alt: { vi: 'Giao diện iPhone · 2', en: 'iPhone experience · 2' } },
    { src: storeImage30, alt: { vi: 'Giao diện iPhone · 3', en: 'iPhone experience · 3' } },
    { src: storeImage31, alt: { vi: 'Giao diện Mac · 1', en: 'Mac experience · 1' } },
  ] },
  lunarblock: { heroImage: storeImage32, gallery: [
    { src: storeImage32, alt: { vi: 'Giao diện iPad · 1', en: 'iPad experience · 1' } },
    { src: storeImage33, alt: { vi: 'Giao diện iPad · 2', en: 'iPad experience · 2' } },
    { src: storeImage34, alt: { vi: 'Giao diện iPad · 3', en: 'iPad experience · 3' } },
    { src: storeImage35, alt: { vi: 'Giao diện iPhone · 1', en: 'iPhone experience · 1' } },
    { src: storeImage36, alt: { vi: 'Giao diện iPhone · 2', en: 'iPhone experience · 2' } },
    { src: storeImage37, alt: { vi: 'Giao diện iPhone · 3', en: 'iPhone experience · 3' } },
    { src: storeImage38, alt: { vi: 'Giao diện Mac · 1', en: 'Mac experience · 1' } },
  ] },
};
