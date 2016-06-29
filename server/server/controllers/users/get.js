'use strict';

// Required modules
const mongoose = require('mongoose');

// Required data schema
const Errors = require('../../data/errors');
const User   = require('../../data/user');

/**
 * @api {get} /users/:userId GET - single
 * @apiName GetUser
 * @apiGroup User
 * @apiVersion 1.0.0
 *
 * @apiParam {String} userId 	User's unique ID.
 *
 * @apiUse SuccessExample_Get_Users
 * @apiUse UserNotFoundError
 * @apiUse ServerError
 */
exports.request = function(req, res) {
	let userId = req.params.userId;

	User.findOne({ _id: userId }, function(err, user) {
		if (err) {
			
			res.send(Errors.ServerError);

		} else if (user == null) {
			
			res.send(Errors.UserNotFoundError);

		} else {
			
			// The secret should not be displayed in the API docs !!!
			let secret = req.params.secret;

			if (secret) {

				res.json(user);

			} else {

				let publicUser = Object.assign(user);
				
				delete publicUser.email;
				delete publicUser.token;
				delete publicUser.twitter;

				res.json(publicUser);
			}
		}
	});
}