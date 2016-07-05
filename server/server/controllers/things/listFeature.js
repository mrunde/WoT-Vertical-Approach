'use strict';

// Required modules
const mongoose = require('mongoose');

// Required data schema
const Errors      = require('../../data/errors');
const Measurement = require('../../data/measurement');
const Sensor      = require('../../data/sensor');
const Thing       = require('../../data/thing');

/**
 * @api {get} /things/feature/:featureId GET - all with this Feature
 * @apiName ListFeatureThing
 * @apiGroup Thing
 * @apiVersion 1.0.0
 *
 * @apiParam {String} featureId	Feature's unique ID.
 *
 * @apiSuccess {Thing[]} things	Array of Thing information.
 *
 * @apiUse SuccessExample_List_Things
 * @apiUse FeatureNotFound
 * @apiUse ServerError
 */
exports.request = function(req, res) {
	let featureId = req.params.featureId;

	Sensor.find(function(err, sensors) {
		if (err) {
			
			res.send(Errors.ServerError(err));

		} else {
			
			aggregateSensors(sensors, 0, [], res, featureId);
		}
	});
}

function aggregateSensors(sensors, pos, result, res, featureId){
	if (pos == sensors.length) {
		
		aggregateThings(removeDuplicateThingIds(result), 0, [], res);

	} else {
		
		Measurement.find({ sensorId: sensors[pos]._id, featureId: featureId }, function(err, measurements) {
			if (err) {
				
				res.send(Errors.ServerError(err));

			} else {
				
				// if sensor contains measurements, add sensor to result
				if (measurements.length > 0) {

					result.push(sensors[pos]);
				}
				
				aggregateSensors(sensors, pos+1, result, res, featureId);
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