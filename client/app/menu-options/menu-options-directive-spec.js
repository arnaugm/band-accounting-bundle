describe('menu directive', function() {

  var $compile;
  var $rootScope;
  var directiveElem;
  var elementScope;

  beforeEach(function() {
    module('directives.menuOptions');
    module('templates');

    inject(function(_$compile_, _$rootScope_) {
      $compile = _$compile_;
      $rootScope = _$rootScope_;
    });
  });

  var getCompiledElement = function() {
    var element = '<menu-options></menu-options>';
    var compiledElement = $compile(element)($rootScope);
    $rootScope.$digest();

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

  describe('#openMenu', function() {
    it('should open the menu', function() {
      elementScope = getScope();

      elementScope.openMenu();

      expect(elementScope.test).toEqual(1);
    });
  });

});