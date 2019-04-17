var cacheName = "oranger-sw-v2";

var urlsToCache = ["/", "/icon.png"];

function handleInstall(event) {
  // Perform install steps
  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      // Opened cache
      return cache.addAll(urlsToCache);
    })
  );
}

function handleFetch(event) {
  event.respondWith(
    caches.match(event.request).then(function(response) {
      // Cache hit - return response
      if (response) {
        return response;
      }
      return fetch(event.request);
    })
  );
}

self.addEventListener("install", handleInstall);

// Fetch the contents and reply with cache
self.addEventListener("fetch", handleFetch);
