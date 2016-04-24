// Required modules
var express    = require('express');
var bodyParser = require('body-parser');
var mongoose   = require('mongoose');
var path       = require('path');

// Required routes
var features     = require('./routes/features');
var things       = require('./routes/things');
var sensors      = require('./routes/sensors');
var measurements = require('./routes/measurements');

// Set up the web server
var app = express();
app.use(express.static(path.join(__dirname, '../app/dist')));
app.use(bodyParser.json());

// Set up the REST API
app.use('/api', features);
app.use('/api', things);
app.use('/api', sensors);
app.use('/api', measurements);

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
