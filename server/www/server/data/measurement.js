// Required modules
var mongoose = require('mongoose');

var measurementSchema = mongoose.Schema({
	date: Date,
	value: Number
});

module.exports = mongoose.model('measurement', measurementSchema);