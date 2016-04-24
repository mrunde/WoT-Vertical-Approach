// Required modules
var mongoose = require('mongoose');
var Feature  = require('../../data/feature');
var _        = require('underscore');

/**
 * @api {post} /feature POST - Create a Feature
 * @apiName PostFeature
 * @apiGroup Feature
 * @apiVersion 1.0.0
 *
 * @apiParam {String} description	Description of the Feature.
 * @apiParam {String} unit			Unit of the Feature.
 *
 * @apiSuccess {String} featureId	Feature's unique ID.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "__v": 0,
 *       "description": "Water Level",
 *       "unit": "m",
 *       "_id": "571ce8a799d9232813f01666"
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