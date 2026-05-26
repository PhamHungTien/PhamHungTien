import React, { useState } from 'react';
import { Icons } from './Icons';
import { TerminalCommandProps } from '../types';

export const TerminalBlock: React.FC<TerminalCommandProps> = ({ command, label = "Terminal", output }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(command);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="mx-auto w-full max-w-2xl overflow-hidden rounded-lg border border-slate-200 bg-white">
      <div className="flex items-center justify-between border-b border-slate-200 bg-slate-100 px-4 py-3">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <div className="h-3 w-3 rounded-full bg-red-400"></div>
            <div className="h-3 w-3 rounded-full bg-yellow-400"></div>
            <div className="h-3 w-3 rounded-full bg-green-400"></div>
          </div>
          <span className="ml-3 flex items-center gap-1 font-mono text-xs text-slate-500">
            <Icons.Terminal size={12} />
            {label}
          </span>
        </div>
        <button 
          onClick={handleCopy}
          className="text-slate-500 transition-colors hover:text-blue-600 focus:outline-none"
          title="Copy command"
        >
          {copied ? <Icons.Check size={16} className="text-green-600" /> : <Icons.Copy size={16} />}
        </button>
      </div>
      <div className="p-4 font-mono text-sm sm:text-base">
        <div className="flex items-start gap-2 text-slate-700">
          <span className="select-none text-green-600">$</span>
          <span className="break-all">{command}</span>
        </div>
        {output && (
          <div className="mt-2 select-none whitespace-pre-line text-slate-500">
            {output}
          </div>
        )}
      </div>
    </div>
  );
};
