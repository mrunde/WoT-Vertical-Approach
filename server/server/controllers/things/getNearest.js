// Required modules
var mongoose = require('mongoose');

// Required data schema
var Errors = require('../../data/errors');
var Thing  = require('../../data/thing');

/**
 * @api {get} /things/:thingId/nearest GET - Request nearest other single Thing information
 * @apiName GetNearestThing
 * @apiGroup Thing
 * @apiVersion 1.0.0
 *
 * @apiParam {String} thingId 		Thing's unique ID.
 *
 * @apiSuccess {String} description	Description of the Thing.
 * @apiSuccess {Point} location		Location of the Thing.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "__v": 0,
 *       "description": "ifgi",
 *       "location": [
 *         51.969113,
 *         7.595793
 *       ],
 *       "_id": "<< generated MongoDB ID >>"
 *     }
 *
 * @apiUse ThingNotFoundError
 * @apiUse ServerError
 */
exports.request = function(req, res) {
	var id = req.params.thingId;
	var location = '';

	Thing.findOne({ _id: id }, function(err, thing) {
		if (err) {
			res.send(Errors.ThingNotFoundError);
		} else {
			location = thing.toObject().location;

			Thing.find({
				location: {
					$near: {
						$geometry: {
							type: "Point",
							coordinates: location
						},
						$minDistance: 1
					}
				}
			}, function(err, things) {
				console.log(things);
				if (err) {
					res.send(err);
				} else {
					res.json(things);
				}
			});
		}
	});
}