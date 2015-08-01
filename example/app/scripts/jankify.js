'use strict';
var num = 0;
window.jank = function() {
  // an excessive calculation to jank the browser
  var len = 5000000;
  do {
    Math.sin(len)
  } while (len--);
  num++;

  return `My computation number ${ num } is done`;
};
