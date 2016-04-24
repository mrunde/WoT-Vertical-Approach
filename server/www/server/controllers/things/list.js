// Required modules
var mongoose = require('mongoose');
var Thing    = require('../../data/thing');

/**
 * @api {get} /things GET - Request all Thing information
 * @apiName ListThing
 * @apiGroup Thing
 * @apiVersion 1.0.0
 *
 * @apiSuccess {Array} things	Array of Thing information.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     [
 *       {
 *         "_id": "<< generated MongoDB ID >>",
 *         "description": "Wersehaus",
 *         "location": "51.973331,7.700220",
 *         "__v": 0
 *       },
 *       {
 *         "_id": "<< generated MongoDB ID >>",
 *         "description": "WoT - Vertical Approach",
 *         "location": "51.973331,7.700220",
 *         "__v": 0
 *       }
 *     ]
 *
 * @apiUse ServerError
 */
exports.request = function(req, res) {
	Thing.find(function(err, things) {
		if (err) {
			res.send(err);
		} else {
			res.json(things);
		}
	});
}