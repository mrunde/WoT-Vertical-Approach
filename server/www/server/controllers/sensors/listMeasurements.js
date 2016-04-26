// Required modules
var mongoose = require('mongoose');

// Required data schema
var Measurement = require('../../data/measurement');

/**
 * @api {get} /sensors/:sensorId/measurements GET - Request all Sensor's measurements
 * @apiName ListSensorMeasurements
 * @apiGroup Sensor
 * @apiVersion 1.0.0
 *
 * @apiParam {String} sensorId		Sensor's unique ID.
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
 * @apiUse SensorNotFoundError
 * @apiUse ServerError
 */
exports.request = function(req, res) {
	var id = req.params.sensorId;

	Measurement.find({ sensorId: id }, function(err, things) {
		if (err) {
			res.send(err);
		} else {
			res.json(things);
		}
	});
}