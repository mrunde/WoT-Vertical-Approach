// Required modules
var mongoose = require('mongoose');

// Required data schema
var User = require('../../data/user');

/**
 * @api {get} /users GET - Request all User information
 * @apiName ListUser
 * @apiGroup User
 * @apiVersion 1.0.0
 *
 * @apiSuccess {User[]} users	Array of User information.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     [
 *       {
 *         "name": "demo",
 *         "_id": "<< generated MongoDB ID >>",
 *         "__v": 0
 *       },
 *       {
 *         "name": "foo",
 *         "_id": "<< generated MongoDB ID >>",
 *         "__v": 0
 *       }
 *     ]
 *
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