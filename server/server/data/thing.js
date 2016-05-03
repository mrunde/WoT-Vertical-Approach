// Required modules
var mongoose = require('mongoose'),
	GeoJSON = require('mongoose-geojson-schema');

var ThingSchema = mongoose.Schema({
	description: {
		type: String,
		required: true
	},
	location: GeoJSON.Feature
});

module.exports = mongoose.model('Thing', ThingSchema);