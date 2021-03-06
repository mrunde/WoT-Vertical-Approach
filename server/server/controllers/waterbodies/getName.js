'use strict';

// Required modules
const mongoose = require('mongoose');

// Required data schema
const Errors    = require('../../data/errors');
const Waterbody = require('../../data/waterbody');

/**
 * @api {get} /waterbodies/:name GET - single by name
 * @apiName GetWaterbodyName
 * @apiGroup Waterbody
 * @apiVersion 1.0.0
 *
 * @apiParam {String} name 				Waterbody's name.
 *	
 * @apiSuccess {String} name			Name of the Waterbody.
 * @apiSuccess {Geometry} geometry		Type and location of the waterbody.
 *
 * @apiUse SuccessExample_Get_Waterbodies
 * @apiUse WaterbodyNotFoundError
 * @apiUse ServerError
 */
exports.request = function(req, res) {
	let name = req.params.name;

	Waterbody.findOne({ "properties.name": name }, function(err, waterbody) {
		if (err) {
			
			res.send(Errors.ServerError(err));

		} else if (waterbody == null) {

			res.json(Errors.WaterbodyNotFoundError);

		} else {
			
			res.json(waterbody);
			
		}
	});
}