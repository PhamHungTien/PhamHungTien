import type { ComponentProps } from 'react';
import { ChevronDown } from 'lucide-react';

export default function BoardSelect(props: ComponentProps<'select'>) {
  return (
    <span className="board-select glass glass-panel">
      <select {...props} />
      <ChevronDown className="board-select__chevron" size={18} aria-hidden="true" />
    </span>
  );
}
