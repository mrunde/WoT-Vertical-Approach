// Required modules
var dispatcher         = require('../dispatcher');
var measurementService = require('../services/measurementService');

function MeasurementStore() {
	var listeners = [];

	function onChange(listener) {
		getMeasurements(listener);
		listeners.push(listener);
	}

	function getMeasurements(callback) {
		measurementService.getMeasurements().then(function(res) {
			callback(res);
		});
	}

	function addMeasurement(measurement) {
		measurementService.addMeasurement(measurement).then(function(res) {
			triggerListeners();
		});
	}

	function deleteMeasurement(measurement) {
		measurementService.deleteMeasurement(measurement).then(function(res) {
			triggerListeners();
		});
	}

	function triggerListeners() {
		getMeasurements(function(res) {
			listeners.forEach(function(listener) {
				listener(res);
			});
		});
	}

	dispatcher.register(function(payload) {
		var split = payload.type.split(':');
		if (split[0] === 'measurement') {
			switch (split[1]) {
				case 'addMeasurement':
					addMeasurement(payload.measurement);
					break;
				case 'deleteMeasurement':
					deleteMeasurement(payload.measurement);
					break;
			}
		}
	});

	return {
		onChange: onChange
	}
}

module.exports = MeasurementStore();