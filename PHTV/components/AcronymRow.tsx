import React from 'react';

export const AcronymRow = ({ letter, word }: { letter: string; word: string }) => (
  <div className="phtv-acronym-item">
    <span className="phtv-acronym-initial">{letter}</span><span>{word}</span>
  </div>
);
