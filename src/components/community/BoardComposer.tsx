import { useRef, type ReactNode, type SubmitEvent } from 'react';
import { PenLine } from 'lucide-react';

interface Props {
  title: string;
  publish: () => Promise<boolean>;
  children: ReactNode;
}

export default function BoardComposer({ title, publish, children }: Props) {
  const details = useRef<HTMLDetailsElement>(null);

  async function submit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!(await publish()) || !details.current?.open) return;
    details.current.open = false;
    details.current.querySelector('summary')?.focus();
  }

  return (
    <details className="board-composer" ref={details}>
      <summary className="board-primary">
        <PenLine size={16} aria-hidden="true" />
        {title}
      </summary>
      <form className="board-card board-form glass-card" onSubmit={submit}>
        {children}
      </form>
    </details>
  );
}
