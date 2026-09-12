// ==========================================
// MOLLY.CO SERVICE WORKER
// İnternetsiz ana ekran desteği
// ==========================================

const CACHE_NAME = "molly-co-v1";

const APP_SHELL = [
  "/",
  "/index.html",
  "/style.css",
  "/script.js",
  "/manifest.json"
];

// Uygulamanın temel dosyalarını telefona kaydet
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(APP_SHELL);
      })
  );

  self.skipWaiting();
});

// Yeni Service Worker hemen devreye girsin
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((cacheName) => cacheName !== CACHE_NAME)
          .map((cacheName) => caches.delete(cacheName))
      );
    })
  );

  self.clients.claim();
});

// İnternet yoksa telefonda saklanan Molly.co dosyalarını kullan
self.addEventListener("fetch", (event) => {

  // Sadece GET isteklerini ele al
  if (event.request.method !== "GET") {
    return;
  }

  // Sayfa açılışı
  if (event.request.mode === "navigate") {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          const copy = response.clone();

          caches.open(CACHE_NAME).then((cache) => {
            cache.put("/index.html", copy);
          });

          return response;
        })
        .catch(() => {
          return caches.match("/index.html");
        })
    );

    return;
  }

  // Diğer dosyalar
  event.respondWith(
    caches.match(event.request)
      .then((cachedResponse) => {

        if (cachedResponse) {
          return cachedResponse;
        }

        return fetch(event.request)
          .then((networkResponse) => {

            // Başarılı dosyaları daha sonra kullanmak için sakla
            if (
              networkResponse &&
              networkResponse.status === 200
            ) {
              const copy = networkResponse.clone();

              caches.open(CACHE_NAME).then((cache) => {
                cache.put(event.request, copy);
              });
            }

            return networkResponse;
          });
      })
  );
});
