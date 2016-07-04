'use strict';

// Required modules
const moment   = require('moment');
const mongoose = require('mongoose');

// Required data schema
const Errors      = require('../../data/errors');
const Measurement = require('../../data/measurement');
const Sensor      = require('../../data/sensor');
const Thing       = require('../../data/thing');

/**
 * @api {get} /things/temporal/:dateFrom/:dateTo GET - all in time frame
 * @apiName ListTemporalThing
 * @apiGroup Thing
 * @apiVersion 1.0.0
 *
 * @apiParam {Date} dateFrom	Date from which the time frame begins.
 * @apiParam {Date} dateTo		Date at which the time frame ends.
 *
 * @apiSuccess {Thing[]} things	Array of Thing information.
 *
 * @apiUse SuccessExample_List_Things
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

	Sensor.find(function(err, sensors) {
		if (err) {
			
			res.send(Errors.ServerError(err));

		} else {
			
			aggregateSensors(sensors, 0, [], res, startDate, endDate);
		}
	});
}

function aggregateSensors(sensors, pos, result, res, startDate, endDate){
	if (pos == sensors.length) {
		aggregateThings(removeDuplicateThingIds(result), 0, [], res);
	} else {
		Measurement.find({ sensorId: sensors[pos]._id, date: { $gte: startDate, $lte: endDate }}, function(err, measurements) {
			if (err) {
				
				res.send(Errors.ServerError(err));

			} else {
				
				// if sensor contains measurements, add sensor to result
				if (measurements.length > 0) {
					result.push(sensors[pos]);
				}
				
				aggregateSensors(sensors, pos+1, result, res, startDate, endDate);
			}
		});
	}
}

function aggregateThings(uniqueThingIds, pos, result, res) {
	if (pos == uniqueThingIds.length) {
		
		res.json(result);

	} else {
		
		Thing.findOne({ _id: uniqueThingIds[pos] }, function(err, thing) {
			if (err) {
				
				res.send(Errors.ServerError(err));

			} else {

				aggregateThings(uniqueThingIds, pos+1, result.concat(thing), res);
			}
		})
	}
}

// takes the sensor array and returns an array
// with the thingIds contained in the sensor array
function removeDuplicateThingIds(sensors){
	let result = [];
	for (let x = 0; x < sensors.length; x++) {
		let exists = false;

		for (let y = 0; y < result.length; y++) {
			if (result[y] == sensors[x].thingId) {
				exists = true;
				break;
			}
		}
		
		if (!exists) {
			result.push(sensors[x].thingId);
		}
	}
	
	return result;
}