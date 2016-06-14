// Required modules
var mongoose = require('mongoose');
var socket   = require('../../server.js');
var _        = require('underscore');

// Required data schema
var Thing     = require('../../data/thing');
var Waterbody = require('../../data/waterbody.js');

/**
 * @api {post} /things POST
 * @apiName PostThing
 * @apiGroup Thing
 * @apiVersion 1.0.0
 *
 * @apiParam {String} name			Name of the Thing.
 * @apiParam {Point} loc			Location of the Thing.
 * @apiParam {String} userId		User's unique ID.
 *
 * @apiSuccess {String} thingId 	Thing's unique ID.
 *
 * @apiUse SuccessExample_Get_Things
 * @apiUse ServerError
 */
exports.request = function(req, res) {
	var thing = new Thing(_.extend({}, req.body));

	var coordinates = [thing.loc.coordinates[1], thing.loc.coordinates[0]];

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