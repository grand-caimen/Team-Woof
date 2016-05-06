var mongoose = require('mongoose');
mongoose.connect("mongodb://dog:woof@ds033915.mongolab.com:33915/heroku_wmpdkx1b", function(){});
var db = mongoose.connection;

module.exports.db = db;


