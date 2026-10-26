/** Project actual circular 3D orbits into screen coordinates, sharing geometry with the tracks. */
export function initPlanetSystem(): void {
  const scene = document.querySelector<HTMLElement>('[data-planet-system]');
  if (!scene) return;
  const root = document.documentElement;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const svg = scene.querySelector<SVGSVGElement>('[data-orbit-paths]')!;
  const planets = [...scene.querySelectorAll<HTMLElement>('[data-planet]')].map((el) => ({
    el,
    phase: (Number(el.dataset.phase) * Math.PI) / 180,
    track: Number(el.dataset.track),
    period: Number(el.dataset.period),
  }));
  let width = 1,
    height = 1,
    elapsed = 0,
    previous = 0,
    frame = 0;
  let visible = false,
    hovered = false,
    focused = false;
  const motionEnabled = () => !reduced.matches && root.dataset.motion !== 'off';
  const running = () => motionEnabled() && visible && !document.hidden && !hovered && !focused;

  function project(angle: number, track: number) {
    const radius = [0.34, 0.4, 0.29][track];
    const x = Math.cos(angle) * width * radius;
    const y = Math.sin(angle) * height * radius * 0.69;
    const inclination = Math.min(0.9, (height / width) * 0.69);
    const z = Math.sin(angle) * width * radius * Math.sqrt(1 - inclination ** 2);
    const tilt = -0.22;
    const scale = (width * 2) / (width * 2 - z);
    return {
      x: (x * Math.cos(tilt) - y * Math.sin(tilt)) * scale,
      y: (x * Math.sin(tilt) + y * Math.cos(tilt)) * scale,
      z,
      scale,
    };
  }
  function draw() {
    planets.forEach(({ el, phase, track, period }) => {
      const p = project(phase + (elapsed * Math.PI * 2) / period, track);
      el.style.left = '50%';
      el.style.top = '47%';
      el.style.transform = `translate(-50%, -50%) translate(${p.x.toFixed(2)}px, ${p.y.toFixed(2)}px) scale(${p.scale.toFixed(3)})`;
      el.style.zIndex = String(p.z < 0 ? 5 : 15 + Math.round(p.z));
    });
  }
  function tick(now: number) {
    frame = 0;
    if (!running()) return;
    // Resume without jumping after a hidden tab or an interaction pause.
    if (previous) elapsed += Math.min((now - previous) / 1000, 0.05);
    previous = now;
    draw();
    frame = requestAnimationFrame(tick);
  }
  function sync() {
    cancelAnimationFrame(frame);
    frame = 0;
    previous = 0;
    if (!motionEnabled()) {
      // Restore separated, reachable fallback positions instead of freezing an occluded link.
      planets.forEach(({ el }) => {
        el.style.removeProperty('left');
        el.style.removeProperty('top');
        el.style.removeProperty('transform');
        el.style.removeProperty('z-index');
      });
      return;
    }
    draw();
    if (running()) frame = requestAnimationFrame(tick);
  }
  function resize() {
    width = scene!.clientWidth;
    height = scene!.clientHeight;
    svg.setAttribute('viewBox', `0 0 ${width} ${height}`);
    svg.replaceChildren(
      ...[0, 1, 2].map((track) => {
        const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        const points = Array.from({ length: 121 }, (_, i) => {
          const p = project((i / 120) * Math.PI * 2, track);
          return `${i ? 'L' : 'M'}${(width / 2 + p.x).toFixed(2)},${(height * 0.47 + p.y).toFixed(2)}`;
        });
        path.setAttribute('d', points.join(' ') + ' Z');
        return path;
      }),
    );
    sync();
  }
  planets.forEach(({ el }) => {
    el.addEventListener('pointerenter', () => {
      hovered = true;
      sync();
    });
    el.addEventListener('pointerleave', () => {
      hovered = false;
      sync();
    });
    el.addEventListener('pointerdown', () => {
      hovered = true;
      sync();
    });
    el.addEventListener('pointercancel', () => {
      hovered = false;
      sync();
    });
  });
  scene.addEventListener('focusin', () => {
    focused = true;
    sync();
  });
  scene.addEventListener('focusout', () =>
    queueMicrotask(() => {
      focused = scene.contains(document.activeElement);
      sync();
    }),
  );
  new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
    sync();
  }).observe(scene);
  new ResizeObserver(resize).observe(scene);
  new MutationObserver(sync).observe(root, { attributes: true, attributeFilter: ['data-motion'] });
  reduced.addEventListener('change', sync);
  document.addEventListener('visibilitychange', sync);
  window.addEventListener('pagehide', () => {
    cancelAnimationFrame(frame);
    previous = 0;
  });
  window.addEventListener('pageshow', sync);
  resize();
}
