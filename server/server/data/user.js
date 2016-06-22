// Required modules
var mongoose = require('mongoose');
var passportLocalMongoose = require('passport-local-mongoose');

var UserSchema = mongoose.Schema({
	email: {
		type: String,
		required: true
	},
	twitter: {
		twitterConsumerKey: {
			type: String,
			required: false
		},
		twitterConsumerSecret: {
			type: String,
			required: false
		},
		twitterAccessTokenKey: {
			type: String,
			required: false
		},
		twitteraccessTokenSecret: {
			type: String,
			required: false
		}
	}
});

// Adds a username, hash and salt field to store the username, the hashed password and the salt value.
UserSchema.plugin(passportLocalMongoose, {usernameField: 'email'});

module.exports = mongoose.model('User', UserSchema);