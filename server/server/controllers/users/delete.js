'use strict';

// Load the application's configuration
const config = require('../../config');
const url    = config.express_host + '/api';

// Required modules
const async    = require('async');
const mongoose = require('mongoose');
const request  = require('request');

// Required data schema
const Errors = require('../../data/errors');
const Thing  = require('../../data/thing');
const User   = require('../../data/user');

/**
 * @api {delete} /users/:userId DELETE
 * @apiName DeleteUser
 * @apiGroup User
 * @apiVersion 1.0.0
 *
 * @apiParam {String} userId	User's unique ID.
 * @apiParam {String} token		User's unique token for API requests.
 *
 * @apiUse SuccessExample_Deleted
 * @apiUse UserNotFoundError
 * @apiUse TokenNotFoundError
 * @apiUse InvalidTokenError
 * @apiUse ServerError
 */
exports.request = function(req, res) {
	let token  = req.body.token;
	let userId = req.params.userId;

	if (token) {
		User.findOne({ _id: userId, token: token }, function(err, user) {
			if (err) {
				res.send(Errors.InvalidTokenError);
			} else {
				async.waterfall([
					// Get Things
					function(callback) {
						Thing.find({ userId: userId }, function(err, things) {
							callback(err, things);
						});
					},
					// Delete Things with REST requests to avoid greater complexity
					function(things, callback) {
						async.forEachOf(things, function(thing, key, callback) {
							request.delete({
								url: url + '/things/' + thing._id
								}, function(error, response, body) {
									callback(error);
							});
						}, function (err) {
							callback(err);
						});
					},
					// Delete User
					function(callback) {
						User.remove({ _id: userId }, function(err, removed) {
							callback(err, removed);
						});
					}
				], function(err, result) {
					if (err) {
						res.send(Errors.ServerError);
					} else {
						res.json(result);
					}
				});
			}
		});
	} else {
		res.send(Errors.TokenNotFoundError);
	}
}