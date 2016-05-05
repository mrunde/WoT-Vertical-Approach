// Required modules
var mongoose = require('mongoose');

// Required data schema
var User = require('../../data/user');

/**
 * @api {delete} /users/:userId DELETE - Delete a User
 * @apiName DeleteUser
 * @apiGroup User
 * @apiVersion 1.0.0
 *
 * @apiParam {String} userId	User's unique ID.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "ok": 1,
 *       "n": 0
 *     }
 *
 * @apiUse UserNotFoundError
 * @apiUse ServerError
 */
exports.request = function(req, res) {
	var id = req.params.userId;
	
	User.remove({ _id: id }, function(err, removed) {
		if (err) {
			res.send(err);
		} else {
			res.json(removed);
		}
	});
}