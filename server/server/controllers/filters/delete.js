'use strict';

// Required modules
const mongoose = require('mongoose');

// Required data schema
const Errors      = require('../../data/errors');
const Filter = require('../../data/filter');


exports.request = function(req, res) {
	let token = req.body.token;

	if(token) {
		let filterId = req.params.filterId;

		Filter.remove({_id: filterId}, function(err, removed) {
			if(err) {
				res.send(Errors.ServerError(err));
			} else {
				res.json(removed);
			}
		})
	} else {
		res.send(Errors.TokenNotFoundError);
	}
}