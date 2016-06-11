// Required modules
var mongoose = require('mongoose');

// Required data schema
var User = require('../../data/user');

/**
 * @api {get} /users GET - all
 * @apiName ListUser
 * @apiGroup User
 * @apiVersion 1.0.0
 *
 * @apiSuccess {User[]} users	Array of User information.
 *
 * @apiUse SuccessExample_List_Users
 * @apiUse ServerError
 */
exports.request = function(req, res) {
	User.find(function(err, users) {
		if (err) {
			res.send(err);
		} else {
			res.json(users);
		}
	});
}