// --------------------------------------------------
// Imports
// --------------------------------------------------

// Load the application's configuration
var config = require('./config');

// Required modules
var bodyParser = require('body-parser');
var colors     = require('colors');
var express    = require('express');
var mongoose   = require('mongoose');
var morgan     = require('morgan');
var path       = require('path');

// Required routes
var features     = require('./routes/features');
var things       = require('./routes/things');
var sensors      = require('./routes/sensors');
var measurements = require('./routes/measurements');
var users        = require('./routes/users');

// --------------------------------------------------
// Start Message
// --------------------------------------------------

console.log('');
console.log('--------------------------------------------------');
console.log('  STARTING SERVER...');
console.log('--------------------------------------------------');
console.log('');

// --------------------------------------------------
// MQTT Client
// --------------------------------------------------

var client = require('./mqtt/client');

// --------------------------------------------------
// Express Web Server
// --------------------------------------------------

// Set up the express web server
var app = express();
app.use(express.static(path.join(__dirname, '../app')));
app.use(bodyParser.json());
app.use(morgan('dev'));

// Set up the REST API
app.use('/api', features);
app.use('/api', things);
app.use('/api', sensors);
app.use('/api', measurements);
app.use('/api', users);

// Start the web server
var server = app.listen(config.express_port, function() {
	console.log('Express server listening on port', config.express_port.toString().green);
});

// --------------------------------------------------
// MongoDB Connection
// --------------------------------------------------

// Connect to mongodb
mongoose.connect(config.mongodb_host);

// Test the database connection
var db = mongoose.connection;
db.on('error', function callback() {
	console.log('Connection to MongoDB', 'failed!'.red);
});
db.once('open', function callback() {
	console.log('Connection to MongoDB', 'successfull!'.green);
});
