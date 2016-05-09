// Load the application's configuration
var config = require('../../config');
var url    = config.express_host + '/api';

// Required modules
var async    = require('async');
var mongoose = require('mongoose');
var request  = require('request');

// Required data schema
var Thing = require('../../data/thing');
var User  = require('../../data/user');

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
	
	async.waterfall([
		// Get Things
		function(callback) {
			Thing.find({ userId: id }, function(err, things) {
				callback(err, things);
			});
		},
		// Delete Things with REST requests to avoid greater complexity
		function(things, callback) {
			async.forEachOf(things, function(thing, key, callback) {
				request.delete({
					url: url + '/things/' + thing._id
					}, function(error, response, body) {
						callback(error);
				});
			}, function (err) {
				callback(err);
			});
		},
		// Delete User
		function(callback) {
			User.remove({ _id: id }, function(err, removed) {
				callback(err, removed);
			});
		}
	], function(err, result) {
		if (err) {
			res.send(err);
		} else {
			res.json(result);
		}
	});
}