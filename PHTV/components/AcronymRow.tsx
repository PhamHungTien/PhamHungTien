import React from 'react';
import './AcronymRow.css';

export const AcronymRow = ({ letter, word }: { letter: string; word: string }) => (
  <div className="phtv-acronym-item" aria-label={`${letter}${word}`}>
    <span className="phtv-acronym-initial" aria-hidden="true">
      {letter}
    </span>
    <span className="phtv-acronym-tail" aria-hidden="true">
      {word}
    </span>
  </div>
);
