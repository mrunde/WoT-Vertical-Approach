'use strict';

// Required modules
const mongoose = require('mongoose');

// Required data schema
const Errors      = require('../../data/errors');
const Measurement = require('../../data/measurement');
const Sensor      = require('../../data/sensor');
const Thing       = require('../../data/thing');
const User        = require('../../data/user');

/**
 * @api {delete} /measurements/:measurementId DELETE
 * @apiName DeleteMeasurement
 * @apiGroup Measurement
 * @apiVersion 1.0.0
 *
 * @apiParam {String} measurementId		Measurement's unique ID.
 * @apiParam {String} token				User's unique token for API requests.
 *
 * @apiUse SuccessExample_Deleted
 * @apiUse MeasurementNotFoundError
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
				
				let measurementId = req.body.measurementId;

				Measurement.findOne({ _id: measurementId }, function(err, measurement) {
					if (err) {
						
						res.send(Errors.MeasurementNotFoundError);

					} else {

						let sensorId = measurement.sensorId;

						Sensor.findOne({ _id: sensorId }, function(err, sensor) {
							if (err) {
								
								res.send(Errors.InvalidTokenError);

							} else {

								let thingId = sensor.thingId;

								Thing.findOne({ _id: thingId, userId: user._id }, function(err, thing) {
									if (err) {

										res.send(Errors.InvalidTokenError);

									} else {

										Measurement.remove({ _id: measurementId }, function(err, removed) {
											if (err) {
												
												res.send(Errors.ServerError(err));

											} else {
												
												res.json(removed);
											}
										});
									}
								});
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