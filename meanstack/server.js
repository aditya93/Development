var express = require('express');
var app = express();
var port = process.env.PORT || 8080;
var morgan = require("morgan");
var mongoose = require('mongoose');
var User = require('./app/models/user');
var TestData = require('./app/models/user');
var bodyParser = require('body-parser');

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(morgan('dev'));

mongoose.connect('mongodb://localhost:27017/tutorial',function(err){
	if(err)
	{
		console.log('Not Connected to the database:'+err);
	}
	else
	{
		console.log('Connected');
	}
});

app.post('/users',function(req,res){
	var user = new User();
	user.username = req.body.username;
	user.password = req.body.password;
	user.email = req.body.email;
	user.save(function(err){
		if(err){
			res.send(err);
		}
		else{
			res.send("User Created!!");
		}
	});

	
});

app.get('/', function (req, res) {
  res.send('Hello World!');
})

app.listen(port, function () {
  console.log('Example app listening on port '+ port);
})