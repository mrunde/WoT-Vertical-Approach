'use strict';

// Load the application's configuration
const config = require('../server/config');
const url  = config.express_host + '/api';

// Required modules
const async   = require('async');
const colors  = require('colors');
const request = require('request');

// Counter for the Measurements
let counter = 1;

// Read the arguments from the command line or set them to the default values
const interval    = process.argv[2] || 2000;
const thingName   = process.argv[3] || 'Demo';
const thingLocLat = process.argv[4] || 51.964113;
const thingLocLng = process.argv[5] || 7.624862;

// REST API authentication token
let token;

console.log('\n////////////////////////////////////////////////////////////\n');
console.log('            STARTING DEMONSTRATION...'.cyan);
console.log('\n////////////////////////////////////////////////////////////\n');

async.waterfall([
	// Create a new User
	function(callback) {
		console.log('  Creating a new', 'User...\n'.cyan);

		const userJson = {
			email: 'demo#' + Math.random().toFixed() + '@example.com',
			password: 'demoPass'
		};

		// Post the new User
		request.post({
			headers: {'content-type': 'application/json'},
			url: url + '/users',
			json: userJson
		}, function(error, response, body) {
			if (!error) {
				console.log('  New User', 'created.'.green);
				token = body.token;
			} else {
				console.log('  New User creation', 'failed'.red);
			}
			
			console.log('\n------------------------------------------------------------\n');
			
			callback(error, body._id);
		});
	},
	// Create a new Thing
	function(userId, callback) {
		console.log('  Creating a new', 'Thing...\n'.cyan);
		
		const thingJson = {
			name: thingName,
			loc: {
				coordinates: [ thingLocLat, thingLocLng ]
			},
			userId: userId,
			waterbodyId: '5752d2d7e5d703480187e0d9',
			token: token
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
			
			console.log('\n------------------------------------------------------------\n');
			
			callback(error, body._id);
		});
	},
	// Create a new Feature
	function(thingId, callback) {
		console.log('  Creating a new', 'Feature...\n'.cyan);

		const featureJson = {
			name: 'demoFeature',
			unit: 'foo',
			token: token
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
			
			console.log('\n------------------------------------------------------------\n');
			
			callback(error, thingId, body._id);
		});
	},
	// Create a new Sensor
	function(thingId, featureId, callback) {
		console.log('  Creating a new', 'Sensor...\n'.cyan);

		const sensorJson = {
			name: 'demoSensor',
			interval: interval,
			refLevel: 2,
			warnLevel: 6,
			riskLevel: 8,
			thingId: thingId,
			featureId: featureId,
			token: token
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
			
			console.log('\n------------------------------------------------------------\n');
			
			callback(error, body._id);
		});
	},
	// Create new Measurements in an interval
	function(sensorId, callback) {
		console.log('  Finished demo setup. Measuring now...'.cyan);
		console.log('\n------------------------------------------------------------\n');

		let value = 4;

		setInterval(function() {
			console.log('  Creating a new', 'Measurement...\n'.cyan);
			
			// Calculate the Measurement's value as a random number with respect to its previous value
			if (value < 1 || Math.random() > 0.5) {
				value += Math.random();
			} else {
				value -= Math.random();
			}
			value = parseFloat(value.toFixed(2));
			
			let measurementJson = {
				date: Date.now(),
				value: value,
				sensorId: sensorId,
				token: token
			};
			
			// Post the new Measurement
			request.post({
				headers: {'content-type': 'application/json'},
				url: url + '/measurements',
				json: measurementJson
			}, function(error, response, body) {
				if (!error) {
					console.log('  New Measurement', ('#' + counter).cyan, 'created.'.green, '\nValue:', body.value.cyan);
					counter++;
				} else {
					console.log('  New Measurement creation', 'failed'.red);
					
					callback(error);
				}
				
				console.log('\n------------------------------------------------------------\n');
			});
		}, interval);
	}
], function(err, result) {
	if (err) {
		console.log(err);
	}
});