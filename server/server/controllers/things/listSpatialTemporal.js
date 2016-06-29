'use strict';

// Required modules
const mongoose = require('mongoose');
const request  = require('request');
const async    = require('async');

// Required data schema
const Errors = require('../../data/errors');

/**
 * @api {get} /things/temporal/:dateFrom/:dateTo/spatial/:bbox GET - all in time frame and bounding box
 * @apiName ListSpatialTemporalThing
 * @apiGroup Thing
 * @apiVersion 1.0.0
 *
 * @apiParam {Date} dateFrom	Date from which the time frame begins.
 * @apiParam {Date} dateTo		Date at which the time frame ends.
 * @apiParam {String} bbox 		Bounding box information.
 *
 * @apiSuccess {Thing[]} things	Array of Thing information.
 *
 * @apiUse SuccessExample_List_Things
 * @apiUse ServerError
 */
exports.request = function(req, res) {
	let coordinates = req.params.bbox;

	let dateFrom = req.params.dateFrom;
	let dateTo   = req.params.dateTo;

	let resultTemporal;
	let resultSpatial;


	async.waterfall([
		function(next) {
			request.get('http://' + req.headers.host + '/api/things/temporal/' + dateFrom + '/' + dateTo, next);
		},

		function(response, body, next) {
			resultTemporal = JSON.parse(body);
			
			if(resultTemporal.error) {
				resultTemporal = [];
			}
			
			request.get('http://' + req.headers.host + '/api/things/spatial/bbox/' + coordinates, next);	
		},

		function(response, body, next) {			
			resultSpatial = JSON.parse(body);
			
			if(resultSpatial.error) {
				resultSpatial = [];
			}
			
			next(null);
		}
	], function(err, result) {
		if (err) {
			
			res.send(Errors.ServerError);

		} else {
			
			let result = [];
			
			for(let i = 0; i < resultTemporal.length; i++) {
				for(let x = 0; x < resultSpatial.length; x++) {
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