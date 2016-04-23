// Required modules
var mongoose    = require('mongoose');
var Measurement = require('../data/measurement');
var _           = require('underscore');

// Create express router
var router = require('express').Router();
router.route('/measurements/:id?')
	.get(getMeasurements)
	.post(addMeasurement)
	.delete(deleteMeasurement);

function getMeasurements(req, res) {
	Measurement.find(function(err, measurements) {
		if (err) {
			res.send(err);
		} else {
			res.json(measurements);
		}
	});
}

function addMeasurement(req, res) {
	var measurement = new Measurement(_.extend({}, req.body));
	measurement.save(function(err) {
		if (err) {
			res.send(err);
		} else {
			res.json(measurement);
		}
	});
}

function deleteMeasurement(req, res) {
	var id = req.params.id;
	Measurement.remove({ _id: id }, function(err, removed) {
		if (err) {
			res.send(err);
		} else {
			res.json(removed);
		}
	});
}

module.exports = router;