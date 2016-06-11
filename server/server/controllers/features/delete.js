// Required modules
var mongoose = require('mongoose');

// Required data schema
var Feature = require('../../data/feature');

/**
 * @api {delete} /features/:featureId DELETE
 * @apiName DeleteFeature
 * @apiGroup Feature
 * @apiVersion 1.0.0
 *
 * @apiParam {String} featureId	Feature's unique ID.
 *
 * @apiUse SuccessExample_Deleted
 * @apiUse FeatureNotFoundError
 * @apiUse ServerError
 */
exports.request = function(req, res) {
	var id = req.params.featureId;
	
	Feature.remove({ _id: id }, function(err, removed) {
		if (err) {
			res.send(err);
		} else {
			res.json(removed);
		}
	});
}