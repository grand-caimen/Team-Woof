var mongoose = require('mongoose');
mongoose.connect("mongodb://localhost/quest", function(){});
var db = mongoose.connection;

module.exports.db = db;


