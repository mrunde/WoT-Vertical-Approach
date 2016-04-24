// Required modules
var mongoose = require('mongoose');
var Thing    = require('../../data/thing');

exports.request = function(req, res) {
	Thing.find(function(err, things) {
		if (err) {
			res.send(err);
		} else {
			res.json(things);
		}
	});
}