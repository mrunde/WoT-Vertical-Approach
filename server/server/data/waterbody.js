// Required modules
var mongoose = require('mongoose');

var WaterbodySchema = mongoose.Schema({
	type: {
		type: String,
		required: true
	},
	geometry: {
		type: {
			type: String,
			default: 'MultiLineString',
			required: true
		},
		coordinates: {
			type: [],
			required: true
		}
	},
	properties: {
		name: {
			type: String,
			required: true
		}
	}
});

WaterbodySchema.index({ coordinates : '2dsphere' });

module.exports = mongoose.model('Waterbody', WaterbodySchema);