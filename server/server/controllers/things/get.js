'use strict';

// Required modules
const mongoose = require('mongoose');

// Required data schema
const Errors = require('../../data/errors');
const Thing  = require('../../data/thing');

/**
 * @api {get} /things/:thingId GET - single
 * @apiName GetThing
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
	let id = req.params.thingId;

	Thing.findOne({ _id: id }, function(err, thing) {
		if (err) {

			res.send(Errors.ServerError);
			
		} else if (thing == null) {
			
			res.send(Errors.ThingNotFoundError);

		} else {
			
			res.json(thing);
		}
	});
}