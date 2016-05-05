// Required modules
var mongoose = require('mongoose');

var UserSchema = mongoose.Schema({
	name: {
		type: String,
		required: true
	}
});

module.exports = mongoose.model('User', UserSchema);