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
 *       	"type": "Feature",
 *       	"_id": "<< generated MongoDB ID >>",
 *       	"__v": 0,
 *		 	"geometry": {
 *		 		"type": "MultiLineString",
 *				"coordinates": [
 *					<< Array of LineStrings >>
 *				]
 *		 	},
 *		 	"properties": {
 *				"name": "Werse" 
 *		 	}   
 *     	},
 *      {
 *      	"type": "Feature",
 *       	"_id": "<< generated MongoDB ID >>",
 *       	"__v": 0,
 *		 	"geometry": {
 *		 		"type": "MultiLineString",
 *				"coordinates": [
 *					<< Array of LineStrings >>
 *				]
 *		 	},
 *		 	"properties": {
 *				"name": "Rhein" 
 *		 	}   
 *     	},
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