// Required modules
var async    = require('async');
var mongoose = require('mongoose');

// Required data schema
var Measurement = require('../../data/measurement');
var Sensor      = require('../../data/sensor');
var Thing       = require('../../data/thing');

/**
 * @api {delete} /things/:thingId DELETE - Delete a Thing
 * @apiName DeleteThing
 * @apiGroup Thing
 * @apiVersion 1.0.0
 *
 * @apiParam {String} thingId	Thing's unique ID.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "ok": 1,
 *       "n": 0
 *     }
 *
 * @apiUse ThingNotFoundError
 * @apiUse ServerError
 */
exports.request = function(req, res) {
	var id = req.params.thingId;
	
	async.waterfall([
		// Get sensors
		function(callback) {
			Sensor.find({ thingId: id }, function(err, sensors) {
				callback(err, sensors);
			});
		},
		// Delete Measurements
		function(sensors, callback) {
			async.forEachOf(sensors, function(sensor, key, callback) {
				Measurement.remove({ sensorId: sensor._id }, function(err) {
					callback(err);
				});
			}, function (err) {
				callback(err);
			});
		},
		// Delete Sensors
		function(callback) {
			Sensor.remove({ thingId: id }, function(err) {
				callback(err);
			});
		},
		// Delete Thing
		function(callback) {
			Thing.remove({ _id: id }, function(err, removed) {
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