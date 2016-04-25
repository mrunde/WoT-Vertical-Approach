// Required modules
var mongoose    = require('mongoose');

// Required data schema
var Measurement = require('../../data/measurement');

/**
 * @api {delete} /measurements/:measurementId DELETE - Delete a Measurement
 * @apiName DeleteMeasurement
 * @apiGroup Measurement
 * @apiVersion 1.0.0
 *
 * @apiParam {String} measurementId	Measurement's unique ID.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "ok": 1,
 *       "n": 0
 *     }
 *
 * @apiUse MeasurementNotFoundError
 * @apiUse ServerError
 */
exports.request = function(req, res) {
	var id = req.params.measurementId;

	Measurement.remove({ _id: id }, function(err, removed) {
		if (err) {
			res.send(err);
		} else {
			res.json(removed);
		}
	});
}