// Required modules
var mongoose = require('mongoose');

var ThingSchema = mongoose.Schema({
	description: {
		type: String,
		required: true
	},
	location: {
		type: String,
		required: true
	}
});

module.exports = mongoose.model('Thing', ThingSchema);