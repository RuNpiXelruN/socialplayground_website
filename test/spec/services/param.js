'use strict';

describe('Service: param', function () {

  // load the service's module
  beforeEach(module('socialPlaygroundWebsiteApp'));

  // instantiate service
  var param;
  beforeEach(inject(function (_param_) {
    param = _param_;
  }));

  it('should do something', function () {
    expect(!!param).toBe(true);
  });

});
