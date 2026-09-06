import React, { useEffect, useRef, useState } from 'react';
import { Icons } from './Icons';
import { useI18n } from '../i18n';

export const CopyBlock = ({ code, className = "", colorClass = "text-slate-300" }: { code: string, className?: string, colorClass?: string }) => {
  const { lang } = useI18n();
  const [status, setStatus] = useState<'idle' | 'copied' | 'failed'>('idle');
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => () => { if (timer.current) clearTimeout(timer.current); }, []);
  const label = status === 'copied'
    ? (lang === 'vi' ? 'Đã sao chép' : 'Copied')
    : status === 'failed'
      ? (lang === 'vi' ? 'Không thể sao chép. Hãy chọn lệnh để sao chép thủ công.' : 'Could not copy. Select the command to copy it manually.')
      : (lang === 'vi' ? 'Sao chép lệnh' : 'Copy command');

  const handleCopy = async () => {
    if (timer.current) clearTimeout(timer.current);
    try {
      await navigator.clipboard.writeText(code);
      setStatus('copied');
    } catch {
      setStatus('failed');
    }
    timer.current = setTimeout(() => setStatus('idle'), 2500);
  };

  return (
    <div className={`phtv-copy-block relative group bg-black/50 rounded-lg border border-white/5 ${className}`}>
      <div className={`p-3 pr-14 font-mono text-sm break-all ${colorClass}`}>
        {code}
      </div>
      <button
        type="button"
        onClick={handleCopy}
        className="absolute top-1 right-1 grid h-11 w-11 place-items-center text-slate-400 hover:text-white rounded-lg transition-colors"
        title={label}
        aria-label={label}
      >
        {status === 'copied' ? <Icons.Check size={16} /> : status === 'failed' ? <Icons.X size={16} /> : <Icons.Copy size={16} />}
      </button>
      <span className="sr-only" role="status">{status !== 'idle' ? label : ''}</span>
    </div>
  );
};
