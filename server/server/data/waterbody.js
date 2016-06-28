'use strict';

// Required modules
const mongoose = require('mongoose');

const WaterbodySchema = mongoose.Schema({
	type: {
		type: String,
		required: true
	},
	geometry: {
		type: {
			type: String,
			default: 'MultiLineString',
			required: true
		},
		coordinates: {
			type: [],
			required: true
		}
	},
	properties: {
		name: {
			type: String,
			required: true
		}
	}
});

WaterbodySchema.index({ geometry : '2dsphere' });

module.exports = mongoose.model('Waterbody', WaterbodySchema);