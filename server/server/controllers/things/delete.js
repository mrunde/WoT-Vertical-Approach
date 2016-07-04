'use strict';

// Required modules
const async    = require('async');
const mongoose = require('mongoose');

// Required data schema
const Errors      = require('../../data/errors');
const Measurement = require('../../data/measurement');
const Sensor      = require('../../data/sensor');
const Thing       = require('../../data/thing');
const User        = require('../../data/user');

/**
 * @api {delete} /things/:thingId DELETE
 * @apiName DeleteThing
 * @apiGroup Thing
 * @apiVersion 1.0.0
 *
 * @apiParam {String} thingId	Thing's unique ID.
 * @apiParam {String} token		User's unique token for API requests.
 *
 * @apiUse SuccessExample_Deleted
 * @apiUse ThingNotFoundError
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
				
				let thingId = req.params.thingId;

				Thing.findOne({ _id: thingId, userId: user._id }, function(err, user) {
					if (err) {
						res.send(Errors.ThingNotFoundError);
					} else {

						async.waterfall([
							// Get sensors
							function(callback) {
								Sensor.find({ thingId: thingId }, function(err, sensors) {
									callback(err, sensors);
								});
							},
							// Delete Measurements
							function(sensors, callback) {
								async.forEachOf(sensors, function(sensor, key, callback) {
									Measurement.remove({ sensorId: sensor._id }, function(err) {
										callback(err);
									});
								}, function (err) {
									callback(err);
								});
							},
							// Delete Sensors
							function(callback) {
								Sensor.remove({ thingId: thingId }, function(err) {
									callback(err);
								});
							},
							// Delete Thing
							function(callback) {
								Thing.remove({ _id: thingId }, function(err, removed) {
									callback(err, removed);
								});
							}
						], function(err, result) {
							if (err) {
								
								res.send(Errors.ServerError(err));

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