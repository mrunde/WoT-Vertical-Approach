'use strict';

// Load the application's configuration
const config = require('../../config');
const secret = config.secret;

// Required modules
const AES      = require('crypto-js/aes');
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
 * @apiParam {Object} twitter	Twitter login information of the User (optional).
 *
 * @apiSuccess {String} userId 	User's unique ID.
 *
 * @apiUse SuccessExample_Get_Users
 * @apiUse ServerError
 */
exports.request = function(req, res) {
	let user = new User(_.extend({}, req.body));

	user.token = generateToken(user);

	User.register(user, req.body.password, function(err, user) {
		if (err) {

			res.send(err);

		} else {
			
			res.jsonp(user);
			
		}
	});
}

/**
 * Generating a token for the user with the user's email and password, encrypted with the application's secret.
 * @param  {JSONObject} user User to generate the token for.
 * @return {String}          Generated token.
 */
function generateToken(user) {
	let token = AES.encrypt(user.email + user.password, secret);

	return token;
}