'use strict';

angular.module('filters', [])

  .filter('toJsDate', function() {

    return function(input) {
      if (input) {
        return new Date(input.date);
      }
    };
  });