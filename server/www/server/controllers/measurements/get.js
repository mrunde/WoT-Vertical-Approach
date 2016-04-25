// Required modules
var mongoose    = require('mongoose');

// Required data schema
var Measurement = require('../../data/measurement');

/**
 * @api {get} /measurements/:measurementId GET - Request single Measurement information
 * @apiName GetMeasurement
 * @apiGroup Measurement
 * @apiVersion 1.0.0
 *
 * @apiParam {String} measurementId		Measurement's unique ID.
 *
 * @apiSuccess {Date} date				Date of the Measurement.
 * @apiSuccess {Collection} properties	Properties of the Measurement.
 * @apiSuccess {String} sensorId		Sensor's unique ID.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "_id": "<< generated MongoDB ID >>",
 *       "date": "2016-04-24T16:56:45.000Z",
 *       "value": 7,
 *       "sensorId": "<< generated MongoDB ID >>",
 *       "__v": 0
 *     }
 *
 * @apiUse MeasurementNotFoundError
 * @apiUse ServerError
 */
exports.request = function(req, res) {
	var id = req.params.measurementId;

	Measurement.findOne({ _id: id }, function(err, measurement) {
		if (err) {
			res.send(err);
		} else {
			res.json(measurement);
		}
	});
}