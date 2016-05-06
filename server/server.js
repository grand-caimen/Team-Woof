var http = require("http");
var bodyParser = require('body-parser');
var express = require('express');
var geocoder = require('geocoder');
var app = express();
var path = require('path');
var jwt = require('express-jwt');
var User = require('./controllers/user-controller.js');
var Quest = require('./controllers/quest-controller.js')


app.use('api/quests*', jwt);

app.use(bodyParser.json());

app.set('port', 3000);

app.get('/', function(req, res){
  res.sendFile(path.join(__dirname + '/../client/index.html'));
});

app.get('/api/quests*', function(req, res){
  Quest.index(req.query, res, res.send)
});

app.post('/api/quests*', function(req, res){
  Quest.create(req.body, res, res.send)
});

app.post('/api/users/signup', function(req, res){
  User.signup(req, res, res.send);
});

app.post('/api/users/signin', function(req, res){
  User.signin(req, res, res.send);
});

app.post('/api/geocode*', function(req, res){
  geocoder.geocode(req.body.city, function ( err, data ) {
    if(err) throw err;
    res.send(data.results[0].geometry.location);
  });
})

app.post('/api/users/profile', function (req, res) {
 User.returnUser(req, res);
});

app.post('/api/users/profilepic', function (req, res) {
  User.addProfilePic(req.body);
});

app.post('/api/reviews', function (req, res) {
  User.addReview(req, res);
});

// Wildcard Files
app.get('/*', function(req, res){
  res.sendFile(path.join(__dirname + '/../' + req.url));
});

app.listen(app.get('port'), function(){
	console.log('Node app is running on port', app.get('port'));
});
