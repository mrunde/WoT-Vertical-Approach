'use strict';

// Required modules
const mongoose = require('mongoose');
const _        = require('underscore');

// Required data schema
const User   = require('../../data/user');
const Errors = require('../../data/errors');

/**
 * @api {put} /users/:userId PUT
 * @apiName PutUser
 * @apiGroup User
 * @apiVersion 1.0.0
 *
 * @apiParam {String} userId 						User's unique ID.
 * @apiParam {String} token							User's unique token for API requests.
 * @apiParam {String} email							Email of the user.
 * @apiParam {String} twitterConsumerKey			Interval of Sensor's Measurements in milliseconds.
 * @apiParam {String} twitterConsumerSecret			Reference level of the Sensor.
 * @apiParam {String} twitterAccessToken			Warning level of the Sensor.
 * @apiParam {String} twitterAccessTokenSecret		Risk level of the Sensor.
 *
 * @apiSuccess {String} userId						User's unique ID.
 *
 * @apiUse SuccessExample_Get_Users
 * @apiUse UserNotFoundError
 * @apiUse ServerError
 */
exports.request = function(req, res) {
	let token  = req.body;
	let userId = req.params;

	if (token) {
		
		User.findOne({ _id: userId, token: token }, function(err, user) {
			if (err) {
				
				res.send(Errors.InvalidTokenError);

			} else if (user == null) {
				
				res.send(Errors.UserNotFoundError);

			} else {
				
				user = _.extend(user, req.body);
				user.save(function(err) {
					if(err) {
						res.send(Errors.ServerError);
					} else {
						res.json(user);
					}
				});

			}
		});
		
	} else {

		res.send(Errors.TokenNotFoundError);

	}
}