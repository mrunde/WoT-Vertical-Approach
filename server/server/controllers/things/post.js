'use strict';

// Required modules
const mongoose = require('mongoose');
const socket   = require('../../server.js');
const _        = require('underscore');

// Required data schema
const Errors    = require('../../data/errors');
const Thing     = require('../../data/thing');
const User      = require('../../data/user');
const Waterbody = require('../../data/waterbody.js');

/**
 * @api {post} /things POST
 * @apiName PostThing
 * @apiGroup Thing
 * @apiVersion 1.0.0
 *
 * @apiParam {String} name			Name of the Thing.
 * @apiParam {Point} loc			Location of the Thing.
 * @apiParam {String} userId		User's unique ID.
 * @apiParam {String} token			User's unique token for API requests.
 *
 * @apiSuccess {String} thingId 	Thing's unique ID.
 *
 * @apiUse SuccessExample_Get_Things
 * @apiUse UserNotFoundError
 * @apiUse TokenNotFoundError
 * @apiUse InvalidTokenError
 * @apiUse ServerError
 */
exports.request = function(req, res) {
	let token = req.body.token;

	if (token) {
		User.findOne({ token: token }, function(err, user) {
			if (err) {
				
				res.send(Errors.InvalidTokenError);

			} else if (user == null) {

				res.send(Errors.UserNotFoundError);

			} else {

				let thing = new Thing(_.extend({}, req.body));

				let coordinates = [thing.loc.coordinates[1], thing.loc.coordinates[0]];

				Waterbody.find({
					"geometry": {
						$near: {
							$geometry: {
								type: "Point",
								coordinates: coordinates
							},
							$maxDistance: 800,
							$minDistance: 0
						}
					}
				}, function(err, waterbody) {
					if(err) {
						
						res.send(err);

					} else {
						if(waterbody.length > 0) {
							thing.waterbodyId = waterbody[0]._id;
						}

						thing.save(function(err) {
							if (err) {
								
								res.send(err);

							} else {
								
								res.json(thing);
								
								socket.notify('things', thing);
							}
						});
					}
				});
			}
		});
	} else {
		res.send(Errors.TokenNotFoundError);
	}
}