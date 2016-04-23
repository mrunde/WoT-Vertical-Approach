// Required modules
var mongoose = require('mongoose');

var featureSchema = mongoose.Schema({
	description: String,
	unit: String
});

module.exports = mongoose.model('feature', featureSchema);