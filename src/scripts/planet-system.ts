/**
 * 3D orbit engine for the home hero.
 *
 * The planets live in a real 3D scene seen through a perspective camera: a planet swinging
 * toward the viewer grows, one passing behind the sun shrinks and is hidden by it. All of
 * them sit at evenly spaced angles and turn together, so they are spread around the sun
 * at every moment and can never bunch up or overlap. Their orbit sizes alternate near and
 * far, which keeps the system deep instead of flat.
 *
 * Everything chases its target with frame-rate independent exponential damping:
 *   time scale  eases to 0 on hover / focus / drag and back to 1 afterwards
 *   camera      pitch + roll follow the pointer (parallax), sway gently on touch screens and
 *               tilt toward edge-on as the hero scrolls away
 *   arrival     planets unfurl from the sun, staggered, when the scene first appears
 *   layout      the camera angle and scale are solved so the system fills any screen
 */

export interface TrackDef {
  /** Orbit size from 0 (just clear of the sun) to 1 (the outermost orbit). */
  reach: number;
  eccentricity: number;
  /** Orientation of the closest point of the orbit. */
  argPeriapsis: number;
}

/** Near and far orbits alternate around the circle, so neighbours never share a lane. */
export const ORBIT_TRACKS: TrackDef[] = [
  { reach: 0.55, eccentricity: 0.03, argPeriapsis: 0.2 },
  { reach: 1, eccentricity: 0.03, argPeriapsis: 1.1 },
  { reach: 0.2, eccentricity: 0.04, argPeriapsis: 2.0 },
  { reach: 0.82, eccentricity: 0.03, argPeriapsis: 2.9 },
  { reach: 0.38, eccentricity: 0.04, argPeriapsis: 3.8 },
  { reach: 0.96, eccentricity: 0.03, argPeriapsis: 4.6 },
  { reach: 0.0, eccentricity: 0.04, argPeriapsis: 5.4 },
];

const TAU = Math.PI * 2;
/** Seconds for one revolution of the whole system at time scale 1. */
const PERIOD = 80;
/** Outer orbit radius in layout units. */
const OUTER = 0.5;
/** Camera distance in layout units: small enough for strong near/far perspective. */
const CAMERA_DISTANCE = 1.65;

interface Camera {
  pitch: number; // Angle between the orbital plane and the line of sight (0 = edge-on)
  roll: number; // In-screen tilt of the whole system
}

interface Orbit {
  radius: number;
  eccentricity: number;
  argPeriapsis: number;
}

interface Projected {
  x: number;
  y: number;
  /** Depth toward the viewer, in layout units (positive = in front of the sun). */
  z: number;
  scale: number;
}

/** Frame-rate independent exponential smoothing toward a target. */
const approach = (value: number, target: number, rate: number, dt: number) =>
  target + (value - target) * Math.exp(-rate * dt);

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));
const easeOutExpo = (t: number) => (t >= 1 ? 1 : 1 - Math.pow(2, -10 * t));
const easeOutBack = (t: number) => {
  const c = 1.3;
  const u = t - 1;
  return 1 + (c + 1) * u * u * u + c * u * u;
};

/** Projects the point of `orbit` at orbital angle `angle` into scene pixels. */
function project(angle: number, orbit: Orbit, cam: Camera, unit: number, spread = 1): Projected {
  const e = orbit.eccentricity;
  const r = orbit.radius * spread * ((1 - e * e) / (1 + e * Math.cos(angle - orbit.argPeriapsis)));

  // Point on the orbital plane (x right, y away from the viewer).
  const px = Math.cos(angle) * r;
  const py = Math.sin(angle) * r;

  // Tip the plane toward the viewer by `pitch`: far points rise on screen.
  const sy = -py * Math.sin(cam.pitch);
  const z = -py * Math.cos(cam.pitch);
  const scale = CAMERA_DISTANCE / (CAMERA_DISTANCE - z);

  const cosR = Math.cos(cam.roll);
  const sinR = Math.sin(cam.roll);
  return {
    x: (px * cosR - sy * sinR) * scale * unit,
    y: (px * sinR + sy * cosR) * scale * unit,
    z,
    scale,
  };
}

export function initPlanetSystem(): void {
  const scene = document.querySelector<HTMLElement>('[data-planet-system]');
  if (!scene) return;

  const root = document.documentElement;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const finePointer = matchMedia('(hover: hover) and (pointer: fine)');

  const elements = [...scene.querySelectorAll<HTMLElement>('[data-planet]')];
  const count = Math.max(1, elements.length);
  const planets = elements.map((el, index) => {
    const def = ORBIT_TRACKS[index % ORBIT_TRACKS.length];
    return {
      el,
      index,
      def,
      orbit: { radius: OUTER, eccentricity: def.eccentricity, argPeriapsis: def.argPeriapsis },
      /** Fixed angular slot: planets are always 360° / count apart. */
      slot: -Math.PI / 2 - 0.35 + (index * TAU) / count,
      trackColor: el.dataset.trackColor || 'var(--gold)',
      size: Number(el.dataset.size) || 1,
      crowded: false,
      labelAlpha: 1,
      arrivalDelay: 0.15 + index * 0.09,
    };
  });

  /* ---------------------------------------------------------------- state */
  let width = 1;
  let height = 1;
  let unit = 1;
  let center = { x: 0, y: 0 };
  let basePitch = 0.5;
  let baseRoll = -0.12;
  let planetSize = 60;
  let sunSize = 120;

  const cam: Camera = { pitch: 0.5, roll: -0.12 };
  const camTarget = { pitchOffset: 0, rollOffset: 0, yaw: 0 };
  let yaw = 0; // Pointer-driven turn of the system toward the mouse
  let timeScale = 1;
  let rotation = 0; // Shared orbital angle of the whole system
  let velocity = 0; // Extra spin from dragging, decays with inertia
  let arrival = 0;
  let arrived = false;
  let idleClock = 0;
  let scrollTilt = 0;
  let scrollTiltTarget = 0;

  let frame = 0;
  let previous = 0;
  let visible = false;
  let hoveredTrack = -1;
  let focused = false;
  let lastCamKey = '';

  let gesture: {
    id: number;
    x: number;
    y: number;
    lastX: number;
    time: number;
    dragging: boolean;
    side: number;
  } | null = null;
  let suppressClick = false;
  const transitionNames = new Map<HTMLElement, string>();

  const motionEnabled = () => !reduced.matches && root.dataset.motion !== 'off';
  const paused = () => hoveredTrack >= 0 || focused || !!gesture?.dragging;
  const awake = () => motionEnabled() && visible && !document.hidden;

  /* --------------------------------------------------------------- layout */
  /**
   * Measures how big the system can be drawn with this camera. Projection is linear in
   * `unit`, so the outer orbit is sampled at unit 1 across the range the camera can move
   * through (pointer parallax, sway), and the result is scaled to the box.
   */
  function fit(pitch: number, roll: number, size: number) {
    const outer: Orbit = { radius: OUTER * 1.04, eccentricity: 0, argPeriapsis: 0 };
    let minX = 0;
    let maxX = 0;
    let minY = 0;
    let maxY = 0;
    let nearScale = 1;
    for (const p of [pitch - 0.11, pitch + 0.11]) {
      for (const r of [roll - 0.05, roll + 0.05]) {
        for (let i = 0; i < 64; i++) {
          const pt = project((i / 64) * TAU, outer, { pitch: p, roll: r }, 1);
          minX = Math.min(minX, pt.x);
          maxX = Math.max(maxX, pt.x);
          minY = Math.min(minY, pt.y);
          maxY = Math.max(maxY, pt.y);
          nearScale = Math.max(nearScale, pt.scale);
        }
      }
    }
    // Room for the planet itself (biggest when nearest) and its name below.
    const near = size * 0.5 * nearScale;
    const top = size * 0.42 + 8;
    const bottom = near + Math.max(24, size * 0.4);
    const side = near + 6;
    const unitX = (width - side * 2) / (maxX - minX);
    const unitY = (height - top - bottom) / (maxY - minY);
    const u = Math.max(40, Math.min(unitX, unitY));
    const cx = side + -minX * u + (width - side * 2 - (maxX - minX) * u) / 2;
    const cy = top + -minY * u + (height - top - bottom - (maxY - minY) * u) / 2;
    return { unit: u, cx, cy };
  }

  function measure() {
    width = scene!.clientWidth || 1;
    height = scene!.clientHeight || 1;
    const portrait = height > width * 0.9;

    // Search camera angles for the one that shows the system largest. Wide screens keep a
    // gentle in-screen tilt; tall screens may also tilt the plane diagonally, using the
    // long diagonal of a phone instead of its narrow width.
    const rolls = portrait ? [-0.08, -0.28, -0.48, -0.68] : [-0.12];
    const minPitch = 0.36;
    const maxPitch = portrait ? 1.2 : 0.9;
    planetSize = clamp(Math.min(width, height * 1.5) * 0.06, 40, 82);
    let pitch = minPitch;
    let roll = rolls[0];
    let best = fit(pitch, roll, planetSize);
    for (let attempt = 0; attempt < 2; attempt++) {
      const candidates: { pitch: number; roll: number; result: ReturnType<typeof fit> }[] = [];
      let max = 0;
      for (const r of rolls) {
        for (let p = minPitch; p <= maxPitch + 1e-6; p += 0.02) {
          const result = fit(p, r, planetSize);
          candidates.push({ pitch: p, roll: r, result });
          max = Math.max(max, result.unit);
        }
      }
      // Among near-best options take the steepest view (planets spread out the most);
      // on ties, the smaller tilt.
      const pick =
        candidates
          .filter((c) => c.result.unit >= max * 0.95)
          .sort((x, y) => y.pitch - x.pitch || Math.abs(x.roll) - Math.abs(y.roll))[0] ??
        candidates[0];
      pitch = pick.pitch;
      roll = pick.roll;
      best = pick.result;
      // Planets and sun grow with the system; fit once more with that size.
      planetSize = clamp(best.unit * 0.078, 40, 82);
    }

    basePitch = pitch;
    baseRoll = roll;
    unit = best.unit;
    center = { x: best.cx, y: best.cy };
    sunSize = clamp(unit * 0.32, Math.min(width * 0.36, height * 0.3, 145), 330);

    // Innermost orbit clears the sun plus a (near, enlarged) planet; the rest follow.
    const inner = Math.min(OUTER * 0.82, (sunSize * 0.5 + planetSize * 0.95) / unit);
    planets.forEach((p) => {
      p.orbit.radius = inner + (OUTER - inner) * p.def.reach;
    });

    scene!.style.setProperty('--planet-unit', `${planetSize.toFixed(1)}px`);
    scene!.style.setProperty('--sun-size', `${sunSize.toFixed(1)}px`);
    scene!.style.setProperty('--sun-x', `${center.x.toFixed(1)}px`);
    scene!.style.setProperty('--sun-y', `${center.y.toFixed(1)}px`);
  }

  /* -------------------------------------------------------------- planets */
  function planetSpread(index: number) {
    if (arrived) return 1;
    const t = clamp((arrival - planets[index].arrivalDelay) / 1.4, 0, 1);
    return 0.3 + 0.7 * easeOutBack(t);
  }

  function drawPlanets(dt: number) {
    const points = planets.map((p, index) =>
      project(p.slot + rotation + yaw, p.orbit, cam, unit, planetSpread(index)),
    );

    // Safety net for very small screens: if two names would touch, the farther one fades.
    planets.forEach((p) => (p.crowded = false));
    for (let i = 0; i < planets.length; i++) {
      for (let j = i + 1; j < planets.length; j++) {
        const a = points[i];
        const b = points[j];
        const reach = planetSize * 0.5 * (a.scale + b.scale);
        if (Math.abs(a.x - b.x) < reach * 1.5 && Math.abs(a.y - b.y) < reach * 0.95) {
          (a.z < b.z ? planets[i] : planets[j]).crowded = true;
        }
      }
    }

    planets.forEach((p, index) => {
      const pt = points[index];
      const el = p.el;
      p.labelAlpha = approach(p.labelAlpha, p.crowded ? 0.1 : 1, 7, dt);

      const depth = clamp(pt.z / (OUTER * Math.cos(cam.pitch)), -1, 1); // -1 far … 1 near
      const appear = arrived ? 1 : easeOutExpo(clamp((arrival - p.arrivalDelay) / 0.5, 0, 1));

      el.style.transform = `translate3d(${(center.x + pt.x).toFixed(2)}px, ${(center.y + pt.y).toFixed(2)}px, 0) translate(-50%, -50%)`;
      el.style.setProperty('--s', pt.scale.toFixed(4));
      el.style.setProperty('--depth', depth.toFixed(3));
      el.style.setProperty('--label', p.labelAlpha.toFixed(3));
      // Below the sun (z-index 10) when behind it, above it when in front; sorted by depth.
      el.style.zIndex = String(
        pt.z < 0 ? 2 + Math.round((depth + 1) * 3) : 20 + Math.round(depth * 30),
      );
      el.style.opacity = appear.toFixed(3);

      // Light comes from the sun: rotate the lit hemisphere toward the centre.
      const light = Math.atan2(-pt.y, -pt.x) * (180 / Math.PI) + 90;
      el.style.setProperty('--light', `${light.toFixed(1)}deg`);
    });
  }

  /* ----------------------------------------------------------------- loop */
  function step(dt: number) {
    if (!arrived) {
      arrival += dt;
      if (arrival > planets[planets.length - 1].arrivalDelay + 1.5) arrived = true;
    }

    const hold = paused();
    timeScale = approach(timeScale, hold ? 0 : 1, hold ? 6 : 1.6, dt);
    const advance = dt * timeScale;
    rotation += (advance * TAU) / PERIOD;

    if (!gesture?.dragging) {
      rotation += velocity * dt;
      velocity *= Math.exp(-2.4 * dt);
      if (Math.abs(velocity) < 0.002) velocity = 0;
    }
    rotation %= TAU;

    idleClock += advance;
    const sway = finePointer.matches ? 0 : Math.sin(idleClock * 0.3) * 0.03;
    scrollTilt = approach(scrollTilt, scrollTiltTarget, 6, dt);
    cam.pitch = approach(
      cam.pitch,
      basePitch + camTarget.pitchOffset + sway + scrollTilt * 0.2,
      3.5,
      dt,
    );
    cam.roll = approach(cam.roll, baseRoll + camTarget.rollOffset, 3.5, dt);
    yaw = approach(yaw, camTarget.yaw, 2.8, dt);

    render(dt);
  }

  function render(dt = 1) {
    drawPlanets(dt);
  }

  function cameraMoving() {
    const key = `${cam.pitch.toFixed(4)}${cam.roll.toFixed(4)}${scrollTilt.toFixed(4)}${yaw.toFixed(4)}`;
    const moving = key !== lastCamKey;
    lastCamKey = key;
    return moving;
  }

  function settled() {
    return arrived && paused() && timeScale < 0.002 && velocity === 0 && !cameraMoving();
  }

  function tick(now: number) {
    frame = 0;
    if (!awake()) return;
    const dt = previous ? Math.min((now - previous) / 1000, 1 / 20) : 1 / 60;
    previous = now;
    step(dt);
    // Keep easing until everything has come to rest, then sleep until something changes.
    if (!settled() || gesture?.dragging) frame = requestAnimationFrame(tick);
  }

  function wake() {
    if (!frame && awake()) {
      previous = 0;
      frame = requestAnimationFrame(tick);
    }
  }

  function sync() {
    scene!.dataset.motion = motionEnabled() ? 'live' : 'still';
    if (!motionEnabled()) {
      cancelAnimationFrame(frame);
      frame = 0;
      gesture = null;
      velocity = 0;
      arrived = true;
      cam.pitch = basePitch;
      cam.roll = baseRoll;
      camTarget.pitchOffset = camTarget.rollOffset = camTarget.yaw = 0;
      yaw = 0;
      planets.forEach(({ el }) => {
        for (const property of [
          'transform',
          'z-index',
          'opacity',
          '--s',
          '--depth',
          '--label',
          '--light',
        ])
          el.style.removeProperty(property);
      });
      return;
    }
    if (!frame) render(1);
    wake();
  }

  /* ---------------------------------------------------------- interaction */
  const highlight = (index: number, color: string) => {
    scene.dataset.hoverTrack = String(index);
    scene.style.setProperty('--active-track-color', color);
  };
  const clearHighlight = () => {
    delete scene.dataset.hoverTrack;
    scene.style.removeProperty('--active-track-color');
  };

  planets.forEach((p) => {
    p.el.addEventListener('pointerenter', (event) => {
      if (event.pointerType !== 'mouse') return;
      hoveredTrack = p.index;
      highlight(p.index, p.trackColor);
      wake();
    });
    p.el.addEventListener('pointerleave', (event) => {
      if (event.pointerType !== 'mouse') return;
      hoveredTrack = -1;
      clearHighlight();
      wake();
    });
    p.el.addEventListener('click', (event) => {
      if (
        suppressClick ||
        event.defaultPrevented ||
        !motionEnabled() ||
        !('startViewTransition' in document)
      )
        return;
      const slug = p.el.dataset.appSlug;
      const body = p.el.querySelector<HTMLElement>('.planet__body');
      if (!slug || !body) return;
      // Only the selected planet owns this name during the navigation snapshot.
      const name = `app-${slug}`;
      document.querySelectorAll<HTMLElement>('[style*="view-transition-name"]').forEach((el) => {
        if (el.style.viewTransitionName === name) {
          transitionNames.set(el, name);
          el.style.viewTransitionName = 'none';
        }
      });
      body.style.viewTransitionName = name;
    });
    p.el.addEventListener('focus', () => highlight(p.index, p.trackColor));
    p.el.addEventListener('blur', () => {
      if (hoveredTrack < 0) clearHighlight();
    });
  });

  // Pointer parallax across the whole hero.
  const hero = scene.closest('section') ?? scene;
  hero.addEventListener('pointermove', (event) => {
    if (
      event.pointerType !== 'mouse' ||
      !motionEnabled() ||
      hoveredTrack >= 0 ||
      focused ||
      gesture?.dragging
    )
      return;
    const box = scene.getBoundingClientRect();
    const nx = clamp(((event.clientX - box.left) / box.width) * 2 - 1, -1, 1);
    const ny = clamp(((event.clientY - box.top) / box.height) * 2 - 1, -1, 1);
    // Moving the mouse "looks around" the system: up/down tips the orbital plane, left/right
    // turns it toward the pointer and leans it a little, like a camera on a gimbal.
    camTarget.pitchOffset = ny * 0.1;
    camTarget.rollOffset = nx * 0.05;
    camTarget.yaw = -nx * 0.32;
    wake();
  });
  hero.addEventListener('pointerleave', () => {
    camTarget.pitchOffset = 0;
    camTarget.rollOffset = 0;
    camTarget.yaw = 0;
    wake();
  });

  // Scroll: tilt the system toward edge-on as the hero leaves the viewport.
  let scrollQueued = false;
  window.addEventListener(
    'scroll',
    () => {
      if (scrollQueued || !motionEnabled() || !visible) return;
      scrollQueued = true;
      requestAnimationFrame(() => {
        scrollQueued = false;
        const box = scene.getBoundingClientRect();
        const progress = clamp(-box.top / Math.max(1, box.height), 0, 1);
        scrollTiltTarget = -progress;
        scene.style.setProperty('--scroll', progress.toFixed(3));
        wake();
      });
    },
    { passive: true },
  );

  // Drag (mouse or touch) to spin the system, with inertia.
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
      side: event.clientY - scene.getBoundingClientRect().top < center.y ? 1 : -1,
    };
  });

  scene.addEventListener('pointermove', (event) => {
    if (!gesture || gesture.id !== event.pointerId) return;
    const dx = event.clientX - gesture.x;
    const dy = event.clientY - gesture.y;

    if (!gesture.dragging) {
      if (Math.max(Math.abs(dx), Math.abs(dy)) < 7) return;
      if (Math.abs(dy) > Math.abs(dx) * 1.2) {
        gesture = null; // Vertical swipe: let the page scroll
        return;
      }
      gesture.dragging = true;
      suppressClick = true;
      velocity = 0;
      scene.setPointerCapture(event.pointerId);
      scene.dataset.dragging = 'true';
      wake();
    }

    // Grab the near side and the system follows the finger, like turning a globe.
    const delta =
      ((event.clientX - gesture.lastX) / Math.max(200, unit * OUTER * 1.6)) * gesture.side;
    const elapsed = Math.max(8, event.timeStamp - gesture.time) / 1000;
    rotation += delta;
    velocity = clamp(approach(velocity, delta / elapsed, 18, elapsed), -4, 4);
    gesture.lastX = event.clientX;
    gesture.time = event.timeStamp;
  });

  const endGesture = (event: PointerEvent) => {
    if (!gesture || gesture.id !== event.pointerId) return;
    // A pause before release means the user stopped deliberately: no fling.
    if (event.type === 'pointercancel' || event.timeStamp - gesture.time > 90) velocity = 0;
    gesture = null;
    delete scene.dataset.dragging;
    if (scene.hasPointerCapture(event.pointerId)) scene.releasePointerCapture(event.pointerId);
    if (event.pointerType !== 'mouse') {
      hoveredTrack = -1;
      clearHighlight();
    }
    wake();
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
      }
      suppressClick = false;
    },
    true,
  );

  scene.addEventListener('focusin', () => {
    focused = !!scene.querySelector(':focus-visible');
    wake();
  });
  scene.addEventListener('focusout', () =>
    queueMicrotask(() => {
      focused = !!scene.querySelector(':focus-visible');
      wake();
    }),
  );

  /* ------------------------------------------------------------ lifecycle */
  new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
    if (!visible) {
      cancelAnimationFrame(frame);
      frame = 0;
      previous = 0;
    }
    sync();
  }).observe(scene);

  new ResizeObserver(() => {
    measure();
    if (!frame) render(1);
    sync();
  }).observe(scene);

  new MutationObserver(sync).observe(root, { attributes: true, attributeFilter: ['data-motion'] });
  reduced.addEventListener('change', sync);
  document.addEventListener('visibilitychange', sync);
  window.addEventListener('pageshow', () => {
    planets.forEach(({ el }) =>
      el.querySelector<HTMLElement>('.planet__body')?.style.removeProperty('view-transition-name'),
    );
    transitionNames.forEach((name, el) => {
      el.style.viewTransitionName = name;
    });
    transitionNames.clear();
    sync();
  });

  measure();
  cam.roll = baseRoll;
  // The intro starts from a steeper view and settles into place.
  cam.pitch = motionEnabled() ? basePitch + 0.3 : basePitch;
  if (!motionEnabled()) arrived = true;
  render(1);
  scene.dataset.ready = 'true';
  sync();
}
