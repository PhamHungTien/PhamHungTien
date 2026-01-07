import React from 'react';

interface StatBadgeProps {
  icon: any;
  label: string;
  value: string;
  href?: string;
  onClick?: () => void;
  colorClass?: string;
}

export const StatBadge = ({ icon: Icon, label, value, href, onClick, colorClass = "text-slate-300" }: StatBadgeProps) => {
  const content = (
    <>
      <div className={`p-2 rounded-xl bg-white/5 group-hover:bg-white/10 transition-colors ${colorClass}`}>
        <Icon size={18} />
      </div>
      <div className="flex flex-col items-start leading-none gap-1">
        <span className="text-[11px] uppercase tracking-wider font-bold text-slate-500 group-hover:text-slate-400 transition-colors">{label}</span>
        <span className="text-base font-bold text-slate-200 group-hover:text-white transition-colors">{value}</span>
      </div>
    </>
  );

  const className = "flex items-center gap-3 px-5 py-3 rounded-2xl bg-slate-900/50 border border-slate-800 hover:border-slate-600 hover:bg-slate-800/80 transition-all duration-300 group hover:-translate-y-0.5 cursor-pointer";

  if (onClick) {
    return (
      <button onClick={onClick} className={className} type="button">
        {content}
      </button>
    );
  }

  return (
    <a 
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
    >
      {content}
    </a>
  );
};