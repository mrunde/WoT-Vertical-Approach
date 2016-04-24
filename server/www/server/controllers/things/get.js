// Required modules
var mongoose = require('mongoose');
var Thing    = require('../../data/thing');

/**
 * @api {get} /things/:thingId GET - Request single Thing information
 * @apiName GetThing
 * @apiGroup Thing
 * @apiVersion 1.0.0
 *
 * @apiParam {String} thingId 		Thing's unique ID.
 *
 * @apiSuccess {String} description	Description of the Thing.
 * @apiSuccess {LatLng} location	Location of the Thing.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "_id": "<< generated MongoDB ID >>",
 *       "description": "WoT - Vertical Approach",
 *       "location": "51.973331,7.700220",
 *       "__v": 0
 *     }
 *
 * @apiUse ThingNotFoundError
 * @apiUse ServerError
 */
exports.request = function(req, res) {
	var id = req.params.thingId;

	Thing.findOne({ _id: id }, function(err, thing) {
		if (err) {
			res.send(err);
		} else {
			res.json(thing);
		}
	});
}