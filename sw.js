self.addEventListener('install', function(e) {
  e.waitUntil(
    caches.open('your-magic-cache').then(function(cache) {
      return cache.addAll([
        'index.html',
        'yahtzee.html',
        // 'toolbox.html',
        // 'manifest.json',
        // 'app-icon-192.png',
        // 'app-icon-512.png',
        // 'assets/js/breakpoints.min.js',
        // 'assets/js/browser.min.js',
        // 'assets/js/jquery.min.js',
        // 'assets/js/main.js',
        // 'assets/js/util.js',
        // 'assets/js/dice.js',
        // 'assets/js/util.js',
        // 'assets/css/dice.css',
        // 'assets/css/main.css'
      ]);
    })
  );
});

self.addEventListener('fetch', function(event) {
  console.log(event.request.url);
  event.respondWith(
    caches.match(event.request).then(function(response) {
      return response || fetch(event.request);
    })
  );
 });