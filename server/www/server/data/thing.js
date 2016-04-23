// Required modules
var mongoose = require('mongoose');

var thingSchema = mongoose.Schema({
	description: String,
	location: String
});

module.exports = mongoose.model('thing', thingSchema);