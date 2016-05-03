// Required modules
var mongoose = require('mongoose'),
	GeoJSON = require('mongoose-geojson-schema'),;

var ThingSchema = mongoose.Schema({
	description: {
		type: String,
		required: true
	},
	location: {
		type: GeoJSON.Feature,
		index: '2d',
		required: true
	}
});

module.exports = mongoose.model('Thing', ThingSchema);