const CACHE_NAME = "trip-2026-thanksgiving-la-dv-727862d2";
const PRECACHE_URLS = [
  "./",
  "./index.html",
  "./data.js",
  "./manifest.webmanifest",
  "../../template/styles.css",
  "../../template/engine.js",
  "../../template/vendor/leaflet/leaflet.css",
  "../../template/vendor/leaflet/leaflet.js",
  "../../template/vendor/icon.svg",
  "../../template/vendor/icon-192.png",
  "./assets/badwater-artists.jpg",
  "./assets/dantes-view.jpg",
  "./assets/death-valley-night.jpg",
  "./assets/griffith-sunrise.jpg",
  "./assets/mesquite-dunes.jpg",
  "./assets/santa-monica-sunset.jpg",
  "./assets/sawtelle-kappo.jpg",
  "./assets/us395-towne-pass.jpg",
  "./assets/venice-canals.jpg",
  "./assets/zabriskie-sunset.jpg"
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(PRECACHE_URLS)).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME && k.startsWith('trip-2026-thanksgiving-la-dv-')).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  const req = event.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) {
    // Network-first for map tiles, fallback to cache if visited before
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
