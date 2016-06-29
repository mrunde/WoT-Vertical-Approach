'use strict';

// Required modules
const mongoose = require('mongoose');

// Required data schema
const Errors = require('../../data/errors');
const Thing  = require('../../data/thing');

/**
 * @api {get} /things GET - all
 * @apiName ListThing
 * @apiGroup Thing
 * @apiVersion 1.0.0
 *
 * @apiSuccess {Thing[]} things	Array of Thing information.
 *
 * @apiUse SuccessExample_List_Things
 * @apiUse ServerError
 */
exports.request = function(req, res) {
	Thing.find(function(err, things) {
		if (err) {
			
			res.send(Errors.ServerError);

		} else {
			
			res.json(things);
		}
	});
}