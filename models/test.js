var mongoose = require('mongoose');

var testSchema = mongoose.Schema({
  name: String,
  description: String,
  available: Boolean,
  inSeason: Boolean,
  age: Number,
});
testSchema.methods.getDisplayPrice = function(){
  return '$' + (this.priceInCents / 100).toFixed(2)
};

var Test = mongoose.model('Test', testSchema); module.exports = Test;