// Load the application's configuration
var config = require('../config');

// Required modules
var mqtt = require('mqtt');

// Set up the mqtt client
var client = mqtt.connect(config.mqtt_host);

client.once('connect', function () {
	console.log('Connection to MQTT broker successfull!');
	client.subscribe('presence');
	client.publish('presence', 'Hello mqtt');
});

client.on('message', function (topic, message) {
	console.log('New message "' + message.toString() + '" in topic "' + topic.toString() + '"');
	client.end();
});

module.exports = client;