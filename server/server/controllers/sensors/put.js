// Required modules
var mongoose = require('mongoose');
var _        = require('underscore');

// Required data schema
var Sensor = require('../../data/sensor');
var Errors = require('../../data/errors');
var socket = require('../../server.js');

/**
 * @api {put} /sensors/:sensorId PUT - Update a Sensor
 * @apiName PUTSensor
 * @apiGroup Sensor
 * @apiVersion 1.0.0
 *
 * @apiParam {String} sensorId 		Sensor's unique ID.
 *
 * @apiParam {String} name			Name of the Sensor.
 * @apiParam {Number} interval		Interval of Sensor's Measurements in milliseconds.
 * @apiParam {Number} refLevel		Reference level of the Sensor.
 * @apiParam {Number} warnLevel		Warning level of the Sensor.
 * @apiParam {Number} riskLevel		Risk level of the Sensor.
 * @apiParam {String} thingId		Thing's unique ID.
 * @apiParam {String} featureId		Feature's unique ID.
 *
 * @apiSuccess {String} sensorId	Sensor's unique ID.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "__v": 0,
 *       "name": "Water Gauge",
 *       "interval": 30000,
 *       "refLevel": 3,
 *       "warnLevel": 8,
 *       "riskLevel": 10,
 *       "thingId": "<< generated MongoDB ID >>",
 *       "featureId": "<< generated MongoDB ID >>",
 *       "_id": "<< generated MongoDB ID >>"
 *     }
 *
 * @apiUse SensorNotFoundError
 * @apiUse ServerError
 */
exports.request = function(req, res) {
	Sensor.load(req.params.sensorId, function(err, sensor) {
		if(err || sensor == null) {
			res.send(Errors.SensorNotFoundError);
		} else {
			sensor = _.extend(sensor, req.body);
			sensor.save(function(err) {
				if(err) {
					res.send(err);
				} else {
					res.json(sensor);
				}
			});
		}
	});
}