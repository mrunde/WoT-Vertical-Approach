'use strict';

// Required modules
const mongoose = require('mongoose');

// Required data schema
const Errors = require('../../data/errors');
const Sensor = require('../../data/sensor');

/**
 * @api {get} /things/:thingId/sensors GET - all Sensors
 * @apiName ListThingSensors
 * @apiGroup Thing
 * @apiVersion 1.0.0
 *
 * @apiParam {String} thingId		Thing's unique ID.
 *
 * @apiSuccess {Sensor[]} sensors	Array of Sensor information.
 *
 * @apiUse SuccessExample_List_Sensors
 * @apiUse ThingNotFoundError
 * @apiUse ServerError
 */
exports.request = function(req, res) {
	let id = req.params.thingId;

	Sensor.find({ thingId: id }, function(err, things) {
		if (err) {
			
			res.send(Errors.ServerError(err));

		} else {
			
			res.json(things);
		}
	});
}