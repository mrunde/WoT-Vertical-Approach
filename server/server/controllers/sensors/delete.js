// Required modules
var async    = require('async');
var mongoose = require('mongoose');

// Required data schema
var Measurement = require('../../data/measurement');
var Sensor      = require('../../data/sensor');

/**
 * @api {delete} /sensors/:sensorId DELETE
 * @apiName DeleteSensor
 * @apiGroup Sensor
 * @apiVersion 1.0.0
 *
 * @apiParam {String} sensorId	Sensor's unique ID.
 *
 * @apiUse SuccessExample_Deleted
 * @apiUse SensorNotFoundError
 * @apiUse ServerError
 */
exports.request = function(req, res) {
	var id = req.params.sensorId;

	async.waterfall([
		// Delete Measurements
		function(callback) {
			Measurement.remove({ sensorId: id }, function(err) {
				callback(err);
			});
		},
		// Delete Sensor
		function(callback) {
			Sensor.remove({ _id: id }, function(err, removed) {
				callback(err, removed);
			});
		}
	], function(err, result) {
		if (err) {
			res.send(err);
		} else {
			res.json(result);
		}
	});
}