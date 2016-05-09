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
 *         "name": "ifgi",
 *         "userId": "<< generated MongoDB ID >>",
 *         "_id": "<< generated MongoDB ID >>",
 *         "__v": 0,
 *         "loc": {
 *           "coordinates": [
 *             51.969114,
 *             7.595794
 *           ],
 *           "type": "Point"
 *         }
 *       },
 *       {
 *         "name": "Wersehaus",
 *         "userId": "<< generated MongoDB ID >>",
 *         "_id": "<< generated MongoDB ID >>",
 *         "__v": 0,
 *         "loc": {
 *           "coordinates": [
 *             51.97338,
 *             7.700234
 *           ],
 *           "type": "Point"
 *         }
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