// Load the application's configuration
var config      = require('../../server/config');
var resourceUrl = config.express_host + '/api/features';

// Required modules
var $       = require('jquery');
var promise = require('es6-promise');

module.exports = {
	addFeature: function(feature) {
		var Promise = promise.Promise;
		return new Promise(function(resolve, reject) {
			$.ajax({
				url: resourceUrl,
				data: JSON.stringify(feature),
				method: 'POST',
				dataType: 'json',
				contentType: 'application/json',
				success: resolve,
				error: reject
			});
		});
	},
	getFeatures: function() {
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
	deleteFeature: function(feature) {
		var Promise = promise.Promise;
		return new Promise(function(resolve, reject) {
			$.ajax({
				url: resourceUrl + '/' + feature._id,
				method: 'DELETE',
				dataType: 'json',
				success: resolve,
				error: reject
			});
		});
	}
}