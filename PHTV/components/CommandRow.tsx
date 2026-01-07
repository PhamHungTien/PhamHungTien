import React, { useState } from 'react';
import { Icons } from './Icons';

export const CommandRow = ({ icon: Icon, label, code, color }: { icon: any, label: string, code: string, color: string }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 p-3 bg-slate-900/50 hover:bg-slate-800/80 border border-slate-800 hover:border-slate-600 rounded-lg transition-all duration-200">
      <div className="flex items-center gap-3 min-w-fit">
        <div className={`p-2 rounded-md bg-opacity-10 ${color.replace('text-', 'bg-')}`}>
          <Icon size={16} className={color} />
        </div>
        <span className="text-sm font-medium text-slate-300">{label}</span>
      </div>
      
      <div className="relative flex-1 min-w-0 w-full">
        <code className="block w-full px-3 py-2 pr-9 bg-black/40 border border-slate-800 rounded text-xs font-mono text-slate-400 break-all">
          {code}
        </code>
        <button 
          onClick={handleCopy}
          className="absolute right-1 top-1/2 -translate-y-1/2 p-1.5 text-slate-500 hover:text-white hover:bg-slate-700 rounded transition-colors z-10"
          title="Sao chép lệnh"
        >
          {copied ? <Icons.Check size={14} className="text-green-500" /> : <Icons.Copy size={14} />}
        </button>
      </div>
    </div>
  );
};