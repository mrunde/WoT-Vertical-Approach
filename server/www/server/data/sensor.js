// Required modules
var mongoose = require('mongoose');

var SensorSchema = mongoose.Schema({
	description: {
		type: String,
		required: true
	}
});

module.exports = mongoose.model('Sensor', SensorSchema);