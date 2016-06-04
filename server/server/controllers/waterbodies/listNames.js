// Required modules
var mongoose = require('mongoose');

// Required data schema
var Waterbody = require('../../data/waterbody');

// DONT ADD TO API
exports.request = function(req, res) {
	Waterbody.find({}, 'properties', function(err, waterbodies) {
		if (err) {
			res.send(Errors.WaterbodyNotFoundError);
		} else {
			var names = [];
			for(var i = 0; i < waterbodies.length; i++) {
				names.push(waterbodies[i].properties.name);
			}
			res.json(names);
		}
	});
}