import type { Locale } from '../../i18n/locales';
import { boardText } from './strings';

interface Props {
  lang: Locale;
  filtered: boolean;
  onReset: () => void;
}

export default function BoardEmpty({ lang, filtered, onReset }: Props) {
  const text = boardText[lang];
  return (
    <div className="board-empty">
      <p role="status">{filtered ? text.noMatches : text.empty}</p>
      {filtered && (
        <button type="button" className="board-secondary" onClick={onReset}>
          {text.clearFilters}
        </button>
      )}
    </div>
  );
}
