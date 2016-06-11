// Required modules
var mongoose = require('mongoose');

// Required data schema
var Errors    = require('../../data/errors');
var Waterbody = require('../../data/waterbody');

/**
 * @api {get} /waterbodies/:waterbodyId GET - single
 * @apiName GetWaterbody
 * @apiGroup Waterbody
 * @apiVersion 1.0.0
 *
 * @apiParam {String} waterbodyId 		Waterbody's unique ID.
 *
 * @apiSuccess {String} name			Name of the Waterbody.
 * @apiSuccess {Geometry} geometry		Type and location of the waterbody.
 *
 * @apiUse SuccessExample_Get_Waterbodies
 * @apiUse WaterbodyNotFoundError
 * @apiUse ServerError
 */
exports.request = function(req, res) {
	var id = req.params.waterbodyId;

	Waterbody.findOne({ _id: id }, function(err, waterbody) {
		if (err || waterbody == null) {
			res.send(Errors.WaterbodyNotFoundError);
		} else {
			res.json(waterbody);
		}
	});
}