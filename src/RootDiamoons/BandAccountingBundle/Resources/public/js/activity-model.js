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