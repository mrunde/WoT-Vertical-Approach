// Required modules
var mongoose = require('mongoose');

// Required data schema
var Sensor   = require('../../data/sensor');

/**
 * @api {delete} /sensors/:sensorId DELETE - Delete a Sensor
 * @apiName DeleteSensor
 * @apiGroup Sensor
 * @apiVersion 1.0.0
 *
 * @apiParam {String} sensorId	Sensor's unique ID.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "ok": 1,
 *       "n": 0
 *     }
 *
 * @apiUse SensorNotFoundError
 * @apiUse ServerError
 */
exports.request = function(req, res) {
	var id = req.params.sensorId;
	
	Sensor.remove({ _id: id }, function(err, removed) {
		if (err) {
			res.send(err);
		} else {
			res.json(removed);
		}
	});
}