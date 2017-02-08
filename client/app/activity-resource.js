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

    activityResource.get = function() {
      var deferred = $q.defer();
      this.api.activities.get().$promise.then(function(result) {
        result.activities.forEach(function(activity) {
          activity.amount = parseFloat(activity.amount);
          activity.date = new Date(activity.date.date);
          activity.dateValue = new Date(activity.dateValue.date);
        });
        deferred.resolve(result);
      });

      return deferred.promise;
    };

    activityResource.save = function(activity) {
      return this.api.activities.save(activity);
    };

    activityResource.update = function(activity) {
      return this.api.activity.update({activityId: activity.id}, activity);
    };

    return activityResource;
  }]);