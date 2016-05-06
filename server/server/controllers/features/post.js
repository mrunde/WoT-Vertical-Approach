// Required modules
var mongoose = require('mongoose');
var _        = require('underscore');

// Required data schema
var Feature = require('../../data/feature');

/**
 * @api {post} /feature POST - Create a Feature
 * @apiName PostFeature
 * @apiGroup Feature
 * @apiVersion 1.0.0
 *
 * @apiParam {String} name			Name of the Feature.
 * @apiParam {String} unit			Unit of the Feature.
 *
 * @apiSuccess {String} featureId	Feature's unique ID.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "__v": 0,
 *       "name": "Water Level",
 *       "unit": "m",
 *       "_id": "<< generated MongoDB ID >>"
 *     }
 *
 * @apiUse ServerError
 */
exports.request = function(req, res) {
	var feature = new Feature(_.extend({}, req.body));
	
	feature.save(function(err) {
		if (err) {
			res.send(err);
		} else {
			res.json(feature);
		}
	});
}