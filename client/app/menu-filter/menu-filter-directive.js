'use strict';

angular.module('directives.menuFilter', [])

  .directive('menuFilter', ['$rootScope', function($rootScope) {

    return {
      restrict: 'E',
      templateUrl: 'templates/menu-filter-directive.html',
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
