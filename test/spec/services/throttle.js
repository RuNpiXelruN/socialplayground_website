'use strict';

describe('Service: throttle', function () {

  // load the service's module
  beforeEach(module('socialPlaygroundWebsiteApp'));

  // instantiate service
  var throttle;
  beforeEach(inject(function (_throttle_) {
    throttle = _throttle_;
  }));

  it('should do something', function () {
    expect(!!throttle).toBe(true);
  });

});
