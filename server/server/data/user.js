'use strict';

// Required modules
const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const UserSchema = mongoose.Schema({
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

UserSchema.statics = {
	load: function(id, cb) {
		this.findOne({_id: id}, cb);
	}
};

// Adds a username, hash and salt field to store the username, the hashed password and the salt value.
UserSchema.plugin(passportLocalMongoose, {usernameField: 'email'});

module.exports = mongoose.model('User', UserSchema);