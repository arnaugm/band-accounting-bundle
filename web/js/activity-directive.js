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
          activityResource.get($scope.activityId).$promise.then(function(result) {
            $scope.activity = new ActivityModel(result.activity);
          }).catch(function(e) {
            console.log('error getting activity ' + activityId);
          });
        } else {
          $scope.activity = new ActivityModel();
        }

        $scope.save = function() {
          $scope.activity.save().then(function(data) {
            $rootScope.$broadcast('activitySaved', data.id);
            $mdToast.showSimple('Activity saved');
          }).catch(function() {
            $mdToast.showSimple('Error saving activity');
          });
        };

        $scope.valid = function() {
          return (
            $scope.activity.concept &&
            $scope.activity.amount &&
            $scope.activity.dateValue
          );
        }
      }
    };
  }]);