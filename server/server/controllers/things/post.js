// Required modules
var mongoose = require('mongoose');
var _        = require('underscore');

// Required data schema
var Thing = require('../../data/thing');

/**
 * @api {post} /things POST - Create a Thing
 * @apiName PostThing
 * @apiGroup Thing
 * @apiVersion 1.0.0
 *
 * @apiParam {String} description	Description of the Thing.
 * @apiParam {LatLng} location		Location of the Thing.
 *
 * @apiSuccess {String} thingId 	Thing's unique ID.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "__v": 0,
 *       "description": "WoT - Vertical Approach",
 *       "location": "51.973331,7.700220",
 *       "_id": "<< generated MongoDB ID >>"
 *     }
 *
 * @apiUse ServerError
 */
exports.request = function(req, res) {
	var thing = new Thing(_.extend({}, req.body));

	thing.save(function(err) {
		if (err) {
			res.send(err);
		} else {
			res.json(thing);
		}
	});
}