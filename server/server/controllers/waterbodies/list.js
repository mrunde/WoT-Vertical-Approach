'use strict';

// Required modules
const mongoose = require('mongoose');

// Required data schema
const Errors    = require('../../data/errors');
const Waterbody = require('../../data/waterbody');

/**
 * @api {get} /waterbodies GET - all
 * @apiName ListWaterbody
 * @apiGroup Waterbody
 * @apiVersion 1.0.0
 *
 * @apiSuccess {Array} waterbodies	Array of Waterbody information.
 *
 * @apiUse SuccessExample_List_Waterbodies
 * @apiUse ServerError
 */
exports.request = function(req, res) {
	Waterbody.find(function(err, waterbodies) {
		if (err) {
			
			res.send(Errors.ServerError(err));

		} else {
			
			res.json(waterbodies);

		}
	});
}