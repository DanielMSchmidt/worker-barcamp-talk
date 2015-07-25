'use strict';
var baseProductsUrl = function(page) {
    return 'https://productmate.de/api/products?page=' + page + '&page_limit=40&seed=0.800341673893854';
  },
  currentPage = 1,
  loading = false,
  allProducts = [],
  getNextPage = function() {
    loading = true;
    var promise = $.get(baseProductsUrl(currentPage));
    currentPage++;
    promise.then(function(newProducts) {
      $.merge(allProducts, newProducts.results);
      loading = false;
    });
    return promise;
  },
  getAllProducts = function() {
    return allProducts;
  },
  reset = function() {
    currentPage = 1;
    allProducts = [];
    loading = false;
  },
  isLoading = function() {
    return loading;
  };


window.loader = {
  getNextPage: getNextPage,
  getAllProducts: getAllProducts,
  reset: reset,
  isLoading: isLoading,
};
