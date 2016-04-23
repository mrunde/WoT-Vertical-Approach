// Required modules
var mongoose = require('mongoose');
var Thing = require('../data/thing');
var _ = require('underscore');

// Create express router
var router = require('express').Router();
router.route('/things/:id?')
	.get(getThings)
	.post(addThing)
	.delete(deleteThing);

function getThings(req, res) {
	Thing.find(function(err, things) {
		if (err) {
			res.send(err);
		} else {
			res.json(things);
		}
	});
}

function addThing(req, res) {
	var thing = new Thing(_.extend({}, req.body));
	thing.save(function(err) {
		if (err) {
			res.send(err);
		} else {
			res.json(thing);
		}
	});
}

function deleteThing(req, res) {
	var id = req.params.id;
	Thing.remove({ _id: id }, function(err, removed) {
		if (err) {
			res.send(err);
		} else {
			res.json(removed);
		}
	});
}

module.exports = router;