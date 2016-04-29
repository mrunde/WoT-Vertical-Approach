// Required modules
var mongoose = require('mongoose');

// Required data schema
var Measurement = require('../../data/measurement');

/**
 * @api {get} /measurements GET - Request all Measurement information
 * @apiName ListMeasurement
 * @apiGroup Measurement
 * @apiVersion 1.0.0
 *
 * @apiSuccess {Array} measurements	Array of Measurement information.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     [
 *       {
 *         "_id": "<< generated MongoDB ID >>",
 *         "date": "2016-04-23T22:54:00.000Z",
 *         "value": 7,
 *         "sensorId": "<< generated MongoDB ID >>",
 *         "__v": 0
 *       },
 *       {
 *         "_id": "<< generated MongoDB ID >>",
 *         "date": "2016-04-23T22:55:00.000Z",
 *         "value": 7.5,
 *         "sensorId": "<< generated MongoDB ID >>",
 *         "__v": 0
 *       }
 *     ]
 *
 * @apiUse MeasurementNotFoundError
 * @apiUse ServerError
 */
exports.request = function(req, res) {
	Measurement.find(function(err, measurements) {
		if (err) {
			res.send(err);
		} else {
			res.json(measurements);
		}
	});
}