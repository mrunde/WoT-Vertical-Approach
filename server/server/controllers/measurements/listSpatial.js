'use strict';

// Required modules
const mongoose = require('mongoose');

// Required data schema
const Measurement = require('../../data/measurement');
const Sensor      = require('../../data/sensor');
const Thing       = require('../../data/thing');

/**
 * @api {get} /measurements/spatial/:bbox GET - all in bounding box
 * @apiName ListSpatialMeasurement
 * @apiGroup Measurement
 * @apiVersion 1.0.0
 *
 * @apiParam {String} bbox 					Bounding box information.
 *
 * @apiSuccess {Measurement[]} measurements	Array of Measurement information.
 *
 * @apiUse SuccessExample_List_Measurements
 * @apiUse ServerError
 */
exports.request = function(req, res) {
	let coordinates = req.params.bbox.split(',');
	let bottomLeft  = [ parseFloat(coordinates[0]), parseFloat(coordinates[1]) ];
	let upperRight  = [ parseFloat(coordinates[2]), parseFloat(coordinates[3]) ];

	Thing.find({
		loc: {
			$geoWithin: {
				$box: [
					bottomLeft,
					upperRight
				]
			}
		}
	}, function(err, things) {
		if (err) {
			res.send(err);
		} else {
			aggregateSensors(things, 0, [], res);
		}
	});
}

function aggregateSensors(things, pos, result, res) {
	if (pos == things.length) {
		res.json(result);
	} else {
		Sensor.find({ thingId: things[pos].id }, function(err, sensors) {
			if (err) {
				res.send(err);
			} else {
				aggregateMeasurements(things, sensors, pos, 0, result, res);
			}
		});
	}
}

function aggregateMeasurements(things, sensors, posThing, pos, result, res) {
	if (pos == sensors.length) {
		aggregateSensors(things, posThing+1, result, res);
	} else {
		Measurement.find({ sensorId: sensors[pos].id }, function(err, measurements) {
			if (err) {
				res.send(err);
			} else {
				aggregateMeasurements(things, sensors, posThing, pos+1, result.concat(measurements), res);
			}
		});
	}
}