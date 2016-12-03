'use strict';

angular.module('directives.activity', ['models.activity', 'resources.activity', 'ngMaterial'])

  .directive('activityDirective', ['activityModel', 'activityResource', '$mdToast', '$rootScope', function(ActivityModel, activityResource, $mdToast, $rootScope) {

    return {
      restrict: 'E',
      templateUrl: 'templates/edit-activity-directive.html',
      scope: {
        activityId: '='
      },

      controller: function($scope) {
        if ($scope.activityId) {
          activityResource.get($scope.activityId).then(function(activity) {
            $scope.activity = new ActivityModel(activity);
          }).catch(function(e) {
            console.log('error getting activity ' + $scope.activityId);
          });
        } else {
          $scope.activity = new ActivityModel();
        }

        $scope.save = function() {
          $scope.activity.save().then(function() {
            $scope.activity.date = new Date();
            $rootScope.$broadcast('activitySaved', $scope.activity);
            $mdToast.showSimple('Activity saved');
          }).catch(function() {
            $mdToast.showSimple('Error saving activity');
          });
        };

        $scope.valid = function() {
          return (
            $scope.activity &&
            $scope.activity.concept &&
            $scope.activity.amount &&
            $scope.activity.dateValue
          );
        }
      }
    };
  }]);