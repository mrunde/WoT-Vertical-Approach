// Required modules
var mongoose = require('mongoose');

// Required data schema
var Feature = require('../../data/feature');

/**
 * @api {get} /features GET - Request all Feature information
 * @apiName ListFeature
 * @apiGroup Feature
 * @apiVersion 1.0.0
 *
 * @apiSuccess {Array} features	Array of Feature information.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     [
 *       {
 *         "_id": "<< generated MongoDB ID >>",
 *         "name": "Temperature",
 *         "unit": "°C",
 *         "__v": 0
 *       },
 *       {
 *         "_id": "<< generated MongoDB ID >>",
 *         "name": "Water Level",
 *         "unit": "m",
 *         "__v": 0
 *       }
 *     ]
 *
 * @apiUse ServerError
 */
exports.request = function(req, res) {
	Feature.find(function(err, features) {
		if (err) {
			res.send(err);
		} else {
			res.json(features);
		}
	});
}