// Required modules
var mongoose = require('mongoose');
var Thing    = require('../../data/thing');

exports.request = function(req, res) {
	var id = req.params.thingId;
	Thing.findOne({ _id: id }, function(err, thing) {
		if (err) {
			res.send(err);
		} else {
			res.json(thing);
		}
	});
}