'use strict';

// Required modules
const mongoose = require('mongoose');

// Required data schema
const Sensor = require('../../data/sensor');

/**
 * @api {get} /sensors GET - all
 * @apiName ListSensor
 * @apiGroup Sensor
 * @apiVersion 1.0.0
 *
 * @apiSuccess {Sensor[]} sensors		Array of Sensor information.
 *
 * @apiUse SuccessExample_List_Sensors
 * @apiUse ServerError
 */
exports.request = function(req, res) {
	Sensor.find(function(err, sensors) {
		if (err) {
			res.send(err);
		} else {
			res.json(sensors);
		}
	});
}