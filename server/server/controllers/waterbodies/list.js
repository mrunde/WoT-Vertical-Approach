// Required modules
var mongoose = require('mongoose');

// Required data schema
var Waterbody = require('../../data/waterbody');

/**
 * @api {get} /waterbodies GET - Request all Waterbody information
 * @apiName ListWaterbody
 * @apiGroup Waterbody
 * @apiVersion 1.0.0
 *
 * @apiSuccess {Array} waterbodies	Array of Waterbody information.
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
 *           "type": "Point"
 *         }
 *       },
 *       {
 *         "name": "Aa",
 *         "_id": "<< generated MongoDB ID >>",
 *         "__v": 0,
 *         "loc": {
 *           "coordinates": [
 *             << Array of coordinates >>
 *           ],
 *           "type": "Point"
 *         }
 *       }
 *     ]
 *
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