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
 * @apiParam {String} name		Name of the User.
 * @apiParam {Object} twitter	Twitter login information of the User (optional).
 *
 * @apiSuccess {String} userId 	User's unique ID.
 *
 * @apiUse SuccessExample_Get_Users
 * @apiUse ServerError
 */
exports.request = function(req, res) {
	var user = new User(_.extend({}, req.body));

	User.register(new User(req.body), req.body.password, function(err, user) {
		if(err) {
			res.send(err);
		} else {
			res.jsonp(user);
		}
	});
}