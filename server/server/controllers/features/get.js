'use strict';

// Required modules
const mongoose = require('mongoose');

// Required data schema
const Feature = require('../../data/feature');

/**
 * @api {get} /features/:id GET - single
 * @apiName GetFeature
 * @apiGroup Feature
 * @apiVersion 1.0.0
 *
 * @apiParam {String} featureId 	Feature's unique ID.
 *
 * @apiSuccess {String} name		Name of the Feature.
 * @apiSuccess {String} unit		Unit of the Feature.
 *
 * @apiUse SuccessExample_Get_Features
 * @apiUse FeatureNotFoundError
 * @apiUse ServerError
 */
exports.request = function(req, res) {
	let id = req.params.featureId;
	
	Feature.findOne({ _id: id }, function(err, feature) {
		if (err || feature == null) {
			res.send(err);
		} else {
			res.json(feature);
		}
	});
}