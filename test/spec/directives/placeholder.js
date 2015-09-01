'use strict';

describe('Directive: placeholder', function () {

  // load the directive's module
  beforeEach(module('socialPlaygroundWebsiteApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<placeholder></placeholder>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the placeholder directive');
  }));
});
