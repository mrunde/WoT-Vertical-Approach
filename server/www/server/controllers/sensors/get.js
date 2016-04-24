// Required modules
var mongoose = require('mongoose');
var Sensor   = require('../../data/sensor');

exports.request = function(req, res) {
	var id = req.params.sensorId;
	Sensor.findOne({ _id: id }, function(err, sensor) {
		if (err) {
			res.send(err);
		} else {
			res.json(sensor);
		}
	});
}