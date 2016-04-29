// Required modules
var dispatcher    = require('../dispatcher');
var sensorService = require('../services/sensorService');

function SensorStore() {
	var listeners = [];

	function onChange(listener) {
		getSensors(listener);
		listeners.push(listener);
	}

	function getSensors(callback) {
		sensorService.getSensors().then(function(res) {
			callback(res);
		});
	}

	function addSensor(sensor) {
		sensorService.addSensor(sensor).then(function(res) {
			triggerListeners();
		});
	}

	function deleteSensor(sensor) {
		sensorService.deleteSensor(sensor).then(function(res) {
			triggerListeners();
		});
	}

	function triggerListeners() {
		getSensors(function(res) {
			listeners.forEach(function(listener) {
				listener(res);
			});
		});
	}

	dispatcher.register(function(payload) {
		var split = payload.type.split(':');
		if (split[0] === 'sensor') {
			switch (split[1]) {
				case 'addSensor':
					addSensor(payload.sensor);
					break;
				case 'deleteSensor':
					deleteSensor(payload.sensor);
					break;
			}
		}
	});

	return {
		onChange: onChange
	}
}

module.exports = SensorStore();