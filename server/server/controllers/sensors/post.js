// Required modules
var mongoose = require('mongoose');
var _        = require('underscore');

// Required data schema
var Sensor = require('../../data/sensor');
var socket = require('../../server.js');

/**
 * @api {post} /sensors POST - Create a Sensor
 * @apiName PostSensor
 * @apiGroup Sensor
 * @apiVersion 1.0.0
 *
 * @apiParam {String} name			Name of the Sensor.
 * @apiParam {String} thingId		Thing's unique ID.
 * @apiParam {String} featureId		Feature's unique ID.
 *
 * @apiSuccess {String} sensorId	Sensor's unique ID.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "__v": 0,
 *       "name": "Water Gauge",
 *       "thingId": "<< generated MongoDB ID >>",
 *       "featureId": "<< generated MongoDB ID >>",
 *       "_id": "<< generated MongoDB ID >>"
 *     }
 *
 * @apiUse ThingNotFoundError
 * @apiUse FeatureNotFoundError
 * @apiUse ServerError
 */
exports.request = function(req, res) {
	var sensor = new Sensor(_.extend({}, req.body));
	
	sensor.save(function(err) {
		if (err) {
			res.send(err);
		} else {
			res.json(sensor);
			socket.notify("sensors", sensor);
		}
	});
}