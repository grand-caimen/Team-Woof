var http = require("http");
var bodyParser = require('body-parser');
var express = require('express');
var app = express();
var path = require('path');
app.use(bodyParser.json());

app.set('port', 3000);

app.get('/', function(req, res){
    res.sendFile(path.join(__dirname + '/../client/index.html'));
});


// Wildcare Files
app.get('/*', function(req, res){
    res.sendFile(path.join(__dirname + '/../client' + req.url));
});

app.listen(app.get('port'), function(){
	console.log('Node app is running on port', app.get('port'));
});