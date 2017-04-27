'use strict';

angular.module('directives.menuOptions', [])

  .directive('menuOptions', ['$rootScope', function($rootScope) {

    return {
      restrict: 'E',
      templateUrl: 'bundles/rootdiamoonsbandaccounting/templates/menu-options-directive.html',
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
