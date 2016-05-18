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
 * @apiParam {String} 		name 		Waterbody's name.
 * @apiParam {LineString} 	loc			Waterbody's location.
 *
 * @apiSuccess {Number} waterbodyId		Waterbody's unique ID.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *      {
 *       "name": "Werse",
 *       "_id": "<< generated MongoDB ID >>",
 *       "__v": 0,
 *       "loc": {
 *         "coordinates": [
 *           << Array of coordinates >>
 *         ],
 *         "type": "LineString"
 *       }
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