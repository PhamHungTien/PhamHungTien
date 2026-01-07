import React, { useState } from 'react';
import { Icons } from './Icons';

export const CopyBlock = ({ code, className = "", colorClass = "text-slate-300" }: { code: string, className?: string, colorClass?: string }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={`relative group bg-black/50 rounded-lg border border-white/5 ${className}`}>
      <div className={`p-3 pr-10 font-mono text-sm break-all ${colorClass}`}>
        {code}
      </div>
      <button
        onClick={handleCopy}
        className="absolute top-2 right-2 p-1.5 text-slate-400 hover:text-white bg-slate-800/80 hover:bg-slate-700 rounded-md transition-all opacity-0 group-hover:opacity-100 focus:opacity-100"
        title="Sao chép"
      >
        {copied ? <Icons.Check size={14} className="text-green-400" /> : <Icons.Copy size={14} />}
      </button>
    </div>
  );
};