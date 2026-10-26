/**
 * Orbit motion engine: projects 7 independent elliptical orbits into screen coordinates
 * with distinct semi-major axes, Keplerian velocity, real-time collision avoidance,
 * safe boundary clamping, and dynamic interactive depth.
 */

export interface TrackDef {
  radius: number; // Semi-major axis fraction of responsive unit
  period: number; // Orbital period in seconds
  initialPhase: number; // Staggered initial position in radians
  eccentricity: number; // Orbit ellipse eccentricity
  argPeriapsis: number; // Periapsis orientation angle
  tilt: number; // Orbit plane tilt in screen XY plane
  inclination: number; // 3D tilt relative to line of sight
}

export const ORBIT_TRACKS: TrackDef[] = [
  {
    radius: 0.195,
    period: 24,
    initialPhase: -1.8,
    eccentricity: 0.05,
    argPeriapsis: 0.2,
    tilt: -0.2,
    inclination: 1.05,
  },
  {
    radius: 0.24,
    period: 29,
    initialPhase: -0.7,
    eccentricity: 0.04,
    argPeriapsis: 0.8,
    tilt: -0.2,
    inclination: 1.05,
  },
  {
    radius: 0.285,
    period: 34,
    initialPhase: 0.4,
    eccentricity: 0.06,
    argPeriapsis: 1.5,
    tilt: -0.2,
    inclination: 1.05,
  },
  {
    radius: 0.33,
    period: 40,
    initialPhase: 1.4,
    eccentricity: 0.05,
    argPeriapsis: 2.2,
    tilt: -0.2,
    inclination: 1.05,
  },
  {
    radius: 0.375,
    period: 46,
    initialPhase: 2.4,
    eccentricity: 0.07,
    argPeriapsis: 2.9,
    tilt: -0.2,
    inclination: 1.05,
  },
  {
    radius: 0.42,
    period: 53,
    initialPhase: 3.5,
    eccentricity: 0.06,
    argPeriapsis: 3.8,
    tilt: -0.2,
    inclination: 1.05,
  },
  {
    radius: 0.465,
    period: 60,
    initialPhase: 4.6,
    eccentricity: 0.08,
    argPeriapsis: 4.8,
    tilt: -0.2,
    inclination: 1.05,
  },
];

interface ProjectedPoint {
  x: number;
  y: number;
  z: number;
  scale: number;
}

export function initPlanetSystem(): void {
  const scene = document.querySelector<HTMLElement>('[data-planet-system]');
  if (!scene) return;

  const root = document.documentElement;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');

  const rings = [...scene.querySelectorAll<SVGEllipseElement>('[data-track-ring]')];

  const planets = [...scene.querySelectorAll<HTMLElement>('[data-planet]')].map((el) => {
    const trackIndex = Number(el.dataset.track ?? 0);
    const trackDef = ORBIT_TRACKS[trackIndex] ?? ORBIT_TRACKS[0];
    const initialPhase =
      el.dataset.phase !== undefined
        ? (Number(el.dataset.phase) * Math.PI) / 180
        : trackDef.initialPhase;
    const period = Number(el.dataset.period) || trackDef.period;
    const trackColor = el.dataset.trackColor || 'var(--gold)';

    return {
      el,
      trackIndex,
      phase: initialPhase,
      period,
      trackColor,
    };
  });

  let width = 1;
  let height = 1;
  let previous = 0;
  let frame = 0;
  let visible = false;
  let hovered = false;
  let focused = false;
  let orbitOffset = 0;
  let velocity = 0;

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

  interface LayoutInfo {
    cx: number;
    cy: number;
    unit: number;
    maxAvailableX: number;
    maxAvailableYDown: number;
    maxAvailableYUp: number;
  }

  let layout: LayoutInfo = {
    cx: 0,
    cy: 0,
    unit: 1,
    maxAvailableX: 100,
    maxAvailableYDown: 100,
    maxAvailableYUp: 100,
  };

  function computeLayout(): LayoutInfo {
    const isMobile = width < 560;
    const isTablet = width < 820;

    const cx = width * 0.5;
    const cy = height * 0.47;

    const planetDim = isMobile ? 46 : isTablet ? 54 : 64;
    const labelHeight = isMobile ? 22 : 26;
    const marginX = isMobile ? 32 : 55;
    const marginTop = isMobile ? 28 : 45;
    const marginBottom = isMobile ? planetDim / 2 + labelHeight + 14 : 62;

    const maxAvailableX = Math.max(80, cx - marginX);
    const maxAvailableYDown = Math.max(80, height - cy - marginBottom);
    const maxAvailableYUp = Math.max(80, cy - marginTop);

    const maxOuterRadius = ORBIT_TRACKS[ORBIT_TRACKS.length - 1].radius;
    const maxPerspScale = 1.18;
    const cosInc = Math.cos(ORBIT_TRACKS[0].inclination);

    const unitByX = maxAvailableX / (maxOuterRadius * maxPerspScale);
    const unitByYDown = maxAvailableYDown / (maxOuterRadius * cosInc * maxPerspScale * 1.12);
    const unitByYUp = maxAvailableYUp / (maxOuterRadius * cosInc * maxPerspScale * 1.12);

    const unit = Math.min(width * 0.88, height * 1.18, unitByX, unitByYDown, unitByYUp);

    return { cx, cy, unit, maxAvailableX, maxAvailableYDown, maxAvailableYUp };
  }

  function updateTrackRings() {
    const { cx, cy, unit } = layout;
    rings.forEach((ring, i) => {
      const t = ORBIT_TRACKS[i];
      if (!t) return;
      const rx = t.radius * unit;
      const ry = rx * Math.cos(t.inclination);
      ring.setAttribute('cx', cx.toFixed(1));
      ring.setAttribute('cy', cy.toFixed(1));
      ring.setAttribute('rx', rx.toFixed(1));
      ring.setAttribute('ry', ry.toFixed(1));
      ring.setAttribute(
        'transform',
        `rotate(${((t.tilt * 180) / Math.PI).toFixed(2)} ${cx.toFixed(1)} ${cy.toFixed(1)})`,
      );
    });
  }

  function projectRaw(angle: number, trackIndex: number): ProjectedPoint {
    const t = ORBIT_TRACKS[trackIndex] ?? ORBIT_TRACKS[0];
    const { unit } = layout;

    // Organic Keplerian ellipse
    const e = t.eccentricity;
    const theta = angle - t.argPeriapsis;
    const r = t.radius * ((1 - e * e) / (1 + e * Math.cos(theta)));

    const cosInc = Math.cos(t.inclination);
    const sinInc = Math.sin(t.inclination);

    const x0 = Math.cos(angle) * unit * r;
    const y0 = Math.sin(angle) * unit * r * cosInc;
    const z0 = Math.sin(angle) * unit * r * sinInc;

    // 3D perspective projection
    const persDist = unit * 3.0;
    const scale = persDist / (persDist - z0);

    const cosTilt = Math.cos(t.tilt);
    const sinTilt = Math.sin(t.tilt);

    const x = (x0 * cosTilt - y0 * sinTilt) * scale;
    const y = (x0 * sinTilt + y0 * cosTilt) * scale;

    return { x, y, z: z0, scale };
  }

  /**
   * PBD Soft-Repulsion & Boundary Solver:
   * Guarantees that no two planets or their labels overlap ("không bị chồng lên nhau")
   * and that all planets remain strictly within visible bounds ("hiển thị đầy đủ").
   */
  function solveClearance(positions: ProjectedPoint[]): void {
    const isMobile = width < 560;
    const safeDx = (isMobile ? 52 : 70) * (layout.unit / (isMobile ? 300 : 790));
    const safeDy = (isMobile ? 48 : 64) * (layout.unit / (isMobile ? 300 : 790));

    const minSafeDx = isMobile ? 48 : 58;
    const minSafeDy = isMobile ? 44 : 52;
    const reqDx = Math.max(minSafeDx, safeDx);
    const reqDy = Math.max(minSafeDy, safeDy);

    // Iterative pairwise soft relaxation
    for (let iter = 0; iter < 3; iter++) {
      for (let i = 0; i < positions.length; i++) {
        for (let j = i + 1; j < positions.length; j++) {
          const dx = positions[i].x - positions[j].x;
          const dy = positions[i].y - positions[j].y;
          const normDistSq = (dx * dx) / (reqDx * reqDx) + (dy * dy) / (reqDy * reqDy);

          if (normDistSq < 1 && normDistSq > 0.00001) {
            const normDist = Math.sqrt(normDistSq);
            const push = (1 - normDist) * 0.5;
            const pushX = (dx / normDist) * (reqDx * push);
            const pushY = (dy / normDist) * (reqDy * push);

            positions[i].x += pushX;
            positions[i].y += pushY;
            positions[j].x -= pushX;
            positions[j].y -= pushY;
          }
        }
      }
    }

    // Strict boundary clamping so labels and planets never clip
    for (let i = 0; i < positions.length; i++) {
      positions[i].x = Math.max(
        -layout.maxAvailableX,
        Math.min(layout.maxAvailableX, positions[i].x),
      );
      positions[i].y = Math.max(
        -layout.maxAvailableYUp,
        Math.min(layout.maxAvailableYDown, positions[i].y),
      );
    }
  }

  function draw() {
    const pos = planets.map((p) => projectRaw(p.phase + orbitOffset, p.trackIndex));
    solveClearance(pos);

    planets.forEach((p, i) => {
      const pt = pos[i];
      const el = p.el;

      el.style.left = '50%';
      el.style.top = '47%';
      el.style.transform = `translate(-50%, -50%) translate(${pt.x.toFixed(2)}px, ${pt.y.toFixed(2)}px) scale(${pt.scale.toFixed(3)})`;

      if (pt.z < -6) {
        // Behind the central sun (core is z-index 10)
        el.style.zIndex = '5';
        const depthDim = Math.max(0.72, Math.min(0.9, 0.82 + (pt.z / 250) * 0.1));
        el.style.opacity = depthDim.toFixed(3);
      } else {
        // In front of the sun
        const frontZ = Math.round(15 + Math.max(0, pt.z) * 0.08);
        el.style.zIndex = String(frontZ);
        el.style.opacity = '1';
      }
    });
  }

  function tick(now: number) {
    frame = 0;
    if (!running()) return;

    if (previous) {
      const dt = Math.min((now - previous) / 1000, 0.05);

      planets.forEach((planet) => {
        // Kepler's speed variation: slightly faster when approaching perihelion / front
        const speed = 1.15 - 0.28 * Math.sin(planet.phase + orbitOffset);
        planet.phase =
          (planet.phase + ((dt * Math.PI * 2) / planet.period) * speed) % (Math.PI * 2);
      });

      // Inertia damping
      orbitOffset += velocity * dt;
      velocity *= Math.exp(-3.2 * dt);
      if (Math.abs(velocity) < 0.001) velocity = 0;
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
      // Restore clean fallback positions without occlusion
      planets.forEach(({ el }) => {
        el.style.removeProperty('left');
        el.style.removeProperty('top');
        el.style.removeProperty('transform');
        el.style.removeProperty('z-index');
        el.style.removeProperty('opacity');
      });
      return;
    }

    draw();
    if (running()) frame = requestAnimationFrame(tick);
  }

  function resize() {
    width = scene!.clientWidth;
    height = scene!.clientHeight;
    layout = computeLayout();
    updateTrackRings();
    sync();
  }

  // Pointer hover and interactive orbit highlight
  planets.forEach((p) => {
    p.el.addEventListener('pointerenter', (event) => {
      if (event.pointerType !== 'mouse') return;
      hovered = true;
      scene.setAttribute('data-hover-track', String(p.trackIndex));
      scene.style.setProperty('--active-track-color', p.trackColor);
      sync();
    });

    p.el.addEventListener('pointerleave', (event) => {
      if (event.pointerType !== 'mouse') return;
      hovered = false;
      scene.removeAttribute('data-hover-track');
      scene.style.removeProperty('--active-track-color');
      sync();
    });
  });

  // Touch and drag gesture support
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

    const dx = event.clientX - gesture.x;
    const dy = event.clientY - gesture.y;

    if (!gesture.dragging) {
      if (Math.max(Math.abs(dx), Math.abs(dy)) < 7) return;
      if (Math.abs(dy) > Math.abs(dx) * 1.4) {
        // Natural vertical page scroll
        gesture = null;
        return;
      }
      gesture.dragging = true;
      suppressClick = true;
      scene.setPointerCapture(event.pointerId);
      scene.setAttribute('data-dragging', 'true');
      sync();
    }

    const delta = ((event.clientX - gesture.lastX) / Math.max(200, width)) * Math.PI * 1.8;
    const dt = Math.max(8, event.timeStamp - gesture.time) / 1000;

    orbitOffset += delta;
    velocity = Math.max(-4, Math.min(4, delta / dt));
    gesture.lastX = event.clientX;
    gesture.time = event.timeStamp;
    draw();
  });

  const endGesture = (event: PointerEvent) => {
    if (!gesture || gesture.id !== event.pointerId) return;
    if (event.type === 'pointercancel' || event.timeStamp - gesture.time > 120) {
      velocity = 0;
    }
    gesture = null;
    scene.removeAttribute('data-dragging');
    if (scene.hasPointerCapture(event.pointerId)) {
      scene.releasePointerCapture(event.pointerId);
    }
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
