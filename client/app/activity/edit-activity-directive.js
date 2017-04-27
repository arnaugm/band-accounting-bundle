'use strict';

angular.module('directives.editActivity', ['models.activity', 'resources.activity', 'ngMaterial'])

  .config(function($mdDateLocaleProvider) {

    // Can change week display to start on Monday.
    $mdDateLocaleProvider.firstDayOfWeek = 1;

    $mdDateLocaleProvider.formatDate = function(date) {
      date = new Date(date);
      return date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear();
    };
  })

  .directive('editActivity', ['activityModel', 'activityResource', '$rootScope', function(ActivityModel, activityResource, $rootScope) {

    return {
      restrict: 'E',
      templateUrl: 'bundles/rootdiamoonsbandaccounting/templates/edit-activity-directive.html',
      scope: {
        activity: '=?',
        index: '=?'
      },
      controller: ['$scope', function($scope) {
        if (!$scope.activity) {
          $scope.activity = new ActivityModel();

        } else {
          $scope.activity = new ActivityModel($scope.activity);

        }

        $scope.save = function() {
          if ($scope.activity.id) {
            $scope.activity.update().then(function(response) {
              $rootScope.$broadcast('activityUpdated', $scope.activity, $scope.index);

            }).catch(function(e) {
              $rootScope.$broadcast('saveError');

            });

          } else {
            $scope.activity.save().then(function(response) {
              if (response.id === undefined) {
                $rootScope.$broadcast('saveError', {message: 'wrong response: ' + JSON.stringify(response)});
                return;
              }
              $scope.activity.id = response.id;
              $scope.activity.date = new Date(response.date.date);
              $rootScope.$broadcast('activitySaved', $scope.activity);

            }).catch(function(error) {
              $rootScope.$broadcast('saveError', error.data.message);

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
      }]
    };
  }]);
