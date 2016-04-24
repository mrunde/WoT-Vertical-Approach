// Required modules
var mongoose    = require('mongoose');
var Measurement = require('../../data/measurement');

exports.request = function(req, res) {
	var id = req.params.measurementId;
	Measurement.findOne({ _id: id }, function(err, measurement) {
		if (err) {
			res.send(err);
		} else {
			res.json(measurement);
		}
	});
}