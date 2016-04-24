// Required modules
var mongoose = require('mongoose');

var MeasurementSchema = mongoose.Schema({
	date: {
		type: Date,
		required: true
	},
	value: {
		type: Number,
		required: true
	},
	sensorId: {
		type: String,
		required: true
	}
});

module.exports = mongoose.model('Measurement', MeasurementSchema);