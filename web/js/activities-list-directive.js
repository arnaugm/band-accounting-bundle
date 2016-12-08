'use strict';

angular.module('directives.activitiesList', ['resources.activity', 'helpers.date', 'ngMaterial'])

  .directive('activitiesListDirective', ['activityResource', 'dateHelper', '$rootScope', '$mdDialog', '$mdToast', function(activityResource, dateHelper, $rootScope, $mdDialog, $mdToast) {

    return {
      restrict: 'E',
      templateUrl: 'templates/activities-list-directive.html',
      scope: {},
      controller: function($scope) {
        $scope.activities = [];

        activityResource.get().then(function(result) {
          $scope.total = result.total;
          $scope.activities = result.activities;

        }).catch(function(e) {
          console.log('error getting activity list');

        });

        $rootScope.$on('activitySaved', function(event, activity) {
          $mdToast.showSimple('Activity saved');
          $scope.activities.unshift(activity);
          $mdDialog.hide();

        });

        $rootScope.$on('activityUpdated', function(event, activity) {
          $mdToast.showSimple('Activity saved');
          $scope.activities[$scope.activityInEdition] = activity;
          $mdDialog.hide();

        });

        $rootScope.$on('saveError', function(event) {
          $mdToast.showSimple('Error saving activity');
          $mdDialog.hide();

        });

        $rootScope.newActivity = function($event) {
          $mdDialog.show({
            controller: ['$scope', '$mdDialog', DialogController],
            templateUrl: '../templates/edit-activity-dialog.html',
            parent: angular.element(document.body),
            targetEvent: $event,
            clickOutsideToClose: true,
            fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
          })
        };

        $scope.customFullscreen = false;
        $scope.editActivity = function($event, $index) {
          $scope.activityInEdition = $index;

          $mdDialog.show({
            controller: ['$scope', '$mdDialog', 'activity', DialogController],
            locals: {
              activity: $scope.activities[$index]
            },
            templateUrl: '../templates/edit-activity-dialog.html',
            parent: angular.element(document.body),
            targetEvent: $event,
            clickOutsideToClose: true,
            fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
          })
        };

        function DialogController($scope, $mdDialog, activity) {
          $scope.activity = activity;

          $scope.cancel = function() {
            $mdDialog.cancel();
          };
        }
      }
    };
  }]);