describe('activity resource', function() {

  var $httpBackend;
  var activityResource;

  beforeEach(function() {
    angular.mock.module(require('./activity-resource').name);

    inject(function(_$httpBackend_, _activityResource_) {
      $httpBackend = _$httpBackend_;
      activityResource = _activityResource_;
    });
  });

  describe('#get', function() {
    it('should get the list of activities', function(done) {
      done();
    })
  })
});