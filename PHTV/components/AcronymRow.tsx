import React from 'react';

export const AcronymRow = ({ letter, word }: { letter: string, word: string }) => (
  <div className="flex items-center group/row cursor-default select-none relative h-[28px] sm:h-[44px] md:h-[64px] overflow-visible pr-6 sm:pr-10 md:pr-16">
    {/* Letter: Precisely aligned with icon segments */}
    <div className="w-10 sm:w-16 md:w-20 flex justify-end shrink-0 overflow-visible pr-1 sm:pr-2">
        <span className="text-3xl sm:text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-br from-[#450a04] via-red-500 via-rose-400 via-red-500 to-[#450a04] bg-[length:300%_auto] animate-gradient-flow filter drop-shadow-[0_0_15px_rgba(239,68,68,0.6)] drop-shadow-[0_0_30px_rgba(239,68,68,0.4)] group-hover/row:drop-shadow-[0_0_25px_rgba(239,68,68,0.9)] group-hover/row:scale-110 transition-all duration-500 z-10 font-sans italic leading-none flex items-center h-full pr-2 md:pr-3">
        {letter}
        </span>
    </div>
    
    {/* Word suffix: Professional typography */}
    <span className="text-lg sm:text-2xl md:text-4xl font-black uppercase tracking-[0.12em] text-transparent bg-clip-text bg-gradient-to-r from-[#450a04] via-red-600 via-rose-500 via-red-600 to-[#450a04] bg-[length:200%_auto] animate-gradient-flow opacity-90 group-hover/row:opacity-100 group-hover/row:tracking-[0.2em] group-hover/row:text-glow transition-all duration-700 ease-out text-left pl-0 -ml-1.5 md:-ml-2 relative leading-none flex items-center h-full italic">
      {word}
      {/* Subtle animated underline decoration */}
      <span className="absolute bottom-0 left-0 right-0 h-[1.5px] md:h-[2px] bg-gradient-to-r from-brand-400 via-rose-400 to-transparent scale-x-0 group-hover/row:scale-x-100 transition-transform duration-700 origin-left opacity-90 rounded-full shadow-[0_0_10px_rgba(244,63,94,0.5)]"></span>
    </span>
  </div>
);