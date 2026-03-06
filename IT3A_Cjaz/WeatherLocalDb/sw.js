//pro práci offline a ukládání do cache
    
const CACHE_NAME = "v2";
const cacheAssets = [
    '/',
    '/index.html',
    '/style.css',
    '/app.js',
    '/icon-192.png',
    '/icon-512.png'
];
    
self.addEventListener("install", event => {
    event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
        return cache.addAll(cacheAssets);
    })
    );
});
    
self.addEventListener("activate", event => {
    const cacheWhitelist = [CACHE_NAME];
    event.waitUntil(
    caches.keys().then(cacheNames => {
        return Promise.all(
        cacheNames.map(cacheName => {
            if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
            }
        })
        );
    })
    );
});
    
const WEATHER_API_ORIGIN = "https://api.openweathermap.org";
const WEATHER_API_PATH = "/data/2.5/weather";
    
self.addEventListener("fetch", event => {
    const url = new URL(event.request.url);
    
    if (url.origin === WEATHER_API_ORIGIN &&
        url.pathname === WEATHER_API_PATH) {
    
    // vynucení CORS – klíčové!
    const apiRequest = new Request(event.request, { mode: "cors" });
    
    event.respondWith(
        caches.open(CACHE_NAME).then(cache => {
    
        return fetch(apiRequest)
            .then(async networkResponse => {
            // ONLINE DATA
            const json = await networkResponse.clone().json();
            json.cached = false;
            json.cachedTime = Date.now();
    
            const modifiedResponse = new Response(
                JSON.stringify(json),
                {
                headers: { "Content-Type": "application/json" },
                status: networkResponse.status,
                statusText: networkResponse.statusText
                }
            );
    
            cache.put(apiRequest, modifiedResponse.clone());
    
            return modifiedResponse;
            })
            .catch(async () => {
            // OFFLINE – CACHE
            const cached = await cache.match(apiRequest);
            if (cached) {
                const json = await cached.clone().json();
                json.cached = true;
                //cachedTime neměníme
    
                return new Response(
                JSON.stringify(json),
                {
                    headers: { "Content-Type": "application/json" },
                    status: cached.status,
                    statusText: cached.statusText
                }
                );
            }
    
            // NIC V CACHE
            return new Response(JSON.stringify({
                message: "Jste offline a nemáme žádná uložená data.",
                cached: false,
                cachedTime: null
            }), {
                headers: { "Content-Type": "application/json" }
            });
            });
    
        })
    );
    
    return;
    }
    
    // ostatní soubory
    event.respondWith(
    caches.match(event.request).then(c => c || fetch(event.request))
    );
});