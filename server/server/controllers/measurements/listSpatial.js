// Required modules
var mongoose = require('mongoose');

// Required data schema
var Measurement = require('../../data/measurement');
var Sensor      = require('../../data/sensor');
var Thing       = require('../../data/thing');

/**
 * @api {get} /measurements/spatial/:bbox GET - Request all Measurement information within one bounding box
 * @apiName ListSpatialMeasurement
 * @apiGroup Measurement
 * @apiVersion 1.0.0
 *
 * @apiParam {String} bbox 					Bounding box information.
 *
 * @apiSuccess {Measurement[]} measurements	Array of Measurement information.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     [
 *       {
 *         "date": "2016-04-23T22:54:00.000Z",
 *         "value": 7,
 *         "sensorId": "<< generated MongoDB ID >>",
 *         "_id": "<< generated MongoDB ID >>",
 *         "__v": 0
 *       },
 *       {
 *         "date": "2016-05-03T15:46:55.000Z",
 *         "value": 15,
 *         "sensorId": "<< generated MongoDB ID >>",
 *         "_id": "<< generated MongoDB ID >>",
 *         "__v": 0
 *       }
 *     ]
 *
 * @apiUse ServerError
 */
exports.request = function(req, res) {
	var coordinates = req.params.bbox.split(',');
	var bottomLeft  = [ coordinates[0], coordinates[1] ];
	var upperRight  = [ coordinates[2], coordinates[3] ];

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