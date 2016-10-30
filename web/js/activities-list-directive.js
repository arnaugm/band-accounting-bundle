'use strict';

angular.module('directives.activitiesList', ['resources.activity', 'helpers.date'])

  .directive('activitiesListDirective', ['activityResource', 'dateHelper', '$rootScope', function(activityResource, dateHelper, $rootScope) {

    return {
      restrict: 'E',
      templateUrl: 'templates/activities-list-directive.html',
      controller: function($scope) {
        $scope.activities = [];

        activityResource.get().$promise.then(function(result) {
          $scope.total = result.total;
          $scope.activities = result.activities;
        }).catch(function(e) {
          console.log('error getting activity list');
        });

        $rootScope.$on('activitySaved', function(event, activityId) {
          activityResource.get(activityId).$promise.then(function(result) {
            $scope.activities.unshift(result.activity);
          }).catch(function(e) {
            console.log('error getting inserted activity');
          });
        });
      }
    };
  }]);