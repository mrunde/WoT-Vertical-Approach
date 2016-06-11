// Required modules
var mongoose = require('mongoose');
var _        = require('underscore');

// Required data schema
var User = require('../../data/user');

/**
 * @api {post} /users POST
 * @apiName PostUser
 * @apiGroup User
 * @apiVersion 1.0.0
 *
 * @apiParam {String} name	Name of the User.
 *
 * @apiSuccess {String} userId 	User's unique ID.
 *
 * @apiUse SuccessExample_Get_Users
 * @apiUse ServerError
 */
exports.request = function(req, res) {
	var user = new User(_.extend({}, req.body));

	user.save(function(err) {
		if (err) {
			res.send(err);
		} else {
			res.json(user);
		}
	});
}