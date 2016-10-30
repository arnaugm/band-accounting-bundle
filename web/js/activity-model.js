'use strict';

angular.module('models.activity', ['resources.activity'])

  .factory('activityModel', ['activityResource', function(activityResource) {

    var Activity = function(concept, amount, dateValue) {
      this.concept = concept;
      this.amount = amount;
      this.dateValue = dateValue || new Date();
    };

    Activity.prototype.save = function() {
      return activityResource.save(this).$promise;
    };

    return Activity;
  }]);