
// load all the things we need
var LocalStrategy   = require('passport-local').Strategy;
var passport		= require('passport');


// load up the user model
var User = require('./data/user');

// expose this function to our app using module.exports

	// =========================================================================
	// passport session setup ==================================================
	// =========================================================================
	// required for persistent login sessions
	// passport needs ability to serialize and unserialize users out of session

	// used to serialize the user for the session
	passport.serializeUser(function(user, done) {
		done(null, user.id);
	});

	// used to deserialize the user
	passport.deserializeUser(function(id, done) {
		User.findById(id, function(err, user) {
			done(err, user);
		});
	});

	// =========================================================================
	// LOCAL SIGNUP ============================================================
	// =========================================================================
	// we are using named strategies since we have one for login and one for signup
	// by default, if there was no name, it would just be called 'local'

	passport.use('local-signup', new LocalStrategy({
		// by default, local strategy uses username and password, we will override with user
		usernameField : 'name',
		passwordField : 'password',
		passReqToCallback : true // allows us to pass back the entire request to the callback
	},
	function(req, name, password, email, done) {
		// asynchronous
		// User.findOne wont fire unless data is sent back
		process.nextTick(function() {

		// find a user whose name is the same as the forms name
		// we are checking to see if the user trying to login already exists
		User.findOne({ 'name' :  name }, function(err, user) {
			// if there are any errors, return the error
			if (err)
				return done(err);

			// check to see if theres already a user with that name
			if (user) {
				// alert("This username is already taken")
				return done(null, false);
			} else {

				// if there is no user with that name
				// create the user
				User.register(new User({username: name, name: name}), password, email, function(err) {
					if (err) {
						return done(null);
					}			
					res.redirect('/');
				});
			}

		});    

		});

	}));

	// =========================================================================
	// LOCAL LOGIN =============================================================
	// =========================================================================
	// we are using named strategies since we have one for login and one for signup
	// by default, if there was no name, it would just be called 'local'

	passport.use('local-login', new LocalStrategy({
		// by default, local strategy uses username and password, we will override with name
		usernameField : 'name',
		passwordField : 'password',
		passReqToCallback : true // allows us to pass back the entire request to the callback
	},
	function(req, name, password, done) { // callback with name and password from our form

		// find a user whose name is the same as the forms name
		// we are checking to see if the user trying to login already exists
		User.findOne({ 'name' :  name }, function(err, user) {
			// if there are any errors, return the error before anything else
			if (err)
				return done(err);

			// if no user is found, return the message
			if (!user) {
				return done(null, false);
			}
			// all is well, return successful user
			return done(null, user);
		});

	}));
