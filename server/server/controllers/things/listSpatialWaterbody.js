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
 * @apiParam {String} waterbodyId 		Waterbody's id.
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
 * @apiUse WaterbodyNotFoundError
 * @apiUse ServerError
 */
exports.request = function(req, res) {
	var id = req.params.waterbodyId;

	Waterbody.findOne({_id: id}, function(err, waterbody) {
		if(err || waterbody == null) {
			res.send(Errors.WaterbodyNotFoundError);
		} else {
			aggregateThings(waterbody.loc.coordinates, 0, [], res);
		}
	});
}

function aggregateThings(coordinates, pos, result, res) {
	if(coordinates.length == pos) {
		res.json(result);
	} else {
		Thing.find({
			loc: {
				$near: {
					$geometry: {
						type: "Point",
						coordinates: [coordinates[pos][1], coordinates[pos][0]]
					},
					$maxDistance: 800, // distance from the point
					$minDistance: 0
				}
			}
		}, function(err, things) {
			if(err) {
				res.send(err);
			} else {
				for(var i = 0; i < things.length; i++) {
					if(!thingExists(things[i], result)) {
						result.push(things[i]);
					}
				}
				aggregateThings(coordinates, pos+1, result, res);
			}
		});
	}
}

function thingExists(thing, thingArr) {	
	for(var i = 0; i < thingArr.length; i++) {
		if(thingArr[i]._id.toString() == thing._id.toString()) {
			return true;
		}
	}
	return false;
}