// Required modules
var mongoose = require('mongoose');

// Required data schema
var Thing = require('../../data/thing');

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
 *         "description": "REST API Test",
 *         "location": [
 *           52,
 *           7
 *         ],
 *         "_id": "<< generated MongoDB ID >>",
 *         "__v": 0
 *       },
 *       {
 *         "description": "ifgi",
 *         "location": [
 *           51.969113,
 *           7.595793
 *         ],
 *         "_id": "<< generated MongoDB ID >>",
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