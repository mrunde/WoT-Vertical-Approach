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
var socketio   = require('socket.io');

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
console.log('############################################################');
console.log('############################################################');
console.log('');
console.log('  Application:', 'Vertical Approach of the Geospatial'.cyan);
console.log('               Web of Things for Mobile Water Gauges'.cyan);
console.log('');
console.log('  Version:    ', '1.0.0'.cyan);
console.log('');
console.log('  Copyright:  ', '2016'.cyan);
console.log('');
console.log('  Licence:    ', 'MIT'.cyan);
console.log('');
console.log('  Authors:    ', '- Moritz Migge'.cyan);
console.log('               - Marius Runde'.cyan);
console.log('               - Daniel Ummelmann'.cyan);
console.log('               - Axel Virnich'.cyan);
console.log('');
console.log('############################################################');
console.log('############################################################');
console.log('');
console.log('');
console.log('////////////////////////////////////////////////////////////');
console.log('');
console.log('               STARTING SERVER...'.cyan);
console.log('');
console.log('////////////////////////////////////////////////////////////');
console.log('');
console.log('');
console.log('------------------------------------------------------------');

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
	console.log('  Express server listening on port', config.express_port.toString().cyan);
	console.log('------------------------------------------------------------');
});

// Start the server socket
var io = socketio(server);
// Publishes server notifications
exports.notify = function(topic, message) {
	io.emit(topic, message);
};


// --------------------------------------------------
// MongoDB Connection
// --------------------------------------------------

// Connect to mongodb
mongoose.connect(config.mongodb_host);

// Test the database connection
var db = mongoose.connection;
db.on('error', function callback() {
	console.log('  Connection to MongoDB', 'failed'.red);
	console.log('------------------------------------------------------------');
});
db.once('open', function callback() {
	console.log('  Connection to MongoDB', 'successfull'.green);
	console.log('------------------------------------------------------------');
});
