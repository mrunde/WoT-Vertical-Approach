// Required modules
var mongoose = require('mongoose');

// Required data schema
var Sensor = require('../../data/sensor');

/**
 * @api {get} /sensors/:sensorId GET - Request single Sensor information
 * @apiName GetSensor
 * @apiGroup Sensor
 * @apiVersion 1.0.0
 *
 * @apiParam {String} sensorId 		Sensor's unique ID.
 *
 * @apiSuccess {String} name		Name of the Sensor.
 * @apiSuccess {String} thingId		Thing's unique ID.
 * @apiSuccess {String} featureId	Feature's unique ID.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "_id": "<< generated MongoDB ID >>",
 *       "name": "Water Gauge",
 *       "thingId": "<< generated MongoDB ID >>",
 *       "featureId": "<< generated MongoDB ID >>",
 *       "__v": 0
 *     }
 *
 * @apiUse SensorNotFoundError
 * @apiUse ServerError
 */
exports.request = function(req, res) {
	var id = req.params.sensorId;

	Sensor.findOne({ _id: id }, function(err, sensor) {
		if (err || sensor == null) {
			res.send(err);
		} else {
			res.json(sensor);
		}
	});
}