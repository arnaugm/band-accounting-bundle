describe('activity resource', function() {

  var $httpBackend;
  var activityResource;
  var $rootScope;
  var deferred;

  beforeEach(module('resources.activity'));

  beforeEach(function() {
    inject(function($injector) {
      $httpBackend = $injector.get('$httpBackend');
      activityResource = $injector.get('activityResource');
      $rootScope = $injector.get('$rootScope');
      deferred = $injector.get('$q').defer();
    });
  });

  describe('#get', function() {

    var activities = [
      {
        amount: "1.00",
        concept: "activity",
        date: {
          date: "2017-01-29 21:11:21.000000",
          timezone: "Europe/Berlin",
          timezone_type: 3
        },
        dateValue: {
          date: "2017-01-29 21:11:12.000000",
          timezone: "Europe/Berlin",
          timezone_type: 3
        }
      }
    ];

    it('should get the list of activities', function(done) {
      $httpBackend
        .whenGET('/activities')
        .respond(200, {activities: activities});

      var promise = activityResource.get(1);
      $httpBackend.flush();

      promise.then(function(result) {
        expect(activities).not.toBe(undefined);
        done();
      });

      $rootScope.$apply();
    });

    it('should format activities properly', function(done) {
      $httpBackend
        .whenGET('/activities')
        .respond(200, {activities: activities});

      var promise = activityResource.get(1);
      $httpBackend.flush();

      promise.then(function(result) {
        var activity = result.activities[0];
        expect(activity.amount).toBe(1);
        expect(activity.date).toBe(0);
        expect(activity.dateValue).toBe(0);
        done();
      });

      $rootScope.$apply();
    });
  });
});