self.addEventListener('install', function(e) {
  e.waitUntil(
    caches.open('your-magic-cache').then(function(cache) {
      return cache.addAll([
        '/',
        '/index.html',
        '/yahtzee.html',
        '/toolbox.html',
        '/manifest.json',
        '/app-icon-192.png',
        '/app-icon-512.png',
        '/assets/js/breakpoints.min.js',
        '/assets/js/browser.min.js',
        '/assets/js/jquery.min.js',
        '/assets/js/main.js',
        '/assets/js/util.js',
        '/assets/js/dice.js',
        '/assets/css/util.js',
        '/assets/css/dice.css',
        '/assets/css/main.css',
        '/assets/css/font-awesome.min.css',
        '/assets/fonts/fontawesome-webfont.eot',
        '/assets/fonts/fontawesome-webfont.svg',
        '/assets/fonts/fontawesome-webfont.ttf',
        '/assets/fonts/fontawesome-webfont.woff',
        '/assets/fonts/fontawesome-webfont.woff2',
        '/assets/fonts/FontAwesome.otf',
        '/assets/images/dicelogo.png',
        '/assets/images/yahtzee.JPG',
      ]);
    })
  );
});

self.addEventListener('fetch', function(event) {
    console.info(event.request.url);
});