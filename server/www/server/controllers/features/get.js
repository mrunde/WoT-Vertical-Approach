// Required modules
var mongoose = require('mongoose');
var Feature  = require('../../data/feature');

exports.request = function(req, res) {
	var id = req.params.featureId;
	Feature.findOne({ _id: id }, function(err, feature) {
		if (err) {
			res.send(err);
		} else {
			res.json(feature);
		}
	});
}