'use strict';

// Required modules
const mongoose = require('mongoose');

// Required data schema
const Errors      = require('../../data/errors');
const Measurement = require('../../data/measurement');
const Sensor      = require('../../data/sensor');

/**
 * @api {get} /things/:thingId/measurements/latest GET - all Measurements latest (single Thing)
 * @apiName ListThingMeasurementsLatest
 * @apiGroup Thing
 * @apiVersion 1.0.0
 *
 * @apiParam {String} thingId				Thing's unique ID.
 *
 * @apiSuccess {Measurement[]} measurements	Array of Measurements (latest Measurement per Sensor).
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     [
 *       {
 *         "sensorId": "<< generated MongoDB ID >>",
 *         "featureId": "<< generated MongoDB ID >>",
 *         "date": "2016-04-24T16:56:45.000Z",
 *         "value": 7,
 *         "_id": "<< generated MongoDB ID >>"
 *       },
 *       {
 *         "sensorId": "<< generated MongoDB ID >>",
 *         "featureId": "<< generated MongoDB ID >>",
 *         "date": "2016-04-24T16:59:45.000Z",
 *         "value": 8,
 *         "_id": "<< generated MongoDB ID >>"
 *       }
 *     ]
 *
 * @apiUse ThingNotFoundError
 * @apiUse ServerError
 */
exports.request = function(req, res) {
	let id = req.params.thingId;

	Sensor.find({ thingId: id }, function(err, sensors) {
		if (err) {
			
			res.send(Errors.ThingNotFoundError);

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
					
					if (measurements.length > 0) {
						
						var measurement = { 
							_id: measurements[0]._id,
							date: measurements[0].date,
							value: measurements[0].value,
							sensorId: measurements[0].sensorId,
							featureId: sensors[pos].featureId
						};

						
						aggregateMeasurements(sensors, pos+1, result.concat(measurement), res);
						
					} else {
						
						aggregateMeasurements(sensors, pos+1, result.concat(measurements), res);
					}
				}
			});
	}
}