describe('activity resource', function() {

  var $httpBackend;
  var activityResource;
  var $rootScope;
  var deferred;

  beforeEach(function() {
    module('resources.activity');

    inject(function($injector) {
      $httpBackend = $injector.get('$httpBackend');
      activityResource = $injector.get('activityResource');
      $rootScope = $injector.get('$rootScope');
      deferred = $injector.get('$q').defer();
    });
  });

  afterEach(function() {
    $httpBackend.verifyNoOutstandingExpectation(false);
    $httpBackend.verifyNoOutstandingRequest();
  });

  describe('#get', function() {

    var activities = [
      {
        amount: '1.00',
        concept: 'activity',
        date: {
          date: '2017-01-29 21:11:21.000000',
          timezone: 'UTC',
          timezone_type: 3
        },
        dateValue: {
          date: '2017-01-29 21:11:12.000000',
          timezone: 'UTC',
          timezone_type: 3
        }
      }
    ];

    it('should get the list of activities', function(done) {
      $httpBackend
        .whenGET('/activities')
        .respond(200, {activities: activities});

      var promise = activityResource.get();
      $httpBackend.flush();

      promise.then(function(result) {
        expect(result.activities.length).toBe(1);
        done();
      });

      $rootScope.$apply();
    });

    it('should notify in case of retrieve error', function(done) {
      $httpBackend
        .whenGET('/activities')
        .respond(500, {message: 'something went wrong'});

      var promise = activityResource.get();
      $httpBackend.flush();

      promise.then(function() {}).catch(function(error) {
        expect(error).toEqual({message: 'something went wrong'});
        done();
      });

      $rootScope.$apply();
    });

    it('should format activities properly', function(done) {
      $httpBackend
        .whenGET('/activities')
        .respond(200, {activities: activities});

      var promise = activityResource.get();
      $httpBackend.flush();

      promise.then(function(result) {
        var activity = result.activities[0];
        expect(activity.amount).toBe(1);
        expect(activity.date).toEqual(new Date(Date.UTC(2017, 0, 29, 21, 11, 21)));
        expect(activity.dateValue).toEqual(new Date(Date.UTC(2017, 0, 29, 21, 11, 12)));
        done();
      });

      $rootScope.$apply();
    });

    it('should call the resource with the query parameter "term=1"', function() {
      $httpBackend.expectGET('/activities?term=1').respond({});

      activityResource.get('1');
      $httpBackend.flush();
    });

    it('should call the resource with the query parameter "term=2"', function() {
      $httpBackend.expectGET('/activities?term=2').respond({});

      activityResource.get('2');
      $httpBackend.flush();
    });

    it('should call the resource with the query parameter "term=3"', function() {
      $httpBackend.expectGET('/activities?term=3').respond({});

      activityResource.get('3');
      $httpBackend.flush();
    });

    it('should call the resource with the query parameter "term=4"', function() {
      $httpBackend.expectGET('/activities?term=4').respond({});

      activityResource.get('4');
      $httpBackend.flush();
    });
  });
});