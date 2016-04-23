// Required modules
var $ = require('jquery');
var promise = require('es6-promise');
var resourceUrl = 'http://localhost:3000/api/things';

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