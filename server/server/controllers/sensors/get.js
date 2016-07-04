'use strict';

// Required modules
const mongoose = require('mongoose');

// Required data schema
const Errors = require('../../data/errors');
const Sensor = require('../../data/sensor');

/**
 * @api {get} /sensors/:sensorId GET - single
 * @apiName GetSensor
 * @apiGroup Sensor
 * @apiVersion 1.0.0
 *
 * @apiParam {String} sensorId 		Sensor's unique ID.
 *
 * @apiSuccess {String} name		Name of the Sensor.
 * @apiSuccess {Number} interval	Interval of Sensor's Measurements in milliseconds.
 * @apiSuccess {Number} refLevel	Reference level of the Sensor.
 * @apiSuccess {Number} warnLevel	Warning level of the Sensor.
 * @apiSuccess {Number} riskLevel	Risk level of the Sensor.
 * @apiSuccess {String} thingId		Thing's unique ID.
 * @apiSuccess {String} featureId	Feature's unique ID.
 *
 * @apiUse SuccessExample_Get_Sensors
 * @apiUse SensorNotFoundError
 * @apiUse ServerError
 */
exports.request = function(req, res) {
	let id = req.params.sensorId;

	Sensor.findOne({ _id: id }, function(err, sensor) {
		if (err) {

			res.send(Errors.ServerError(err));
			
		} else if (sensor == null) {
			
			res.send(Errors.SensorNotFoundError);

		} else {
			
			res.json(sensor);
		}
	});
}