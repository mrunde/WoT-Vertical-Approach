// Required modules
var express    = require('express');
var bodyParser = require('body-parser');
var mongoose   = require('mongoose');
var path       = require('path');

// Set up the web server
var app = express();
app.use(express.static(path.join(__dirname, '../app/dist')));
app.use(bodyParser.json());

// Set up the controllers
var featureController     = require('./controllers/featureController');
var thingController       = require('./controllers/thingController');
var measurementController = require('./controllers/measurementController');

app.use('/api', featureController);
app.use('/api', thingController);
app.use('/api', measurementController);

// Start the web server
app.listen(3000, function() {
	console.log('Express server listening on port', 3000);
});

// Connect to mongodb
mongoose.connect('mongodb://localhost/wot-vertical-approach');

// Test the database connection
var db = mongoose.connection;
db.on('error', function callback() {
    console.log("Connection to MongoDB failed!");
});
db.once('open', function callback() {
    console.log("Connection to MongoDB successfull!");
});
