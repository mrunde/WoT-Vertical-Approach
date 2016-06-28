// Required modules
var mongoose = require('mongoose');
var _        = require('underscore');

// Required data schema
var User 	= require('../../data/user');
var Errors  = require('../../data/errors');

/**
 * @api {put} /users/:userId PUT
 * @apiName PUT User
 * @apiGroup User
 * @apiVersion 1.0.0
 *
 * @apiParam {String} userId 		User's unique ID.
 *
 * @apiParam {String} email							Email of the user.
 * @apiParam {String} twitterConsumerKey			Interval of Sensor's Measurements in milliseconds.
 * @apiParam {String} twitterConsumerSecret			Reference level of the Sensor.
 * @apiParam {String} twitterAccessToken			Warning level of the Sensor.
 * @apiParam {String} twitterAccessTokenSecret		Risk level of the Sensor.
 *
 * @apiSuccess {String} userId		User's unique ID.
 *
 * @apiUse SuccessExample_Get_User
 * @apiUse UserNotFoundError
 * @apiUse ServerError
 */
exports.request = function(req, res) {
	User.load(req.params.userId, function(err, user) {
		if(err || user == null) {
			res.send(Errors.UserNotFoundError);
		} else {
			user = _.extend(user, req.body);
			user.save(function(err) {
				if(err) {
					res.send(err);
				} else {
					res.json(user);
				}
			});
		}
	});
}