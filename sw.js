// Service worker: primero red SIN caché (así siempre llega la versión nueva) y, sin conexión, lo guardado.
const CACHE = 'f11-v3';
const PRECACHE = ['./', 'index.html', 'manifest.webmanifest', 'icon-192.png', 'icon-512.png', 'apple-touch-icon.png'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(PRECACHE.map(u => new Request(u, {cache:'reload'})))).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  const req = e.request;
  const url = new URL(req.url);
  if (req.method !== 'GET' || url.origin !== self.location.origin) return;
  if (/\.pdf$/i.test(url.pathname)) return;               // los PDF van directos, sin tocarlos
  e.respondWith(
    fetch(req, {cache: 'no-store'}).then(res => {
      if (res && res.status === 200) {
        const copia = res.clone();
        caches.open(CACHE).then(c => c.put(req, copia));
      }
      return res;
    }).catch(() => caches.match(req).then(r => r || caches.match('index.html')))
  );
});
