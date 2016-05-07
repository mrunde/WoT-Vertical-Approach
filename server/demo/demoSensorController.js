'use strict';

// Load the application's configuration
var config = require('../server/config');
const url  = config.express_host + '/api';

// Required modules
var async   = require('async');
var request = require('request');

// Read the arguments from the command line or set them to the default values
const interval    = process.argv[2] || 5000;
const thingName   = process.argv[3] || 'Demo';
const thingLocLat = process.argv[4] || 51.964113;
const thingLocLng = process.argv[5] || 7.624862;

console.log('Starting demonstration...');

async.waterfall([
	// Create a new Thing
	function(callback) {
		console.log('Creating a new Thing...');
		
		const thingJson = { name: thingName, loc: { coordinates: [ thingLocLat, thingLocLng ] } };
		
		// Post the new Thing
		request.post({
			headers: {'content-type': 'application/json'},
			url: url + '/things',
			json: thingJson
			}, function(error, response, body) {
				if (!error) {
					console.log('New Thing created.');
				}
				callback(error, body._id);
		});
	},
	// Create a new Sensor
	function(thingId, callback) {
		console.log('Creating a new Sensor...');

		const sensorJson = { name: 'water gauge', thingId: thingId, featureId: '571f3db18727620c03fe94e1' };

		// Post the new Sensor
		request.post({
			headers: {'content-type': 'application/json'},
			url: url + '/sensors',
			json: sensorJson
			}, function(error, response, body) {
				if (!error) {
					console.log('New Sensor created.');
				}
				callback(error, body._id);
		});
	},
	// Create new Measurements in an interval
	function(sensorId, callback) {
		setInterval(function() {
			console.log('Creating a new Measurement...');
			
			// Calculate the Measurement's value as a random number between 0 and 10
			let value = Math.random() * 10;
			
			let measurementJson = { date: Date.now(), value: value, sensorId: sensorId };
			
			// Post the new Measurement
			request.post({
				headers: {'content-type': 'application/json'},
				url: url + '/measurements',
				json: measurementJson
				}, function(error, response, body) {
					if (error) {
						callback(error);
					} else {
						console.log('New Measurement created.');
					}
			});
		}, interval);
	}
], function(err, result) {
	if (err) {
		console.log(err);
	}
});