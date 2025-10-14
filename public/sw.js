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
  
  // 로컬호스트는 허용, 외부 도메인만 차단
  const isLocalhost = url.hostname === 'localhost' || url.hostname === '127.0.0.1';
  const isSameOrigin = url.hostname === self.location.hostname;
  
  // 외부 도메인은 Service Worker가 처리하지 않음 (로컬호스트 제외)
  if (!isLocalhost && !isSameOrigin) {
    return; // 브라우저가 직접 처리
  }
  
  // 같은 도메인 또는 로컬호스트 요청만 Service Worker로 처리
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
