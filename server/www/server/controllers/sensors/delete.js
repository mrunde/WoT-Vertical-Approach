// Required modules
var mongoose = require('mongoose');
var Sensor   = require('../../data/sensor');

exports.request = function(req, res) {
	var id = req.params.sensorId;
	Sensor.remove({ _id: id }, function(err, removed) {
		if (err) {
			res.send(err);
		} else {
			res.json(removed);
		}
	});
}