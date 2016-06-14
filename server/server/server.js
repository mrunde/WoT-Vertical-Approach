// --------------------------------------------------
// Imports
// --------------------------------------------------

// Load the application's configuration
var config = require('./config');

// Required modules
var bodyParser    = require('body-parser');
var colors        = require('colors');
var cookieParser  = require('cookie-parser');
var express       = require('express');
var favicon       = require('serve-favicon');
var LocalStrategy = require('passport-local').Strategy
var mongoose      = require('mongoose');
var morgan        = require('morgan');
var passport      = require('passport');
var path          = require('path');
var session       = require('express-session');
var socketio      = require('socket.io');

// Required routes
var features     = require('./routes/features');
var things       = require('./routes/things');
var sensors      = require('./routes/sensors');
var measurements = require('./routes/measurements');
var users        = require('./routes/users');
var waterbodies	 = require('./routes/waterbodies');

// --------------------------------------------------
// Start Message
// --------------------------------------------------

console.log('\n############################################################');
console.log('############################################################');
console.log('\n  Application:', 'Vertical Approach of the Geospatial'.cyan);
console.log('               Web of Things for Mobile Water Gauges'.cyan);
console.log('\n  Version:    ', '1.0.0'.cyan);
console.log('\n  Copyright:  ', '2016'.cyan);
console.log('\n  Licence:    ', 'MIT'.cyan);
console.log('\n  Authors:    ', '- Moritz Migge'.cyan);
console.log('               - Marius Runde'.cyan);
console.log('               - Daniel Ummelmann'.cyan);
console.log('               - Axel Virnich'.cyan);
console.log('\n############################################################');
console.log('############################################################\n');
console.log('\n////////////////////////////////////////////////////////////\n');
console.log('               STARTING SERVER...'.cyan);
console.log('\n////////////////////////////////////////////////////////////\n');
console.log('\n------------------------------------------------------------');

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
app.use(favicon(path.join(__dirname, '../app/img/favicon.ico')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan('dev'));
app.use(cookieParser());
app.use(require('express-session')({
	secret: 'keyboard cat',
	resave: false,
	saveUninitialized: false
}));

// Set up of View Engine
app.set("views", path.join(__dirname, '/../app/'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs'); // 

// Set up the REST API
app.use('/api', features);
app.use('/api', things);
app.use('/api', sensors);
app.use('/api', measurements);
app.use('/api', users);
app.use('/api', waterbodies);

// --------------------------------------------------
// Passport Config
// --------------------------------------------------

// Loading passport-config
require(path.join(__dirname,'passport-config'));
var routepassport	= require(path.join(__dirname, '/routes/passport'));

// Required for passport
app.use(passport.initialize());
app.use(passport.session()); 
app.use('/', routepassport);
app.use(express.static(path.join(__dirname, 'public')));


// --------------------------------------------------
// Starting Services
// --------------------------------------------------

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
