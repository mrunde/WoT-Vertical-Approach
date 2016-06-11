// Required modules
var mongoose = require('mongoose');
var _        = require('underscore');

// Required data schema
var Errors    = require('../../data/errors');
var Waterbody = require('../../data/waterbody');

/**
 * @api {post} /waterbodies POST
 * @apiName PostMeasurement
 * @apiGroup Measurement
 * @apiVersion 1.0.0
 *
 * @apiParam {String} 		type 		Waterbody's feature type
 * @apiParam {Geometry}		geometry    Waterbody's geometry type and coordinates.
 * @apiParam {Property} 	properties	Waterbody's name.
 *
 * @apiSuccess {Number} waterbodyId		Waterbody's unique ID.
 *
 * @apiUse SuccessExample_Get_Waterbodies
 * @apiUse SensorNotFoundError
 * @apiUse ServerError
 */
exports.request = function(req, res) {
	var waterbody = new Waterbody(_.extend({}, req.body));

	waterbody.save(function(err) {
		if (err) {
			res.send(err);
		} else {
			res.json(waterbody);
		}
	});
}