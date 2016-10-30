'use strict';

angular.module('resources.activity', ['ngResource'])

  .factory('activityResource', ['$resource', function($resource) {

    var activityResource = {
      api: {
        getActivity: $resource('/activity/:activityId', {activityId: '@activityId'}),
        getList: $resource('/activity/list'),
        saveActivity: $resource('/activity/new')
      }
    };

    activityResource.get = function(activityId) {
      if (!activityId) {
        return this.api.getList.get();
      } else {
        return this.api.getActivity.get({activityId: activityId});
      }
    };

    activityResource.save = function(activity) {
      return this.api.saveActivity.save(activity);
    };

    return activityResource;
  }]);