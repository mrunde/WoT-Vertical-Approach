// Required modules
var mongoose = require('mongoose');
var passportLocalMongoose = require('passport-local-mongoose');

var UserSchema = mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	password: {
		type: String
	},
	email: {
		type: String
	}
});

// Adds a username, hash and salt field to store the username, the hashed password and the salt value.
UserSchema.plugin(passportLocalMongoose, {usernameField: 'name'});

module.exports = mongoose.model('User', UserSchema);