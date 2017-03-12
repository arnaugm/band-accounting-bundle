'use strict';

angular.module('directives.menuOptions', ['ngMaterial'])

  .directive('menuOptions', ['$mdMenu', function($mdMenu) {

    return {
      restrict: 'E',
      templateUrl: 'templates/menu-options-directive.html',
      scope: {},
      controller: ['$scope', function($scope) {
        $scope.openMenu = function() {
          $scope.test = 1;
        };

      }]
    };
  }]);
