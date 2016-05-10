// Required modules
var mongoose = require('mongoose');

var WaterbodySchema = mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	loc: {
		'type': {
			type: String,
			default: 'Polygon'
		},
		coordinates: {
			type: [],
			required: true
		}
	}
});

WaterbodySchema.index({ loc : '2dsphere' });

module.exports = mongoose.model('Waterbody', WaterbodySchema);