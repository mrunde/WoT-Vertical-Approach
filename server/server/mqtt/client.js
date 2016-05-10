// Load the application's configuration
var config = require('../config');
var url    = config.express_host + '/api';

// Required modules
var colors  = require('colors');
var mqtt    = require('mqtt');
var request = require('request');

// Set up the mqtt client and connect it to the mqtt broker
var client = mqtt.connect(config.mqtt_host);

// Subscribe to the API's topics
client.once('connect', function () {
	console.log('Connection to MQTT broker', 'successfull!'.green);

	console.log('-------------------------------');
	client.subscribe('features');
	console.log('  Subscribed to', 'features'.inverse);
	client.subscribe('measurements');
	console.log('  Subscribed to', 'measurements'.inverse);
	client.subscribe('sensors');
	console.log('  Subscribed to', 'sensors'.inverse);
	client.subscribe('things');
	console.log('  Subscribed to', 'things'.inverse);
	console.log('-------------------------------');
});

// Error handling
client.on('error', function() {
	console.log('Connection to MQTT broker', 'failed!'.red);
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
	}
}

module.exports = client;