import React from 'react';

export const AcronymRow = ({ letter, word }: { letter: string, word: string }) => (
  <div className="relative flex h-[45px] cursor-default select-none items-center overflow-visible pr-4 sm:h-[54px]">
    {/* Letter: Precisely aligned with icon segments */}
    <div className="flex w-14 shrink-0 justify-end overflow-visible pr-2 sm:w-16">
        <span className="phtv-acronym-letter flex h-full items-center pr-1 text-5xl font-black italic leading-none text-transparent bg-clip-text bg-gradient-to-br from-red-700 via-yellow-400 via-orange-500 via-red-700 to-red-800 sm:text-6xl">
        {letter}
        </span>
    </div>
    
    {/* Word suffix: Professional typography */}
    <span className="phtv-acronym-word relative -ml-1 flex h-full items-center text-left text-2xl font-black uppercase italic leading-none text-transparent bg-clip-text bg-gradient-to-r from-[#450a04] via-red-600 to-[#450a04] sm:text-4xl">
      {word}
    </span>
  </div>
);
