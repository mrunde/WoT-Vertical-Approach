// Required modules
var mongoose    = require('mongoose');
var Measurement = require('../../data/measurement');

exports.request = function(req, res) {
	Measurement.find(function(err, measurements) {
		if (err) {
			res.send(err);
		} else {
			res.json(measurements);
		}
	});
}