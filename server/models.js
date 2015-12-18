var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');
var Q        = require('node-q');
var SALT_WORK_FACTOR  = 10;


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
	steps: [{
		location: String,
		description: String,
		time: Number,
    	cost: Number,
    	number: Number
	  }]
});

var userSchema = new Schema({
	username: {
		type: String,
		required: true,
		unique: true
	},

	password: {
		type: String,
		required: true
	}

});

var Quest = mongoose.model('Quest', questSchema);
var User = mongoose.model('User', userSchema);

module.exports.Quest = Quest;
module.exports.User = User;