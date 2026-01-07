import React from 'react';

interface StatBadgeProps {
  icon: any;
  label: string;
  value: string;
  href?: string;
  onClick?: () => void;
  colorClass?: string;
}

export const StatBadge = ({ icon: Icon, label, value, href, onClick, colorClass = "text-rose-400" }: StatBadgeProps) => {
  const content = (
    <>
      <div className={`p-2 rounded-xl bg-white/5 group-hover:bg-rose-500/20 transition-all duration-500 ${colorClass} shadow-inner`}>
        <Icon size={18} />
      </div>
      <div className="flex flex-col items-start leading-none gap-1.5">
        <span className="text-[10px] uppercase tracking-[0.15em] font-black text-slate-500 group-hover:text-rose-400/70 transition-colors">{label}</span>
        <span className="text-base font-black text-white group-hover:text-glow transition-all">{value}</span>
      </div>
    </>
  );

  const className = "flex items-center gap-3.5 px-6 py-3.5 rounded-2xl bg-slate-900/40 backdrop-blur-md border border-white/5 hover:border-rose-500/30 hover:bg-slate-800/60 transition-all duration-500 group hover:-translate-y-1 cursor-pointer shadow-lg";

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