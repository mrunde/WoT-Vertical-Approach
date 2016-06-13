// Load the application's configuration
var config = require('../../config');
var url    = config.express_host + '/api';

// Required modules
var async    = require('async');
var mongoose = require('mongoose');
var request  = require('request');

// Required data schema
var Feature = require('../../data/feature');
var Sensor  = require('../../data/sensor');

/**
 * @api {delete} /features/:featureId DELETE
 * @apiName DeleteFeature
 * @apiGroup Feature
 * @apiVersion 1.0.0
 *
 * @apiParam {String} featureId	Feature's unique ID.
 *
 * @apiUse SuccessExample_Deleted
 * @apiUse FeatureNotFoundError
 * @apiUse ServerError
 */
exports.request = function(req, res) {
	var id = req.params.featureId;
	
	async.waterfall([
		// Get Sensors
		function(callback) {
			Sensor.find({ featureId: id }, function(err, sensors) {
				callback(err, sensors);
			});
		},
		// Delete Sensors with REST requests to avoid greater complexity
		function(sensors, callback) {
			async.forEachOf(sensors, function(sensor, key, callback) {
				request.delete({
					url: url + '/sensors/' + sensor._id
					}, function(error, response, body) {
						callback(error);
				});
			}, function (err) {
				callback(err);
			});
		},
		// Delete Feature
		function(callback) {
			Feature.remove({ _id: id }, function(err, removed) {
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