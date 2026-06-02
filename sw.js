// sw.js — Zintsomi Storytelling College Service Worker
// Place this file in the ROOT of your GitHub repo (same folder as index.html)
// It will be served at: https://zintsomistorytellingcollege.co.za/sw.js

var CACHE_NAME = 'zintsomi-v2';

// Pages and assets to pre-cache on install (offline shell)
var PRECACHE_URLS = [
  '/',
  '/index.html',
];

// ── Install: pre-cache the shell ──────────────────────────────
self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      return cache.addAll(PRECACHE_URLS);
    }).then(function() {
      return self.skipWaiting(); // activate immediately
    })
  );
});

// ── Activate: delete old caches ───────────────────────────────
self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(keys) {
      return Promise.all(
        keys.filter(function(key) { return key !== CACHE_NAME; })
            .map(function(key) { return caches.delete(key); })
      );
    }).then(function() {
      return self.clients.claim(); // take control immediately
    })
  );
});

// ── Fetch: network-first with cache fallback ──────────────────
// Network-first keeps content fresh; cache used only when offline.
// API calls (Supabase, Anthropic proxy) are never cached.
self.addEventListener('fetch', function(event) {
  var url = event.request.url;

  // Never cache API calls — always go to network
  if (
    url.includes('supabase.co') ||
    url.includes('api.anthropic.com') ||
    url.includes('googleapis.com') ||
    event.request.method !== 'GET'
  ) {
    return; // let browser handle it normally
  }

  event.respondWith(
    fetch(event.request)
      .then(function(response) {
        // Cache a copy of successful responses
        if (response.ok) {
          var copy = response.clone();
          caches.open(CACHE_NAME).then(function(cache) {
            cache.put(event.request, copy);
          });
        }
        return response;
      })
      .catch(function() {
        // Offline fallback — return cached version if available
        return caches.match(event.request).then(function(cached) {
          return cached || caches.match('/');
        });
      })
  );
});
