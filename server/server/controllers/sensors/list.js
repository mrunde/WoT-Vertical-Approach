// Required modules
var mongoose = require('mongoose');

// Required data schema
var Sensor = require('../../data/sensor');

/**
 * @api {get} /sensors GET - Request all Sensor information
 * @apiName ListSensor
 * @apiGroup Sensor
 * @apiVersion 1.0.0
 *
 * @apiSuccess {Sensor[]} sensors		Array of Sensor information.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     [
 *       {
 *         "_id": "<< generated MongoDB ID >>",
 *         "name": "water gauge",
 *         "intervall": 30000,
 *         "refLevel": 3,
 *         "warnLevel": 8,
 *         "riskLevel": 10,
 *         "thingId": "<< generated MongoDB ID >>",
 *         "featureId": "<< generated MongoDB ID >>",
 *         "__v": 0
 *       },
 *       {
 *         "_id": "<< generated MongoDB ID >>",
 *         "name": "water gauge",
 *         "intervall": 5000,
 *         "refLevel": 1,
 *         "warnLevel": 12,
 *         "riskLevel": 17,
 *         "thingId": "<< generated MongoDB ID >>",
 *         "featureId": "<< generated MongoDB ID >>",
 *         "__v": 0
 *       }
 *     ]
 *
 * @apiUse ServerError
 */
exports.request = function(req, res) {
	Sensor.find(function(err, sensors) {
		if (err) {
			res.send(err);
		} else {
			res.json(sensors);
		}
	});
}