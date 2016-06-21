// Required modules
const LocalStrategy = require('passport-local').Strategy;
const passport      = require('passport');

// Required data schema
const User = require('./data/user');

// =========================================================================
// passport session setup ==================================================
// =========================================================================
// required for persistent login sessions
// passport needs ability to serialize and unserialize users out of session

passport.use(new LocalStrategy(User.authenticate(), {usernameField: "email"}));

// used to serialize the user for the session
passport.serializeUser(User.serializeUser());

// used to deserialize the user
passport.deserializeUser(User.deserializeUser());
