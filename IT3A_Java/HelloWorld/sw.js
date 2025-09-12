//pro práci offline a ukládání do cache
  
const CACHE_NAME = "v1";
const cacheAssets = [
  "/",
  "/index.html",
  "/style.css",
  "/app.js",
  "/icon-192.png",
  "/icon-512.png"
];
  
self.addEventListener("install", e => {
  e.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log("Caching files");
        return cache.addAll(cacheAssets);
      })
      .then(() => self.skipWaiting())
  );
});
  
self.addEventListener("activate", e => {
  e.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cache => {
          if (cache !== CACHE_NAME) {
            console.log("Removing old cache", cache);
            return caches.delete(cache);
          }
        })
      );
    })
  );
});
  
self.addEventListener("fetch", e => {
  e.respondWith(
    fetch(e.request).catch(() => caches.match(e.request))
  );
});
