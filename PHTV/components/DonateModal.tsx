import { DonateDialog } from '../../src/components/DonateDialog';
import { useI18n } from '../i18n';

export function DonateModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const { lang } = useI18n();
  return <DonateDialog isOpen={isOpen} onClose={onClose} lang={lang} />;
}
