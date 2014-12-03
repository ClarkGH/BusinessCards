var mongoose    = require('mongoose');
var Schema      = mongoose.Schema;
var BaconSchema  = new Schema({
  name: String,
  description: String,
  rating: Number,
  delicious: Boolean
});

module.exports = mongoose.model('Bacon', BaconSchema);