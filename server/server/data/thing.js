// Required modules
var mongoose = require('mongoose');

var ThingSchema = mongoose.Schema({
	'type': {
		type: String,
		default: 'Feature'
	},
	geometry: {
		'type': {
			type: String,
			default: 'Point'
		},
		coordinates: {
			type: [Number],
			required: true
		}
	},
	properties: {
		description: {
			type: String,
			required: true
		}
	}
});

ThingSchema.index({ geometry : '2dsphere' });

module.exports = mongoose.model('Thing', ThingSchema);