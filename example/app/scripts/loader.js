var baseProductsUrl = function(page) {
      return 'https://productmate.de/api/products?page=' + page + '&page_limit=40&seed=0.800341673893854';
    },
    currentPage = 1,
    allProducts = [],
    getNextPage = function() {
      var promise = $.get(baseProductsUrl(currentPage));
      promise.then(function(newProducts) {
        $.merge(allProducts, newProducts.results);
      });
      return promise;
    },
    getAllProducts = function() {
      return allProducts;
    },
    reset = function() {
      currentPage = 1;
      allProducts = [];
    };


window.loader = {
  getNextPage: getNextPage,
  getAllProducts: getAllProducts,
  reset: reset
}
