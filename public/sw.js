self.addEventListener('install', () => {
  console.log('Service Worker 설치됨');
  self.skipWaiting();
});

self.addEventListener('activate', () => {
  console.log('Service Worker 활성화됨');
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);
  
  // HTTP 요청이나 외부 도메인은 Service Worker가 처리하지 않음
  if (url.protocol === 'http:' || url.hostname !== self.location.hostname) {
    return; // 브라우저가 직접 처리
  }
  
  // HTTPS 요청만 Service Worker로 처리
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
