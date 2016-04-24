// Required modules
var mongoose = require('mongoose');
var Feature  = require('../../data/feature');
var _        = require('underscore');

exports.request = function(req, res) {
	var feature = new Feature(_.extend({}, req.body));
	feature.save(function(err) {
		if (err) {
			res.send(err);
		} else {
			res.json(feature);
		}
	});
}