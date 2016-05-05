// Required modules
var mongoose = require('mongoose');

// Required data schema
var Thing = require('../../data/thing');

/**
 * @api {get} /things/spatial/:bbox GET - Request all Thing information within one bounding box
 * @apiName ListSpatialThing
 * @apiGroup Thing
 * @apiVersion 1.0.0
 *
 * @apiParam {String} bbox 		Bounding box information.
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
	var coordinates = req.params.bbox.split(',');
	var bottomLeft  = [ parseFloat(coordinates[0]), parseFloat(coordinates[1]) ];
	var upperRight  = [ parseFloat(coordinates[2]), parseFloat(coordinates[3]) ];

	Thing.find({
		loc: {
			$geoWithin: {
				$box: [
					bottomLeft,
					upperRight
				]
			}
		}
	}, function(err, things) {
		if (err) {
			res.send(err);
		} else {
			res.json(things);
		}
	});
}