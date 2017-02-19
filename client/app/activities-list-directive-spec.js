describe('activities list directive', function() {

  var $compile;
  var $rootScope;
  var $httpBackend;
  var directiveElem;
  var elementScope;

  beforeEach(function() {
    module('directives.activitiesList');

    inject(function(_$compile_, _$rootScope_, _$httpBackend_) {
      $compile = _$compile_;
      $rootScope = _$rootScope_;
      $httpBackend = _$httpBackend_;
    });

    $httpBackend
      .whenGET('templates/activities-list-directive.html')
      .respond(200, '');
  });

  var getCompiledElement = function() {
    var element ='<activities-list></activities-list>';
    var compiledElement = $compile(element)($rootScope);
    $rootScope.$digest();

    return compiledElement;
  };

  var getScope = function(activities) {
    $httpBackend
      .whenGET('/activities')
      .respond(200, activities);
    directiveElem = getCompiledElement();
    $httpBackend.flush();
    elementScope = directiveElem.isolateScope();

    return elementScope;
  };

  it('should render the directive correctly', function() {
    $httpBackend
      .whenGET('/activities')
      .respond(200, '');
    directiveElem = getCompiledElement();

    expect(directiveElem).not.toBeUndefined();
  });

  it('should update totals with requested data', function() {
    var activities = {
      activities: [],
      income: 3,
      expenses: 2,
      total: 1
    };
    elementScope = getScope(activities);

    expect(elementScope.income).toEqual(3);
    expect(elementScope.expenses).toEqual(2);
    expect(elementScope.total).toEqual(1);
  });

});