'use strict';

// Required modules
const mongoose = require('mongoose');

// Required data schema
const Errors      = require('../../data/errors');
const Measurement = require('../../data/measurement');
const Sensor      = require('../../data/sensor');

/**
 * @api {get} /things/measurements/latest GET - all Measurements latest (all Things)
 * @apiName ListThingMeasurementsLatestAll
 * @apiGroup Thing
 * @apiVersion 1.0.0
 *
 * @apiSuccess {Measurement[]} measurements	Array of Measurements (latest Measurement per Sensor).
 *
 * @apiUse SuccessExample_List_Measurements
 * @apiUse ServerError
 */
exports.request = function(req, res) {
	let id = req.params.thingId;

	Sensor.find({}, function(err, sensors) {
		if (err) {
			
			res.send(Errors.ServerError);

		} else {
			
			aggregateMeasurements(sensors, 0, [], res);
		}
	});
}

function aggregateMeasurements(sensors, pos, result, res){
	if (pos == sensors.length) {
		
		res.json(result);

	} else {
		
		Measurement
			.find({ sensorId: sensors[pos]._id })
			.sort({ date: 'desc' })
			.limit(1)
			.exec(function(err, measurements) {
				if (err) {
					
					res.send(Errors.ServerError);

				} else {
					
					aggregateMeasurements(sensors, pos+1, result.concat(measurements), res);
				}
			});
	}
}