// Required modules
var mongoose = require('mongoose');

// Required data schema
var Feature = require('../../data/feature');

/**
 * @api {get} /features/:id GET - Request single Feature information
 * @apiName GetFeature
 * @apiGroup Feature
 * @apiVersion 1.0.0
 *
 * @apiParam {String} featureId 	Feature's unique ID.
 *
 * @apiSuccess {String} name		Name of the Feature.
 * @apiSuccess {String} unit		Unit of the Feature.
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
 * @apiUse FeatureNotFoundError
 * @apiUse ServerError
 */
exports.request = function(req, res) {
	var id = req.params.featureId;
	
	Feature.findOne({ _id: id }, function(err, feature) {
		if (err) {
			res.send(err);
		} else {
			res.json(feature);
		}
	});
}