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
 * @apiSuccess {String} name	Name of the User.
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
			
			let publicUser = Object.assign(user);
			
			delete publicUser.token;
			delete publicUser.twitter;

			res.json(publicUser);
		}
	});
}