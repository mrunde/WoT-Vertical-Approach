// Required modules
var moment   = require('moment');
var mongoose = require('mongoose');

// Required data schema 	
var Measurement = require('../../data/measurement');
var Sensor 		= require('../../data/sensor');
var Thing 		= require('../../data/thing');

/**
 * @api {get} /things/temporal/:dateFrom/:dateTo GET - Request all things within one time frame
 * @apiName ListTemporalThing
 * @apiGroup Thing
 * @apiVersion 1.0.0
 *
 * @apiParam {Date} dateFrom	Date from which the time frame begins.
 * @apiParam {Date} dateTo		Date at which the time frame ends.
 *
 * @apiSuccess {Thing[]} things	Array of Thing information.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     [
 *       {
 *         "name": "ifgi",
 *         "userId": "<< generated MongoDB ID >>",
 *         "_id": "<< generated MongoDB ID >>",
 *         "__v": 0,
 *         "loc": {
 *           "coordinates": [
 *             51.969114,
 *             7.595794
 *           ],
 *           "type": "Point"
 *         }
 *       },
 *       {
 *         "name": "Wersehaus",
 *         "userId": "<< generated MongoDB ID >>",
 *         "_id": "<< generated MongoDB ID >>",
 *         "__v": 0,
 *         "loc": {
 *           "coordinates": [
 *             51.97338,
 *             7.700234
 *           ],
 *           "type": "Point"
 *         }
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

	Sensor.find(function(err, sensors) {
		if (err) {
			res.send(err);
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
				res.send(err);
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
				res.send(err);
			} else {
				aggregateThings(uniqueThingIds, pos+1, result.concat(thing), res);
			}
		})
	}
}

// takes the sensor array and returns an array
// with the thingIds contained in the sensor array
function removeDuplicateThingIds(sensors){
	var result = [];
	for (var x = 0; x < sensors.length; x++) {
		var exists = false;
		for (var y = 0; y < result.length; y++) {
			if (result[y] == sensors[x].thingId) {
				exists = true;
				break;
			}
		}
		if (!exists) 
			result.push(sensors[x].thingId);
	}
	return result;
}