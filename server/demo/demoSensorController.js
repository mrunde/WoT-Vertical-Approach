'use strict';

// Load the application's configuration
var config = require('../server/config');
const url  = config.express_host + '/api';

// Required modules
var async   = require('async');
var colors  = require('colors');
var request = require('request');

// Read the arguments from the command line or set them to the default values
const interval    = process.argv[2] || 5000;
const thingName   = process.argv[3] || 'Demo';
const thingLocLat = process.argv[4] || 51.964113;
const thingLocLng = process.argv[5] || 7.624862;

console.log('////////////////////////////////////////////////////////////');
console.log('');
console.log('            STARTING DEMONSTRATION...'.cyan);
console.log('');
console.log('////////////////////////////////////////////////////////////');
console.log('');

async.waterfall([
	// Create a new User
	function(callback) {
		console.log('  Creating a new', 'User...'.cyan);

		const userJson = {
			name: 'demoUser#' + Math.random(),
			password: 'demo',
			email: 'demo@example.com'
		};

		// Post the new User
		request.post({
			headers: {'content-type': 'application/json'},
			url: url + '/users',
			json: userJson
		}, function(error, response, body) {
			if (!error) {
				console.log('  New User', 'created.'.green);
			} else {
				console.log('  New User creation', 'failed'.red);
			}
			console.log('');
			console.log('------------------------------------------------------------');
			console.log('');
			callback(error, body._id);
		});
	},
	// Create a new Thing
	function(userId, callback) {
		console.log('  Creating a new', 'Thing...'.cyan);
		
		const thingJson = {
			name: thingName,
			loc: {
				coordinates: [ thingLocLat, thingLocLng ]
			},
			userId: userId,
			waterbodyId: '5752d2d7e5d703480187e0d9'
		};
		
		// Post the new Thing
		request.post({
			headers: {'content-type': 'application/json'},
			url: url + '/things',
			json: thingJson
		}, function(error, response, body) {
			if (!error) {
				console.log('  New Thing', 'created.'.green);
			} else {
				console.log('  New Thing creation', 'failed'.red);
			}
			console.log('');
			console.log('------------------------------------------------------------');
			console.log('');
			callback(error, body._id);
		});
	},
	// Create a new Feature
	function(thingId, callback) {
		console.log('  Creating a new', 'Feature...'.cyan);

		const featureJson = {
			name: 'demoFeature',
			unit: 'foo'
		};

		// Post the new Feature
		request.post({
			headers: {'content-type': 'application/json'},
			url: url + '/features',
			json: featureJson
		}, function(error, response, body) {
			if (!error) {
				console.log('  New Feature', 'created'.green);
			} else {
				console.log('  New Feature creation', 'failed'.red);
			}
			console.log('');
			console.log('------------------------------------------------------------');
			console.log('');
			callback(error, thingId, body._id);
		});
	},
	// Create a new Sensor
	function(thingId, featureId, callback) {
		console.log('  Creating a new', 'Sensor...'.cyan);

		const sensorJson = {
			name: 'water gauge',
			interval: interval,
			refLevel: 2,
			warnLevel: 7,
			riskLevel: 9,
			thingId: thingId,
			featureId: featureId
		};

		// Post the new Sensor
		request.post({
			headers: {'content-type': 'application/json'},
			url: url + '/sensors',
			json: sensorJson
		}, function(error, response, body) {
			if (!error) {
				console.log('  New Sensor', 'created.'.green);
			} else {
				console.log('  New Sensor creation', 'failed'.red);
			}
			console.log('');
			console.log('------------------------------------------------------------');
			console.log('');
			callback(error, body._id);
		});
	},
	// Create new Measurements in an interval
	function(sensorId, callback) {
		setInterval(function() {
			console.log('  Creating a new', 'Measurement...'.cyan);
			
			// Calculate the Measurement's value as a random number between 0 and 10
			let value = Math.random() * 10;
			
			let measurementJson = {
				date: Date.now(),
				value: value,
				sensorId: sensorId
			};
			
			// Post the new Measurement
			request.post({
				headers: {'content-type': 'application/json'},
				url: url + '/measurements',
				json: measurementJson
			}, function(error, response, body) {
				if (!error) {
					console.log('  New Measurement', 'created.'.green);
				} else {
					console.log('  New Measurement creation', 'failed'.red);
					callback(error);
				}
				console.log('');
				console.log('------------------------------------------------------------');
				console.log('');
			});
		}, interval);
	}
], function(err, result) {
	if (err) {
		console.log(err);
	}
});