suite('"About" Page Tests', function(){
  test('page should contain link to home page', function(){
    assert($('a[href="/"]').length);
  });
});