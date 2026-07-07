const rows = [
  ['P', 'RECISION'],
  ['H', 'YBRID'],
  ['T', 'YPING'],
  ['V', 'IETNAMESE']
] as const;

export function PhtvWordmark() {
  return (
    <div className="phtv-wordmark" aria-label="PHTV Precision Hybrid Typing Vietnamese">
      {rows.map(([letter, suffix]) => (
        <div className="phtv-wordmark__row" key={letter}>
          <span className="phtv-wordmark__letter">{letter}</span>
          <span className="phtv-wordmark__suffix">{suffix}</span>
        </div>
      ))}
    </div>
  );
}
