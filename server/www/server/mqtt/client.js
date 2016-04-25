// Load the application's configuration
var config = require('../config');

// Required modules
var mqtt = require('mqtt');

// Set up the mqtt client and connect it to the mqtt broker
var client = mqtt.connect(config.mqtt_host);

client.once('connect', function () {
	console.log('Connection to MQTT broker successfull!');
	client.subscribe('demo/test');
	client.publish('demo/test', '[ { "test": "Hello mqtt" }, { "test": "Hello world" } ]');
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