'use strict';

// Required modules
const mongoose = require('mongoose');

// Required data schema
const Errors = require('../../data/errors');
const Thing  = require('../../data/thing');

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
	let coordinates = req.params.bbox.split(',');
	let bottomLeft  = [ parseFloat(coordinates[0]), parseFloat(coordinates[1]) ];
	let upperRight  = [ parseFloat(coordinates[2]), parseFloat(coordinates[3]) ];

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
			
			res.send(Errors.ServerError);

		} else {
			
			res.json(things);
		}
	});
}