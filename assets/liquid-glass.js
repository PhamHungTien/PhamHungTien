/**
 * liquid-glass.js
 * Vanilla JS implementation of Liquid Glass effect
 * Uses the same displacement shader math as liquid-glass-react by rdev
 * https://github.com/rdev/liquid-glass-react
 */
(function () {
  'use strict';

  var LG_FILTER_ID = 'lg-filter-v1';
  var LG_FILTER_STRONG_ID = 'lg-filter-v1-strong';
  var mapDataUrl = null;

  /* ── Generate displacement map (same shader as liquid-glass-react "shader" mode) ── */
  function buildDisplacementMap() {
    if (mapDataUrl) return mapDataUrl;
    var size = 256;
    var c = document.createElement('canvas');
    c.width = c.height = size;
    var ctx = c.getContext('2d');
    var d = ctx.createImageData(size, size);
    for (var y = 0; y < size; y++) {
      for (var x = 0; x < size; x++) {
        var ux = x / size, uy = y / size;
        var cx = ux - 0.5, cy = uy - 0.5;
        var dist = Math.sqrt(cx * cx + cy * cy);
        var angle = Math.atan2(cy, cx);
        var ring = Math.exp(-dist * 8) * Math.sin(dist * 12 - 2);
        var rx = ring * Math.cos(angle) * 0.5 + 0.5;
        var ry = ring * Math.sin(angle) * 0.5 + 0.5;
        var i = (y * size + x) * 4;
        d.data[i]     = Math.round(Math.max(0, Math.min(255, rx * 255)));
        d.data[i + 1] = Math.round(Math.max(0, Math.min(255, ry * 255)));
        d.data[i + 2] = 128;
        d.data[i + 3] = 255;
      }
    }
    ctx.putImageData(d, 0, 0);
    mapDataUrl = c.toDataURL();
    return mapDataUrl;
  }

  /* ── Build SVG <filter> element ── */
  function buildSvgFilter(id, mapUrl, scale, aberration) {
    var NS = 'http://www.w3.org/2000/svg';
    function el(tag, attrs) {
      var e = document.createElementNS(NS, tag);
      for (var k in attrs) { e.setAttribute(k, attrs[k]); }
      return e;
    }
    var f = el('filter', {
      id: id,
      x: '-40%', y: '-40%', width: '180%', height: '180%',
      'color-interpolation-filters': 'sRGB'
    });
    f.appendChild(el('feImage', { href: mapUrl, x: '0', y: '0', width: '100%', height: '100%', result: 'MAP', preserveAspectRatio: 'xMidYMid slice' }));
    f.appendChild(el('feColorMatrix', { in: 'MAP', type: 'matrix', values: '0.3 0.3 0.3 0 0  0.3 0.3 0.3 0 0  0.3 0.3 0.3 0 0  0 0 0 1 0', result: 'EDGE_I' }));
    var ct1 = el('feComponentTransfer', { in: 'EDGE_I', result: 'EDGE_M' });
    ct1.appendChild(el('feFuncA', { type: 'discrete', tableValues: '0 ' + (aberration * 0.05) + ' 1' }));
    f.appendChild(ct1);
    f.appendChild(el('feOffset', { in: 'SourceGraphic', dx: '0', dy: '0', result: 'CENTER' }));
    // Red
    f.appendChild(el('feDisplacementMap', { in: 'SourceGraphic', in2: 'MAP', scale: scale, xChannelSelector: 'R', yChannelSelector: 'G', result: 'R_D' }));
    f.appendChild(el('feColorMatrix', { in: 'R_D', type: 'matrix', values: '1 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 0', result: 'R_CH' }));
    // Green
    f.appendChild(el('feDisplacementMap', { in: 'SourceGraphic', in2: 'MAP', scale: scale - aberration * 0.05, xChannelSelector: 'R', yChannelSelector: 'G', result: 'G_D' }));
    f.appendChild(el('feColorMatrix', { in: 'G_D', type: 'matrix', values: '0 0 0 0 0  0 1 0 0 0  0 0 0 0 0  0 0 0 1 0', result: 'G_CH' }));
    // Blue
    f.appendChild(el('feDisplacementMap', { in: 'SourceGraphic', in2: 'MAP', scale: scale - aberration * 0.1, xChannelSelector: 'R', yChannelSelector: 'G', result: 'B_D' }));
    f.appendChild(el('feColorMatrix', { in: 'B_D', type: 'matrix', values: '0 0 0 0 0  0 0 0 0 0  0 0 1 0 0  0 0 0 1 0', result: 'B_CH' }));
    f.appendChild(el('feBlend', { in: 'G_CH', in2: 'B_CH', mode: 'screen', result: 'GB' }));
    f.appendChild(el('feBlend', { in: 'R_CH', in2: 'GB', mode: 'screen', result: 'RGB' }));
    f.appendChild(el('feGaussianBlur', { in: 'RGB', stdDeviation: '0.4', result: 'AB' }));
    f.appendChild(el('feComposite', { in: 'AB', in2: 'EDGE_M', operator: 'in', result: 'EDGE_AB' }));
    var ct2 = el('feComponentTransfer', { in: 'EDGE_M', result: 'INV_M' });
    ct2.appendChild(el('feFuncA', { type: 'table', tableValues: '1 0' }));
    f.appendChild(ct2);
    f.appendChild(el('feComposite', { in: 'CENTER', in2: 'INV_M', operator: 'in', result: 'CENTER_C' }));
    f.appendChild(el('feComposite', { in: 'EDGE_AB', in2: 'CENTER_C', operator: 'over' }));
    return f;
  }

  /* ── Inject shared SVG defs into <body> ── */
  function ensureGlobalDefs() {
    if (document.getElementById(LG_FILTER_ID)) return;
    var map = buildDisplacementMap();
    var NS = 'http://www.w3.org/2000/svg';
    var svg = document.createElementNS(NS, 'svg');
    svg.setAttribute('style', 'position:absolute;width:0;height:0;overflow:visible;pointer-events:none;top:0;left:0;z-index:-9999;');
    svg.setAttribute('aria-hidden', 'true');
    var defs = document.createElementNS(NS, 'defs');
    defs.appendChild(buildSvgFilter(LG_FILTER_ID, map, 38, 2));
    defs.appendChild(buildSvgFilter(LG_FILTER_STRONG_ID, map, 52, 2.4));
    svg.appendChild(defs);
    document.body.insertBefore(svg, document.body.firstChild);
  }

  /* ── Get flex/grid layout properties to copy to content wrapper ── */
  function getLayoutCSS(style) {
    var d = style.display;
    if (d === 'flex' || d === 'inline-flex') {
      return 'display:flex;flex-direction:' + style.flexDirection +
        ';align-items:' + style.alignItems +
        ';justify-content:' + style.justifyContent +
        ';flex-wrap:' + style.flexWrap +
        ';gap:' + style.gap +
        ';width:100%;min-width:0;';
    }
    if (d === 'grid' || d === 'inline-grid') {
      return 'display:grid;grid-template-columns:' + style.gridTemplateColumns +
        ';gap:' + style.gap +
        ';width:100%;min-width:0;';
    }
    return 'display:block;';
  }

  /* ── Apply Liquid Glass to a single element ── */
  function applyGlass(el, opts) {
    if (el.__lg) return;
    el.__lg = true;
    opts = opts || {};
    var blur = opts.blur !== undefined ? opts.blur : 20;
    var saturation = opts.saturation !== undefined ? opts.saturation : 160;
    var strong = opts.strong || false;
    var filterId = strong ? LG_FILTER_STRONG_ID : LG_FILTER_ID;
    var style = getComputedStyle(el);
    var br = style.borderRadius || '0px';

    // Remove existing backdrop-filter from element (the glass warp will handle it)
    el.style.backdropFilter = 'none';
    el.style.webkitBackdropFilter = 'none';

    // Wrap existing content in a z-index: 1 layer
    var content = document.createElement('div');
    content.className = 'lg-content';
    content.style.cssText = 'position:relative;z-index:1;' + getLayoutCSS(style);
    while (el.firstChild) { content.appendChild(el.firstChild); }

    // Warp span: this is where the magic happens.
    // backdrop-filter blurs/saturates what's behind the element,
    // filter url() applies the displacement distortion to that blurred output.
    var warp = document.createElement('span');
    warp.className = 'lg-warp';
    warp.style.cssText =
      'position:absolute;inset:0;pointer-events:none;' +
      'filter:url(#' + filterId + ');' +
      'backdrop-filter:blur(' + blur + 'px) saturate(' + saturation + '%) brightness(1.05);' +
      '-webkit-backdrop-filter:blur(' + blur + 'px) saturate(' + saturation + '%) brightness(1.05);';

    // Border layer 1 — screen blend for highlight
    var b1 = document.createElement('span');
    b1.className = 'lg-b1';
    b1.style.cssText =
      'position:absolute;inset:0;border-radius:' + br + ';pointer-events:none;z-index:2;' +
      'mix-blend-mode:screen;opacity:0.22;padding:1.5px;' +
      '-webkit-mask:linear-gradient(#000 0 0) content-box,linear-gradient(#000 0 0);' +
      '-webkit-mask-composite:xor;mask-composite:exclude;' +
      'box-shadow:0 0 0 0.5px rgba(255,255,255,.5) inset,0 1px 3px rgba(255,255,255,.22) inset,0 1px 6px rgba(0,0,0,.3);' +
      'background:linear-gradient(135deg,rgba(255,255,255,0) 0%,rgba(255,255,255,.18) 33%,rgba(255,255,255,.48) 66%,rgba(255,255,255,0) 100%);' +
      'transition:background .12s ease;';

    // Border layer 2 — overlay blend for depth
    var b2 = document.createElement('span');
    b2.className = 'lg-b2';
    b2.style.cssText =
      'position:absolute;inset:0;border-radius:' + br + ';pointer-events:none;z-index:2;' +
      'mix-blend-mode:overlay;padding:1.5px;' +
      '-webkit-mask:linear-gradient(#000 0 0) content-box,linear-gradient(#000 0 0);' +
      '-webkit-mask-composite:xor;mask-composite:exclude;' +
      'box-shadow:0 0 0 0.5px rgba(255,255,255,.5) inset,0 1px 3px rgba(255,255,255,.22) inset,0 1px 6px rgba(0,0,0,.3);' +
      'background:linear-gradient(135deg,rgba(255,255,255,0) 0%,rgba(255,255,255,.38) 33%,rgba(255,255,255,.68) 66%,rgba(255,255,255,0) 100%);' +
      'transition:background .12s ease;';

    // Hover glow overlay
    var hover = document.createElement('div');
    hover.className = 'lg-hover';
    hover.style.cssText =
      'position:absolute;inset:0;border-radius:' + br + ';pointer-events:none;z-index:3;' +
      'mix-blend-mode:overlay;opacity:0;' +
      'background:radial-gradient(circle at 50% 0%,rgba(255,255,255,.5) 0%,rgba(255,255,255,0) 55%);' +
      'transition:opacity .2s ease;';

    el.appendChild(warp);
    el.appendChild(b1);
    el.appendChild(b2);
    el.appendChild(hover);
    el.appendChild(content);

    // Mouse tracking for dynamic border gradient + hover
    el.addEventListener('mousemove', function (e) {
      var r = el.getBoundingClientRect();
      var mx = ((e.clientX - r.left - r.width / 2) / r.width) * 100;
      var my = ((e.clientY - r.top - r.height / 2) / r.height) * 100;
      var ang = (135 + mx * 1.2).toFixed(1);
      var s2 = Math.max(10, 33 + my * 0.3).toFixed(1);
      var s3 = Math.min(90, 66 + my * 0.4).toFixed(1);
      var a1 = Math.min(0.35, 0.12 + Math.abs(mx) * 0.006).toFixed(3);
      var a2 = Math.min(0.65, 0.45 + Math.abs(mx) * 0.009).toFixed(3);
      var a1h = (parseFloat(a1) + 0.22).toFixed(3);
      var a2h = (parseFloat(a2) + 0.22).toFixed(3);
      b1.style.background = 'linear-gradient(' + ang + 'deg,rgba(255,255,255,0) 0%,rgba(255,255,255,' + a1 + ') ' + s2 + '%,rgba(255,255,255,' + a2 + ') ' + s3 + '%,rgba(255,255,255,0) 100%)';
      b2.style.background = 'linear-gradient(' + ang + 'deg,rgba(255,255,255,0) 0%,rgba(255,255,255,' + a1h + ') ' + s2 + '%,rgba(255,255,255,' + a2h + ') ' + s3 + '%,rgba(255,255,255,0) 100%)';
    });

    el.addEventListener('mouseenter', function () {
      hover.style.opacity = '0.45';
    });

    el.addEventListener('mouseleave', function () {
      hover.style.opacity = '0';
      b1.style.background = '';
      b2.style.background = '';
    });
  }

  /* ── Auto-init ── */
  function init() {
    ensureGlobalDefs();

    // Navbar — strong glass effect
    document.querySelectorAll('.topbar-inner').forEach(function (el) {
      applyGlass(el, { blur: 26, saturation: 175, strong: true });
    });

    // Product / feature / download / install / gallery cards
    document.querySelectorAll(
      '.product-card, .feature-card, .download-panel, .install-card, .gallery-card, .hero-preview'
    ).forEach(function (el) {
      applyGlass(el, { blur: 18, saturation: 145 });
    });

    // Custom data attribute
    document.querySelectorAll('[data-liquid-glass]').forEach(function (el) {
      var blur = el.dataset.lgBlur ? +el.dataset.lgBlur : 18;
      var sat = el.dataset.lgSat ? +el.dataset.lgSat : 145;
      var strong = el.dataset.lgStrong === 'true';
      applyGlass(el, { blur: blur, saturation: sat, strong: strong });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Expose for manual use
  window.LiquidGlassVanilla = { apply: applyGlass };
})();
