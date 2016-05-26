// Required modules
var mongoose = require('mongoose');

var SensorSchema = mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	intervall: {
		type: Number,
		required: true
	},
	refLevel: {
		type: Number,
		default: Number.MAX_VALUE
	},
	warnLevel: {
		type: Number,
		default: Number.MAX_VALUE
	},
	riskLevel: {
		type: Number,
		default: Number.MAX_VALUE
	},
	thingId: {
		type: String,
		required: true
	},
	featureId: {
		type: String,
		required: true
	}
});

module.exports = mongoose.model('Sensor', SensorSchema);