// Load the application's configuration
var config      = require('../../server/config');
var resourceUrl = config.express_host + '/api/things';

// Required modules
var $       = require('jquery');
var promise = require('es6-promise');

module.exports = {
	addThing: function(thing) {
		var Promise = promise.Promise;
		return new Promise(function(resolve, reject) {
			$.ajax({
				url: resourceUrl,
				data: JSON.stringify(thing),
				method: 'POST',
				dataType: 'json',
				contentType: 'application/json',
				success: resolve,
				error: reject
			});
		});
	},
	getThings: function() {
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
	deleteThing: function(thing) {
		var Promise = promise.Promise;
		return new Promise(function(resolve, reject) {
			$.ajax({
				url: resourceUrl + '/' + thing._id,
				method: 'DELETE',
				dataType: 'json',
				success: resolve,
				error: reject
			});
		});
	}
}