// Required modules
var mongoose 	= require('mongoose');
var request 	= require('request');
var async		= require('async');

/**
 * @api {get} /things/temporal/:dateFrom/:dateTo/spatial/:bbox GET - Request all Thing information within a time frame and one bounding box
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
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     [
 *       {
 *         "name": "ifgi",
 *         "userId": "<< generated MongoDB ID >>",
 *		   "waterbodyId": "<< generatedMongoDB ID >>",
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
 *		   "waterbodyId": "<< generatedMongoDB ID >>",
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
	var coordinates = req.params.bbox;

	var dateFrom = req.params.dateFrom;
	var dateTo   = req.params.dateTo;

	var resultTemporal;
	var resultSpatial;


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

