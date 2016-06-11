// Required modules
var mongoose = require('mongoose');

// Required data schema
var Thing = require('../../data/thing');

/**
 * @api {get} /users/:userId/things GET - all Things
 * @apiName ListUserThings
 * @apiGroup User
 * @apiVersion 1.0.0
 *
 * @apiParam {String} userId	User's unique ID.
 *
 * @apiSuccess {Thing[]} things	Array of Thing information.
 *
 * @apiUse SuccessExample_List_Things
 * @apiUse UserNotFoundError
 * @apiUse ServerError
 */
exports.request = function(req, res) {
	var id = req.params.userId;

	Thing.find({ userId: id }, function(err, things) {
		if (err) {
			res.send(err);
		} else {
			res.json(things);
		}
	});
}