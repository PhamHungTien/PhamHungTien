import React from 'react';

export const AcronymRow = ({ letter, word }: { letter: string, word: string }) => (
  <div className="relative flex h-[21px] cursor-default select-none items-center overflow-visible pr-4 sm:h-[25px]">
    {/* Letter: Precisely aligned with icon segments */}
    <div className="flex w-8 shrink-0 justify-end overflow-visible pr-1 sm:w-9">
        <span className="flex h-full items-center pr-1 text-2xl font-black italic leading-none text-transparent bg-clip-text bg-gradient-to-br from-red-700 via-yellow-400 via-orange-500 via-red-700 to-red-800 sm:text-3xl">
        {letter}
        </span>
    </div>
    
    {/* Word suffix: Professional typography */}
    <span className="relative -ml-1 flex h-full items-center text-left text-sm font-black uppercase italic leading-none text-transparent bg-clip-text bg-gradient-to-r from-[#450a04] via-red-600 to-[#450a04] sm:text-base">
      {word}
    </span>
  </div>
);
