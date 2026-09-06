import { useEffect, useId, useRef } from 'react';
import { createPortal } from 'react-dom';
import { ArrowUpRight, Download, Heart, X } from 'lucide-react';
import donateQr from '../../PHTV/public/assets/donate.webp';
import type { Lang } from '../types';
import './DonateDialog.css';

interface DonateDialogProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Lang;
}

const copy = {
  vi: {
    title: 'Ủng hộ tác giả',
    description: 'Cảm ơn bạn đã đồng hành cùng các ứng dụng của mình.',
    scan: 'Quét bằng ứng dụng ngân hàng hoặc MoMo',
    save: 'Lưu mã QR',
    paypal: 'Ủng hộ qua PayPal',
    note: 'Hoàn toàn tự nguyện. Bạn tự chọn số tiền đóng góp.',
    close: 'Đóng',
  },
  en: {
    title: 'Support my work',
    description: 'Thank you for supporting me and the apps I build.',
    scan: 'Scan with your banking app or MoMo',
    save: 'Save QR code',
    paypal: 'Support via PayPal',
    note: 'Always optional. Choose any amount you like.',
    close: 'Close',
  },
};

export function DonateDialog({ isOpen, onClose, lang }: DonateDialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const titleId = useId();
  const descriptionId = useId();
  const text = copy[lang];

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!isOpen || !dialog) return;

    const previousFocus = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    dialog.showModal();
    document.body.style.overflow = 'hidden';

    return () => {
      dialog.close();
      document.body.style.overflow = previousOverflow;
      if (previousFocus instanceof HTMLElement && previousFocus.isConnected) previousFocus.focus();
    };
  }, [isOpen]);

  if (!isOpen || typeof document === 'undefined') return null;

  // Keep the shared dialog outside each app's page-specific theme overrides.
  return createPortal(
    <dialog
      ref={dialogRef}
      className="donate-dialog"
      aria-labelledby={titleId}
      aria-describedby={descriptionId}
      onClose={(event) => {
        if (!event.currentTarget.open) onClose();
      }}
      onClick={(event) => {
        if (event.target !== event.currentTarget) return;
        const rect = event.currentTarget.getBoundingClientRect();
        if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) onClose();
      }}
    >
      <button className="donate-dialog__close" type="button" onClick={onClose} aria-label={text.close} autoFocus>
        <X size={20} aria-hidden="true" />
      </button>
      <span className="donate-dialog__symbol" aria-hidden="true"><Heart size={24} /></span>
      <h2 id={titleId}>{text.title}</h2>
      <p id={descriptionId}>{text.description}</p>
      <figure className="donate-dialog__qr">
        <img src={donateQr} width={600} height={600} alt="VietQR · Pham Hung Tien" />
        <figcaption>{text.scan}</figcaption>
      </figure>
      <a className="donate-dialog__save" href={donateQr} download="pham-hung-tien-vietqr.webp">
        <Download size={16} aria-hidden="true" />{text.save}
      </a>
      <a className="donate-dialog__paypal" href="https://www.paypal.com/paypalme/phamhungtien1404" target="_blank" rel="noopener noreferrer">
        {text.paypal}<ArrowUpRight size={18} aria-hidden="true" />
      </a>
      <p className="donate-dialog__note">{text.note}</p>
    </dialog>,
    document.body,
  );
}
