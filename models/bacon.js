var mongoose    = require('mongoose');
var Schema      = mongoose.Schema;
var BaconSchema  = new Schema({
  name: String
});

module.exports = mongoose.model('Bacon', BaconSchema);