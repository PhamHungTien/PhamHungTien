/**
 * Edge refraction for glass surfaces.
 *
 * Apple's material bends what is behind it at its curved edges. On the web that needs an SVG
 * filter inside backdrop-filter: a displacement map shifts backdrop pixels near the edge, as
 * if seen through the rim of a lens. Only Chromium renders url() in backdrop-filter (Firefox
 * accepts the value and draws nothing, Safari ignores it), so it is enabled for Chromium
 * alone; everywhere else the CSS material supplies tint and a specular rim.
 * Cards keep the backdrop sharp. Reduced transparency and increased contrast turn the lens off.
 *
 * Each surface gets a map drawn for its own size and corner radius, redrawn when it resizes.
 */

const SVG_NS = 'http://www.w3.org/2000/svg';
const MAX_MAP_PIXELS = 90_000;
const surfaceSelector = '[data-lens], .glass-card, .button--primary';

function supported() {
  const ua = navigator.userAgent;
  // Chromium on any platform; not Safari, not Firefox, not Chrome on iOS (WebKit).
  return (
    /Chrome\/\d+/.test(ua) &&
    !/\b(?:Firefox|FxiOS|CriOS)\//.test(ua) &&
    CSS.supports('backdrop-filter', 'url(#a) blur(1px)')
  );
}

/**
 * Displacement map for a rounded rectangle: inside a bezel along the edge, each pixel points
 * along the edge normal, strongest at the edge and fading inward. Red is x, green is y,
 * 128 is no shift.
 */
function drawMap(width: number, height: number, radius: number, bezel: number) {
  const scale = Math.min(0.65, Math.sqrt(MAX_MAP_PIXELS / (width * height)));
  const w = Math.max(2, Math.round(width * scale));
  const h = Math.max(2, Math.round(height * scale));
  const canvas = document.createElement('canvas');
  canvas.width = w;
  canvas.height = h;
  const context = canvas.getContext('2d');
  if (!context) return '';
  const image = context.createImageData(w, h);
  const data = image.data;
  const r = Math.min(radius, width / 2, height / 2);
  const halfW = width / 2;
  const halfH = height / 2;

  for (let j = 0; j < h; j++) {
    const y = ((j + 0.5) * height) / h;
    for (let i = 0; i < w; i++) {
      const x = ((i + 0.5) * width) / w;
      const dx = x - halfW;
      const dy = y - halfH;
      // Signed distance to the rounded rectangle (negative inside).
      const qx = Math.abs(dx) - (halfW - r);
      const qy = Math.abs(dy) - (halfH - r);
      const outside = Math.hypot(Math.max(qx, 0), Math.max(qy, 0));
      const inside = Math.min(Math.max(qx, qy), 0);
      const depth = r - outside - inside; // distance from the edge, inward
      let nx = 0;
      let ny = 0;
      let strength = 0;
      if (depth > 0 && depth < bezel) {
        if (qx > 0 && qy > 0) {
          const len = Math.hypot(qx, qy) || 1;
          nx = (qx / len) * Math.sign(dx);
          ny = (qy / len) * Math.sign(dy);
        } else if (qx > qy) nx = Math.sign(dx);
        else ny = Math.sign(dy);
        // A curved edge rolls off smoothly into a flat centre.
        strength = Math.cos((depth / bezel) * (Math.PI / 2)) ** 2;
      }
      const k = (j * w + i) * 4;
      // Sample inward, so the rim shows the backdrop pulled from inside the shape.
      data[k] = Math.round(128 - nx * strength * 127);
      data[k + 1] = Math.round(128 - ny * strength * 127);
      data[k + 2] = 128;
      data[k + 3] = 255;
    }
  }
  context.putImageData(image, 0, 0);
  return canvas.toDataURL('image/png');
}

export function initLiquidGlass(): void {
  if (!supported()) return;

  const lessTransparency = matchMedia(
    '(prefers-reduced-transparency: reduce), (prefers-contrast: more), (forced-colors: active)',
  );

  const svg = document.createElementNS(SVG_NS, 'svg');
  svg.setAttribute('aria-hidden', 'true');
  svg.setAttribute('width', '0');
  svg.setAttribute('height', '0');
  svg.style.position = 'absolute';
  svg.style.pointerEvents = 'none';
  document.body.append(svg);

  const surfaces = new Map<HTMLElement, { id: string; key: string; visible: boolean }>();
  let counter = 0;

  function apply(el: HTMLElement) {
    const entry = surfaces.get(el);
    if (!entry) return;
    const width = el.offsetWidth;
    const height = el.offsetHeight;
    if (lessTransparency.matches || !entry.visible || !width || !height) {
      el.style.removeProperty('backdrop-filter');
      return;
    }
    const radius = Math.min(
      parseFloat(getComputedStyle(el).borderTopLeftRadius) || 0,
      width / 2,
      height / 2,
    );
    // A narrow rim, like Apple's: the bend lives in the last few pixels of the edge.
    const bezel = Math.max(7, Math.min(radius * 0.58, height * 0.25, 18));
    const key = `${width}x${height}r${radius.toFixed(1)}`;
    if (entry.key !== key) {
      entry.key = key;
      let filter = svg.querySelector<SVGFilterElement>(`#${entry.id}`);
      if (!filter) {
        filter = document.createElementNS(SVG_NS, 'filter');
        filter.id = entry.id;
        filter.setAttribute('color-interpolation-filters', 'sRGB');
        filter.setAttribute('filterUnits', 'userSpaceOnUse');
        filter.setAttribute('primitiveUnits', 'userSpaceOnUse');
        const map = document.createElementNS(SVG_NS, 'feImage');
        map.setAttribute('result', 'map');
        map.setAttribute('color-interpolation-filters', 'sRGB');
        map.setAttribute('preserveAspectRatio', 'none');
        const displace = document.createElementNS(SVG_NS, 'feDisplacementMap');
        displace.setAttribute('in', 'SourceGraphic');
        displace.setAttribute('in2', 'map');
        displace.setAttribute('xChannelSelector', 'R');
        displace.setAttribute('yChannelSelector', 'G');
        displace.setAttribute('color-interpolation-filters', 'sRGB');
        filter.append(map, displace);
        svg.append(filter);
      }
      for (const [name, value] of [
        ['x', '0'],
        ['y', '0'],
        ['width', String(width)],
        ['height', String(height)],
      ]) {
        filter.setAttribute(name, value);
      }
      const map = filter.querySelector('feImage')!;
      map.setAttribute('x', '0');
      map.setAttribute('y', '0');
      map.setAttribute('width', String(width));
      map.setAttribute('height', String(height));
      map.setAttribute('href', drawMap(width, height, radius, bezel));
      filter
        .querySelector('feDisplacementMap')!
        .setAttribute('scale', String(Math.round(bezel * 1.65)));
    }
    el.style.setProperty(
      'backdrop-filter',
      `var(--glass-lens-base, blur(4px) saturate(165%)) url(#${entry.id})`,
    );
  }

  const resized = new ResizeObserver((entries) => {
    for (const { target } of entries) apply(target as HTMLElement);
  });
  const nearby = new IntersectionObserver(
    (entries) => {
      for (const { target, isIntersecting } of entries) {
        const element = target as HTMLElement;
        const entry = surfaces.get(element);
        if (!entry) continue;
        entry.visible = isIntersecting;
        apply(element);
      }
    },
    { rootMargin: '96px' },
  );

  const observe = (el: HTMLElement) => {
    if (surfaces.has(el)) return;
    surfaces.set(el, { id: `liquid-glass-${counter++}`, key: '', visible: false });
    resized.observe(el);
    nearby.observe(el);
  };
  document.querySelectorAll<HTMLElement>(surfaceSelector).forEach(observe);

  const community = document.querySelector('[data-tab-panel="community"]');
  if (community) {
    // Discussions render after hydration and replace cards when a filter changes.
    new MutationObserver((changes) => {
      for (const { addedNodes } of changes) {
        for (const node of addedNodes) {
          if (!(node instanceof HTMLElement) || !node.isConnected) continue;
          if (node.matches(surfaceSelector)) observe(node);
          node.querySelectorAll<HTMLElement>(surfaceSelector).forEach(observe);
        }
      }
      if (changes.some(({ removedNodes }) => removedNodes.length > 0)) {
        surfaces.forEach((entry, el) => {
          if (el.isConnected) return;
          resized.unobserve(el);
          nearby.unobserve(el);
          svg.querySelector(`#${entry.id}`)?.remove();
          el.style.removeProperty('backdrop-filter');
          surfaces.delete(el);
        });
      }
    }).observe(community, { childList: true, subtree: true });
  }

  document.documentElement.classList.add('liquid-glass');
  lessTransparency.addEventListener('change', () => {
    surfaces.forEach((entry, el) => {
      entry.key = '';
      apply(el);
    });
  });
}
