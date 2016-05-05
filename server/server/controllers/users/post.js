// Required modules
var mongoose = require('mongoose');
var _        = require('underscore');

// Required data schema
var User = require('../../data/user');

/**
 * @api {post} /users POST - Create a User
 * @apiName PostUser
 * @apiGroup User
 * @apiVersion 1.0.0
 *
 * @apiParam {String} name	Name of the User.
 *
 * @apiSuccess {String} userId 	User's unique ID.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "__v": 0,
 *       "name": "demo",
 *       "_id": "<< generated MongoDB ID >>"
 *     }
 *
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