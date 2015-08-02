'use strict';
importScripts('jankify.js');

onmessage = function() {
  postMessage(self.jank());
};
