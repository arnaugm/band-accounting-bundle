'use strict';

angular.module('directives.menuOptions', [])

  .directive('menuOptions', [function() {

    return {
      restrict: 'E',
      templateUrl: 'templates/menu-options-directive.html',
      scope: {},
      controller: ['$scope', function($scope) {
        $scope.openMenu = function($mdMenu, $event) {
          $mdMenu.open($event);
        };

      }]
    };
  }]);
