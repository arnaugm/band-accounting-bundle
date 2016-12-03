'use strict';

angular.module('resources.activity', ['ngResource'])

  .factory('activityResource', ['$resource', '$q', function($resource, $q) {

    var activityResource = {
      api: {
        getActivity: $resource('/activity/:activityId', {activityId: '@activityId'}),
        getList: $resource('/activity/list'),
        saveActivity: $resource('/activity/new')
      }
    };

    activityResource.get = function(activityId) {
      var deferred = $q.defer();
      if (!activityId) {
        this.api.getList.get().$promise.then(function(result) {
          result.activities.forEach(function(activity) {
            activity.amount = parseFloat(activity.amount);
            activity.date = new Date(activity.date.date);
            activity.dateValue = new Date(activity.dateValue.date);
          });
          deferred.resolve(result);
        });
      } else {
        this.api.getActivity.get({activityId: activityId}).$promise.then(function(result) {
          var activity = result.activity;
          activity.amount = parseFloat(activity.amount);
          activity.date = new Date(activity.date.date);
          activity.dateValue = new Date(activity.dateValue.date);
          deferred.resolve(activity);
        });
      }
      return deferred.promise;
    };

    activityResource.save = function(activity) {
      return this.api.saveActivity.save(activity);
    };

    return activityResource;
  }]);