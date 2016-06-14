'use strict';

// Load the application's configuration
var config = require('../server/config');
const url  = config.express_host + '/api';

// Required modules
var async   = require('async');
var colors  = require('colors');
var request = require('request');

console.log('\n////////////////////////////////////////////////////////////\n');
console.log('          STARTING TO CLEAR DEMO DATA...'.cyan);
console.log('\n////////////////////////////////////////////////////////////\n');

// Find and delete all demo Users
console.log('  Searching for demo', 'Users...'.cyan);
console.log('\n------------------------------------------------------------\n');

// Get all Users
request.get({
	async: true,
	url: url + '/users',
	json: true
}, function(error, response, body) {
	if (!error) {
		async.each(body, function(user, callback) {
			// Check if the User is a demo User
			if (user.name.indexOf('demo') > -1) {
				// Delete the demo User
				request.delete({
					url: url + '/users/' + user._id
				}, function(error, response, body) {
					if (!error) {
						console.log('  User ' + user._id, 'deleted'.green);
					} else {
						console.log('  Deletion of User ' + user._id, 'failed'.red);
					}
					
					console.log('\n------------------------------------------------------------\n');

					callback(error);
				});
			}
		});
	}
});

// Find and delete all demo Features
console.log('  Searching for demo', 'Features...'.cyan);
console.log('\n------------------------------------------------------------\n');

// Get all Features
request.get({
	async: true,
	url: url + '/features',
	json: true
}, function(error, response, body) {
	if (!error) {
		async.each(body, function(feature, callback) {
			// Check if the Feature is a demo Feature
			if (feature.name.indexOf('demo') > -1) {
				// Delete the demo Feature
				request.delete({
					url: url + '/features/' + feature._id
				}, function(error, response, body) {
					if (!error) {
						console.log('  Feature ' + feature._id, 'deleted'.green);
					} else {
						console.log('  Deletion of Feature ' + feature._id, 'failed'.red);
					}
					
					console.log('\n------------------------------------------------------------\n');

					callback(error);
				});
			}
		});
	}
});