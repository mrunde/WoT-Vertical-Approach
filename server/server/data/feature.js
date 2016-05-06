// Required modules
var mongoose = require('mongoose');

var FeatureSchema = mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	unit: {
		type: String,
		required: true
	}
});

module.exports = mongoose.model('Feature', FeatureSchema);