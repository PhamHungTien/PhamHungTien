import React from 'react';

export const AcronymRow = ({ letter, word }: { letter: string, word: string }) => (
  <div className="flex items-center group/row cursor-default select-none relative h-[22px] sm:h-[36px] md:h-[52px] overflow-visible">
    {/* Letter: Fixed clipping by adding pr-2 and removing tracking-tighter */}
    <div className="w-10 sm:w-16 md:w-20 flex justify-end shrink-0 overflow-visible pr-1 sm:pr-2">
        <span className="text-2xl sm:text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-orange-400 via-yellow-400 via-orange-400 to-red-500 bg-[length:200%_auto] animate-gradient-flow drop-shadow-[0_0_12px_rgba(239,68,68,0.25)] group-hover/row:drop-shadow-[0_0_25px_rgba(239,68,68,0.5)] group-hover/row:scale-110 transition-all duration-500 z-10 font-sans italic leading-none flex items-center h-full pr-1 md:pr-2">
        {letter}
        </span>
    </div>
    
    {/* Word suffix: Smaller and aligned */}
    <span className="text-base sm:text-xl md:text-3xl font-black uppercase tracking-[0.12em] text-white/50 group-hover/row:text-white group-hover/row:tracking-[0.2em] group-hover/row:text-glow transition-all duration-700 ease-out text-left pl-1 md:pl-2 relative leading-none flex items-center h-full">
      {word}
      {/* Subtle animated underline decoration */}
      <span className="absolute bottom-0 left-1 md:left-2 right-0 h-[1.5px] bg-gradient-to-r from-brand-500 via-purple-500 to-transparent scale-x-0 group-hover/row:scale-x-100 transition-transform duration-700 origin-left opacity-70 rounded-full"></span>
    </span>
  </div>
);