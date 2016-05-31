// Required modules
var mongoose = require('mongoose');
var request  = require('request');
var async	 = require('async');

/**
 * @api {get} /measurements/temporal/:dateFrom/:dateTo/spatial/:bbox GET - Request all Measurements within one time frame and one bounding box
 * @apiName ListSpatialTemporalMeasurement
 * @apiGroup Measurement
 * @apiVersion 1.0.0
 *
 * @apiSuccess {Measurement[]} measurements	Array of Measurement information.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     [
 *       {
 *         "_id": "<< generated MongoDB ID >>",
 *         "date": "2016-04-23T22:54:00.000Z",
 *         "value": 7,
 *         "sensorId": "<< generated MongoDB ID >>",
 *         "__v": 0
 *       },
 *       {
 *         "_id": "<< generated MongoDB ID >>",
 *         "date": "2016-04-23T22:55:00.000Z",
 *         "value": 7.5,
 *         "sensorId": "<< generated MongoDB ID >>",
 *         "__v": 0
 *       }
 *     ]
 *
 * @apiUse ServerError
 */
exports.request = function(req, res) {
	var coordinates = req.params.bbox;

	var dateFrom = req.params.dateFrom;
	var dateTo   = req.params.dateTo;

	var resultTemporal;
	var resultSpatial;

	async.waterfall([
		function(next) {
			request.get('http://' + req.headers.host + '/api/measurements/temporal/' + dateFrom + '/' + dateTo, next);
		},

		function(response, body, next) {
			resultTemporal = JSON.parse(body);
			if(resultTemporal.error) {
				resultTemporal = [];
			}
			request.get('http://' + req.headers.host + '/api/measurements/spatial/' + coordinates, next);	
		},

		function(response, body, next) {			
			resultSpatial = JSON.parse(body);
			if(resultSpatial.error) {
				resultSpatial = [];
			}
			next(null);
		}
	], function(err, result) {
		if(err) {
			res.send(err);
		} else {
			var result = [];
			for(var i = 0; i < resultTemporal.length; i++) {
				for(var x = 0; x < resultSpatial.length; x++) {
					if(resultTemporal[i]._id == resultSpatial[x]._id) {
						result.push(resultTemporal[i]);
						break;
					}
				}
			}
			res.json(result);
		}
	});
}