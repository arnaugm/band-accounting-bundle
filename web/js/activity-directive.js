'use strict';

angular.module('directives.activity', ['models.activity', 'ngMaterial'])

  .directive('activityDirective', ['activityModel', '$mdToast', '$rootScope', function(ActivityModel, $mdToast, $rootScope) {

    return {
      restrict: 'E',
      templateUrl: 'templates/edit-activity-directive.html',
      controller: function($scope) {
        $scope.activity = new ActivityModel();

        $scope.save = function() {
          $scope.activity.save().then(function(data) {
            $rootScope.$broadcast('activitySaved', data.id);
            $mdToast.showSimple('Activity saved');
          }).catch(function() {
            $mdToast.showSimple('Error saving activity');
          });
        };

        $scope.valid = function() {
          return ($scope.activity.concept &&
          $scope.activity.amount &&
          $scope.activity.dateValue);
        }
      }
    };
  }]);