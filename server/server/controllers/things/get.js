// Required modules
var mongoose = require('mongoose');

// Required data schema
var Errors = require('../../data/errors');
var Thing  = require('../../data/thing');

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
	var id = req.params.thingId;

	Thing.findOne({ _id: id }, function(err, thing) {
		if (err || thing == null) {
			res.send(Errors.ThingNotFoundError);
		} else {
			res.json(thing);
		}
	});
}