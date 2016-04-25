// Required modules
var mongoose = require('mongoose');

// Required data schema
var Sensor   = require('../../data/sensor');

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
 *         "_id": "571ce456a175c01814e81f89",
 *         "description": "water gauge",
 *         "thingId": "571bcbba0dd9608814374fb8",
 *         "featureId": "571bd6783821521012812bbc",
 *         "__v": 0
 *       },
 *       {
 *         "_id": "571ce66599d9232813f01663",
 *         "description": "water gauge",
 *         "thingId": "571bcbba0dd9608814374fb8",
 *         "featureId": "571bd6783821521012812bbc",
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