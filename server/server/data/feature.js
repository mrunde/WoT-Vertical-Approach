'use strict';

// Required modules
const mongoose = require('mongoose');

const FeatureSchema = mongoose.Schema({
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