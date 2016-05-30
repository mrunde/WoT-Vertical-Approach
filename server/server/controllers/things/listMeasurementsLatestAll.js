// Required modules
var mongoose = require('mongoose');

// Required data schema
var Errors      = require('../../data/errors');
var Measurement = require('../../data/measurement');
var Sensor      = require('../../data/sensor');

/**
 * @api {get} /things/measurements/latest GET - Request all latest Measurements of all things
 * @apiName ListThingMeasurementsLatestAll
 * @apiGroup Thing
 * @apiVersion 1.0.0
 *
 * @apiSuccess {Measurement[]} measurements	Array of Measurements (latest Measurement per Sensor).
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     [
 *       {
 *         "sensorId": "<< generated MongoDB ID >>",
 *         "date": "2016-04-24T16:56:45.000Z",
 *         "value": 7,
 *         "_id": "<< generated MongoDB ID >>",
 *         "__v": 0
 *       },
 *       {
 *         "sensorId": "<< generated MongoDB ID >>",
 *         "date": "2016-04-24T16:59:45.000Z",
 *         "value": 8,
 *         "_id": "<< generated MongoDB ID >>",
 *         "__v": 0
 *       }
 *     ]
 *
 * @apiUse ServerError
 */
exports.request = function(req, res) {
	var id = req.params.thingId;

	Sensor.find({}, function(err, sensors) {
		if (err) {
			res.send(err);
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
					res.send(err);
				} else {
					aggregateMeasurements(sensors, pos+1, result.concat(measurements), res);
				}
			});
	}
}