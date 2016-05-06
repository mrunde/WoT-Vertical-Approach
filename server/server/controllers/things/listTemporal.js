// Required modules
var moment   = require('moment-interval');
var mongoose = require('mongoose');

// Required data schema 	
var Measurement = require('../../data/thing');
var Sensor = require('../../data/sensor');
var Thing = require('../../data/thing');

/**
 * @api {get} /things/temporal/:date GET - Request all things within one time frame
 * @apiName ListTemporalThing
 * @apiGroup Thing
 * @apiVersion 1.0.0
 *
 * @apiSuccess {Array} things	Array of Thing information.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     [
 *       {
 *         "name": "ifgi",
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
	var dateTo = req.params.dateTo;

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

	Thing.find(function(err, things) {
		if (err) {
			res.send(err);
		} else {
			aggregateThings(things, 0, [], res);
		}
	});


	function aggregateThings(things, pos, result, res){
		if (pos == things.length) {
			res.json(result);
		} else {
			Sensor.find({ thingId: things[pos]._id }, function(err, sensors) {
				if (err) {
					res.send(err);
				} else {
					aggregateSensors(things, pos+1, result.concat(sensors), res);
				}
			});
		}
	}


	function aggregateSensors(sensors, pos, result, res){
		if (pos == sensors.length) {
			res.json(result);
		} else {
			Measurement.find({ sensorId: sensors[pos]._id }, function(err, measurements) {
				if (err) {
					res.send(err);
				} else {
					aggregateSensors(sensors, pos+1, result.concat(measurements), res);
				}
			});
		}
	}
}