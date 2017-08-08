'use strict';

angular.module('directives.activitiesList', ['resources.activity', 'helpers.date', 'ngMaterial', 'templates'])

  .directive('activitiesList', ['activityResource', 'dateHelper', '$rootScope', '$mdDialog', '$mdToast', function(activityResource, dateHelper, $rootScope, $mdDialog, $mdToast) {

    return {
      restrict: 'E',
      templateUrl: 'templates/activities-list-directive.html',
      scope: {},
      controller: ['$scope', function($scope) {
        $scope.activities = [];
        $scope.status = 'PENDING';

        activityResource.get('2').then(function(result) {
          buildActivitiesListScope(result);

        }).catch(function(error) {
          console.log('error getting activity list');
          $scope.status = 'COMPLETE';

        });

        $rootScope.$on('activitySaved', function(event, activity) {
          $mdToast.showSimple('Activity saved');
          $scope.activities.unshift(activity);
          updateTotals(activity.amount);
          $mdDialog.hide();
        });

        $rootScope.$on('activityUpdated', function(event, activity, index) {
          $mdToast.showSimple('Activity saved');
          var oldAmount = $scope.activities[index].amount;
          $scope.activities[index] = activity;
          updateTotals(activity.amount, oldAmount);
          $mdDialog.hide();
        });

        $rootScope.$on('saveError', function(event, args) {
          $mdToast.showSimple('Error saving activity');
          $mdDialog.hide();
        });

        $rootScope.$on('currentTermFilter', function(event) {
          getActivitiesWithFilter('1');
        });

        $rootScope.$on('twoTermsFilter', function(event) {
          getActivitiesWithFilter('2');
        });

        $rootScope.$on('threeTermsFilter', function(event) {
          getActivitiesWithFilter('3');
        });

        $rootScope.$on('fourTermsFilter', function(event) {
          getActivitiesWithFilter('4');
        });

        $rootScope.$on('allEntriesFilter', function(event) {
          getActivitiesWithFilter();
        });

        $rootScope.newActivity = function($event) {
          $mdDialog.show({
            controller: ['$scope', '$mdDialog', dialogController],
            templateUrl: '/bundles/arnaugmbandaccounting/templates/edit-activity-dialog.html',
            parent: angular.element(document.body),
            targetEvent: $event,
            clickOutsideToClose: true,
            onComplete: afterShowAnimation,
            fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
          })
        };

        $scope.customFullscreen = false;
        $scope.editActivity = function($event, $index) {
          $mdDialog.show({
            controller: ['$scope', '$mdDialog', 'activity', 'index', dialogController],
            locals: {
              activity: $scope.activities[$index],
              index: $index
            },
            templateUrl: '/bundles/arnaugmbandaccounting/templates/edit-activity-dialog.html',
            parent: angular.element(document.body),
            targetEvent: $event,
            clickOutsideToClose: true,
            onComplete: afterShowAnimation,
            fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
          })
        };

        var dialogController = function($scope, $mdDialog, activity, index) {
          $scope.activity = activity;
          $scope.index = index;

          $scope.cancel = function() {
            $mdDialog.cancel();
          };
        };

        var afterShowAnimation = function() {
          document.getElementById('activity-concept').focus();
        };

        var updateTotals = function(amount, oldValue) {
          if (oldValue !== undefined) {
            if (oldValue > 0) {
              $scope.income -= oldValue;
            } else {
              $scope.expenses -= -oldValue
            }
            $scope.total -= oldValue;
          }

          if (amount > 0) {
            $scope.income += amount;
          } else {
            $scope.expenses += -amount
          }
          $scope.total += amount;
        };

        var getActivitiesWithFilter = function(filter) {
          activityResource.get(filter).then(function(result) {
            buildActivitiesListScope(result);
          }).catch(function(e) {
            console.log('error getting activity list with filter ' + filter);
          });
        };

        var buildActivitiesListScope = function(result) {
          $scope.total = result.total;
          $scope.income = result.income;
          $scope.expenses = result.expenses;
          $scope.activities = result.activities;
          $scope.status = 'COMPLETE';
        };
      }]
    };
  }]);
