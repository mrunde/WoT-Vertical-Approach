// Load the application's configuration
var config = require('../config');
var url    = config.express_host + '/api';

// Required modules
var mqtt    = require('mqtt');
var request = require('request');

// Set up the mqtt client and connect it to the mqtt broker
var client = mqtt.connect(config.mqtt_host);

client.once('connect', function () {
	console.log('Connection to MQTT broker successfull!');
	client.subscribe('demo/test');
	client.publish('demo/test', '[ { "test": "Hello mqtt" }, { "test": "Hello world" } ]');

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
		case 'demo':
			switch (action) {
				case 'test':
					console.log('This is a test');
					console.log(json[1].test);
					break;
				default:
					console.log('This test went wrong');
					break;
			}
			break;
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
				default:
					console.log('Wrong action. Please check the API documentation for the right usage.');
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
				default:
					console.log('Wrong action. Please check the API documentation for the right usage.');
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
				default:
					console.log('Wrong action. Please check the API documentation for the right usage.');
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
				default:
					console.log('Wrong action. Please check the API documentation for the right usage.');
					break;
			}
			break;
		default:
			console.log('Wrong topic. Please check the API documentation for the right usage.');
			break;
	}
}

module.exports = client;