var http = require("http");
var bodyParser = require('body-parser');
var express = require('express');
var app = express();
var path = require('path');
var mongo = require('./db.js');
var db = mongo.db;
var models = require('./models.js');
var Quest = models.Quest;
var Step = models.Step;

app.use(bodyParser.json());

app.set('port', 3000);

app.get('/', function(req, res){
    res.sendFile(path.join(__dirname + '/../client/index.html'));
});

app.post('/testing', function(req, res){
	Quest.find(req.body).then(function(quests){
		// res.send(req.body);
		var newQuest = new Quest(req.body);
		newQuest.save(function(err, result){
			if(err){
				console.log('help');
				throw err;
			}
			res.send(result);
		});
		
	});
})

// Wildcare Files
app.get('/*', function(req, res){
    res.sendFile(path.join(__dirname + '/../client' + req.url));
});

app.listen(app.get('port'), function(){
	console.log('Node app is running on port', app.get('port'));
});