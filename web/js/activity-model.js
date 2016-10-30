'use strict';

angular.module('models.activity', ['resources.activity'])

  .factory('activityModel', ['activityResource', function(activityResource) {

    var Activity = function(data) {
      data = data || {};
      
      this.concept = data.concept;
      this.amount = data.amount;
      this.dateValue = data.dateValue || new Date();
    };

    Activity.prototype.save = function() {
      return activityResource.save(this).$promise;
    };

    return Activity;
  }]);