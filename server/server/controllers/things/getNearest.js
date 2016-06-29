'use strict';

// Required modules
const mongoose = require('mongoose');

// Required data schema
const Errors = require('../../data/errors');
const Thing  = require('../../data/thing');

/**
 * @api {get} /things/:thingId/nearest GET - nearest
 * @apiName GetNearestThing
 * @apiGroup Thing
 * @apiVersion 1.0.0
 *
 * @apiParam {String} thingId 		Thing's unique ID.
 *
 * @apiSuccess {String} name		Name of the Thing.
 * @apiSuccess {String} userId		User's unique ID.
 * @apiSuccess {Point} loc			Location of the Thing.
 *
 * @apiUse SuccessExample_Get_Things
 * @apiUse ThingNotFoundError
 * @apiUse ServerError
 */
exports.request = function(req, res) {
	let thingId = req.params.thingId;
	let location = '';

	Thing.findOne({ _id: thingId }, function(err, thing) {
		if (err) {
			
			res.send(Errors.ServerError);

		} else if (thing == null) {

			res.send(Errors.ThingNotFoundError);
			
		} else {
			
			coordinates = thing.loc.coordinates;

			Thing.find({
				loc: {
					$near: {
						$geometry: {
							type: "Point",
							coordinates: coordinates
						}
					}
				}
			}, function(err, things) {
				if (err) {
					
					res.send(Errors.ServerError);

				} else {
					
					res.json(things[1]);
				}
			});
		}
	});
}