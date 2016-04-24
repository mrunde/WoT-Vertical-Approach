// Required modules
var mongoose    = require('mongoose');
var Measurement = require('../../data/measurement');
var _           = require('underscore');

exports.request = function(req, res) {
	var measurement = new Measurement(_.extend({}, req.body));
	measurement.save(function(err) {
		if (err) {
			res.send(err);
		} else {
			res.json(measurement);
		}
	});
}