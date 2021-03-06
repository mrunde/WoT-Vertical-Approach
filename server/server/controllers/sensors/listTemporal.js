'use strict';

// Required modules
const moment   = require('moment');
const mongoose = require('mongoose');

// Required data schema 	
const Sensor      = require('../../data/sensor');
const Measurement = require('../../data/measurement');

/**
 * @api {get} /sensors/temporal/:dateFrom/:dateTo GET - all in time frame
 * @apiName ListTemporalSensor
 * @apiGroup Sensor
 * @apiVersion 1.0.0
 *
 * @apiParam {Date} dateFrom		Date from which the time frame begins.
 * @apiParam {Date} dateTo			Date at which the time frame ends.
 *
 * @apiSuccess {Sensor[]} sensors	Array of Sensor information.
 *
 * @apiUse SuccessExample_List_Sensors
 * @apiUse ServerError
 */
exports.request = function(req, res) {
	let dateFrom = req.params.dateFrom;
	let dateTo   = req.params.dateTo;

	let startDate, endDate;

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