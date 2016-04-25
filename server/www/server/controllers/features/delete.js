// Required modules
var mongoose = require('mongoose');
var Feature  = require('../../data/feature');

/**
 * @api {delete} /features/:featureId DELETE - Delete a Feature
 * @apiName DeleteFeature
 * @apiGroup Feature
 * @apiVersion 1.0.0
 *
 * @apiParam {String} featureId	Feature's unique ID.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "ok": 1,
 *       "n": 0
 *     }
 *
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