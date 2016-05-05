// Required modules
var mongoose = require('mongoose');
//var moment = require('moment');
var moment = require('moment-interval');

// Required data schema 	
var Measurement = require('../../data/measurement');

/**
 * @api {get} /measurements/temporal/:interval GET - Request all Measurements within time interval
 * @apiName ListMeasurementsByDate
 * @apiGroup Measurement
 * @apiVersion 1.0.0
 *
 * @apiSuccess {Array} measurements	Array of Measurement information.
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
	var dateFrom = req.params.dateFrom;
	var dateTo = req.params.dateTo;

	var startDate, endDate;

	if(dateFrom.toUpperCase().charAt(0) == 'P'){
		startDate = moment(dateTo).subtract(moment.duration(dateFrom)).toISOString();
		endDate = moment(dateTo).toISOString();
	} else if(dateTo.toUpperCase().charAt(0) == 'P'){
				startDate = moment(dateFrom).toISOString();
				endDate = moment(dateFrom).add(moment.duration(dateTo)).toISOString();
			} else{
				startDate = moment(dateFrom).toISOString();
				endDate = moment(dateTo).toISOString();
			}


	Measurement.find({date: {$gte: startDate, $lte: endDate }}, function(err, measurements){
		if(err){
			res.send(err);
		} else{
			res.json(measurements);
		}
	});
}

// moment bib in package.json
// unterscheidet in moments und duration
// 