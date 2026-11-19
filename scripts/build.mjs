#!/usr/bin/env node
/**
 * Zero-dependency static builder for cookiehankie/trip-plans.
 *
 * Scans trips/<slug>/ (excluding folders starting with `_`), validates each
 * data.js and referenced local assets, copies shared template files and trip
 * folders into docs/, and generates:
 *   - docs/index.html (multi-trip portal sorted by sortDate desc)
 *   - docs/trips/<slug>/index.html
 *   - docs/trips/<slug>/manifest.webmanifest
 *   - docs/trips/<slug>/sw.js
 *   - docs/.nojekyll
 */

import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const TEMPLATE_DIR = path.join(ROOT, 'template');
const TRIPS_DIR = path.join(ROOT, 'trips');
const DOCS_DIR = path.join(ROOT, 'docs');

function esc(str) {
  return String(str ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function copyDir(src, dst) {
  fs.mkdirSync(dst, { recursive: true });
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const srcPath = path.join(src, entry.name);
    const dstPath = path.join(dst, entry.name);
    if (entry.isDirectory()) {
      copyDir(srcPath, dstPath);
    } else {
      fs.copyFileSync(srcPath, dstPath);
    }
  }
}

function listFilesRelative(dir, prefix = '') {
  if (!fs.existsSync(dir)) return [];
  const out = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const rel = prefix ? `${prefix}/${entry.name}` : entry.name;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      out.push(...listFilesRelative(full, rel));
    } else {
      out.push(rel);
    }
  }
  return out.sort();
}

function loadTripData(slug, tripDir) {
  const dataFile = path.join(tripDir, 'data.js');
  if (!fs.existsSync(dataFile)) {
    throw new Error(`Missing data.js in trips/${slug}`);
  }
  const code = fs.readFileSync(dataFile, 'utf8');
  const sandbox = { window: {} };
  vm.createContext(sandbox);
  vm.runInContext(code, sandbox, { filename: dataFile });
  const data = sandbox.window.TRIP_DATA;
  if (!data || typeof data !== 'object') {
    throw new Error(`trips/${slug}/data.js did not set window.TRIP_DATA`);
  }
  if (data.slug !== slug) {
    throw new Error(`trips/${slug}/data.js has slug "${data.slug}", expected "${slug}"`);
  }
  if (!/^\d{4}-\d{2}-\d{2}$/.test(data.sortDate || '')) {
    throw new Error(`trips/${slug}/data.js must define sortDate as YYYY-MM-DD (got "${data.sortDate}")`);
  }
  for (const key of ['meta', 'hero', 'climate', 'places', 'compare', 'map', 'checklist', 'mobile', 'footer']) {
    if (!data[key]) {
      throw new Error(`trips/${slug}/data.js is missing required section "${key}"`);
    }
  }
  if (!Array.isArray(data.compare.plans) || data.compare.plans.length === 0) {
    throw new Error(`trips/${slug}/data.js must have at least one plan in compare.plans`);
  }

  // Verify every referenced local asset exists
  const referenced = new Set();
  if (data.meta.coverImage && !/^https?:/.test(data.meta.coverImage)) {
    referenced.add(data.meta.coverImage);
  }
  if (data.places.highlightCard?.photo && !/^https?:/.test(data.places.highlightCard.photo)) {
    referenced.add(data.places.highlightCard.photo);
  }
  for (const stop of data.places.stops || []) {
    if (stop.photo && !/^https?:/.test(stop.photo)) {
      referenced.add(stop.photo);
    }
  }
  for (const rel of referenced) {
    const abs = path.join(tripDir, rel);
    if (!fs.existsSync(abs)) {
      throw new Error(`trips/${slug}/data.js references missing asset "${rel}"`);
    }
  }

  return data;
}

function generateTripHtml(trip, cacheHash) {
  const m = trip.meta;
  const themeColor = m.themeColor || '#122437';
  const shortTitle = m.shortTitle || m.title || trip.slug;
  const v = cacheHash ? `?v=${encodeURIComponent(cacheHash)}` : '';
  return `<!doctype html>
<html lang="zh-CN">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
  <meta name="referrer" content="strict-origin-when-cross-origin">
  <meta name="theme-color" content="${esc(themeColor)}">
  <meta name="apple-mobile-web-app-capable" content="yes">
  <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
  <meta name="apple-mobile-web-app-title" content="${esc(shortTitle)}">
  <meta name="description" content="${esc(m.description || '')}">
  <title>${esc(m.title || trip.slug)}</title>
  <link rel="manifest" href="./manifest.webmanifest">
  <link rel="icon" href="../../template/vendor/icon.svg" type="image/svg+xml">
  <link rel="apple-touch-icon" href="../../template/vendor/icon-192.png">
  <link rel="stylesheet" href="../../template/vendor/leaflet/leaflet.css">
  <link rel="stylesheet" href="../../template/styles.css${v}">
</head>
<body>
  <div id="trip-root"></div>
  <script src="../../template/vendor/leaflet/leaflet.js"></script>
  <script src="./data.js${v}"></script>
  <script src="../../template/engine.js${v}"></script>
</body>
</html>
`;
}

function generateManifest(trip) {
  const m = trip.meta;
  return JSON.stringify({
    name: m.title || trip.slug,
    short_name: m.shortTitle || trip.slug,
    description: m.description || '',
    start_url: './index.html',
    scope: './',
    display: 'standalone',
    background_color: '#f7f4ec',
    theme_color: m.themeColor || '#122437',
    icons: [
      { src: '../../template/vendor/icon-192.png', sizes: '192x192', type: 'image/png' },
      { src: '../../template/vendor/icon-512.png', sizes: '512x512', type: 'image/png' }
    ]
  }, null, 2) + '\n';
}

function generateServiceWorker(trip, assetFiles, cacheHash) {
  const cacheName = `trip-${trip.slug}-${cacheHash}`;
  const v = cacheHash ? `?v=${encodeURIComponent(cacheHash)}` : '';
  const precache = [
    './',
    './index.html',
    `./data.js${v}`,
    './manifest.webmanifest',
    `../../template/styles.css${v}`,
    `../../template/engine.js${v}`,
    '../../template/vendor/leaflet/leaflet.css',
    '../../template/vendor/leaflet/leaflet.js',
    '../../template/vendor/icon.svg',
    '../../template/vendor/icon-192.png',
    ...assetFiles.map(f => `./assets/${f}`)
  ];

  return `const CACHE_NAME = ${JSON.stringify(cacheName)};
const PRECACHE_URLS = ${JSON.stringify(precache, null, 2)};

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(PRECACHE_URLS)).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME && k.startsWith('trip-${trip.slug}-')).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  const req = event.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) {
    // Let browser handle cross-origin map tiles natively (preserves Referer & HTTP cache)
    return;
  }
  const isCodeOrDoc = req.mode === 'navigate' || /\\.(html|js|css|webmanifest)$/i.test(url.pathname) || url.pathname.endsWith('/');
  if (isCodeOrDoc) {
    event.respondWith(
      fetch(req).then(res => {
        if (res && res.ok) {
          const copy = res.clone();
          caches.open(CACHE_NAME).then(c => c.put(req, copy)).catch(() => {});
        }
        return res;
      }).catch(() => caches.match(req))
    );
    return;
  }
  event.respondWith(
    caches.match(req).then(cached => {
      if (cached) return cached;
      return fetch(req).then(res => {
        if (res && res.ok) {
          const copy = res.clone();
          caches.open(CACHE_NAME).then(c => c.put(req, copy)).catch(() => {});
        }
        return res;
      });
    })
  );
});
`;
}

function generatePortalHtml(trips) {
  const cardsHtml = trips.map(trip => {
    const m = trip.meta;
    const href = `./trips/${encodeURIComponent(trip.slug)}/`;
    const cover = m.coverImage ? `./trips/${encodeURIComponent(trip.slug)}/${m.coverImage}` : '';
    const tags = (m.tags || []).map(t => `<span>${esc(t)}</span>`).join('');
    return `
      <article class="trip-card">
        <a class="trip-cover" href="${href}">
          ${cover ? `<img src="${esc(cover)}" alt="${esc(m.coverAlt || m.portalTitle || m.title)}" loading="lazy">` : ''}
          ${m.dates ? `<span class="trip-date-badge">${esc(m.dates)}</span>` : ''}
        </a>
        <div class="trip-body">
          <div class="trip-route">${esc(m.routeSummary || '')}</div>
          <h2><a href="${href}">${esc(m.portalTitle || m.title)}</a></h2>
          <p>${esc(m.description || '')}</p>
          ${tags ? `<div class="trip-tags">${tags}</div>` : ''}
          <div class="trip-actions">
            <a class="trip-btn" href="${href}">打开完整行程 ↗</a>
            <a class="trip-btn trip-btn-ghost" href="${href}?mode=mobile">手机随身版</a>
          </div>
        </div>
      </article>
    `;
  }).join('\n');

  return `<!doctype html>
<html lang="zh-CN">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
  <meta name="theme-color" content="#122437">
  <meta name="description" content="个人自驾与旅行计划合集，支持桌面完整版、交互路线地图与 iPhone 离线随身版。">
  <title>Trip Plans｜出行计划合集</title>
  <link rel="icon" href="./template/vendor/icon.svg" type="image/svg+xml">
  <link rel="apple-touch-icon" href="./template/vendor/icon-192.png">
  <link rel="stylesheet" href="./template/portal.css">
</head>
<body>
  <header class="portal-hero">
    <div class="container">
      <div class="portal-top">
        <a class="portal-brand" href="./">
          <span class="portal-brand-icon">✦</span>
          <span>TRIP PLANS<small>COOKIEHANKIE ARCHIVE</small></span>
        </a>
        <span class="portal-count">共 ${trips.length} 份行程</span>
      </div>
      <div class="eyebrow"><span class="line"></span> PERSONAL TRAVEL ARCHIVE</div>
      <h1>把每一次出发，<br><em>做成带得走的行程册。</em></h1>
      <p>每份行程独立维护，桌面端看完整地图、多视角对比与自定义路线；手机打开自动切入随身模式，支持一键复制地址、拉起导航以及无信号离线查看。</p>
    </div>
  </header>

  <main class="portal-main">
    <div class="container">
      <section class="trip-grid" aria-label="行程列表">
        ${cardsHtml}
      </section>
    </div>
  </main>

  <footer class="portal-footer">
    <div class="container portal-footer-inner">
      <div><strong>TRIP PLANS</strong> · 每份行程独立保存在 <code>trips/&lt;slug&gt;/</code></div>
      <a href="https://github.com/cookiehankie/trip-plans" target="_blank" rel="noopener">GitHub Repository ↗</a>
    </div>
  </footer>
</body>
</html>
`;
}

function main() {
  if (!fs.existsSync(TEMPLATE_DIR)) {
    throw new Error('Missing template/ directory');
  }
  if (!fs.existsSync(TRIPS_DIR)) {
    throw new Error('Missing trips/ directory');
  }

  // Clean docs/ and rebuild from scratch
  fs.rmSync(DOCS_DIR, { recursive: true, force: true });
  fs.mkdirSync(DOCS_DIR, { recursive: true });
  fs.writeFileSync(path.join(DOCS_DIR, '.nojekyll'), '');

  // Copy shared template assets
  copyDir(TEMPLATE_DIR, path.join(DOCS_DIR, 'template'));

  // Discover, validate, and build each trip
  const slugs = fs.readdirSync(TRIPS_DIR, { withFileTypes: true })
    .filter(d => d.isDirectory() && !d.name.startsWith('_') && !d.name.startsWith('.'))
    .map(d => d.name)
    .sort();

  const trips = [];
  for (const slug of slugs) {
    const srcTripDir = path.join(TRIPS_DIR, slug);
    const data = loadTripData(slug, srcTripDir);
    const dstTripDir = path.join(DOCS_DIR, 'trips', slug);
    fs.mkdirSync(dstTripDir, { recursive: true });

    fs.copyFileSync(path.join(srcTripDir, 'data.js'), path.join(dstTripDir, 'data.js'));
    const srcAssetsDir = path.join(srcTripDir, 'assets');
    if (fs.existsSync(srcAssetsDir)) {
      copyDir(srcAssetsDir, path.join(dstTripDir, 'assets'));
    }
    const assetFiles = listFilesRelative(srcAssetsDir);

    const hash = crypto.createHash('sha256')
      .update(fs.readFileSync(path.join(srcTripDir, 'data.js')))
      .update(fs.readFileSync(path.join(TEMPLATE_DIR, 'engine.js')))
      .update(fs.readFileSync(path.join(TEMPLATE_DIR, 'styles.css')))
      .digest('hex')
      .slice(0, 8);

    fs.writeFileSync(path.join(dstTripDir, 'index.html'), generateTripHtml(data, hash), 'utf8');
    fs.writeFileSync(path.join(dstTripDir, 'manifest.webmanifest'), generateManifest(data), 'utf8');
    fs.writeFileSync(path.join(dstTripDir, 'sw.js'), generateServiceWorker(data, assetFiles, hash), 'utf8');

    trips.push(data);
    console.log(`Built trips/${slug} (${(data.places.stops || []).length} stops, ${assetFiles.length} assets)`);
  }

  // Sort portal newest sortDate first
  trips.sort((a, b) => b.sortDate.localeCompare(a.sortDate));
  fs.writeFileSync(path.join(DOCS_DIR, 'index.html'), generatePortalHtml(trips), 'utf8');
  console.log(`Built portal docs/index.html with ${trips.length} trip(s).`);
}

main();
