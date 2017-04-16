describe('activities list directive', function() {

  var $compile;
  var $rootScope;
  var $httpBackend;
  var directiveElem;
  var elementScope;
  var Activity;
  var activityResource;

  beforeEach(function() {
    module('directives.activitiesList');
    module('models.activity');
    module('resources.activity');
    module('templates');

    inject(function(_$compile_, _$rootScope_, _$httpBackend_, _activityModel_, _activityResource_) {
      $compile = _$compile_;
      $rootScope = _$rootScope_;
      $httpBackend = _$httpBackend_;
      Activity = _activityModel_;
      activityResource = _activityResource_;
    });
  });

  var getCompiledElement = function() {
    var element = '<activities-list></activities-list>';
    var compiledElement = $compile(element)($rootScope);
    $rootScope.$digest();

    return compiledElement;
  };

  var getScope = function(activities) {
    $httpBackend
      .whenGET('/activities?term=2')
      .respond(200, activities);
    directiveElem = getCompiledElement();
    $httpBackend.flush();
    elementScope = directiveElem.isolateScope();

    return elementScope;
  };

  it('should render the directive correctly', function() {
    $httpBackend
      .whenGET('/activities?term=2')
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

  it('should update totals after adding an income row', function() {
    var activities = {
      activities: [],
      income: 3,
      expenses: 2,
      total: 1
    };
    elementScope = getScope(activities);

    var newActivity = new Activity({
      amount: 10
    });
    $rootScope.$broadcast('activitySaved', newActivity);

    expect(elementScope.income).toEqual(13);
    expect(elementScope.expenses).toEqual(2);
    expect(elementScope.total).toEqual(11);
  });

  it('should update totals after adding an expenses row', function() {
    var activities = {
      activities: [],
      income: 3,
      expenses: 2,
      total: 1
    };
    elementScope = getScope(activities);

    var newActivity = new Activity({
      amount: -10
    });
    $rootScope.$broadcast('activitySaved', newActivity);

    expect(elementScope.income).toEqual(3);
    expect(elementScope.expenses).toEqual(12);
    expect(elementScope.total).toEqual(-9);
  });

  it('should update totals after editing a row with a positive amount', function() {
    var activity = new Activity({
      amount: 1,
      date: new Date()
    });
    var activities = {
      activities: [
        activity
      ],
      income: 1,
      expenses: 0,
      total: 1
    };
    elementScope = getScope(activities);

    var newActivity = new Activity({
      amount: 2
    });
    $rootScope.$broadcast('activityUpdated', newActivity, 0);

    expect(elementScope.income).toEqual(2);
    expect(elementScope.expenses).toEqual(0);
    expect(elementScope.total).toEqual(2);
  });

  it('should update totals after editing a row with a negative amount', function() {
    var activity = new Activity({
      amount: -1,
      date: new Date()
    });
    var activities = {
      activities: [
        activity
      ],
      income: 0,
      expenses: 1,
      total: -1
    };
    elementScope = getScope(activities);

    var newActivity = new Activity({
      amount: -2
    });
    $rootScope.$broadcast('activityUpdated', newActivity, 0);

    expect(elementScope.income).toEqual(0);
    expect(elementScope.expenses).toEqual(2);
    expect(elementScope.total).toEqual(-2);
  });

  it('should refresh activities list with current term activities when using "Current term" in the filter', function() {
    spyOn(activityResource, 'get').and.callThrough();
    var activities = {
      activities: []
    };
    elementScope = getScope(activities);

    $rootScope.$broadcast('currentTermFilter');

    expect(activityResource.get).toHaveBeenCalledWith('1');
  });

  it('should refresh activities list with last two terms activities when using "2 terms" in the filter', function() {
    spyOn(activityResource, 'get').and.callThrough();
    var activities = {
      activities: []
    };
    elementScope = getScope(activities);

    $rootScope.$broadcast('twoTermsFilter');

    expect(activityResource.get).toHaveBeenCalledWith('2');
  });

  it('should refresh activities list with last three terms activities when using "3 terms" in the filter', function() {
    spyOn(activityResource, 'get').and.callThrough();
    var activities = {
      activities: []
    };
    elementScope = getScope(activities);

    $rootScope.$broadcast('threeTermsFilter');

    expect(activityResource.get).toHaveBeenCalledWith('3');
  });

  it('should refresh activities list with last four terms activities when using "4 terms" in the filter', function() {
    spyOn(activityResource, 'get').and.callThrough();
    var activities = {
      activities: []
    };
    elementScope = getScope(activities);

    $rootScope.$broadcast('fourTermsFilter');

    expect(activityResource.get).toHaveBeenCalledWith('4');
  });

  it('should refresh activities list with all activities when using "All entries" in the filter', function() {
    spyOn(activityResource, 'get').and.callThrough();
    var activities = {
      activities: []
    };
    elementScope = getScope(activities);

    $rootScope.$broadcast('allEntriesFilter');

    expect(activityResource.get).toHaveBeenCalledWith(undefined);
  });
});