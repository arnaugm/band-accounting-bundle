describe('edit activity directive', function() {

  var $compile;
  var $rootScope;
  var scope;
  var $httpBackend;
  var directiveElem;
  var elementScope;
  var Activity;

  beforeEach(function() {
    module('directives.editActivity');
    module('models.activity');
    module('templates');

    inject(function(_$compile_, _$rootScope_, _$httpBackend_, _activityModel_) {
      $compile = _$compile_;
      $rootScope = _$rootScope_;
      $httpBackend = _$httpBackend_;
      Activity = _activityModel_;

      var activity = new Activity({
        amount: 1,
        date: new Date()
      });
      scope = $rootScope.$new();
      scope.activity = activity;
    });
  });

  beforeEach(function() {
    $httpBackend
      .whenGET(/^img\/.*/)
      .respond(200, '<svg></svg>');
  });

  var getCompiledElement = function() {
    var element = '<edit-activity activity="activity" index="0"></edit-activity>';
    var compiledElement = $compile(element)(scope);
    scope.$digest();

    return compiledElement;
  };

  var getScope = function() {
    directiveElem = getCompiledElement();
    elementScope = directiveElem.isolateScope();

    return elementScope;
  };

  it('should render the directive correctly', function() {
    directiveElem = getCompiledElement();

    expect(directiveElem).not.toBeUndefined();
  });

  it('should save a new activity properly', function() {
    spyOn($rootScope, '$broadcast');
    var response = {
      id: 1,
      date: new Date()
    };
    $httpBackend
      .whenPOST('./activities')
      .respond(200, response);

    elementScope = getScope();

    elementScope.save();
    $httpBackend.flush();
    scope.$apply();

    expect($rootScope.$broadcast).toHaveBeenCalledWith('activitySaved', scope.activity);
  });

  it('should notify in case of wrong response' , function() {
    spyOn($rootScope, '$broadcast');
    var response = {};
    $httpBackend
      .whenPOST('./activities')
      .respond(200, response);

    elementScope = getScope();

    elementScope.save();
    $httpBackend.flush();
    scope.$apply();

    expect($rootScope.$broadcast).toHaveBeenCalledWith('saveError', {message: 'wrong response: ' + JSON.stringify(response)});
  });

  it('should notify in case of save error' , function() {
    spyOn($rootScope, '$broadcast');
    $httpBackend
      .whenPOST('./activities')
      .respond(500, {message: 'something went wrong'});

    elementScope = getScope();

    elementScope.save();
    $httpBackend.flush();
    scope.$apply();

    expect($rootScope.$broadcast).toHaveBeenCalledWith('saveError', 'something went wrong');
  });

});