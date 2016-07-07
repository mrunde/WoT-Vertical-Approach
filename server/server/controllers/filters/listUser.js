'use strict';

// Required modules
const mongoose = require('mongoose');

// Required data schema
const Errors      = require('../../data/errors');
const Filter 	  = require('../../data/filter');


exports.request = function(req, res) {

	let userId = req.params.userId;

	Filter.find({userId: userId}, function(err, filters) {
		if(err) {
			res.send(Errors.ServerError(err));
		} else {
			res.json(filters);
		}
	})
}