// Required modules
var mongoose = require('mongoose');
var Sensor   = require('../../data/sensor');

exports.request = function(req, res) {
	Sensor.find(function(err, sensors) {
		if (err) {
			res.send(err);
		} else {
			res.json(sensors);
		}
	});
}