var express = require('express');
var app = express();
var port = process.env.PORT || 8080;
var morgan = require("morgan");
var mongoose = require('mongoose');
var TestData = require('./app/models/user');
var bodyParser = require('body-parser');
var router = express.Router();
var appRoutes = require('./app/routes/api')(router);

app.use(morgan('dev'));
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use('/api',appRoutes);

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

app.get('/', function (req, res) {
  res.send('Hello World!');
})

app.listen(port, function () {
  console.log('Example app listening on port '+ port);
});

