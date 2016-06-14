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
const interval    = process.argv[2] || 5000;
const thingName   = process.argv[3] || 'Demo';
const thingLocLat = process.argv[4] || 51.964113;
const thingLocLng = process.argv[5] || 7.624862;

console.log('\n////////////////////////////////////////////////////////////\n');
console.log('            STARTING DEMONSTRATION...'.cyan);
console.log('\n////////////////////////////////////////////////////////////\n');

async.waterfall([
	// Create a new User
	function(callback) {
		console.log('  Creating a new', 'User...\n'.cyan);

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
			waterbodyId: '5752d2d7e5d703480187e0d9' // TODO should be requested from the server, too
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
			
			console.log('\n------------------------------------------------------------\n');
			
			callback(error, body._id);
		});
	},
	// Create new Measurements in an interval
	function(sensorId, callback) {
		console.log('  Finished demo setup. Measuring now...'.cyan);
		console.log('\n------------------------------------------------------------\n');

		setInterval(function() {
			console.log('  Creating a new', 'Measurement...\n'.cyan);
			
			// Calculate the Measurement's value as a random number between 0 and 10
			let value = Math.random() * 10;
			value = parseFloat(value.toFixed(2));
			
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
					console.log('  New Measurement', ('#' + counter).cyan, 'created.'.green);
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