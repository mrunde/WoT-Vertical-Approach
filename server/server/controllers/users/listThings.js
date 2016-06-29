'use strict';

// Required modules
const mongoose = require('mongoose');

// Required data schema
const Errors = require('../../data/errors');
const Thing  = require('../../data/thing');
const User   = require('../../data/user');

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
	let userId = req.params.userId;

				
	Thing.find({ userId: userId }, function(err, things) {
		if (err) {
			
			res.send(Errors.ServerError);

		} else {
			
			res.json(things);

		}
	});
}