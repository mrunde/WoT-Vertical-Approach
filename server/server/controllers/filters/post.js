'use strict';

// Required modules
const mongoose = require('mongoose');
const _        = require('underscore');

// Required data schema
const Errors      = require('../../data/errors');
const Filter 	  = require('../../data/filter');


exports.request = function(req, res) {
	let token = req.body.token;

	console.log(token);

	if (token) {

		console.log(req.body);
		let filter = new Filter(_.extend({}, req.body));
		console.log(filter);

		filter.save(function(err) {
			if(err) {
				res.send(Errors.ServerError(err));
			} else {
				res.json(filter);
			}
		});

	} else {
		
		res.send(Errors.TokenNotFoundError);
	}
}