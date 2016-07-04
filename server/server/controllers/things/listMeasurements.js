'use strict';

// Required modules
const mongoose = require('mongoose');

// Required data schema
const Errors      = require('../../data/errors');
const Measurement = require('../../data/measurement');
const Sensor      = require('../../data/sensor');

/**
 * @api {get} /things/:thingId/measurements GET - all Measurements
 * @apiName ListThingMeasurements
 * @apiGroup Thing
 * @apiVersion 1.0.0
 *
 * @apiParam {String} thingId				Thing's unique ID.
 *
 * @apiSuccess {Measurement[]} measurements	Array of Measurements.
 *
 * @apiUse SuccessExample_List_Measurements
 * @apiUse ThingNotFoundError
 * @apiUse ServerError
 */
exports.request = function(req, res) {
	let id = req.params.thingId;

	Sensor.find({ thingId: id }, function(err, sensors) {
		if (err) {
			
			res.send(Errors.ServerError(err));

		} else {
			
			aggregateMeasurements(sensors, 0, [], res);
		}
	});
}

function aggregateMeasurements(sensors, pos, result, res){
	if (pos == sensors.length) {
		
		res.json(result);

	} else {
		Measurement.find({ sensorId: sensors[pos]._id }, function(err, measurements) {
			if (err) {
				
				res.send(Errors.ServerError(err));

			} else {
				
				aggregateMeasurements(sensors, pos+1, result.concat(measurements), res);
			}
		});
	}
}