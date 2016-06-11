// Required modules
var mongoose = require('mongoose');
var _        = require('underscore');

// Required data schema
var Errors      = require('../../data/errors');
var Measurement = require('../../data/measurement');
var Sensor      = require('../../data/sensor');
var socket		= require('../../server.js');

/**
 * @api {post} /measurements POST
 * @apiName PostMeasurement
 * @apiGroup Measurement
 * @apiVersion 1.0.0
 *
 * @apiParam {String} sensorId 			Sensor's unique ID.
 * @apiParam {Date} date				Date of the Measurement.
 * @apiParam {Number} value				Value of the Measurement.
 *
 * @apiSuccess {Number} measurementId	Measurement's unique ID.
 *
 * @apiUse SuccessExample_Get_Measurements
 * @apiUse SensorNotFoundError
 * @apiUse ServerError
 */
exports.request = function(req, res) {
	var measurement = new Measurement(_.extend({}, req.body));

	var id = measurement.sensorId;

	Sensor.findOne({ _id: id }, function(err, sensor) {
		if (err) {
			res.send(Errors.SensorNotFoundError);
		} else {
			measurement.save(function(err) {
				if (err) {
					res.send(Errors.ServerError);
				} else {
					res.json(measurement);
					socket.notify("measurements", measurement);
				}
			});
		}
	});
}