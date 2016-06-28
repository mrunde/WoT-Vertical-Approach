'use strict';

// Required modules
const mongoose = require('mongoose');

// Required data schema
const Measurement = require('../../data/measurement');

/**
 * @api {get} /measurements GET - all
 * @apiName ListMeasurement
 * @apiGroup Measurement
 * @apiVersion 1.0.0
 *
 * @apiSuccess {Measurement[]} measurements	Array of Measurement information.
 *
 * @apiUse SuccessExample_List_Measurements
 * @apiUse MeasurementNotFoundError
 * @apiUse ServerError
 */
exports.request = function(req, res) {
	Measurement.find(function(err, measurements) {
		if (err) {
			res.send(err);
		} else {
			res.json(measurements);
		}
	});
}