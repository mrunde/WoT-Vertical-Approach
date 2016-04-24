// Required modules
var mongoose = require('mongoose');
var Thing    = require('../../data/thing');
var _        = require('underscore');

exports.request = function(req, res) {
	var thing = new Thing(_.extend({}, req.body));
	thing.save(function(err) {
		if (err) {
			res.send(err);
		} else {
			res.json(thing);
		}
	});
}