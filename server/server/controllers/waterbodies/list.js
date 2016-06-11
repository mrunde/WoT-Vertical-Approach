// Required modules
var mongoose = require('mongoose');

// Required data schema
var Waterbody = require('../../data/waterbody');

/**
 * @api {get} /waterbodies GET - all
 * @apiName ListWaterbody
 * @apiGroup Waterbody
 * @apiVersion 1.0.0
 *
 * @apiSuccess {Array} waterbodies	Array of Waterbody information.
 *
 * @apiUse SuccessExample_List_Waterbodies
 * @apiUse ServerError
 */
exports.request = function(req, res) {
	Waterbody.find(function(err, waterbodies) {
		if (err) {
			res.send(err);
		} else {
			res.json(waterbodies);
		}
	});
}