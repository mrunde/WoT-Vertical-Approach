// Required modules
var mongoose = require('mongoose');

var SensorSchema = mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	interval: {
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

SensorSchema.statics = {
	load: function(id, cb) {
		this.findOne({_id: id}, cb);
	}
};

module.exports = mongoose.model('Sensor', SensorSchema);