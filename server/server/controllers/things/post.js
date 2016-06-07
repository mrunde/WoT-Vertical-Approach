// Required modules
var mongoose = require('mongoose');
var _        = require('underscore');

// Required data schema
var Thing 		= require('../../data/thing');
var Waterbody	= require('../../data/waterbody.js');
var socket		= require('../../server.js');

/**
 * @api {post} /things POST - Create a Thing
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
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "name": "ifgi",
 *       "userId": "<< generated MongoDB ID >>",
 *		 "waterbodyId": "<< generatedMongoDB ID >>",
 *       "_id": "<< generated MongoDB ID >>",
 *       "__v": 0,
 *       "loc": {
 *         "coordinates": [
 *           51.969114,
 *           7.595794
 *         ],
 *         "type": "Point"
 *       }
 *     }
 *
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
					socket.notify("things", thing);
				}
			});
		}
	});
}