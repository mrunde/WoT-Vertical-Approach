'use strict';

// Required modules
const mongoose = require('mongoose');
const socket   = require('../../server.js');
const _        = require('underscore');

// Required data schema
const Errors  = require('../../data/errors');
const Feature = require('../../data/feature');

/**
 * @api {post} /feature POST
 * @apiName PostFeature
 * @apiGroup Feature
 * @apiVersion 1.0.0
 *
 * @apiParam {String} name			Name of the Feature.
 * @apiParam {String} unit			Unit of the Feature.
 *
 * @apiSuccess {String} featureId	Feature's unique ID.
 *
 * @apiUse SuccessExample_Get_Features
 * @apiUse ServerError
 */
exports.request = function(req, res) {
	let feature = new Feature(_.extend({}, req.body));

	Feature.findOne({ name: feature.name, unit: feature.unit }, function(err, duplicate) {
		if (err) {
			
			res.send(Errors.ServerError(err));

		} else if (duplicate) {

			res.send(Errors.DuplicateFeatureFound);

		} else {

			feature.save(function(err) {
				if (err) {
					res.send(err);
				} else {
					res.json(feature);
					socket.notify('features', feature);
				}
			});
		}
	});
}