var advice = require('../../lib/advice.js');
var expect = require('chai').expect;

suite('Advice tests', function(){

  test('getAdvice() should return advice', function(){
    expect(typeof advice.getAdvice() === 'string');
  });

});