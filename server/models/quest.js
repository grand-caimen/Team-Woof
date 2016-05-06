var mongoose = require('mongoose');
var Schema = mongoose.Schema;
// var bcrypt   = require('bcrypt-nodejs');
// var Q        = require('q');

var Schema = mongoose.Schema;
var questSchema = new Schema({
  creator:String,
  name: String,
  description: String,
  tags: [],
  time: Number,
  id: Number,
  city: String,
  address: String,
  cost: Number,
  image: String,
  rating: [Number],
  reviews: [],
  steps: [{
    location: Schema.Types.Mixed,
    description: String,
    time: Number,
      cost: Number,
      number: Number
    }]
});

module.exports = mongoose.model('Quest', questSchema);
