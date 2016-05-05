// Required modules
var mongoose = require('mongoose');

// Required data schema
var Sensor = require('../../data/sensor');
var Thing  = require('../../data/thing');

/**
 * @api {get} /sensors/spatial/:bbox GET - Request all Sensor information within one bounding box
 * @apiName ListSpatialSensor
 * @apiGroup Sensor
 * @apiVersion 1.0.0
 *
 * @apiParam {String} bbox 		Bounding box information.
 *
 * @apiSuccess {Array} things	Array of Sensor information.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     [
 *       {
 *         "description": "water gauge",
 *         "thingId": "<< generated MongoDB ID >>",
 *         "featureId": "<< generated MongoDB ID >>",
 *         "_id": "<< generated MongoDB ID >>",
 *         "__v": 0
 *       },
 *       {
 *         "description": "water gauge",
 *         "thingId": "<< generated MongoDB ID >>",
 *         "featureId": "<< generated MongoDB ID >>",
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
				aggregateSensors(things, pos+1, result.concat(sensors), res);
			}
		});
	}
}