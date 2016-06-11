// Required modules
var mongoose = require('mongoose');

// Required data schema
var Thing 		= require('../../data/thing');
var Errors    	= require('../../data/errors');
var Waterbody 	= require('../../data/waterbody');

/**
 * @api {get} /things/spatial/waterbodies/:waterbodyId GET - all at Waterbody
 * @apiName ListSpatialThingWaterbody
 * @apiGroup Thing
 * @apiVersion 1.0.0
 *
 * @apiParam {String} name 		Waterbody's name.
 *
 * @apiSuccess {Thing[]} things	Array of Thing information.
 *
 * @apiUse SuccessExample_List_Things
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