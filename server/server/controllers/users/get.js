// Required modules
var mongoose = require('mongoose');

// Required data schema
var User = require('../../data/user');

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
	var id = req.params.userId;

	User.findOne({ _id: id }, function(err, user) {
		if (err || user == null) {
			res.send(err);
		} else {
			res.json(user);
		}
	});
}