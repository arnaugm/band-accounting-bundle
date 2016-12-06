'use strict';

angular.module('directives.editActivity', ['models.activity', 'resources.activity'])

  .directive('editActivityDirective', ['activityModel', 'activityResource', '$rootScope', function(ActivityModel, activityResource, $rootScope) {

    return {
      restrict: 'E',
      templateUrl: 'templates/edit-activity-directive.html',
      scope: {
        activity: '=?'
      },

      controller: function($scope) {
        if (!$scope.activity) {
          $scope.activity = new ActivityModel();

        } else {
          $scope.activity = new ActivityModel($scope.activity);

        }

        $scope.save = function(e) {
          if ($scope.activity.id) {
            $scope.activity.update().then(function(response) {
              $rootScope.$broadcast('activityUpdated', $scope.activity);

            }).catch(function(e) {
              $rootScope.$broadcast('saveError');

            });

          } else {
            $scope.activity.save().then(function(response) {
              $scope.activity.id = response.id;
              $scope.activity.date = new Date(response.date.date);
              $rootScope.$broadcast('activitySaved', $scope.activity);

            }).catch(function(e) {
              $rootScope.$broadcast('saveError');

            });
          }
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