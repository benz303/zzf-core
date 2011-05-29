//= require jasmine/jasmine
//= require jasmine/jasmine-html
//= require zzf-core

describe("jQuery", function() {
  it('$ === jQuery', function() {
    expect($).toEqual(jQuery);
  });
});

describe("underscore", function() {
  it('$._ === _', function() {
    expect($._).toEqual(_);
  });
});
