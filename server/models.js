var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var questSchema = new Schema({
	name: String,
	description: String,
	tags: [String], 
	time: Number,
	id: Number,
	city: String,
	address: String,
	cost: Number,
	image: String,
	rating: [Number],
	steps: [{
		location: String,
		description: String,
		time: Number,
    	cost: Number,
    	number: Number
	  }]
});

var userSchema = new Schema({
	username: String,
	password: String
});

var Quest = mongoose.model('Quest', questSchema);
var User = mongoose.model('User', userSchema);

module.exports.Quest = Quest;
module.exports.User = User;