//pro práci offline a ukládání do cache
    
const CACHE_NAME = "v1";
const cacheAssets = [
    "/",
    "/index.html",
    "/style.css",
    "/app_index.js",
    "/img/icon-192.png",
    "/img/icon-512.png"
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
    
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request).then(response => {
            // Pokud je odpověď v cache, vrátíme ji
            if (response) {
                return response;
            }
            // Jinak se pokusíme načíst ji ze sítě
            return fetch(event.request).then(networkResponse => {
                // Klonování odpovědi kvůli přidání do cache
                const responseClone = networkResponse.clone();
                caches.open(CACHE_NAME).then(cache => {
                    cache.put(event.request, responseClone);
                });
                return networkResponse;
            });
        }).catch(() => {
            // Zobrazení náhradní stránky, pokud ani cache, ani síť nejsou dostupné
            //return caches.match('/offline.html');
            console.log("Offline and no cache");
        })
    );
});
