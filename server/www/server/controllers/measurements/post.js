// Required modules
var mongoose    = require('mongoose');
var _           = require('underscore');

// Required data schema
var Measurement = require('../../data/measurement');

/**
 * @api {post} /measurements POST - Create a Measurement
 * @apiName PostMeasurement
 * @apiGroup Measurement
 * @apiVersion 1.0.0
 *
 * @apiParam {String} sensorId 			Sensor's unique ID.
 * @apiParam {Date} date				Date of the Measurement.
 * @apiParam {Number} value				Value of the Measurement.
 *
 * @apiSuccess {Number} measurementId	Measurement's unique ID.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "__v": 0,
 *       "date": "2016-04-23T22:54:00.000Z",
 *       "value": 7,
 *       "sensorId": "<< generated MongoDB ID >>",
 *       "_id": "<< generated MongoDB ID >>"
 *     }
 *
 * @apiUse SensorNotFoundError
 * @apiUse FeatureNotFoundError
 * @apiUse ServerError
 */
exports.request = function(req, res) {
	var measurement = new Measurement(_.extend({}, req.body));

	measurement.save(function(err) {
		if (err) {
			res.send(err);
		} else {
			res.json(measurement);
		}
	});
}