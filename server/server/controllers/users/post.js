'use strict';

// Required modules
const mongoose = require('mongoose');
const _        = require('underscore');

// Required data schema
const User = require('../../data/user');

/**
 * @api {post} /users POST
 * @apiName PostUser
 * @apiGroup User
 * @apiVersion 1.0.0
 *
 * @apiParam {String} name		Name of the User.
 * @apiParam {String} token		User's unique token.
 * @apiParam {Object} twitter	Twitter login information of the User (optional).
 *
 * @apiSuccess {String} userId 	User's unique ID.
 *
 * @apiUse SuccessExample_Get_Users
 * @apiUse ServerError
 */
exports.request = function(req, res) {
	let user = new User(_.extend({}, req.body));

	User.register(new User(req.body), req.body.password, function(err, user) {
		if(err) {

			res.send(err);

		} else {
			
			res.jsonp(user);
			
		}
	});
}