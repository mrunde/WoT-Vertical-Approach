// Required modules
var mongoose = require('mongoose');

// Required data schema
var Sensor = require('../../data/measurement');

/**
 * @api {get} /things/:thingId/measurements GET - Request all Thing's measurements
 * @apiName ListThingMeasurements
 * @apiGroup Thing
 * @apiVersion 1.0.0
 *
 * @apiParam {String} thingId	Thing's unique ID.
 *
 * @apiSuccess {Array} Measurements	Array of Measurements.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     [
 *       {
 *         "_id": "<< generated MongoDB ID >>",
 *         "sensorId": "<< generated MongoDB ID >>",
 *         "date": "2016-04-24T16:56:45.000Z",
 *         "value": 7,
 *         "__v": 0
 *       },
 *       {
 *         "_id": "<< generated MongoDB ID >>",
 *         "sensorId": "<< generated MongoDB ID >>",
 *         "date": "2016-04-24T16:59:45.000Z",
 *         "value": 8,
 *         "__v": 0
 *       }
 *     ]
 *
 * @apiUse ThingNotFoundError
 * @apiUse ServerError
 */
exports.request = function(req, res) {
	var id = req.params.thingId;

	Measurement.find({ thingId: id }, function(err, measurements) {
		if (err) {
			res.send(err);
		} else {
			res.json(measurements);
		}
	});
}