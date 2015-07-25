/* global describe, it */

(function () {
  'use strict';

  describe('loader', function () {
    afterEach(function() {
      window.loader.reset();
    });

    it('should load the first / second / third page and return an array of items', function () {
      var l = window.loader,
          ITEMS_PER_LOAD = 40;

      expect(l.getAllProducts()).to.have.length(0);

      l.getNextPage().then(function() {
        expect(l.getAllProducts()).to.have.length(1 * ITEMS_PER_LOAD);
      });

      l.getNextPage().then(function() {
        expect(l.getAllProducts()).to.have.length(2 * ITEMS_PER_LOAD);
      });

      l.getNextPage().then(function() {
        expect(l.getAllProducts()).to.have.length(3 * ITEMS_PER_LOAD);
        done();
      });
    });
  });
})();
