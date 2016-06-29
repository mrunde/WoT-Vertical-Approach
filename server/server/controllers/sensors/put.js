'use strict';

// Required modules
const mongoose = require('mongoose');
const _        = require('underscore');

// Required data schema
const Errors = require('../../data/errors');
const Sensor = require('../../data/sensor');
const Thing  = require('../../data/thing');
const User   = require('../../data/user');

/**
 * @api {put} /sensors/:sensorId PUT
 * @apiName PutSensor
 * @apiGroup Sensor
 * @apiVersion 1.0.0
 *
 * @apiParam {String} sensorId 		Sensor's unique ID.
 *
 * @apiParam {String} name			Name of the Sensor.
 * @apiParam {Number} interval		Interval of Sensor's Measurements in milliseconds.
 * @apiParam {Number} refLevel		Reference level of the Sensor.
 * @apiParam {Number} warnLevel		Warning level of the Sensor.
 * @apiParam {Number} riskLevel		Risk level of the Sensor.
 * @apiParam {String} thingId		Thing's unique ID.
 * @apiParam {String} featureId		Feature's unique ID.
 * @apiParam {String} token			User's unique token for API requests.
 *
 * @apiSuccess {String} sensorId	Sensor's unique ID.
 *
 * @apiUse SuccessExample_Get_Sensors
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

				let thingId = req.body.thingId;

				Thing.findOne({ _id: thingId, userId: user._id }, function(err, thing) {
					if (err) {

						res.send(Errors.InvalidTokenError);

					} else {

						let sensorId = req.params.sensorId;

						Sensor.load(sensorId, function(err, sensor) {
							if (err || sensor == null) {
								
								res.send(Errors.SensorNotFoundError);

							} else {
								
								sensor = _.extend(sensor, req.body);
								sensor.save(function(err) {
									if(err) {
										res.send(err);
									} else {
										res.json(sensor);
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