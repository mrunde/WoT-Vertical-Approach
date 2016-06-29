'use strict';

// Required modules
const async    = require('async');
const mongoose = require('mongoose');

// Required data schema
const Errors      = require('../../data/errors');
const Measurement = require('../../data/measurement');
const Sensor      = require('../../data/sensor');
const User        = require('../../data/user');

/**
 * @api {delete} /sensors/:sensorId DELETE
 * @apiName DeleteSensor
 * @apiGroup Sensor
 * @apiVersion 1.0.0
 *
 * @apiParam {String} sensorId	Sensor's unique ID.
 * @apiParam {String} token		User's unique token for API requests.
 *
 * @apiUse SuccessExample_Deleted
 * @apiUse SensorNotFoundError
 * @apiUse TokenNotFoundError
 * @apiUse InvalidTokenError
 * @apiUse ServerError
 */
exports.request = function(req, res) {
	let token = req.body.token;

	if (token) {
		User.findOne({ token: token }, function(err, user) {
			if (err) {
				res.send(Errors.InvalidTokenError);
			} else {
				let sensorId = req.params.sensorId;

				Sensor.findOne({ _id: sensorId, userId: user._id }, function(err, sensor) {
					if (err) {
						res.send(Errors.SensorNotFoundError);
					} else {
						async.waterfall([
							// Delete Measurements
							function(callback) {
								Measurement.remove({ sensorId: sensorId }, function(err) {
									callback(err);
								});
							},
							// Delete Sensor
							function(callback) {
								Sensor.remove({ _id: sensorId }, function(err, removed) {
									callback(err, removed);
								});
							}
						], function(err, result) {
							if (err) {
								res.send(Errors.ServerError);
							} else {
								res.json(result);
							}
						});
					}
				});
			}
		});
	} else {
		res.send(Errors.TokenNotFoundError);
	}
}