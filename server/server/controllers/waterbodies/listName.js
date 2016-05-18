// Required modules
var mongoose = require('mongoose');

// Required data schema
var Errors    = require('../../data/errors');
var Waterbody = require('../../data/waterbody');

/**
 * @api {get} /waterbodies/:name GET - Request waterbody by name
 * @apiName GetWaterbody
 * @apiGroup Waterbody
 * @apiVersion 1.0.0
 *
 * @apiParam {String} name 	Waterbody's name.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     [
 *       {
 *         "name": "Werse",
 *         "_id": "<< generated MongoDB ID >>",
 *         "__v": 0,
 *         "loc": {
 *           "coordinates": [
 *             << Array of coordinates >>
 *           ],
 *           "type": "LineString"
 *         }
 *       },
 *       {
 *         "name": "Werse",
 *         "_id": "<< generated MongoDB ID >>",
 *         "__v": 0,
 *         "loc": {
 *           "coordinates": [
 *             << Array of coordinates >>
 *           ],
 *           "type": "LineString"
 *         }
 *       }
 *     ]
 *
 * @apiUse WaterbodyNotFoundError
 * @apiUse ServerError
 */
exports.request = function(req, res) {
	var name = req.params.name;

	Waterbody.find({ name: name }, function(err, waterbody) {
		if (err) {
			res.send(Errors.WaterbodyNotFoundError);
		} else {
			res.json(waterbody);
		}
	});
}