// Required modules
var mongoose = require('mongoose');

// Required data schema
var Thing 		= require('../../data/thing');
var Errors    	= require('../../data/errors');
var Waterbody 	= require('../../data/waterbody');

/**
 * @api {get} /things/spatial/waterbodies/:waterbodyId GET - Request all Things close to a waterbody
 * @apiName ListSpatialThingWaterbody
 * @apiGroup Thing
 * @apiVersion 1.0.0
 *
 * @apiParam {String} name 		Waterbody's name.
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
 * @apiUse WaterbodyNotFoundError
 * @apiUse ServerError
 */
exports.request = function(req, res) {
	var name = req.params.name;

	Waterbody.findOne({"properties.name": name}, function(err, waterbody) {
		if(err || waterbody == null) {
			res.send(Errors.WaterbodyNotFoundError);
		} else {
			Thing.find({waterbodyId: waterbody._id}, function(err, things) {
				if(err) {
					res.send(err);
				} else {
					res.json(things);
				}
			});
		}
	});
}