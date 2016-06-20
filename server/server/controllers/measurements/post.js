// Load the application's configuration
var config = require('./../../config');

// Required modules
var mongoose = require('mongoose');
var socket   = require('../../server.js');
var _        = require('underscore');
var Twitter  = require('twitter');

// Required data schema
var Errors      = require('../../data/errors');
var Measurement = require('../../data/measurement');
var Sensor      = require('../../data/sensor');

// Define Client who sends new Tweets
var client = new Twitter({
  consumer_key: config.twitterConsumerKey,
  consumer_secret: config.twitterConsumerSecret,
  access_token_key: config.twitterAccessTokenKey,
  access_token_secret: config.twitteraccessTokenSecret
});

/**
 * @api {post} /measurements POST
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
 * @apiUse SuccessExample_Get_Measurements
 * @apiUse SensorNotFoundError
 * @apiUse ServerError
 */
exports.request = function(req, res) {
	var measurement = new Measurement(_.extend({}, req.body));

	var id = measurement.sensorId;

	Sensor.findOne({ _id: id }, function(err, sensor) {
		if (err) {
			res.send(Errors.SensorNotFoundError);
		} else {
			measurement.save(function(err) {
				if (err) {
					res.send(Errors.ServerError);
				} else {
					res.json(measurement);
					socket.notify('measurements', measurement);
					// Check whether the new Measurement is greater than the Sensor's warn or risk level
					if (measurement.value >= sensor.warnLevel) {
						if (measurement.value >= sensor.riskLevel) {
							// Risk level reached
							newRiskLevelTweet(sensor.name, sensor._id, measurement.date.toLocaleTimeString(), measurement.value);
						} else {
							// Warn level reached
							newWarnLevelTweet(sensor.name, sensor._id, measurement.date.toLocaleTimeString(), measurement.value);
						}
					}
				}
			});
		}
	});
}

// Create a warn level tweet
function newWarnLevelTweet(name, id, time, value) {
	tweetStatus('WARNING: Sensor "' + name + '" reached #warn_level\nID: #' + id + '\nTime: ' + time + '\nValue: ' + value);
}

// Create a risk level tweet
function newRiskLevelTweet(name, id, time, value) {
	tweetStatus('DANGER: Sensor "' + name + '" reached #risk_level\nID: #' + id + '\nTime: ' + time + '\nValue: ' + value);
}

// Submit a tweet
function tweetStatus(status) {
	client.post('statuses/update', { status: status }, function(error, tweet, response) {
		if (error) {
			console.log(error);
		} else {
			console.log(tweet);
		}
	});
}