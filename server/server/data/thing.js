// Required modules
var mongoose = require('mongoose');

var ThingSchema = mongoose.Schema({
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
	}
});

ThingSchema.index({ loc : '2dsphere' });

module.exports = mongoose.model('Thing', ThingSchema);