'use strict';

// Required modules
const mongoose = require('mongoose');

// Required data schema
const Feature = require('../../data/feature');

/**
 * @api {get} /features GET - all
 * @apiName ListFeature
 * @apiGroup Feature
 * @apiVersion 1.0.0
 *
 * @apiSuccess {Feature[]} features	Array of Feature information.
 *
 * @apiUse SuccessExample_List_Features
 * @apiUse ServerError
 */
exports.request = function(req, res) {
	Feature.find(function(err, features) {
		if (err) {
			res.send(err);
		} else {
			res.json(features);
		}
	});
}