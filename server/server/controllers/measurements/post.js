'use strict';

// Load the application's configuration
const config = require('./../../config');

// Required modules
const mongoose = require('mongoose');
const socket   = require('../../server.js');
const _        = require('underscore');
const Twitter  = require('twitter');

// Required data schema
const Errors      = require('../../data/errors');
const Measurement = require('../../data/measurement');
const Sensor      = require('../../data/sensor');
const User        = require('../../data/user');

/**
 * @api {post} /measurements POST
 * @apiName PostMeasurement
 * @apiGroup Measurement
 * @apiVersion 1.0.0
 *
 * @apiParam {String} sensorId 			Sensor's unique ID.
 * @apiParam {Date} date				Date of the Measurement.
 * @apiParam {Number} value				Value of the Measurement.
 * @apiParam {String} token				User's unique token for API requests.
 *
 * @apiSuccess {Number} measurementId	Measurement's unique ID.
 *
 * @apiUse SuccessExample_Get_Measurements
 * @apiUse SensorNotFoundError
 * @apiUse TokenNotFoundError
 * @apiUse InvalidTokenError
 * @apiUse ServerError
 */
exports.request = function(req, res) {
	let token = req.body.token;

	if (token) {
		User.findOne({ token: token }, function(err, user) {
			if (err) {
				res.send(Errors.InvalidTokenError);
			} else {
				let measurement = new Measurement(_.extend({}, req.body));

				let id = measurement.sensorId;

				Sensor.findOne({ _id: id, userId: user._id }, function(err, sensor) {
					if (err) {
						res.send(Errors.SensorNotFoundError);
					} else {
						measurement.save(function(err) {
							if (err) {
								res.send(Errors.ServerError(err));
							} else {
								res.json(measurement);

								socket.notify('measurements', measurement);

								// Check whether the new Measurement is greater than the Sensor's warn or risk level and whether the user has Twitter enabled
								if (measurement.value >= sensor.warnLevel &&
									user.twitterConsumerKey &&
									user.twitterConsumerSecret &&
									user.twitterAccessTokenKey &&
									user.twitteraccessTokenSecret) {

									let twitterClient = new Twitter({
										consumer_key:        user.twitterConsumerKey,
										consumer_secret:     user.twitterConsumerSecret,
										access_token_key:    user.twitterAccessTokenKey,
										access_token_secret: user.twitteraccessTokenSecret
									});
									
									if (measurement.value >= sensor.riskLevel) {
										// Risk level reached
										newRiskLevelTweet(twitterClient, sensor.name, sensor._id, measurement.date.toLocaleTimeString(), measurement.value);
									} else {
										// Warn level reached
										newWarnLevelTweet(twitterClient, sensor.name, sensor._id, measurement.date.toLocaleTimeString(), measurement.value);
									}
								}
							}
						});
					}
				});
			}
		});
	} else {
		res.send(Errors.TokenNotFoundError);
	}
}

// Create a warn level tweet
function newWarnLevelTweet(twitterClient, name, id, time, value) {
	tweetStatus(twitterClient, 'WARNING: Sensor "' + name + '" reached #warn_level\nID: #' + id + '\nTime: ' + time + '\nValue: ' + value);
}

// Create a risk level tweet
function newRiskLevelTweet(twitterClient, name, id, time, value) {
	tweetStatus(twitterClient, 'DANGER: Sensor "' + name + '" reached #risk_level\nID: #' + id + '\nTime: ' + time + '\nValue: ' + value);
}

// Submit a tweet
function tweetStatus(twitterClient, status) {
	twitterClient.post('statuses/update', { status: status }, function(error, tweet, response) {
		if (error) {
			console.log(error);
		} else {
			console.log(tweet);
		}
	});
}