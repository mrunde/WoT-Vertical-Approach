'use strict';

// Required modules
const mongoose = require('mongoose');

// Required data schema
const Sensor = require('../../data/sensor');
const Thing  = require('../../data/thing');

/**
 * @api {get} /sensors/spatial/:bbox GET - all in bounding box
 * @apiName ListSpatialSensor
 * @apiGroup Sensor
 * @apiVersion 1.0.0
 *
 * @apiParam {String} bbox 			Bounding box information.
 *
 * @apiSuccess {Sensor[]} sensors	Array of Sensor information.
 *
 * @apiUse SuccessExample_List_Sensors
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
				aggregateSensors(things, pos+1, result.concat(sensors), res);
			}
		});
	}
}