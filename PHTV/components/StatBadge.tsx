import React from 'react';
import LiquidGlass from './liquid-glass/LiquidGlass';

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
    <div className="flex items-center gap-3.5 w-full">
      <div className={`p-2 rounded-xl bg-white/5 group-hover:bg-rose-500/20 transition-all duration-500 ${colorClass} shadow-inner`}>
        <Icon size={18} />
      </div>
      <div className="flex flex-col items-start leading-none gap-1.5 text-left">
        <span className="text-[10px] uppercase tracking-[0.15em] font-black text-slate-500 group-hover:text-rose-400/70 transition-colors">{label}</span>
        <span className="text-base font-black text-white group-hover:text-glow transition-all">{value}</span>
      </div>
    </div>
  );

  return (
    <LiquidGlass
      displacementScale={30}
      blurAmount={0.2}
      saturation={120}
      aberrationIntensity={1.5}
      elasticity={0.2}
      cornerRadius={16}
      padding="14px 24px"
      onClick={onClick ? onClick : () => { if (href) window.open(href, '_blank', 'noopener,noreferrer'); }}
    >
      {content}
    </LiquidGlass>
  );
};