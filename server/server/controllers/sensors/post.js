'use strict';

// Required modules
const mongoose = require('mongoose');
const socket   = require('../../server.js');
const _        = require('underscore');

// Required data schema
const Sensor = require('../../data/sensor');

/**
 * @api {post} /sensors POST
 * @apiName PostSensor
 * @apiGroup Sensor
 * @apiVersion 1.0.0
 *
 * @apiParam {String} name			Name of the Sensor.
 * @apiParam {Number} interval		Interval of Sensor's Measurements in milliseconds.
 * @apiParam {Number} refLevel		Reference level of the Sensor.
 * @apiParam {Number} warnLevel		Warning level of the Sensor.
 * @apiParam {Number} riskLevel		Risk level of the Sensor.
 * @apiParam {String} thingId		Thing's unique ID.
 * @apiParam {String} featureId		Feature's unique ID.
 *
 * @apiSuccess {String} sensorId	Sensor's unique ID.
 *
 * @apiUse SuccessExample_Get_Sensors
 * @apiUse ThingNotFoundError
 * @apiUse FeatureNotFoundError
 * @apiUse ServerError
 */
exports.request = function(req, res) {
	const sensor = new Sensor(_.extend({}, req.body));
	
	sensor.save(function(err) {
		if (err) {
			res.send(err);
		} else {
			res.json(sensor);
			socket.notify('sensors', sensor);
		}
	});
}