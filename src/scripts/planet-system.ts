/**
 * 3D orbit engine for the home hero.
 *
 * The app planets share one circular orbit around the brand planet, evenly spaced, and are
 * seen through a perspective camera: a planet swinging toward the viewer grows, one on the
 * far side shrinks. The camera angle, the orbit size and the planet and brand-planet sizes
 * are solved for each screen so that no planet and no name ever crosses the brand planet or
 * a neighbour, at rest or mid-turn.
 *
 * The orbit presents one app and its download links in front. Dragging spins it with inertia and
 * it settles on the nearest app; focusing a planet with the keyboard turns it to the front;
 * arrow keys move between planets. Pointer movement tilts the camera (parallax).
 *
 * Only transforms and opacity change per frame, every write is cached, and the loop sleeps
 * whenever nothing moves.
 */

const TAU = Math.PI * 2;
/** Orbital angle of the point nearest the viewer. */
const FRONT = -Math.PI / 2;
/** Orbit radius in layout units. */
const OUTER = 0.5;
/** Camera distance in layout units: enough perspective for depth, not enough to distort. */
const CAMERA_DISTANCE = 2.3;
/** Angular frequency of the critically damped turn, in rad/s. */
const SPRING = 3.4;
/** Extra size of the app in front. */
const FEATURE_SCALE = 1.08;
const SAMPLE_COUNT = 48;
const SAMPLES = Array.from({ length: SAMPLE_COUNT }, (_, i) => (i / SAMPLE_COUNT) * TAU);

interface Camera {
  /** Angle between the orbital plane and the line of sight (0 = edge-on). */
  pitch: number;
  /** In-screen tilt of the whole system. */
  roll: number;
}

interface Projected {
  x: number;
  y: number;
  /** Depth toward the viewer, in layout units (positive = in front of the brand planet). */
  z: number;
  scale: number;
}

interface Box {
  left: number;
  right: number;
  top: number;
  bottom: number;
}

/** Frame-rate independent exponential smoothing toward a target. */
const approach = (value: number, target: number, rate: number, dt: number) =>
  target + (value - target) * Math.exp(-rate * dt);

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));
const smoothstep = (edge0: number, edge1: number, x: number) => {
  const t = clamp((x - edge0) / (edge1 - edge0), 0, 1);
  return t * t * (3 - 2 * t);
};
const easeOutExpo = (t: number) => (t >= 1 ? 1 : 1 - Math.pow(2, -10 * t));
const easeOutBack = (t: number) => {
  const c = 1.2;
  const u = t - 1;
  return 1 + (c + 1) * u * u * u + c * u * u;
};
/** Wraps an angle to [-π, π). */
const wrap = (angle: number) => ((((angle + Math.PI) % TAU) + TAU) % TAU) - Math.PI;

const intersects = (a: Box, b: Box) =>
  a.left < b.right && a.right > b.left && a.top < b.bottom && a.bottom > b.top;

/** Distance from the origin to the nearest point of a box. */
const boxDistance = (box: Box) =>
  Math.hypot(Math.max(box.left, 0, -box.right), Math.max(box.top, 0, -box.bottom));

/** Planet diameter for an orbit of radius `radius` px. */
const planetDiameter = (radius: number) => clamp(radius * 0.15, 42, 92);

/** Projects the point at orbital angle `angle` on a circle of `radius` layout units. */
function project(angle: number, radius: number, cam: Camera, unit: number): Projected {
  // Point on the orbital plane (x right, y away from the viewer).
  const px = Math.cos(angle) * radius;
  const py = Math.sin(angle) * radius;

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

  const caption = scene.querySelector<HTMLElement>('[data-orbit-caption]');
  const captionLink = caption?.querySelector<HTMLAnchorElement>('[data-caption-link]');
  const captionName = caption?.querySelector<HTMLElement>('[data-caption-name]') ?? null;
  const captionMeta = caption?.querySelector<HTMLElement>('[data-caption-meta]') ?? null;
  const downloadGroups = new Map(
    [...scene.querySelectorAll<HTMLElement>('[data-downloads-for]')].map((group) => [
      group.dataset.downloadsFor,
      group,
    ]),
  );

  const elements = [...scene.querySelectorAll<HTMLAnchorElement>('[data-planet]')];
  const count = Math.max(1, elements.length);
  const step = TAU / count;
  const planets = elements.map((el, index) => ({
    el,
    index,
    name: el.dataset.name ?? '',
    category: el.dataset.category ?? '',
    href: el.getAttribute('href') ?? '#',
    downloads: downloadGroups.get(el.dataset.appSlug),
    orb: el.querySelector<HTMLElement>('.planet__orb'),
    label: el.querySelector<HTMLElement>('.planet__label'),
    hover: 0,
    arrivalDelay: 0.25 + index * 0.08,
    /** Last values written to the DOM, so unchanged styles are never touched again. */
    written: {} as Record<string, string>,
  }));
  type Planet = (typeof planets)[number];

  /* ---------------------------------------------------------------- state */
  let width = 1;
  let height = 1;
  let unit = 1;
  let center = { x: 0, y: 0 };
  let basePitch = 0.6;
  let baseRoll = -0.1;
  let sunRatio = 0.24;
  let planetSize = 56;
  let labelWidth = 110;
  let labelHeight = 18;
  let captionWidth = 220;
  let captionHeight = 46;
  /** Narrow screens show only the caption of the app in front, not every name. */
  let compact = false;

  const cam: Camera = { pitch: basePitch, roll: baseRoll };
  const camTarget = { pitchOffset: 0, rollOffset: 0, yaw: 0 };
  let yaw = 0;
  let rotation = 0;
  let velocity = 0;
  let target = 0;
  let arrival = 0;
  let arrived = false;
  let scrollTilt = 0;
  let scrollTiltTarget = 0;

  let frame = 0;
  let previous = 0;
  let visible = false;
  let hovered = -1;
  let focusedIndex = -1;
  let featured = -1;
  /** Where the caption was painted before the engine ran (server-rendered, under the orbit). */
  let captionStart: { x: number; y: number } | null = null;
  let lastCamKey = '';
  let measuredSize = '';
  const sceneWritten: Record<string, string> = {};

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
  const awake = () => motionEnabled() && visible && !document.hidden;

  /** Index of the planet nearest the front for a given rotation. */
  const frontIndex = (rot: number) => ((Math.round(-rot / step) % count) + count) % count;
  /** Rotation that brings planet `index` to the front, nearest to `near`. */
  const alignedRotation = (index: number, near: number) => {
    const base = -index * step;
    return base + Math.round((near - base) / TAU) * TAU;
  };

  /* --------------------------------------------------------------- layout */
  /** Screen-space extent of everything at `u` px per layout unit, around the brand planet. */
  function extent(u: number, points: Projected[], front: boolean[], ratio: number): Box {
    const radius = OUTER * u;
    const planet = planetDiameter(radius);
    const sun = ratio * radius;
    const box = { left: -sun, right: sun, top: -sun, bottom: sun };
    points.forEach((p, i) => {
      const x = p.x * u;
      const y = p.y * u;
      const half = (planet / 2) * p.scale * (front[i] ? FEATURE_SCALE : 1);
      const textHalf = front[i] ? captionWidth / 2 : compact ? 0 : labelWidth / 2;
      const below = front[i] ? captionHeight + 8 : compact ? 0 : labelHeight + 4;
      box.left = Math.min(box.left, x - Math.max(half, textHalf));
      box.right = Math.max(box.right, x + Math.max(half, textHalf));
      box.top = Math.min(box.top, y - half);
      box.bottom = Math.max(box.bottom, y + half + below);
    });
    return box;
  }

  /** True when no planet or name touches the brand planet or another planet or name. */
  function clear(u: number, cam: Camera, ratio: number, points: Projected[], front: boolean[]) {
    const radius = OUTER * u;
    const planet = planetDiameter(radius);
    const sun = ratio * radius;
    const gap = Math.max(10, radius * 0.035);

    // Every position on the orbit: the planet and the name below it stay off the brand planet.
    for (let i = 0; i < points.length; i++) {
      const p = points[i];
      const x = p.x * u;
      const y = p.y * u;
      const half = (planet / 2) * p.scale * (front[i] ? FEATURE_SCALE : 1);
      const body = { left: x - half, right: x + half, top: y - half, bottom: y + half };
      if (boxDistance(body) < sun + gap) return false;
      if (compact && !front[i]) continue;
      const textHalf = (front[i] ? captionWidth : labelWidth) / 2;
      const top = y + half + 4;
      const text = {
        left: x - textHalf,
        right: x + textHalf,
        top,
        bottom: top + (front[i] ? captionHeight : labelHeight),
      };
      if (boxDistance(text) < sun + 6) return false;
    }

    // Neighbours, at rest and halfway through a turn.
    for (const offset of [0, step / 2]) {
      const boxes = planets.map((_, i) => {
        const p = project(FRONT + i * step + offset, OUTER, cam, u);
        const isFront = offset === 0 && i === 0;
        const half = (planet / 2) * p.scale * (isFront ? FEATURE_SCALE : 1);
        const textHalf = isFront ? captionWidth / 2 : compact ? 0 : labelWidth / 2;
        const top = p.y + half + 4;
        const textHeight = isFront ? captionHeight : compact ? 0 : labelHeight;
        return {
          body: { left: p.x - half, right: p.x + half, top: p.y - half, bottom: p.y + half },
          text: { left: p.x - textHalf, right: p.x + textHalf, top, bottom: top + textHeight },
        };
      });
      for (let i = 0; i < boxes.length; i++) {
        for (let j = 0; j < boxes.length; j++) {
          if (i === j) continue;
          const a = boxes[i];
          const b = boxes[j];
          const padded = {
            left: b.body.left - 6,
            right: b.body.right + 6,
            top: b.body.top - 6,
            bottom: b.body.bottom + 6,
          };
          if (j > i && intersects(a.body, padded)) return false;
          if (intersects(a.text, b.body)) return false;
          if (j > i && intersects(a.text, b.text)) return false;
        }
      }
    }
    return true;
  }

  /**
   * Solves the camera angle, orbit size and brand-planet size that show the system largest
   * on this screen while keeping it clear. Wide screens keep a gentle in-screen tilt; tall
   * screens may tilt the plane diagonally to use the long diagonal of a phone.
   */
  function measure() {
    width = scene!.clientWidth || 1;
    height = scene!.clientHeight || 1;
    measuredSize = `${width}x${height}`;
    compact = width < 600 || height < 420;
    const portrait = height > width * 0.9;
    const rolls = portrait ? [0, -0.3, -0.55] : [-0.1];
    const ratios = [0.27, 0.235, 0.2, 0.17];
    const margin = 10;
    const maxW = width - margin * 2;
    const maxH = height - margin * 2;

    type Candidate = { pitch: number; roll: number; ratio: number; unit: number; box: Box };
    let best: (Candidate & { score: number }) | null = null;
    let fallback: Candidate | null = null;

    for (const roll of rolls) {
      for (let pitch = portrait ? 0.66 : 0.34; pitch <= 1.3 + 1e-6; pitch += 0.04) {
        const camera = { pitch, roll };
        // Slightly inflated orbit: room for pointer parallax.
        const points = SAMPLES.map((a) => project(a, OUTER * 1.03, camera, 1));
        // The caption shows only near the front (it fades out within half a step).
        const front = SAMPLES.map((a) => Math.abs(wrap(a - FRONT)) < step * 0.22);
        for (const ratio of ratios) {
          let lo = 40;
          let hi = Math.max(width, height) * 4;
          let box = extent(lo, points, front, ratio);
          if (box.right - box.left > maxW || box.bottom - box.top > maxH) continue;
          for (let k = 0; k < 18; k++) {
            const mid = (lo + hi) / 2;
            const b = extent(mid, points, front, ratio);
            if (b.right - b.left <= maxW && b.bottom - b.top <= maxH) {
              lo = mid;
              box = b;
            } else hi = mid;
          }
          const candidate = { pitch, roll, ratio, unit: lo, box };
          if (!fallback || candidate.unit > fallback.unit) fallback = candidate;
          if (!clear(lo, camera, ratio, points, front)) continue;
          // Bigger is better, and a bigger brand planet counts. Steeper views must win
          // clearly, so the most cinematic (shallowest) angle that works is kept.
          const score = lo * (0.62 + ratio);
          if (!best || score > best.score * 1.02) best = { ...candidate, score };
        }
      }
    }

    const pick = best ?? fallback;
    if (!pick) return;
    basePitch = pick.pitch;
    baseRoll = pick.roll;
    sunRatio = pick.ratio;
    unit = pick.unit;
    const { box } = pick;
    center = {
      x: margin + (maxW - (box.right - box.left)) / 2 - box.left,
      y: margin + (maxH - (box.bottom - box.top)) / 2 - box.top,
    };
    const radius = OUTER * unit;
    planetSize = planetDiameter(radius);

    scene!.style.setProperty('--planet-unit', `${planetSize.toFixed(1)}px`);
    scene!.style.setProperty('--sun-size', `${(sunRatio * radius * 2).toFixed(1)}px`);
    scene!.style.setProperty('--sun-x', `${center.x.toFixed(1)}px`);
    scene!.style.setProperty('--sun-y', `${center.y.toFixed(1)}px`);
    lastCamKey = '';
  }

  /** Reads the real size of the names and the caption (after web fonts load). */
  function measureText() {
    const before = `${labelWidth}|${labelHeight}|${captionWidth}|${captionHeight}`;
    let w = 0;
    let h = 0;
    planets.forEach((p) => {
      if (!p.label) return;
      w = Math.max(w, p.label.offsetWidth);
      h = Math.max(h, p.label.offsetHeight);
    });
    if (w && h) {
      labelWidth = w + 8;
      labelHeight = h;
    }
    if (caption && captionName && captionMeta) {
      const shown = { name: captionName.textContent, meta: captionMeta.textContent };
      let cw = 0;
      let ch = 0;
      planets.forEach((p) => {
        captionName.textContent = p.name;
        captionMeta.textContent = p.category;
        cw = Math.max(cw, caption.offsetWidth);
        ch = Math.max(ch, caption.offsetHeight);
      });
      captionName.textContent = shown.name;
      captionMeta.textContent = shown.meta;
      if (cw && ch) {
        captionWidth = cw + 8;
        captionHeight = ch;
      }
    }
    return before !== `${labelWidth}|${labelHeight}|${captionWidth}|${captionHeight}`;
  }

  /* -------------------------------------------------------------- drawing */
  function write(cache: Record<string, string>, key: string, value: string, apply: () => void) {
    if (cache[key] === value) return;
    cache[key] = value;
    apply();
  }

  function spread(p: Planet) {
    if (arrived) return 1;
    const t = clamp((arrival - p.arrivalDelay) / 1.3, 0, 1);
    return 0.3 + 0.7 * easeOutBack(t);
  }

  function render() {
    const lead = frontIndex(rotation);
    const offset = Math.abs(wrap(rotation - alignedRotation(lead, rotation))) / (step / 2);
    // The first app's name lands with it, early in the intro.
    // The caption shows only near the front; the small name takes over once it has gone,
    // so the two never overlap. During the intro it stays up: it was painted with the page
    // and glides from there to its place under the first app.
    const holding = !arrived && !!captionStart && !gesture?.dragging;
    const captionAlpha = holding
      ? 1
      : (arrived ? 1 : smoothstep(0.15, 0.7, arrival)) * (1 - smoothstep(0.12, 0.42, offset));
    const leadNameHidden = 1 - smoothstep(0.42, 0.64, offset);

    if (lead !== featured) {
      if (featured >= 0) {
        const previous = planets[featured];
        previous.el.removeAttribute('aria-current');
        if (previous.downloads) previous.downloads.inert = true;
      }
      featured = lead;
      const p = planets[lead];
      p.el.setAttribute('aria-current', 'true');
      if (p.downloads) p.downloads.inert = false;
      if (captionLink && captionName && captionMeta) {
        captionName.textContent = p.name;
        captionMeta.textContent = p.category;
        captionLink.href = p.href;
      }
    }

    planets.forEach((p, index) => {
      const pt = project(FRONT + index * step + rotation + yaw, OUTER * spread(p), cam, unit);
      const depth = clamp(pt.z / (OUTER * Math.cos(cam.pitch) || 1), -1, 1); // -1 far … 1 near
      const feature = index === lead ? captionAlpha : 0;
      const emphasis = Math.max(feature, p.hover);
      const size = pt.scale * (1 + (FEATURE_SCALE - 1) * emphasis);
      const appear = arrived ? 1 : easeOutExpo(clamp((arrival - p.arrivalDelay) / 0.6, 0, 1));
      const x = center.x + pt.x;
      const y = center.y + pt.y;

      // Position, size and depth order: transforms only, on the compositor.
      const position = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0) translate(-50%, -50%)`;
      write(p.written, 'position', position, () => (p.el.style.transform = position));
      write(p.written, 'scale', size.toFixed(4), () => {
        if (p.orb) p.orb.style.transform = `scale(${size.toFixed(4)})`;
      });
      const labelOffset = ((planetSize / 2) * size + 4).toFixed(1);
      write(p.written, 'labelY', labelOffset, () => {
        if (p.label) p.label.style.transform = `translate(-50%, ${labelOffset}px)`;
      });
      // Far apps pass behind the brand planet.
      write(
        p.written,
        'z',
        String(pt.z < 0 ? 5 + Math.round((depth + 1) * 1.5) : 20 + Math.round(depth * 30)),
        () => (p.el.style.zIndex = p.written.z),
      );
      write(
        p.written,
        'opacity',
        appear.toFixed(2),
        () => (p.el.style.opacity = p.written.opacity),
      );
      // The name under the planet hands over to the caption when the app comes to the front.
      const labelAlpha = compact
        ? 0
        : (0.58 + 0.42 * ((depth + 1) / 2) + 0.4 * p.hover) *
          (1 - (index === lead ? leadNameHidden : 0));
      write(p.written, 'label', clamp(labelAlpha, 0, 1).toFixed(2), () => {
        if (p.label) p.label.style.opacity = p.written.label;
      });

      if (index === lead && caption) {
        let cx = x;
        let top = y + (planetSize / 2) * size + 8;
        if (holding && captionStart) {
          // Head for where the app will rest (its full orbit), not where it is mid-unfurl.
          const rest = project(FRONT + index * step + rotation + yaw, OUTER, cam, unit);
          const k = easeOutExpo(clamp(arrival / 1.1, 0, 1));
          cx = captionStart.x + (center.x + rest.x - captionStart.x) * k;
          const restTop = center.y + rest.y + (planetSize / 2) * rest.scale * FEATURE_SCALE + 8;
          top = captionStart.y + (restTop - captionStart.y) * k;
        }
        const place = `translate3d(${cx.toFixed(1)}px, ${top.toFixed(1)}px, 0) translate(-50%, 0)`;
        write(sceneWritten, 'captionAt', place, () => (caption.style.transform = place));
        write(sceneWritten, 'caption', captionAlpha.toFixed(2), () => {
          caption.style.opacity = sceneWritten.caption;
          caption.inert = captionAlpha <= 0.6;
        });
      }
    });
  }

  /* ----------------------------------------------------------------- loop */
  function stepFrame(dt: number) {
    if (!arrived) {
      arrival += dt;
      if (arrival > planets[planets.length - 1].arrivalDelay + 1.5) arrived = true;
    }

    if (!gesture?.dragging) {
      // Critically damped spring toward the target rotation (sub-stepped for stability).
      let remaining = dt;
      while (remaining > 1e-6) {
        const h = Math.min(remaining, 1 / 120);
        const accel = -SPRING * SPRING * (rotation - target) - 2 * SPRING * velocity;
        velocity += accel * h;
        rotation += velocity * h;
        remaining -= h;
      }
      if (Math.abs(rotation - target) < 5e-4 && Math.abs(velocity) < 3e-3) {
        rotation = target;
        velocity = 0;
      }
      // Keep the numbers small without changing the picture.
      if (Math.abs(target) > TAU * 4) {
        const shift = Math.round(target / TAU) * TAU;
        target -= shift;
        rotation -= shift;
      }
    }

    planets.forEach((p) => {
      p.hover = approach(p.hover, p.index === hovered ? 1 : 0, 10, dt);
      if (Math.abs(p.hover - (p.index === hovered ? 1 : 0)) < 0.002)
        p.hover = p.index === hovered ? 1 : 0;
    });

    scrollTilt = approach(scrollTilt, scrollTiltTarget, 6, dt);
    cam.pitch = approach(cam.pitch, basePitch + camTarget.pitchOffset + scrollTilt * 0.18, 3.5, dt);
    cam.roll = approach(cam.roll, baseRoll + camTarget.rollOffset, 3.5, dt);
    yaw = approach(yaw, camTarget.yaw, 2.8, dt);

    render();
  }

  function cameraMoving() {
    const key = `${cam.pitch.toFixed(4)}${cam.roll.toFixed(4)}${yaw.toFixed(4)}`;
    const moving = key !== lastCamKey;
    lastCamKey = key;
    return moving;
  }

  function settled() {
    return (
      arrived &&
      !gesture?.dragging &&
      rotation === target &&
      velocity === 0 &&
      planets.every((p) => p.hover === 0 || p.hover === 1) &&
      !cameraMoving()
    );
  }

  function tick(now: number) {
    frame = 0;
    if (!awake()) return;
    const dt = previous ? Math.min((now - previous) / 1000, 1 / 20) : 1 / 60;
    previous = now;
    stepFrame(dt);
    if (!settled()) frame = requestAnimationFrame(tick);
  }

  function wake() {
    if (!frame && awake()) {
      previous = 0;
      frame = requestAnimationFrame(tick);
    }
  }

  /** Turns planet `index` to the front. */
  function bringToFront(index: number) {
    target = alignedRotation(index, rotation);
    if (motionEnabled()) wake();
    else {
      rotation = target;
      velocity = 0;
      render();
    }
  }

  // Listen only where orientation arrives without a permission request. Values stay on
  // device, are calibrated to the first reading, and are used only while the hero is visible.
  const coarsePointer = matchMedia('(pointer: coarse)');
  const orientationApi = window.DeviceOrientationEvent as
    | (typeof DeviceOrientationEvent & { requestPermission?: () => Promise<PermissionState> })
    | undefined;
  const passiveSensor =
    window.isSecureContext &&
    !!orientationApi &&
    typeof orientationApi.requestPermission !== 'function';
  let sensorListening = false;
  let sensorOrigin: { beta: number; gamma: number } | null = null;
  const resetSensor = () => {
    sensorOrigin = null;
  };
  const angleDelta = (value: number, origin: number) => ((value - origin + 540) % 360) - 180;
  const onOrientation = (event: DeviceOrientationEvent) => {
    if (
      !awake() ||
      focusedIndex >= 0 ||
      gesture ||
      event.beta == null ||
      event.gamma == null ||
      !Number.isFinite(event.beta) ||
      !Number.isFinite(event.gamma)
    )
      return;
    if (!sensorOrigin) {
      sensorOrigin = { beta: event.beta, gamma: event.gamma };
      return;
    }
    const beta = angleDelta(event.beta, sensorOrigin.beta);
    const gamma = angleDelta(event.gamma, sensorOrigin.gamma);
    const orientation = ((screen.orientation?.angle ?? 0) * Math.PI) / 180;
    const horizontal = gamma * Math.cos(orientation) + beta * Math.sin(orientation);
    const vertical = beta * Math.cos(orientation) - gamma * Math.sin(orientation);
    const x = clamp(horizontal / 25, -1, 1);
    const y = clamp(vertical / 25, -1, 1);
    camTarget.pitchOffset = y * 0.05;
    camTarget.rollOffset = x * 0.03;
    camTarget.yaw = -x * 0.14;
    wake();
  };
  const syncSensor = () => {
    const shouldListen = passiveSensor && coarsePointer.matches && awake();
    if (shouldListen === sensorListening) return;
    sensorListening = shouldListen;
    resetSensor();
    if (shouldListen)
      window.addEventListener('deviceorientation', onOrientation, { passive: true });
    else {
      window.removeEventListener('deviceorientation', onOrientation);
      camTarget.pitchOffset = camTarget.rollOffset = camTarget.yaw = 0;
    }
  };
  screen.orientation?.addEventListener('change', resetSensor);
  coarsePointer.addEventListener('change', syncSensor);

  function sync() {
    scene!.dataset.motion = motionEnabled() ? 'live' : 'still';
    syncSensor();
    if (!motionEnabled()) {
      cancelAnimationFrame(frame);
      frame = 0;
      gesture = null;
      arrived = true;
      velocity = 0;
      rotation = target;
      cam.pitch = basePitch;
      cam.roll = baseRoll;
      camTarget.pitchOffset = camTarget.rollOffset = camTarget.yaw = 0;
      yaw = 0;
      planets.forEach((p) => (p.hover = p.index === hovered ? 1 : 0));
      // Reduced motion keeps the composed, overlap-free layout: one still frame, no loop.
      render();
      return;
    }
    if (!awake()) return;
    if (!frame) render();
    wake();
  }

  /* ---------------------------------------------------------- interaction */
  planets.forEach((p) => {
    p.el.addEventListener('pointerenter', (event) => {
      if (event.pointerType !== 'mouse') return;
      hovered = p.index;
      if (motionEnabled()) wake();
      else sync();
    });
    p.el.addEventListener('pointerleave', (event) => {
      if (event.pointerType !== 'mouse') return;
      if (hovered === p.index) hovered = -1;
      if (motionEnabled()) wake();
      else sync();
    });
    p.el.addEventListener('click', (event) => {
      if (
        !suppressClick &&
        !event.defaultPrevented &&
        event.detail > 0 &&
        !event.metaKey &&
        !event.ctrlKey &&
        !event.shiftKey &&
        !event.altKey &&
        p.index !== featured &&
        p.downloads?.childElementCount
      ) {
        event.preventDefault();
        bringToFront(p.index);
        return;
      }
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
  });

  // Keyboard: focusing a planet turns it to the front; arrow keys move between planets.
  scene.addEventListener('focusin', (event) => {
    const index = planets.findIndex((p) => p.el === event.target);
    if (index < 0 || !(event.target as HTMLElement).matches(':focus-visible')) return;
    focusedIndex = index;
    bringToFront(index);
  });
  scene.addEventListener('focusout', () =>
    queueMicrotask(() => {
      if (scene.contains(document.activeElement)) return;
      focusedIndex = -1;
      if (motionEnabled()) wake();
    }),
  );
  scene.addEventListener('keydown', (event) => {
    if (event.key !== 'ArrowRight' && event.key !== 'ArrowLeft') return;
    const index = planets.findIndex((p) => p.el === document.activeElement);
    if (index < 0) return;
    event.preventDefault();
    const next = (index + (event.key === 'ArrowRight' ? 1 : -1) + count) % count;
    planets[next].el.focus();
  });

  // Pointer parallax across the whole hero.
  const hero = scene.closest('section') ?? scene;
  hero.addEventListener('pointermove', (event) => {
    if (
      event.pointerType !== 'mouse' ||
      !motionEnabled() ||
      hovered >= 0 ||
      gesture?.dragging ||
      caption?.contains(event.target as Node)
    )
      return;
    const box = scene.getBoundingClientRect();
    const nx = clamp(((event.clientX - box.left) / box.width) * 2 - 1, -1, 1);
    const ny = clamp(((event.clientY - box.top) / box.height) * 2 - 1, -1, 1);
    // Moving the mouse "looks around" the system: up/down tips the orbital plane, left/right
    // turns it toward the pointer and leans it a little, like a camera on a gimbal.
    camTarget.pitchOffset = ny * 0.06;
    camTarget.rollOffset = nx * 0.03;
    camTarget.yaw = -nx * 0.16;
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
        write(sceneWritten, 'scroll', progress.toFixed(3), () =>
          scene.style.setProperty('--scroll', sceneWritten.scroll),
        );
        wake();
      });
    },
    { passive: true },
  );

  // Drag (mouse or touch) to spin the system, with inertia; it settles on the nearest app.
  scene.addEventListener('dragstart', (event) => event.preventDefault());

  scene.addEventListener('pointerdown', (event) => {
    if (
      !event.isPrimary ||
      event.button !== 0 ||
      !motionEnabled() ||
      caption?.contains(event.target as Node)
    )
      return;
    suppressClick = false;
    const top = scene.getBoundingClientRect().top;
    gesture = {
      id: event.pointerId,
      x: event.clientX,
      y: event.clientY,
      lastX: event.clientX,
      time: event.timeStamp,
      dragging: false,
      // Below the centre the near side follows the finger; above it, the far side does.
      side: event.clientY - top > center.y ? 1 : -1,
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

    const delta = ((event.clientX - gesture.lastX) / Math.max(120, OUTER * unit)) * gesture.side;
    const elapsed = Math.max(8, event.timeStamp - gesture.time) / 1000;
    rotation += delta;
    target = rotation;
    velocity = clamp(approach(velocity, delta / elapsed, 18, elapsed), -6, 6);
    gesture.lastX = event.clientX;
    gesture.time = event.timeStamp;
  });

  const endGesture = (event: PointerEvent) => {
    if (!gesture || gesture.id !== event.pointerId) return;
    const wasDragging = gesture.dragging;
    // A pause before release means the user stopped deliberately: no fling.
    if (event.type === 'pointercancel' || event.timeStamp - gesture.time > 90) velocity = 0;
    gesture = null;
    delete scene.dataset.dragging;
    if (scene.hasPointerCapture(event.pointerId)) scene.releasePointerCapture(event.pointerId);
    if (event.pointerType !== 'mouse') hovered = -1;
    if (wasDragging) {
      // Where the fling would coast to, rounded to the nearest app.
      const coast = rotation + velocity * 0.32;
      target = alignedRotation(frontIndex(coast), coast);
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
    // The first callback reports the size measured at start-up: nothing to redo.
    if (`${scene.clientWidth || 1}x${scene.clientHeight || 1}` === measuredSize) return;
    measureText();
    measure();
    if (!frame) render();
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

  if (caption && motionEnabled()) {
    const box = caption.getBoundingClientRect();
    const area = scene.getBoundingClientRect();
    if (box.width)
      captionStart = { x: box.left + box.width / 2 - area.left, y: box.top - area.top };
  }
  measureText();
  document.fonts?.ready.then(() => {
    if (!measureText()) return;
    measure();
    if (!frame) render();
  });
  measure();
  cam.roll = baseRoll;
  if (motionEnabled()) {
    // The intro: the system swirls in from a steeper angle and settles on the first app.
    cam.pitch = basePitch + 0.35;
    rotation = 0.25;
  } else {
    cam.pitch = basePitch;
    arrived = true;
  }
  render();
  scene.dataset.ready = 'true';
  sync();
}
