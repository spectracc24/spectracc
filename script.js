/* ==========================================================================
   Spectra CC: core script
   Order of this file: utilities, loading screens, lazy loader, modal, theme, home,
   contact and "Find us", router. Page modules live in assets/js/pages/ and are loaded
   only when a visitor opens that page. Content lives in assets/data/.
   ========================================================================== */
(function () {
  'use strict';
  var SCC = window.SCC = window.SCC || {};
  var $ = function (s, r) { return (r || document).querySelector(s) };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)) };
  var RM = !!(window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches);
  var root = document.documentElement;
  var SITE = SCC.site = window.SCC_SITE || { contact: {}, links: [], pages: {} };
  var delay = function (ms) { return new Promise(function (r) { setTimeout(r, ms) }) };

  function esc(t) { return String(t == null ? '' : t).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;') }
  function ic(n, c) { return '<svg class="ic' + (c ? ' ' + c : '') + '" aria-hidden="true"><use href="#' + n + '"/></svg>' }
  function bic(n, c) { return '<svg class="ic brand' + (c ? ' ' + c : '') + '" aria-hidden="true"><use href="#b-' + n + '"/></svg>' }
  function isDark() { var t = root.getAttribute('data-theme'); return t ? t === 'dark' : !!(window.matchMedia && matchMedia('(prefers-color-scheme: dark)').matches) }
  function paras(t) { return String(t || '').split(/\n\s*\n/).map(function (p) { return p.trim() }).filter(Boolean).map(function (p) { return '<p>' + esc(p) + '</p>' }).join('') }
  function fmtDate(d) {
    if (!d) return ''; var m = String(d).match(/^(\d{4})(?:-(\d{2}))?(?:-(\d{2}))?$/); if (!m) return String(d);
    if (!m[2]) return m[1]; var dt = new Date(Date.UTC(+m[1], +m[2] - 1, +(m[3] || 1)));
    try { return dt.toLocaleDateString('en-GB', m[3] ? { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' } : { month: 'short', year: 'numeric', timeZone: 'UTC' }) } catch (e) { return String(d) }
  }
  function copyText(text, srcEl, msgEl) {
    var done = function (ok) { if (msgEl) msgEl.textContent = ok ? 'Copied' : 'Select the text and copy it manually' };
    var fallback = function () { try { var r = document.createRange(); r.selectNodeContents(srcEl); var s = window.getSelection(); s.removeAllRanges(); s.addRange(r) } catch (e) { } done(false) };
    if (navigator.clipboard && navigator.clipboard.writeText) { navigator.clipboard.writeText(text).then(function () { done(true) }, fallback) } else fallback()
  }
  SCC.$ = $; SCC.$$ = $$; SCC.RM = RM; SCC.esc = esc; SCC.ic = ic; SCC.bic = bic; SCC.isDark = isDark; SCC.paras = paras; SCC.fmtDate = fmtDate; SCC.copyText = copyText; SCC.delay = delay;

  /* ---------- Settings (defaults, then settings.js on top) ---------- */
  var DEF = { loader: { bootMinMs: 700, viewMinMs: 450 }, team: { columns: 4, photoRatio: '1/1', bioLines: 3, showNetwork: true, showFilters: true } };
  SCC.cfg = function (name) { var u = (window.SCC_SETTINGS || {})[name] || {}, d = DEF[name] || {}, o = {}, k; for (k in d) o[k] = d[k]; for (k in u) o[k] = u[k]; return o };

  /* ---------- Logo ---------- */
  var MARK = '<svg viewBox="-210 -210 420 420" class="mk" aria-hidden="true" fill="none" stroke-width="32" stroke-linecap="round"><path d="M-90.5 -165.9A189 189 0 1 0 163.8 -94.2" style="stroke:var(--lg-o)"/><path d="M67.5 -112.3A131 131 0 1 0 112.8 66.7" style="stroke:var(--lg-m)"/><path d="M71 0A71 71 0 1 0 0 71" style="stroke:var(--lg-i)"/><circle r="19" stroke="none" style="fill:var(--lg-d)"/></svg>';
  SCC.MARK = MARK;
  $$('[data-logo]').forEach(function (e) { e.innerHTML = MARK + '<span class="wm"><b>Spectra CC</b><i>Citra Cendekia</i></span>' });

  /* ---------- Theme ---------- */
  try { var st = localStorage.getItem('scc-theme'); if (st === 'dark' || st === 'light') root.setAttribute('data-theme', st) } catch (e) { }
  function themeChanged() { $('#themeUse').setAttribute('href', isDark() ? '#i-sun' : '#i-moon'); window.dispatchEvent(new Event('scc-theme')) }
  $('#themeBtn').addEventListener('click', function () { var n = isDark() ? 'light' : 'dark'; root.setAttribute('data-theme', n); try { localStorage.setItem('scc-theme', n) } catch (e) { } themeChanged() });
  if (window.matchMedia) { var mq = matchMedia('(prefers-color-scheme: dark)'); if (mq.addEventListener) mq.addEventListener('change', themeChanged) }
  $('#themeUse').setAttribute('href', isDark() ? '#i-sun' : '#i-moon');

  /* ==========================================================================
     LOADING SCREENS
     1. Boot screen      full screen, first visit to the site
     2. Top bar          thin line while anything loads
     3. Page loader      shown in place of a page's content while it loads for the first time
     4. Area loader      small overlay on one area (the map, a list)
     ========================================================================== */
  if (RM) $$('#boot animateTransform').forEach(function (a) { a.parentNode.removeChild(a) });
  var Boot = (function () {
    var el = $('#boot'), fill = $('#bootFill'), msg = $('#bootMsg'), t0 = Date.now(), gone = false;
    function set(p, m) { if (gone || !el) return; if (fill) fill.style.width = p + '%'; if (m && msg) msg.textContent = m }
    function hide() {
      if (gone || !el) return; gone = true; SCC.booted = true; var min = SCC.cfg('loader').bootMinMs, wait = Math.max(0, min - (Date.now() - t0));
      set(100, 'Ready'); setTimeout(function () { el.classList.add('out'); setTimeout(function () { el.hidden = true; root.classList.remove('booting') }, RM ? 0 : 420) }, wait)
    }
    return { set: set, hide: hide }
  })();
  SCC.boot = Boot;

  var Loader = SCC.loader = (function () {
    var bar = $('#topbar'), fill = bar && bar.firstElementChild, n = 0, w = 0, timer = null;
    function tick() { w += (88 - w) * .12; fill.style.width = w.toFixed(1) + '%' }
    function start() { n++; if (n > 1 || !bar) return; w = 6; fill.style.width = '6%'; bar.classList.add('on'); clearInterval(timer); timer = setInterval(tick, 220); root.setAttribute('aria-busy', 'true') }
    function done() {
      n = Math.max(0, n - 1); if (n > 0 || !bar) return; clearInterval(timer); fill.style.width = '100%'; root.removeAttribute('aria-busy');
      setTimeout(function () { if (n === 0) { bar.classList.remove('on'); fill.style.width = '0' } }, 260)
    }
    function mk(cls, label) {
      var d = document.createElement('div'); d.className = cls; d.setAttribute('role', 'status'); d.setAttribute('aria-live', 'polite');
      d.innerHTML = '<div class="spin" aria-hidden="true"></div><p class="vl-t"></p><div class="vl-bar" aria-hidden="true"><i></i></div><div class="vl-err" hidden></div>';
      d.querySelector('.vl-t').textContent = label; return d
    }
    function make(host, cls, label, before) {
      var el = mk(cls, label), t0 = Date.now();
      if (before) host.insertBefore(el, before); else host.appendChild(el);
      return {
        el: el, label: function (t) { el.querySelector('.vl-t').textContent = t },
        done: function (minMs, cb) { var wait = Math.max(0, (minMs || 0) - (Date.now() - t0)); setTimeout(function () { el.classList.add('out'); setTimeout(function () { if (el.parentNode) el.parentNode.removeChild(el); host.classList.remove('is-loading'); host.classList.remove('has-ovl'); if (cb) cb() }, RM ? 0 : 220) }, wait) },
        fail: function (text, retry) {
          el.classList.add('is-err'); el.querySelector('.spin').hidden = true; el.querySelector('.vl-bar').hidden = true;
          var box = el.querySelector('.vl-err'); box.hidden = false; box.innerHTML = '<p></p>' + (retry ? '<button class="btn btn-p" type="button">Try again</button>' : '');
          box.firstChild.textContent = text; var b = box.querySelector('button'); if (b) b.addEventListener('click', retry)
        }
      }
    }
    /* page-level: sits under the page header and hides the page body */
    function view(host, label) { host.classList.add('is-loading'); var head = host.querySelector('.page-head'); return make(host, 'vload', label, head ? head.nextSibling : host.firstChild) }
    /* area-level: overlay on top of one element */
    function over(host, label) { host.classList.add('has-ovl'); return make(host, 'ovl', label) }
    return { start: start, done: done, view: view, over: over }
  })();

  /* ---------- Lazy loader for page modules, data and libraries ---------- */
  var loadP = {}, loadOK = {};
  function loadOne(url) {
    if (loadP[url]) return loadP[url];
    var v = SITE.version, u = url + (v ? '?v=' + encodeURIComponent(v) : '');
    var p = new Promise(function (res, rej) {
      if (/\.css$/.test(url)) { var l = document.createElement('link'); l.rel = 'stylesheet'; l.href = u; l.onload = res; l.onerror = function () { rej(new Error('Could not load ' + url)) }; document.head.appendChild(l) }
      else { var s = document.createElement('script'); s.src = u; s.async = false; s.onload = res; s.onerror = function () { rej(new Error('Could not load ' + url)) }; document.body.appendChild(s) }
    });
    loadP[url] = p; p.then(function () { loadOK[url] = 1 }, function () { delete loadP[url] }); return p
  }
  SCC.load = function (list) { var seq = Promise.resolve(); list.forEach(function (g) { seq = seq.then(function () { return Promise.all([].concat(g).map(loadOne)) }) }); return seq };
  SCC.isLoaded = function (list) { return [].concat.apply([], list).every(function (u) { return loadOK[u] }) };

  /* ---------- Images with a loading skeleton and a fallback ---------- */
  SCC.hydrate = function (rootEl) {
    $$('.imgw img', rootEl).forEach(function (im) {
      if (im.dataset.h) return; im.dataset.h = '1'; var w = im.parentNode;
      var ok = function () { w.classList.remove('is-loading') }, bad = function () { w.classList.remove('is-loading'); w.classList.add('is-bad'); w.innerHTML = MARK };
      if (im.complete) { im.naturalWidth ? ok() : bad() } else { im.addEventListener('load', ok); im.addEventListener('error', bad) }
    })
  };
  SCC.img = function (src, alt, fit) { return '<div class="imgw is-loading"><img src="' + esc(src) + '" alt="' + esc(alt || '') + '" loading="lazy" decoding="async" style="object-fit:' + (fit || 'cover') + '"></div>' };

  /* ---------- Modal ---------- */
  var Modal = SCC.modal = (function () {
    var m = document.createElement('div'); m.className = 'modal'; m.hidden = true;
    m.innerHTML = '<div class="m-back" data-close></div><div class="m-box" role="dialog" aria-modal="true" tabindex="-1"><button class="icon-btn m-close" type="button" aria-label="Close" data-close>' + ic('i-close') + '</button><div class="m-body"></div></div>';
    document.body.appendChild(m);
    var box = $('.m-box', m), body = $('.m-body', m), opener = null, onClose = null;
    function focusables() { return $$('a[href],button:not([disabled]),input,select,textarea,[tabindex]:not([tabindex="-1"])', box).filter(function (e) { return !e.hidden && e.offsetParent !== null }) }
    function open(o) {
      opener = document.activeElement; onClose = o.onClose || null; box.className = 'm-box' + (o.cls ? ' ' + o.cls : ''); body.innerHTML = o.html;
      box.setAttribute('aria-labelledby', o.labelId || 'mTitle'); m.hidden = false; document.body.classList.add('noscroll'); m.classList.add('in'); box.scrollTop = 0; SCC.hydrate(body);
      if (o.onOpen) o.onOpen(body); setTimeout(function () { box.focus() }, 0)
    }
    function close() {
      if (m.hidden) return; m.classList.remove('in'); m.hidden = true; document.body.classList.remove('noscroll'); body.innerHTML = '';
      if (onClose) { var f = onClose; onClose = null; f() } if (opener && opener.focus) try { opener.focus() } catch (e) { } opener = null
    }
    m.addEventListener('click', function (e) { if (e.target.closest('[data-close]')) close() });
    document.addEventListener('keydown', function (e) {
      if (m.hidden) return;
      if (e.key === 'Escape') { e.preventDefault(); close() }
      else if (e.key === 'Tab') {
        var f = focusables(); if (!f.length) { e.preventDefault(); box.focus(); return }
        var a = f[0], z = f[f.length - 1]; if (e.shiftKey && (document.activeElement === a || document.activeElement === box)) { e.preventDefault(); z.focus() } else if (!e.shiftKey && document.activeElement === z) { e.preventDefault(); a.focus() }
      }
    });
    return { open: open, close: close }
  })();

  /* ==========================================================================
     HOME
     ========================================================================== */
  var STAGES = [
    { t: 'Scientific and Expert Mobilization', i: 'i-network', d: 'We match partner needs and program objectives with qualified specialists across geospatial science, forestry and other land-use sectors, environmental science and related disciplines.' },
    { t: 'Methodological and Spatial Execution', i: 'i-layers', d: 'We provide geospatial analysis, technical support, applied research, environmental assessments and tailored technical solutions grounded in scientific methods.' },
    { t: 'Decision-Ready Project Quality', i: 'i-check', d: 'We strengthen scientific rigor and technical reliability, so that decisions rest on evidence a donor, investor or regulator can check.' },
    { t: 'Institutional Technical Independence', i: 'i-db', d: 'We build internal competencies through knowledge transfer, standardized workflows, institutional procedures, spatial data infrastructure and applied analytical skills.' },
    { t: 'Sectoral Leadership and Collective Impact', i: 'i-globe', d: 'We contribute to a growing network of capable practitioners and institutions that together advance environmental sustainability.' }
  ];

  /* ---------- Hero ---------- */
  var heroApi = (function () {
    var sec = $('#hero'), c = $('#heroCanvas'), ctx = c.getContext('2d'), out = $('#heroCoord');
    var W = 1, H = 1, dpr = 1, px = .72, py = .45, cx = .72, cy = .45;
    function dm(v, h, pad) { var a = Math.abs(v), d = Math.floor(a), m = Math.round((a - d) * 60); if (m === 60) { m = 0; d++ } return String(d).padStart(pad, '0') + '° ' + String(m).padStart(2, '0') + '′ ' + h }
    function readout() { out.textContent = 'Cursor  ' + dm(py * .6, 'S', 2) + '  ·  ' + dm(109 + px * .8, 'E', 3) }
    function draw(t) {
      ctx.clearRect(0, 0, W, H);
      ctx.lineWidth = 1; ctx.strokeStyle = 'rgba(220,234,240,0.06)'; var gs = 64; ctx.beginPath();
      for (var x = gs / 2; x < W; x += gs) { ctx.moveTo(x, 0); ctx.lineTo(x, H) } for (var y = gs / 2; y < H; y += gs) { ctx.moveTo(0, y); ctx.lineTo(W, y) } ctx.stroke();
      var narrow = W < 760, bx = W * (narrow ? .62 : .74), by = H * (narrow ? .7 : .46), ox = (cx - .72) * W, oy = (cy - .45) * H, N = 15, sc = Math.min(W, 900) * (narrow ? .05 : .034);
      for (var k = N; k >= 0; k--) {
        var d = k / N, rx = 26 + k * sc, ry = rx * .62, par = .1 + (1 - d) * .34, x0 = bx + ox * par, y0 = by + oy * par, ph = t * .00035 + k * .55;
        ctx.beginPath(); var M = 96;
        for (var i = 0; i <= M; i++) { var a = i / M * Math.PI * 2, w = 1 + .075 * Math.sin(3 * a + ph) + .045 * Math.sin(5 * a - ph * 1.3 + k) + .03 * Math.sin(2 * a + k), xx = x0 + Math.cos(a) * rx * w, yy = y0 + Math.sin(a) * ry * w; if (i) ctx.lineTo(xx, yy); else ctx.moveTo(xx, yy) }
        ctx.closePath();
        if (k === 0) { ctx.strokeStyle = 'rgba(235,243,247,.95)'; ctx.lineWidth = 2 } else { ctx.strokeStyle = 'rgba(45,177,183,' + (0.10 + (1 - d) * .55).toFixed(3) + ')'; ctx.lineWidth = 1.2 }
        ctx.stroke()
      }
    }
    function size() { var r = sec.getBoundingClientRect(); if (r.width < 2) return; dpr = Math.min(2, window.devicePixelRatio || 1); W = r.width; H = r.height; c.width = Math.round(W * dpr); c.height = Math.round(H * dpr); ctx.setTransform(dpr, 0, 0, dpr, 0, 0); draw(0) }
    function loop(t) { if (!$('#v-home').hidden) { cx += (px - cx) * .07; cy += (py - cy) * .07; draw(t) } requestAnimationFrame(loop) }
    sec.addEventListener('pointermove', function (e) { var r = sec.getBoundingClientRect(); px = Math.min(1, Math.max(0, (e.clientX - r.left) / r.width)); py = Math.min(1, Math.max(0, (e.clientY - r.top) / r.height)); readout(); if (RM) { cx = px; cy = py; draw(0) } });
    window.addEventListener('resize', size);
    size(); readout(); if (!RM) requestAnimationFrame(loop);
    return { size: size }
  })();

  /* ---------- Pathway ---------- */
  (function () {
    var wrap = $('#stages'), det = $('#stageDetail'), btns = [];
    STAGES.forEach(function (s, i) {
      var b = document.createElement('button'); b.className = 'stg'; b.setAttribute('role', 'tab'); b.setAttribute('aria-selected', i === 0 ? 'true' : 'false');
      b.innerHTML = '<span class="n">' + (i + 1) + '</span><b>' + s.t + '</b>'; b.addEventListener('click', function () { show(i) });
      b.addEventListener('keydown', function (e) { var k = e.key; if (k === 'ArrowRight' || k === 'ArrowDown') { e.preventDefault(); show((i + 1) % STAGES.length, true) } else if (k === 'ArrowLeft' || k === 'ArrowUp') { e.preventDefault(); show((i + STAGES.length - 1) % STAGES.length, true) } });
      wrap.appendChild(b); btns.push(b)
    });
    function show(i, focus) {
      btns.forEach(function (b, j) { b.setAttribute('aria-selected', j === i ? 'true' : 'false'); b.tabIndex = j === i ? 0 : -1 });
      det.innerHTML = ic(STAGES[i].i) + '<div><h3>Stage ' + (i + 1) + ', ' + STAGES[i].t + '</h3><p>' + STAGES[i].d + '</p></div>'; if (focus) btns[i].focus()
    }
    show(0);
  })();


  /* ==========================================================================
     CONTACT, FIND US, FOOTER, COMING-SOON PAGE
     ========================================================================== */
  (function () {
    var C = SITE.contact || {};

    /* Main card: email is the primary way to reach us (no form). */
    var mailBox = $('#ctMail');
    if (C.email) {
      var subject = 'Project inquiry for Spectra CC';
      var body = [
        'Hello Spectra CC team,', '',
        'Name:', 'Organization and role:', '',
        'Project site / area:', 'Services of interest (geospatial analysis and technical support / applied studies / training):',
        'Project stage (early, mid-stage, growing organization, not sure yet):', 'Timeline or deadline:', '',
        'About the project and what we would like to achieve:', '', ''
      ].join('\r\n');
      var href = 'mailto:' + C.email + '?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
      mailBox.innerHTML = '<p class="ct-k">' + ic('i-mail') + 'Email us</p>' +
        '<a class="ct-addr" href="mailto:' + esc(C.email) + '">' + esc(C.email) + '</a>' +
        '<p class="ct-note">Write to us directly. The button opens your email app with a short template that you can edit.</p>' +
        '<div class="ct-actions"><a class="btn ct-b1" href="' + href + '">' + ic('i-mail') + 'Write an email</a>' +
        '<button class="btn ct-b2" type="button" id="ctCopy">' + ic('i-copy') + 'Copy address</button>' +
        '<span class="ct-copied" id="ctCopied" role="status" aria-live="polite"></span></div>';
      $('#ctCopy').addEventListener('click', function () {
        var msg = $('#ctCopied'); copyText(C.email, $('#ctMail .ct-addr'), msg);
        clearTimeout(msg._t); msg._t = setTimeout(function () { msg.textContent = '' }, 2200);
      });
    } else {
      mailBox.innerHTML = '<p class="ct-k">' + ic('i-mail') + 'Get in touch</p><p class="ct-note" style="margin:0">Our email address is being set up. In the meantime, please reach us through the channels below.</p>' +
        '<div class="ct-actions"><a class="btn ct-b1" href="#find-us">Find us online' + ic('i-arrow') + '</a></div>';
    }

    /* Other details (only those filled in) + region */
    var rows = [['i-pin', 'Address', 'address'], ['i-phone', 'Phone', 'phone'], ['i-globe', 'Website', 'website']];
    var region = SITE.region || 'Kubu Raya, West Kalimantan, Indonesia';
    var h = rows.filter(function (r) { return C[r[2]]; }).map(function (r) { var v = C[r[2]]; return '<div class="crow"><span class="ico">' + ic(r[0]) + '</span><div><small>' + r[1] + '</small><span class="v">' + esc(v) + '</span></div><button class="icon-btn" data-copy="' + esc(v) + '" aria-label="Copy ' + r[1].toLowerCase() + '">' + ic('i-copy') + '</button></div>' }).join('');
    h += '<div class="crow"><span class="ico">' + ic('i-compass') + '</span><div><small>Registered office region</small><span class="v">' + esc(region) + '</span></div><button class="icon-btn" data-copy="' + esc(region) + '" aria-label="Copy registered office region">' + ic('i-copy') + '</button></div>';
    $('#cinfo').innerHTML = h;
    $$('#cinfo [data-copy]').forEach(function (b) { b.addEventListener('click', function () { copyText(b.dataset.copy, b.parentNode.querySelector('.v'), null) }) });

    /* Find us */
    var links = (SITE.links || []).filter(function (l) { return l && l.platform && l.url; });
    var known = window.SCC_BRANDS || [];
    var findSection = $('#find-us'); if (findSection && !links.length) { findSection.hidden = true; $$('[href="#find-us"]').forEach(function (a) { var li = a.closest('li'); if (li) li.hidden = true; else a.hidden = true; }); }
    $('#findGrid').innerHTML = links.map(function (l) {
      var live = !!l.url, icon = known.indexOf(l.platform) > -1 ? bic(l.platform) : ic('i-globe'),
        inner = '<span class="find-ico">' + icon + '</span><span class="find-tx"><b>' + esc(l.label || l.platform) + '</b>' + (l.handle ? '<small>' + esc(l.handle) + '</small>' : '') + (l.desc ? '<span class="find-d">' + esc(l.desc) + '</span>' : '') + '</span>' +
          (live ? '<span class="find-cta">' + esc(l.cta || 'Open') + ic('i-external') + '</span>' : '<span class="soon-b">Coming soon</span>'),
        cls = 'find-card' + (l.featured ? ' featured' : '') + (live ? '' : ' is-soon');
      return live ? '<a class="' + cls + '" href="' + esc(l.url) + '" target="_blank" rel="noopener noreferrer" aria-label="' + esc((l.label || l.platform) + ' (opens in a new tab)') + '">' + inner + '</a>'
        : '<div class="' + cls + '" aria-disabled="true">' + inner + '</div>'
    }).join('');
    var fs = $('#ftrSocial');
    if (fs) { fs.innerHTML = links.filter(function (l) { return l.url }).map(function (l) { return '<a class="soc" href="' + esc(l.url) + '" target="_blank" rel="noopener noreferrer" aria-label="' + esc(l.label || l.platform) + '">' + (known.indexOf(l.platform) > -1 ? bic(l.platform) : ic('i-globe')) + '</a>' }).join(''); fs.hidden = !fs.innerHTML }
  })();

  /* ==========================================================================
     ROUTER
     Every route says which view it shows and which files must be loaded first.
     ========================================================================== */
  var D = 'assets/data/', J = 'assets/js/', V = 'assets/vendor/leaflet/';
  var ROUTES = {
    'home': { view: 'v-home', title: 'Home' },
    'about': { view: 'v-about', page: 'about', label: 'About Us', deps: [D + 'team.js', J + 'pages/about.js'] },
    'team': { alias: 'about', scroll: 'team-section', flag: 'team', label: 'Our Team' },
    'case-studies': { view: 'v-case', page: 'cases', label: 'Case Studies', flag: 'case-studies', deps: [D + 'case-studies.js', [J + 'lib/figures.js', J + 'lib/collection.js'], J + 'pages/showcase.js'] },
    'projects': { view: 'v-projects', page: 'projects', label: 'Projects', flag: 'projects', deps: [D + 'projects.js', [J + 'lib/figures.js', J + 'lib/collection.js'], J + 'pages/showcase.js'] },
    'publications': { view: 'v-pubs', page: 'publications', label: 'Publications', flag: 'publications', deps: [D + 'publications.js', [J + 'lib/figures.js', J + 'lib/collection.js'], J + 'pages/publications.js'] },
    'courses': { view: 'v-courses', page: 'courses', label: 'Course', flag: 'courses', deps: [D + 'courses.js', J + 'pages/courses.js'] },
    'course-detail': { alias: 'courses', label: 'Course detail', flag: 'courses' },
    'map': { view: 'v-map', page: 'map', label: 'Map', flag: 'map', deps: [[D + 'map.js', V + 'leaflet.css'], V + 'leaflet.js', J + 'pages/map.js'] },
    'contact': { view: 'v-contact', title: 'Contact' },
    'find-us': { alias: 'contact', scroll: 'find-us', label: 'Find Us' }
  };
  var PAGES = SCC.pages = {};
  SCC.registerPage = function (name, obj) { PAGES[name] = obj };
  function statusOf(key) { var d = ROUTES[key]; return (SITE.pages && SITE.pages[d.flag || key]) || 'live' }

  /* menu: hide or badge pages according to site.js */
  $$('[data-r]').forEach(function (a) {
    var keys = a.dataset.r.split(','), sts = keys.map(function (k) { return ROUTES[k] ? statusOf(k) : 'live' });
    if (sts.every(function (s) { return s === 'hidden' })) { var li = a.closest('li'); if (li) li.hidden = true }
    else if (keys.length === 1 && sts[0] === 'soon') { a.insertAdjacentHTML('beforeend', '<span class="soon-b sm">Soon</span>') }
  });
  $$('.ftr [data-r]').forEach(function (a) { var k = a.dataset.r; if (ROUTES[k] && statusOf(k) === 'hidden') { var li = a.closest('li'); if (li) li.hidden = true } });

  var token = 0, firstRoute = true;
  var motionObserver = null;
  function enhanceMotion(host) {
    if (!host) return;
    var targets = $$('.sec-h, .pillar, .ct-mail, .ct-step, .item, .member, .course-card, .find-card, .project-card, .case-card, .pub-card, .team-card, .map-panel, .node, .two > div, .course-detail-section, .course-access-panel', host);
    if (!RM && 'IntersectionObserver' in window) {
      if (!motionObserver) motionObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) { entry.target.classList.add('motion-visible'); motionObserver.unobserve(entry.target) }
        });
      }, { threshold: 0.08, rootMargin: '0px 0px -36px 0px' });
      targets.forEach(function (el) { if (!el.classList.contains('motion-visible')) { el.classList.add('motion-item'); motionObserver.observe(el) } });
    } else targets.forEach(function (el) { el.classList.add('motion-visible') });
  }
  SCC.motion = enhanceMotion;
  function animateView(viewEl) {
    if (!viewEl) return;
    viewEl.classList.remove('route-enter');
    void viewEl.offsetWidth;
    viewEl.classList.add('route-enter');
    setTimeout(function () { viewEl.classList.remove('route-enter') }, RM ? 0 : 720);
    enhanceMotion(viewEl);
  }
  function showView(id) { $$('.view').forEach(function (v) { v.hidden = v.id !== id }) }
  function setNav(key) { $$('[data-r]').forEach(function (a) { var on = a.dataset.r.split(',').indexOf(key) > -1; if (on) a.setAttribute('aria-current', 'page'); else a.removeAttribute('aria-current') }) }
  function route() {
    var raw = (location.hash || '#home').slice(1).split('/')[0], my = ++token;
    var key = ROUTES[raw] ? raw : 'home', def = ROUTES[key], tkey = def.alias || key, tdef = ROUTES[tkey], st = statusOf(key);
    if (st === 'hidden') { location.replace('#home'); return }
    $('#navPanel').classList.remove('open'); $('#menuBtn').setAttribute('aria-expanded', 'false');
    Modal.close(); setNav(key === 'course-detail' ? 'courses' : key);
    var label = def.label || tdef.label || tdef.title || 'Page';
    document.title = (label === 'Home' ? '' : label + ' | ') + 'Spectra Citra Cendekia';
    function finish() {
      if (my !== token) return;
      if (tdef.view === 'v-home') heroApi.size();
      var activeView = $('#' + tdef.view); animateView(activeView);
      if (def.scroll) requestAnimationFrame(function () { var t = document.getElementById(def.scroll); if (t) t.scrollIntoView({ behavior: RM ? 'auto' : 'smooth', block: 'start' }) });
      else window.scrollTo(0, 0);
      if (firstRoute) { firstRoute = false; Boot.set(85, 'Almost ready…') }
    }
    if (st === 'soon') { showView('v-soon'); $('#soonTitle').textContent = label; finish(); return }
    showView(tdef.view);
    if (!tdef.deps) { finish(); return }
    var viewEl = $('#' + tdef.view), cached = SCC.isLoaded(tdef.deps) && PAGES[tdef.page] && PAGES[tdef.page].ready;
    var ov = cached ? null : Loader.view(viewEl, 'Loading ' + label.toLowerCase() + '…');
    var min = cached ? Promise.resolve() : delay(SCC.cfg('loader').viewMinMs);
    if (firstRoute) Boot.set(55, 'Loading ' + label.toLowerCase() + '…');
    Loader.start();
    SCC.load(tdef.deps).then(function () {
      var pg = PAGES[tdef.page]; if (!pg) throw new Error('Page module did not register');
      if (ov) ov.label('Preparing ' + label.toLowerCase() + '…');
      if (!pg.ready) pg.ready = Promise.resolve(pg.init(viewEl, ov)).then(function () { pg.ready = true });
      return pg.ready === true ? true : pg.ready
    }).then(function () { return min }).then(function () {
      if (my !== token) { if (ov) ov.done(0); return }
      var pg = PAGES[tdef.page], sh = function () { if (pg.show) pg.show(viewEl) }; if (ov) ov.done(0, sh); else sh(); finish()
    }).catch(function (e) {
      var pg = PAGES[tdef.page]; if (pg && pg.ready && pg.ready !== true) pg.ready = null;
      if (ov) ov.fail('This page could not be loaded. Check your connection and try again.', function () { route() }); else viewEl.classList.remove('is-loading');
      if (window.console) console.error(e);
      if (my === token && firstRoute) { firstRoute = false }
    }).then(Loader.done)
  }
  window.addEventListener('hashchange', route);
  document.addEventListener('click', function (e) {
    var control = e.target.closest('.btn, .icon-btn, button, .course-card, .find-card, .stg, [role="tab"]');
    if (!control || control.disabled || RM) return;
    control.classList.remove('tap-feedback'); void control.offsetWidth; control.classList.add('tap-feedback');
    setTimeout(function () { control.classList.remove('tap-feedback') }, 360);
  });
  $('#menuBtn').addEventListener('click', function () { var o = $('#navPanel').classList.toggle('open'); $('#menuBtn').setAttribute('aria-expanded', o ? 'true' : 'false') });
  $$('[data-jump]').forEach(function (b) { b.addEventListener('click', function () { var t = document.getElementById(b.dataset.jump); if (t) t.scrollIntoView({ behavior: RM ? 'auto' : 'smooth', block: 'start' }) }) });

  Boot.set(30, 'Preparing the page…');
  route();
  var fontsReady = (document.fonts && document.fonts.ready) ? Promise.race([document.fonts.ready, delay(3500)]) : Promise.resolve();
  var winLoaded = document.readyState === 'complete' ? Promise.resolve() : new Promise(function (r) { window.addEventListener('load', r) });
  Promise.all([fontsReady, Promise.race([winLoaded, delay(5000)])]).then(function () {
    var wait = setInterval(function () { if (!root.hasAttribute('aria-busy')) { clearInterval(wait); Boot.hide() } }, 80); setTimeout(function () { clearInterval(wait); Boot.hide() }, 9000)
  });
})();
