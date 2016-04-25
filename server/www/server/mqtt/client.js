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

	client.subscribe('features/delete');
	client.subscribe('features/get');
	client.subscribe('features/list');
	client.subscribe('features/post');

	client.subscribe('measurements/delete');
	client.subscribe('measurements/get');
	client.subscribe('measurements/list');
	client.subscribe('measurements/post');

	client.subscribe('sensors/delete');
	client.subscribe('sensors/get');
	client.subscribe('sensors/list');
	client.subscribe('sensors/post');

	client.subscribe('things/delete');
	client.subscribe('things/get');
	client.subscribe('things/list');
	client.subscribe('things/post');
});

// Listen on incoming messages
client.on('message', handleMessage);

function handleMessage(topic, payload) {
	// Get the desired action
	var action = topic.split('/')[1];

	// Convert the payload into JSON data format
	var json = JSON.parse(payload);

	// Handle the received message
	switch (topic.split('/')[0]) {
		// --------------------------------------------------
		// Features
		// --------------------------------------------------
		case 'features':
			switch (action) {
				case 'delete':
					break;
				case 'get':
					break;
				case 'list':
					break;
				case 'post':
					request.post({
						headers: {'content-type': 'application/json'},
						url: url + '/features',
						json: json
						}, function(error, response, body) {
							console.log(error);
					});
					break;
			}
			break;
		// --------------------------------------------------
		// Measurements
		// --------------------------------------------------
		case 'measurements':
			switch (action) {
				case 'delete':
					break;
				case 'get':
					break;
				case 'list':
					break;
				case 'post':
					request.post({
						headers: {'content-type': 'application/json'},
						url: url + '/measurements',
						json: json
						}, function(error, response, body) {
							console.log(error);
					});
					break;
			}
			break;
		// --------------------------------------------------
		// Sensors
		// --------------------------------------------------
		case 'sensors':
			switch (action) {
				case 'delete':
					break;
				case 'get':
					break;
				case 'list':
					break;
				case 'post':
					request.post({
						headers: {'content-type': 'application/json'},
						url: url + '/sensors',
						json: json
						}, function(error, response, body) {
							console.log(error);
					});
					break;
			}
			break;
		// --------------------------------------------------
		// Things
		// --------------------------------------------------
		case 'things':
			switch (action) {
				case 'delete':
					break;
				case 'get':
					break;
				case 'list':
					break;
				case 'post':
					request.post({
						headers: {'content-type': 'application/json'},
						url: url + '/things',
						json: json
						}, function(error, response, body) {
							console.log(error);
					});
					break;
			}
			break;
	}
}

module.exports = client;