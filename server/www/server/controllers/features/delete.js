// Required modules
var mongoose = require('mongoose');
var Feature  = require('../../data/feature');

exports.request = function(req, res) {
	var id = req.params.featureId;
	Feature.remove({ _id: id }, function(err, removed) {
		if (err) {
			res.send(err);
		} else {
			res.json(removed);
		}
	});
}