'use strict';
importScripts('polyfill/serviceworker-cache-polyfill.js');
importScripts('loader.js');


var CACHE_KEY = 'fetching-v1',
    PRDOCUT_PAGES_TO_BE_CACHED = 10;

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_KEY).then(function(cache) {
      var scriptUrls = [
        '../bower_components/jquery/dist/jquery.js',
        'jankify.js',
        'loader.js',
        'main.js'
      ], productPageUrls = self.loader.getCachableProductRequests(PRDOCUT_PAGES_TO_BE_CACHED),
        toBeCached = scriptUrls.concat(productPageUrls),
        requests = toBeCached.map(function(url) {
          var req = new Request(url, {mode: 'no-cors' });
          console.log('Processing: ', url, req);
          return req;
        });

      return cache.addAll(requests);
    });
  );
});

self.addEventListener('fetch', function(event) {
  var response;
  var cachedResponse = caches.match(event.request)
    .catch(function() {
      return fetch(event.request);
    }).then(function(r) {
      response = r;
      caches.open(CACHE_KEY).then(function(cache) {
        cache.put(event.request, response);
      });
      return response.clone();
    });
});
