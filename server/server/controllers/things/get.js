// Required modules
var mongoose = require('mongoose');

// Required data schema
var Errors = require('../../data/errors');
var Thing  = require('../../data/thing');

/**
 * @api {get} /things/:thingId GET - Request single Thing information
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
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "name": "ifgi",
 *       "userId": "<< generated MongoDB ID >>",
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
 * @apiUse ThingNotFoundError
 * @apiUse ServerError
 */
exports.request = function(req, res) {
	var id = req.params.thingId;

	Thing.findOne({ _id: id }, function(err, thing) {
		if (err) {
			res.send(Errors.ThingNotFoundError);
		} else {
			res.json(thing);
		}
	});
}