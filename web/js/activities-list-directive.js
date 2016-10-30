'use strict';

angular.module('directives.activitiesList', ['resources.activity', 'helpers.date', 'ngMaterial'])

  .directive('activitiesListDirective', ['activityResource', 'dateHelper', '$rootScope', '$mdDialog', function(activityResource, dateHelper, $rootScope, $mdDialog) {

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

        $scope.customFullscreen = false;
        $scope.editActivity = function($event, activity) {
          $mdDialog.show({
            controller: ['$scope', '$mdDialog', 'activityId', DialogController],
            locals: {
              activityId: activity.id
            },
            templateUrl: '../templates/edit-activity-dialog.html',
            parent: angular.element(document.body),
            targetEvent: $event,
            clickOutsideToClose: true,
            fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
          })
            .then(function(answer) {

            }, function() {

            });
        };

        function DialogController($scope, $mdDialog, activityId) {
          $scope.activityId = activityId;
          
          $scope.hide = function() {
            $mdDialog.hide();
          };

          $scope.cancel = function() {
            $mdDialog.cancel();
          };

          $scope.answer = function(answer) {
            $mdDialog.hide(answer);
          };
        }

      }
    };
  }]);