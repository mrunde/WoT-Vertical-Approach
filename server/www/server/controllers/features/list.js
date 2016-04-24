// Required modules
var mongoose = require('mongoose');
var Feature  = require('../../data/feature');

exports.request = function(req, res) {
	Feature.find(function(err, features) {
		if (err) {
			res.send(err);
		} else {
			res.json(features);
		}
	});
}