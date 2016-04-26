// Load the application's configuration
var config      = require('../../server/config');
var resourceUrl = config.express_host + '/api/measurements';

// Required modules
var $       = require('jquery');
var promise = require('es6-promise');

module.exports = {
	addMeasurement: function(measurement) {
		var Promise = promise.Promise;
		return new Promise(function(resolve, reject) {
			$.ajax({
				url: resourceUrl,
				data: JSON.stringify(measurement),
				method: 'POST',
				dataType: 'json',
				contentType: 'application/json',
				success: resolve,
				error: reject
			});
		});
	},
	getMeasurements: function() {
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
	deleteMeasurement: function(measurement) {
		var Promise = promise.Promise;
		return new Promise(function(resolve, reject) {
			$.ajax({
				url: resourceUrl + '/' + measurement._id,
				method: 'DELETE',
				dataType: 'json',
				success: resolve,
				error: reject
			});
		});
	}
}