// Required modules
var mongoose = require('mongoose');

// Required data schema
var Thing = require('../../data/thing');

/**
 * @api {get} /things/spatial/:bbox GET - all in bounding box
 * @apiName ListSpatialThing
 * @apiGroup Thing
 * @apiVersion 1.0.0
 *
 * @apiParam {String} bbox 		Bounding box information.
 *
 * @apiSuccess {Thing[]} things	Array of Thing information.
 *
 * @apiUse SuccessExample_List_Things
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