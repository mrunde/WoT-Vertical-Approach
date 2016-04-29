// Load the application's configuration
var config      = require('../../server/config');
var resourceUrl = config.express_host + '/api/sensors';

// Required modules
var $       = require('jquery');
var promise = require('es6-promise');

module.exports = {
	addSensor: function(sensor) {
		var Promise = promise.Promise;
		return new Promise(function(resolve, reject) {
			$.ajax({
				url: resourceUrl,
				data: JSON.stringify(sensor),
				method: 'POST',
				dataType: 'json',
				contentType: 'application/json',
				success: resolve,
				error: reject
			});
		});
	},
	getSensors: function() {
		var Promise = promise.Promise;
		return new Promise(function(resolve, reject) {
			$.ajax({
				url: resourceUrl,
				method: 'GET',
				dataType: 'json',
				success: resolve,
				error: reject
			});
		});
	},
	deleteSensor: function(sensor) {
		var Promise = promise.Promise;
		return new Promise(function(resolve, reject) {
			$.ajax({
				url: resourceUrl + '/' + sensor._id,
				method: 'DELETE',
				dataType: 'json',
				success: resolve,
				error: reject
			});
		});
	}
}