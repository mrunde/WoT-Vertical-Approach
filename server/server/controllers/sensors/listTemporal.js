// Required modules
var moment   = require('moment');
var mongoose = require('mongoose');

// Required data schema 	
var Sensor      = require('../../data/sensor');
var Measurement = require('../../data/measurement');

/**
 * @api {get} /sensors/temporal/:date GET - Request all sensors within one time frame
 * @apiName ListTemporalSensor
 * @apiGroup Sensor
 * @apiVersion 1.0.0
 *
 * @apiSuccess {Array} sensors	Array of Sensor information.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     [
 *       {
 *         "name": "water gauge",
 *         "thingId": "<< generated MongoDB ID >>",
 *         "featureId": "<< generated MongoDB ID >>",
 *         "_id": "<< generated MongoDB ID >>",
 *         "__v": 0
 *       },
 *       {
 *         "name": "water gauge",
 *         "thingId": "<< generated MongoDB ID >>",
 *         "featureId": "<< generated MongoDB ID >>",
 *         "_id": "<< generated MongoDB ID >>",
 *         "__v": 0
 *       }
 *     ]
 *
 * @apiUse ServerError
 */
exports.request = function(req, res) {
	var dateFrom = req.params.dateFrom;
	var dateTo   = req.params.dateTo;

	var startDate, endDate;

	if (dateFrom.toUpperCase().charAt(0) == 'P') {
		startDate = moment(dateTo).subtract(moment.duration(dateFrom)).toISOString();
		endDate = moment(dateTo).toISOString();
	} else if (dateTo.toUpperCase().charAt(0) == 'P') {
		startDate = moment(dateFrom).toISOString();
		endDate = moment(dateFrom).add(moment.duration(dateTo)).toISOString();
	} else {
		startDate = moment(dateFrom).toISOString();
		endDate = moment(dateTo).toISOString();
	}

	Sensor.find(function(err, sensors){
		if(err){
			res.send(err);
		} else{
			aggregateSensors(sensors, 0, [], res, startDate, endDate);
		}
	});	
}

function aggregateSensors(sensors, pos, result, res, startDate, endDate){
	if(pos == sensors.length){
		res.json(result);
	} else {
		Measurement.find({ sensorId: sensors[pos]._id, date: { $gte: startDate, $lte: endDate }}, function(err, measurements) {
			if(err) {
				res.send(err);
			} else{
				// if sensor contains measurements, add sensor to result
				if(measurements.length > 0)
					result.push(sensors[pos]);
				aggregateSensors(sensors, pos+1, result, res, startDate, endDate);
			}
		});
	}
}
