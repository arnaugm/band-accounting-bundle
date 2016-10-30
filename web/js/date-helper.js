'use strict';

angular.module('helpers.date', [])

  .factory('dateHelper', function() {

    var dateHelper = {};

    dateHelper.dateToSimpleObject = function(datetime) {
      return {
        date: datetime.toString()
      }
    };

    return dateHelper;

  });