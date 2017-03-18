'use strict';

angular.module('resources.activity', ['ngResource'])

  .factory('activityResource', ['$resource', '$q', function($resource, $q) {

    var activityResource = {
      api: {
        activities: $resource('/activities'),
        activity: $resource('/activities/:activityId', {activityId: '@activityId'}, {
          update: {method: 'PUT'}
        })
      }
    };

    activityResource.get = function(filter) {
      var deferred = $q.defer();
      var queryParams = filter ? {term: filter} : {};
      this.api.activities.get(queryParams).$promise.then(function(result) {
        if(result.activities) {
          result.activities.forEach(function(activity) {
            activity.amount = parseFloat(activity.amount);
            activity.date = transformTimezone(activity.date);
            activity.dateValue = transformTimezone(activity.dateValue);
          });
          deferred.resolve(result);
        }
      });

      return deferred.promise;
    };

    activityResource.save = function(activity) {
      return this.api.activities.save(activity);
    };

    activityResource.update = function(activity) {
      return this.api.activity.update({activityId: activity.id}, activity);
    };

    var transformTimezone = function(richDate) {
      var stringDate = richDate.date + ' GMT';
      var date = new Date(stringDate);
      return date;
    };

    return activityResource;
  }]);