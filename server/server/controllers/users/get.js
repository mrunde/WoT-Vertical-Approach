// Required modules
var mongoose = require('mongoose');

// Required data schema
var User = require('../../data/user');

/**
 * @api {get} /users/:userId GET - Request single User information
 * @apiName GetUser
 * @apiGroup User
 * @apiVersion 1.0.0
 *
 * @apiParam {String} userId 	User's unique ID.
 *
 * @apiSuccess {String} name	Name of the User.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "__v": 0,
 *       "name": "demo",
 *       "_id": "<< generated MongoDB ID >>"
 *     }
 *
 * @apiUse UserNotFoundError
 * @apiUse ServerError
 */
exports.request = function(req, res) {
	var id = req.params.userId;

	User.findOne({ _id: id }, function(err, user) {
		if (err) {
			res.send(err);
		} else {
			res.json(user);
		}
	});
}