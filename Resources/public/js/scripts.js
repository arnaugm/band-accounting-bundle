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
            templateUrl: '../app/activity/edit-activity-dialog.html',
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
            templateUrl: '../app/activity/edit-activity-dialog.html',
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

'use strict';

angular.module('models.activity', ['resources.activity'])

  .factory('activityModel', ['activityResource', function(activityResource) {

    var Activity = function(data) {
      data = data || {};

      this.id = data.id;
      this.concept = data.concept;
      this.amount = data.amount;
      this.date = data.date;
      this.dateValue = data.dateValue || new Date();
    };

    Activity.prototype.save = function() {
      return activityResource.save(this).$promise;
    };

    Activity.prototype.update = function() {
      return activityResource.update(this).$promise;
    };

    return Activity;
  }]);
'use strict';

angular.module('resources.activity', ['ngResource'])

  .factory('activityResource', ['$resource', '$q', function($resource, $q) {

    var activityResource = {
      api: {
        activities: $resource('./activities'),
        activity: $resource('./activities/:activityId', {activityId: '@activityId'}, {
          update: {method: 'PUT'}
        })
      }
    };

    activityResource.get = function(filter) {
      var deferred = $q.defer();
      var queryParams = filter ? {term: filter} : {};
      this.api.activities.get(queryParams).$promise.then(function(result) {
        if (result.activities) {
          if (!Array.isArray(result.activities)) {
            result.activities = [];
          } else {
            result.activities.forEach(function(activity) {
              activity.amount = parseFloat(activity.amount);
              activity.date = transformTimezone(activity.date);
              activity.dateValue = transformTimezone(activity.dateValue);
            });
          }
          deferred.resolve(result);
        }
      }).catch(function(error) {
        deferred.reject(error.data);
      });

      return deferred.promise;
    };

    activityResource.save = function(activity) {
      return this.api.activities.save(activity);
    };

    activityResource.update = function(activity) {
      return this.api.activity.update({activityId: activity.id}, activity);
    };

    var transformTimezone = function(richDate) {
      var stringDate = richDate.date + ' GMT';
      var date = new Date(stringDate);
      return date;
    };

    return activityResource;
  }]);

'use strict';

angular.module('directives.editActivity', ['models.activity', 'resources.activity', 'ngMaterial', 'templates'])

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
      templateUrl: 'templates/edit-activity-directive.html',
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

'use strict';

angular.module('app', [
  'ngMaterial',
  'directives.activitiesList',
  'directives.editActivity',
  'directives.menuOptions'
]);
'use strict';

angular.module('helpers.date', [])

  .factory('dateHelper', function() {

    var dateHelper = {};

    dateHelper.dateToSimpleObject = function(datetime) {
      return {
        date: datetime.toString()
      }
    };

    return dateHelper;

  });
'use strict';

angular.module('directives.menuOptions', ['templates'])

  .directive('menuOptions', ['$rootScope', function($rootScope) {

    return {
      restrict: 'E',
      templateUrl: '../app/menu-options/menu-options-directive.html',
      scope: {},
      controller: ['$scope', function($scope) {
        $scope.openMenu = function($mdMenu, $event) {
          $mdMenu.open($event);
        };

        $scope.currentTerm = function() {
          $rootScope.$broadcast('currentTermFilter');
        };

        $scope.twoTerms = function() {
          $rootScope.$broadcast('twoTermsFilter');
        };

        $scope.threeTerms = function() {
          $rootScope.$broadcast('threeTermsFilter');
        };

        $scope.fourTerms = function() {
          $rootScope.$broadcast('fourTermsFilter');
        };

        $scope.allEntries = function() {
          $rootScope.$broadcast('allEntriesFilter');
        };
      }]
    };
  }]);

//# sourceMappingURL=scripts.js.map