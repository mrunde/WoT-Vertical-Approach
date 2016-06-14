
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

passport.use(new LocalStrategy(User.authenticate(), {usernameField: "name"}));

// used to serialize the user for the session
passport.serializeUser(User.serializeUser());

// used to deserialize the user
passport.deserializeUser(User.deserializeUser());
