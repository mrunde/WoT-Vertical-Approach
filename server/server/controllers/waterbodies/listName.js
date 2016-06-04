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
 * @apiSuccess {String} name			Name of the Waterbody.
 * @apiSuccess {Geometry} gemoetry		Type and location of the waterbody.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "type": "Feature",
 *       "_id": "<< generated MongoDB ID >>",
 *       "__v": 0,
 *		 "geometry": {
 *		 	"type": "MultiLineString",
 *			"coordinates": [
 *				<< Array of LineStrings >>
 *			]
 *		 },
 *		 "properties": {
 *			 "name": "Werse" 
 *		 }   
 *     }
 *
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