'use strict';

// Required modules
const mongoose = require('mongoose');

// Required data schema
const Measurement = require('../../data/measurement');

/**
 * @api {get} /sensors/:sensorId/measurements GET - all Measurements
 * @apiName ListSensorMeasurements
 * @apiGroup Sensor
 * @apiVersion 1.0.0
 *
 * @apiParam {String} sensorId				Sensor's unique ID.
 *
 * @apiSuccess {Measurement[]} measurements	Array of Measurement information.
 *
 * @apiUse SuccessExample_List_Measurements
 * @apiUse SensorNotFoundError
 * @apiUse ServerError
 */
exports.request = function(req, res) {
	let id = req.params.sensorId;

	Measurement.find({ sensorId: id }, function(err, things) {
		if (err) {
			res.send(err);
		} else {
			res.json(things);
		}
	});
}