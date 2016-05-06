// Required modules
var mongoose = require('mongoose');

// Required data schema
var Sensor = require('../../data/sensor');

/**
 * @api {get} /things/:thingId/sensors GET - Request all Thing's sensors
 * @apiName ListThingSensors
 * @apiGroup Thing
 * @apiVersion 1.0.0
 *
 * @apiParam {String} thingId	Thing's unique ID.
 *
 * @apiSuccess {Array} sensors	Array of Sensor information.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     [
 *       {
 *         "_id": "<< generated MongoDB ID >>",
 *         "name": "water gauge",
 *         "thingId": "<< generated MongoDB ID >>",
 *         "featureId": "<< generated MongoDB ID >>",
 *         "__v": 0
 *       },
 *       {
 *         "_id": "<< generated MongoDB ID >>",
 *         "name": "water gauge",
 *         "thingId": "<< generated MongoDB ID >>",
 *         "featureId": "<< generated MongoDB ID >>",
 *         "__v": 0
 *       }
 *     ]
 *
 * @apiUse ThingNotFoundError
 * @apiUse ServerError
 */
exports.request = function(req, res) {
	var id = req.params.thingId;

	Sensor.find({ thingId: id }, function(err, things) {
		if (err) {
			res.send(err);
		} else {
			res.json(things);
		}
	});
}