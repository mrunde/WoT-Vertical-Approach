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
const Thing       = require('../../data/thing');
const User        = require('../../data/user');
const Waterbody   = require('../../data/waterbody');

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

				Sensor.findOne({ _id: id }, function(err, sensor) {
					if (err) {
						
						res.send(Errors.SensorNotFoundError);

					} else {
						
						measurement.save(function(err) {
							if (err) {
								
								res.send(Errors.ServerError(err));

							} else {
								
								res.json(measurement);

								socket.notify('measurements', measurement);

								// Check whether tweets should be submitted
								if (measurement.value >= sensor.warnLevel) {

									// Check whether the Thing of the Measurement is allocated to a Waterbody
									let waterbodyName, systemTwitterClient;

									Thing.findOne({ _id: sensor.thingId }, function(err, thing) {
										if (err) {
											
											console.log(Errors.ServerError(err));

										} else {

											Waterbody.findOne({ _id: thing.waterbodyId }, function(err, waterbody) {
												if (err) {

													console.log(Errors.ServerError(err));

												} else {

													waterbodyName = waterbody.properties.name;

													systemTwitterClient = new Twitter({
														consumer_key:        config.twitterConsumerKey,
														consumer_secret:     config.twitterConsumerSecret,
														access_token_key:    config.twitterAccessTokenKey,
														access_token_secret: config.twitteraccessTokenSecret
													});
												}
											});
										}
									});

									// Get the User's Twitter login information
									let userTwitterClient;

									if (user.twitterConsumerKey &&
										user.twitterConsumerSecret &&
										user.twitterAccessTokenKey &&
										user.twitteraccessTokenSecret) {

										userTwitterClient = new Twitter({
											consumer_key:        user.twitterConsumerKey,
											consumer_secret:     user.twitterConsumerSecret,
											access_token_key:    user.twitterAccessTokenKey,
											access_token_secret: user.twitteraccessTokenSecret
										});
									}
									
									if (measurement.value >= sensor.riskLevel) {
										
										// Risk level reached
										if (waterbodyName && systemTwitterClient) {
											newSystemRiskLevelTweet(systemTwitterClient, waterbodyName, sensor._id, measurement.date.toLocaleTimeString(), measurement.value);
										}

										if (userTwitterClient) {
											newUserRiskLevelTweet(userTwitterClient, sensor.name, sensor._id, measurement.date.toLocaleTimeString(), measurement.value);
										}

									} else {
										
										// Warn level reached
										if (waterbodyName && systemTwitterClient) {
											newSystemWarnLevelTweet(systemTwitterClient, waterbodyName, sensor._id, measurement.date.toLocaleTimeString(), measurement.value);
										}

										if (userTwitterClient) {
											newUserWarnLevelTweet(userTwitterClient, sensor.name, sensor._id, measurement.date.toLocaleTimeString(), measurement.value);
										}
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

// --------------------------------------------------
// System Tweets
// --------------------------------------------------

// Create a warn level tweet
function newSystemWarnLevelTweet(twitterClient, waterbodyName, sensorId, time, value) {
	tweetStatus(twitterClient, 'WARNING: A sensor close to the waterbody "#' + waterbodyName + '" reached #warn_level\nSensor-ID: #' + sensorId + '\nTime: ' + time + '\nValue: ' + value);
}

// Create a risk level tweet
function newSystemRiskLevelTweet(twitterClient, waterbodyName, sensorId, time, value) {
	tweetStatus(twitterClient, 'DANGER: A sensor close to the waterbody "#' + waterbodyName + '" reached #risk_level\nSensor-ID: #' + sensorId + '\nTime: ' + time + '\nValue: ' + value);
}

// --------------------------------------------------
// User Tweets
// --------------------------------------------------

// Create a warn level tweet
function newUserWarnLevelTweet(twitterClient, sensorName, sensorId, time, value) {
	tweetStatus(twitterClient, 'WARNING: Sensor "' + sensorName + '" reached #warn_level\nID: #' + sensorId + '\nTime: ' + time + '\nValue: ' + value);
}

// Create a risk level tweet
function newUserRiskLevelTweet(twitterClient, sensorName, sensorId, time, value) {
	tweetStatus(twitterClient, 'DANGER: Sensor "' + sensorName + '" reached #risk_level\nID: #' + sensorId + '\nTime: ' + time + '\nValue: ' + value);
}