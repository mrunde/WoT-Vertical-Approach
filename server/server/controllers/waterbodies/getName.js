// Required modules
var mongoose = require('mongoose');

// Required data schema
var Errors    = require('../../data/errors');
var Waterbody = require('../../data/waterbody');

/**
 * @api {get} /waterbodies/:name GET - single by name
 * @apiName GetWaterbodyName
 * @apiGroup Waterbody
 * @apiVersion 1.0.0
 *
 * @apiParam {String} name 				Waterbody's name.
 *	
 * @apiSuccess {String} name			Name of the Waterbody.
 * @apiSuccess {Geometry} geometry		Type and location of the waterbody.
 *
 * @apiUse SuccessExample_Get_Waterbodies
 * @apiUse WaterbodyNotFoundError
 * @apiUse ServerError
 */
exports.request = function(req, res) {
	var name = req.params.name;

	Waterbody.findOne({ "properties.name": name }, function(err, waterbody) {
		if (err) {
			res.send(Errors.WaterbodyNotFoundError);
		} else {
			res.json(waterbody);
		}
	});
}