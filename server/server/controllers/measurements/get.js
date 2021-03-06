'use strict';

// Required modules
const mongoose = require('mongoose');

// Required data schema
const Errors      = require('../../data/errors');
const Measurement = require('../../data/measurement');

/**
 * @api {get} /measurements/:measurementId GET - single
 * @apiName GetMeasurement
 * @apiGroup Measurement
 * @apiVersion 1.0.0
 *
 * @apiParam {String} measurementId		Measurement's unique ID.
 *
 * @apiSuccess {Date} date				Date of the Measurement.
 * @apiSuccess {Collection} properties	Properties of the Measurement.
 * @apiSuccess {String} sensorId		Sensor's unique ID.
 *
 * @apiUse SuccessExample_Get_Measurements
 * @apiUse MeasurementNotFoundError
 * @apiUse ServerError
 */
exports.request = function(req, res) {
	let id = req.params.measurementId;

	Measurement.findOne({ _id: id }, function(err, measurement) {
		if (err) {

			res.send(Errors.ServerError(err));

		} else if (measurement == null) {
			
			res.send(Errors.MeasurementNotFoundError);

		} else {
			
			res.json(measurement);
		}
	});
}