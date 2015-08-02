'use strict';
var baseProductsUrl = function(page) {
    return 'https://productmate.de/api/products?page=' + page + '&page_limit=10&seed=0.800341673893854';
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
  },
  getShop = function(subdomain) {
    return $.get('https://productmate.de/api/shops/' + subdomain);
  },
  getShopProducts = function(subdomain) {
    return $.get('https://productmate.de/api/products?subdomain=' + subdomain);
  },
  getCachableProductRequests = function(count) {
    var result = [];
    for (var i = 1; i <= count; i++) {
      result.push(baseProductsUrl(i));
    }

    return result;
  };


var loader = {
  getNextPage,
  getAllProducts,
  reset,
  isLoading,
  getShop,
  getShopProducts,
  getCachableProductRequests
};


if (typeof window !== 'undefined') {
  window.loader = loader;
}

if (typeof self !== 'undefined') {
  self.loader = loader;
}
