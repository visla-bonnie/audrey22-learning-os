const CACHE_PREFIX='audrey22-';
self.addEventListener('install',event=>{self.skipWaiting();});
self.addEventListener('activate',event=>{event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith(CACHE_PREFIX)).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));});
// V3.4 intentionally does not intercept fetches. GitHub Pages should always serve the newest uploaded files.
