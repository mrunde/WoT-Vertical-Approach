// Required modules
var mongoose = require('mongoose');

// Required data schema
var Errors = require('../../data/errors');
var Thing  = require('../../data/thing');

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
	var id = req.params.thingId;
	var location = '';

	Thing.findOne({ _id: id }, function(err, thing) {
		if (err) {
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
					res.send(err);
				} else {
					res.json(things[1]);
				}
			});
		}
	});
}