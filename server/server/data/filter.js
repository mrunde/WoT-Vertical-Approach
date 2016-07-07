'use strict';

// Required modules
const mongoose = require('mongoose');

const FilterSchema = mongoose.Schema({
	created: {
		type: Date,
		default: Date.now
	},
	userId: {
		type: String,
		required: true
	},
	settings: {
		type: {},
		required: true
	}
});

FilterSchema.statics = {
	load: function(id, cb) {
		this.findOne({_id: id}, cb);
	}
};


module.exports = mongoose.model('Filter', FilterSchema);