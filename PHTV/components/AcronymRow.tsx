import React from 'react';

export const AcronymRow = ({ letter, word }: { letter: string, word: string }) => (
  <div className="flex items-center group/row cursor-default select-none relative h-[28px] sm:h-[44px] md:h-[64px] overflow-visible pr-6 sm:pr-10 md:pr-16">
    {/* Letter: Precisely aligned with icon segments */}
    <div className="w-10 sm:w-16 md:w-20 flex justify-end shrink-0 overflow-visible pr-1 sm:pr-2">
        <span className="text-3xl sm:text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-rose-600 via-pink-500 via-red-500 via-rose-500 to-rose-600 bg-[length:200%_auto] animate-gradient-flow drop-shadow-[0_0_15px_rgba(225,29,72,0.35)] group-hover/row:drop-shadow-[0_0_30px_rgba(225,29,72,0.6)] group-hover/row:scale-110 transition-all duration-500 z-10 font-sans italic leading-none flex items-center h-full pr-3 md:pr-4">
        {letter}
        </span>
    </div>
    
    {/* Word suffix: Professional typography */}
    <span className="text-lg sm:text-2xl md:text-4xl font-black uppercase tracking-[0.12em] text-white/50 group-hover/row:text-white group-hover/row:tracking-[0.2em] group-hover/row:text-glow transition-all duration-700 ease-out text-left pl-1.5 md:pl-3 relative leading-none flex items-center h-full">
      {word}
      {/* Subtle animated underline decoration */}
      <span className="absolute bottom-0 left-1.5 md:left-3 right-0 h-[1.5px] md:h-[2px] bg-gradient-to-r from-brand-500 via-purple-500 to-transparent scale-x-0 group-hover/row:scale-x-100 transition-transform duration-700 origin-left opacity-70 rounded-full"></span>
    </span>
  </div>
);