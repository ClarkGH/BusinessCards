var Browser = require('zombie'),
  assert = require('chai').assert;

var browser;

suite('Cross-Page Tests', function(){

  setup(function(){
    browser = new Browser();
  });

  test('visiting the "contact-clark" page dirctly should result ' + 'in an empty contacterName field', function(done){
    browser.visit('http://localhost:3000/author/contact-clark', function(){
      assert(browser.field('contacterName').value === '');
      done();
  }); });




});