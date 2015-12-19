var http = require("http");
var bodyParser = require('body-parser');
var express = require('express');
var path = require('path');
var mongo = require('./db.js');
var models = require('./models.js');
var userModels = require('./userModel.js');
var jwt = require('express-jwt');
var app = express();
var db = mongo.db;
var Quest = models.Quest;
var User = models.User;
var signup = userModels.signup;
var authUser = userModels.checkAuth;



app.use('api/quests*', jwt);

app.use(bodyParser.json());

app.set('port', 3000);

app.get('/', function(req, res){
    res.sendFile(path.join(__dirname + '/../client/index.html'));
});

app.post('/api/quests*', function(req, res){
	Quest.find(req.body).then(function(quests){
		if(quests.length > 0){
			res.send('An identical quest already exists');
		}
		else{
			var newQuest = new Quest(req.body);
			newQuest.save(function(err, result){
				if(err){
					console.log('help');
					console.log(err);
				}
				res.send(result);
			});
		}
	});
});

app.post('/api/users*', function(req, res){
	signup(req, res, console.log);
})

app.get('/api/quests*', function(req, res){
	console.log(req.query);
	//req.query == { city: 'austin' }
	Quest.find(req.query).then(function(quests){
		res.send(quests);
	});
})

// Wildcard Files
app.get('/*', function(req, res){
    res.sendFile(path.join(__dirname + '/../' + req.url));
});

app.listen(app.get('port'), function(){
	console.log('Node app is running on port', app.get('port'));
});