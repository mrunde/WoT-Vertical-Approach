// Required modules
var mongoose = require('mongoose');
var Sensor   = require('../../data/sensor');
var _        = require('underscore');

exports.request = function(req, res) {
	var sensor = new Sensor(_.extend({}, req.body));
	sensor.save(function(err) {
		if (err) {
			res.send(err);
		} else {
			res.json(sensor);
		}
	});
}