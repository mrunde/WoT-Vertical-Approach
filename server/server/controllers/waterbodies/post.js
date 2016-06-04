// Required modules
var mongoose = require('mongoose');
var _        = require('underscore');

// Required data schema
var Errors      = require('../../data/errors');
var Waterbody	= require('../../data/waterbody');

/**
 * @api {post} /waterbodies POST - Insert a Waterbody
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
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       	"type": "Feature",
 *       	"_id": "<< generated MongoDB ID >>",
 *       	"__v": 0,
 *		 	"geometry": {
 *		 		"type": "MultiLineString",
 *				"coordinates": [
 *					<< Array of LineStrings >>
 *				]
 *		 	},
 *		 	"properties": {
 *				"name": "Werse" 
 *		 	}   
 *     }
 *
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