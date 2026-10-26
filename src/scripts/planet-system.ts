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
  let orbitOffset = 0,
    velocity = 0;
  let gesture: {
    id: number;
    x: number;
    y: number;
    lastX: number;
    time: number;
    dragging: boolean;
  } | null = null;
  let suppressClick = false;
  const motionEnabled = () => !reduced.matches && root.dataset.motion !== 'off';
  const running = () =>
    motionEnabled() && visible && !document.hidden && !hovered && !focused && !gesture?.dragging;

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
      const p = project(phase + orbitOffset + (elapsed * Math.PI * 2) / period, track);
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
    if (previous) {
      const dt = Math.min((now - previous) / 1000, 0.05);
      elapsed += dt;
      orbitOffset += velocity * dt;
      velocity *= Math.exp(-3.5 * dt);
      if (Math.abs(velocity) < 0.002) velocity = 0;
    }
    previous = now;
    draw();
    frame = requestAnimationFrame(tick);
  }
  function sync() {
    cancelAnimationFrame(frame);
    frame = 0;
    previous = 0;
    if (!motionEnabled()) {
      gesture = null;
      velocity = 0;
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
    el.addEventListener('pointerenter', (event) => {
      if (event.pointerType !== 'mouse') return;
      hovered = true;
      sync();
    });
    el.addEventListener('pointerleave', (event) => {
      if (event.pointerType !== 'mouse') return;
      hovered = false;
      sync();
    });
  });
  scene.addEventListener('dragstart', (event) => event.preventDefault());
  scene.addEventListener('pointerdown', (event) => {
    if (!event.isPrimary || event.button !== 0 || !motionEnabled()) return;
    suppressClick = false;
    gesture = {
      id: event.pointerId,
      x: event.clientX,
      y: event.clientY,
      lastX: event.clientX,
      time: event.timeStamp,
      dragging: false,
    };
    velocity = 0;
  });
  scene.addEventListener('pointermove', (event) => {
    if (!gesture || gesture.id !== event.pointerId) return;
    const dx = event.clientX - gesture.x,
      dy = event.clientY - gesture.y;
    if (!gesture.dragging) {
      if (Math.max(Math.abs(dx), Math.abs(dy)) < 8) return;
      if (Math.abs(dy) > Math.abs(dx)) {
        gesture = null;
        return;
      }
      gesture.dragging = true;
      suppressClick = true;
      scene.setPointerCapture(event.pointerId);
      sync();
    }
    const delta = ((event.clientX - gesture.lastX) / width) * Math.PI * 2;
    const dt = Math.max(8, event.timeStamp - gesture.time) / 1000;
    orbitOffset += delta;
    velocity = Math.max(-3, Math.min(3, delta / dt));
    gesture.lastX = event.clientX;
    gesture.time = event.timeStamp;
    draw();
  });
  const endGesture = (event: PointerEvent) => {
    if (!gesture || gesture.id !== event.pointerId) return;
    if (event.type === 'pointercancel' || event.timeStamp - gesture.time > 120) velocity = 0;
    gesture = null;
    if (scene.hasPointerCapture(event.pointerId)) scene.releasePointerCapture(event.pointerId);
    hovered = false;
    sync();
  };
  scene.addEventListener('pointerup', endGesture);
  scene.addEventListener('pointercancel', endGesture);
  scene.addEventListener('lostpointercapture', endGesture);
  scene.addEventListener(
    'click',
    (event) => {
      if (suppressClick && event.detail !== 0) {
        event.preventDefault();
        event.stopPropagation();
        suppressClick = false;
      }
    },
    true,
  );
  scene.addEventListener('focusin', () => {
    focused = !!scene.querySelector(':focus-visible');
    sync();
  });
  scene.addEventListener('focusout', () =>
    queueMicrotask(() => {
      focused = !!scene.querySelector(':focus-visible');
      sync();
    }),
  );
  new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
    sync();
  }).observe(scene);
  new ResizeObserver(resize).observe(scene);
  new MutationObserver(sync).observe(root, {
    attributes: true,
    attributeFilter: ['data-motion', 'data-motion-active'],
  });
  reduced.addEventListener('change', sync);
  document.addEventListener('visibilitychange', sync);
  window.addEventListener('pagehide', () => {
    cancelAnimationFrame(frame);
    previous = 0;
  });
  window.addEventListener('pageshow', sync);
  resize();
}
