'use strict';

// Load the application's configuration
const config = require('../config');
const url    = config.express_host + '/api';

// Required modules
const colors  = require('colors');
const mqtt    = require('mqtt');
const request = require('request');

// Set up the mqtt client and connect it to the mqtt broker
const client = mqtt.connect(config.mqtt_host);

// Subscribe to the API's topics
client.once('connect', function () {
	console.log('  Connection to MQTT broker', 'successfull'.green);

	console.log('------------------------------------------------------------');
	client.subscribe('features');
	console.log('  Subscribed to', 'features'.cyan);
	client.subscribe('measurements');
	console.log('  Subscribed to', 'measurements'.cyan);
	client.subscribe('sensors');
	console.log('  Subscribed to', 'sensors'.cyan);
	client.subscribe('things');
	console.log('  Subscribed to', 'things'.cyan);
	client.subscribe('users');
	console.log('  Subscribed to', 'users'.cyan);
	console.log('------------------------------------------------------------');
});

// Error handling
client.on('error', function() {
	console.log('  Connection to MQTT broker', 'failed'.red);
	console.log('------------------------------------------------------------');
});

// Listen on incoming messages
client.on('message', handleMessage);

function handleMessage(topic, payload) {
	// Convert the payload into JSON data format
	let json = JSON.parse(payload);

	// Handle the received message
	switch (topic.split('/')[0]) {
		// --------------------------------------------------
		// Features
		// --------------------------------------------------
		case 'features':
			request.post({
				headers: {'content-type': 'application/json'},
				url: url + '/features',
				json: json
				}, function(error, response, body) {
					if (error) {
						console.log(error);
					}
			});
			break;
		// --------------------------------------------------
		// Measurements
		// --------------------------------------------------
		case 'measurements':
			request.post({
				headers: {'content-type': 'application/json'},
				url: url + '/measurements',
				json: json
				}, function(error, response, body) {
					if (error) {
						console.log(error);
					}
			});
			break;
		// --------------------------------------------------
		// Sensors
		// --------------------------------------------------
		case 'sensors':
			request.post({
				headers: {'content-type': 'application/json'},
				url: url + '/sensors',
				json: json
				}, function(error, response, body) {
					if (error) {
						console.log(error);
					}
			});
			break;
		// --------------------------------------------------
		// Things
		// --------------------------------------------------
		case 'things':
			request.post({
				headers: {'content-type': 'application/json'},
				url: url + '/things',
				json: json
				}, function(error, response, body) {
					if (error) {
						console.log(error);
					}
			});
			break;
		// --------------------------------------------------
		// Users
		// --------------------------------------------------
		case 'users':
			request.post({
				headers: {'content-type': 'application/json'},
				url: url + '/users',
				json: json
				}, function(error, response, body) {
					if (error) {
						console.log(error);
					}
			});
			break;
	}
}

module.exports = client;