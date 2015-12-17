var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var questSchema = new Schema({
	name: String,
	description: String,
	tags: String, 
	time: Number,
	id: Number,
	city: String,
	address: String,
	cost: Number
});

var stepSchema = new Schema({
	quest_id: Number,
	location: String,
	description: String,
	time: Number,
	cost: Number,
	number: Number
});
var Quest = mongoose.model('Quest', questSchema);
var Step = mongoose.model('Step', stepSchema);

module.exports.Quest = Quest;
module.exports.Step = Step;