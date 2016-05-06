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
 * @apiSuccess {Array} sensors		Array of Sensor information.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     [
 *       {
 *         "_id": "<< generated MongoDB ID >>",
 *         "name": "water gauge",
 *         "thingId": "<< generated MongoDB ID >>",
 *         "featureId": "<< generated MongoDB ID >>",
 *         "__v": 0
 *       },
 *       {
 *         "_id": "<< generated MongoDB ID >>",
 *         "name": "water gauge",
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