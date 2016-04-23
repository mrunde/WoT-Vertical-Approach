// Required modules
var mongoose = require('mongoose');
var Feature  = require('../data/feature');
var _        = require('underscore');

// Create express router
var router = require('express').Router();
router.route('/features/:id?')
	.get(getFeatures)
	.post(addFeature)
	.delete(deleteFeature);

function getFeatures(req, res) {
	Feature.find(function(err, features) {
		if (err) {
			res.send(err);
		} else {
			res.json(features);
		}
	});
}

function addFeature(req, res) {
	var feature = new Feature(_.extend({}, req.body));
	feature.save(function(err) {
		if (err) {
			res.send(err);
		} else {
			res.json(feature);
		}
	});
}

function deleteFeature(req, res) {
	var id = req.params.id;
	Feature.remove({ _id: id }, function(err, removed) {
		if (err) {
			res.send(err);
		} else {
			res.json(removed);
		}
	});
}

module.exports = router;