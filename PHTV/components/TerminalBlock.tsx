import React, { useState } from 'react';
import { Icons } from './Icons';
import { TerminalCommandProps } from '../types';

export const TerminalBlock: React.FC<TerminalCommandProps> = ({ command, label = "Terminal" }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(command);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full max-w-2xl mx-auto overflow-hidden rounded-xl bg-[#1e1e1e] border border-slate-700 shadow-2xl">
      <div className="flex items-center justify-between px-4 py-3 bg-[#252526] border-b border-slate-700">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
            <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
          </div>
          <span className="ml-3 text-xs text-slate-400 font-mono flex items-center gap-1">
            <Icons.Terminal size={12} />
            {label}
          </span>
        </div>
        <button 
          onClick={handleCopy}
          className="text-slate-400 hover:text-white transition-colors focus:outline-none"
          title="Copy command"
        >
          {copied ? <Icons.Check size={16} className="text-green-400" /> : <Icons.Copy size={16} />}
        </button>
      </div>
      <div className="p-6 font-mono text-sm sm:text-base">
        <div className="flex items-start gap-2 text-slate-300">
          <span className="text-green-400 select-none">$</span>
          <span className="break-all">{command}</span>
        </div>
        <div className="mt-2 text-slate-500 select-none">
          Downloading PHTV... <br/>
          Installing PHTV to /Applications... <br/>
          <span className="text-green-400">Success!</span> PHTV installed successfully.
        </div>
      </div>
    </div>
  );
};