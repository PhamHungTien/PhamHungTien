import { useEffect, useRef, useState } from 'react';
import type LiquidGlass from 'liquid-glass-react';

/** Client-only progressive enhancement; the CSS control remains the fallback. */
export function GlassOptics() {
  const ref = useRef<HTMLDivElement>(null);
  const [Glass, setGlass] = useState<typeof LiquidGlass | null>(null);
  const [size, setSize] = useState({ width: 0, height: 0, radius: 24 });
  useEffect(() => {
    const transparency = matchMedia('(prefers-reduced-transparency: reduce)');
    const motion = matchMedia('(prefers-reduced-motion: reduce)');
    const supported = /Chrome|Chromium|Edg\//.test(navigator.userAgent);
    let alive = true;
    const update = () => {
      if (!supported || transparency.matches || motion.matches) { setGlass(null); return; }
      import('liquid-glass-react').then(module => { if (alive && !transparency.matches && !motion.matches) setGlass(() => module.default); }).catch(() => { if (alive) setGlass(null); });
    };
    update();
    transparency.addEventListener('change', update);
    motion.addEventListener('change', update);
    const observer = new ResizeObserver(entries => {
      const { width, height } = entries[0].contentRect;
      const radius = parseFloat(getComputedStyle(entries[0].target).borderTopLeftRadius) || 24;
      setSize({ width, height, radius });
    });
    if (ref.current) observer.observe(ref.current);
    return () => { alive = false; observer.disconnect(); transparency.removeEventListener('change', update); motion.removeEventListener('change', update); };
  }, []);
  return <div ref={ref} className="glass-optics" aria-hidden="true">
    {Glass && size.width > 0 && <Glass key={`${size.width}:${size.height}:${size.radius}`} className="glass-optics__surface" displacementScale={24} blurAmount={0.2} saturation={120} aberrationIntensity={0.5} elasticity={0} cornerRadius={size.radius} padding="0" style={{ position: 'absolute', top: '50%', left: '50%' }}><div style={{ width: size.width, height: size.height }} /></Glass>}
  </div>;
}
