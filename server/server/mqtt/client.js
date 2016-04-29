// Load the application's configuration
var config = require('../config');
var url    = config.express_host + '/api';

// Required modules
var mqtt    = require('mqtt');
var request = require('request');

// Set up the mqtt client and connect it to the mqtt broker
var client = mqtt.connect(config.mqtt_host);

// Subscribe to the API's topics
client.once('connect', function () {
	console.log('Connection to MQTT broker successfull!');

	client.subscribe('features');
	console.log('Subscribed to features');
	client.subscribe('measurements');
	console.log('Subscribed to measurements');
	client.subscribe('sensors');
	console.log('Subscribed to sensors');
	client.subscribe('things');
	console.log('Subscribed to things');
});

// Error handling
client.on('error', function() {
	console.log('Connection to MQTT broker failed!');
});

// Listen on incoming messages
client.on('message', handleMessage);

function handleMessage(topic, payload) {
	// Convert the payload into JSON data format
	var json = JSON.parse(payload);

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
					console.log(error);
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
					console.log(error);
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
					console.log(error);
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
					console.log(error);
			});
			break;
	}
}

module.exports = client;