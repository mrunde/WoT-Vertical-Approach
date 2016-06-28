'use strict';

// Required modules
const mongoose = require('mongoose');

const ThingSchema = mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	loc: {
		'type': {
			type: String,
			default: 'Point'
		},
		coordinates: {
			type: [Number],
			required: true
		}
	},
	userId: {
		type: String,
		required: true
	},
	waterbodyId: {
		type: String
	}
});

ThingSchema.index({ loc : '2dsphere' });

module.exports = mongoose.model('Thing', ThingSchema);