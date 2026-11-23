import { useId, useState, type ReactNode } from 'react';
import type { Locale } from '../../i18n/locales';
import { boardText } from './strings';

interface Props {
  content: string;
  lang: Locale;
  render?: (content: string) => ReactNode;
}

function excerpt(content: string): string | undefined {
  const lines = content.trim().split(/\r\n?|\n/);
  const leadingLines = lines.slice(0, 4).join('\n');
  const characters = [...leadingLines];
  if (lines.length <= 4 && characters.length <= 280) return;

  const prefix = characters.slice(0, 280).join('').trimEnd();
  const boundary = prefix.lastIndexOf(' ');
  const text = characters.length > 280 && boundary > 240 ? prefix.slice(0, boundary) : prefix;
  return `${text}…`;
}

export default function BoardPostBody({ content, lang, render }: Props) {
  const [expanded, setExpanded] = useState(false);
  const contentId = useId();
  const text = boardText[lang];
  const preview = excerpt(content);

  return (
    <div className="board-post-body">
      <div id={contentId}>
        {preview && !expanded ? (
          <p className="board-content text-justify">{preview}</p>
        ) : (
          (render?.(content) ?? <p className="board-content text-justify">{content}</p>)
        )}
      </div>
      {preview && (
        <button
          type="button"
          className="board-read-toggle"
          aria-expanded={expanded}
          aria-controls={contentId}
          onClick={() => setExpanded((open) => !open)}
        >
          {expanded ? text.readLess : text.readMore}
        </button>
      )}
    </div>
  );
}
