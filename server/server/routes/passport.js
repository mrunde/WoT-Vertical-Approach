// Required modules
var express 	= require('express');
var passport	= require('passport');
var _			= require('underscore');

// Set up the express router
var router = express.Router();
var User   = require('../data/user');

// --------------------------------------------------
// GET
// --------------------------------------------------

// HOME PAGE (with map and login links)
router.get('/', function(req, res) {
	res.render('index.html', {user: req.user});
});

// SIGNUP show the signup form
router.get('/signup', function(req, res) {
	res.render('signup.html');
});

// LOGIN show the login form
router.get('/login', function(req, res) {
	res.render('login.html');
});

// LOGIN show the login form
router.get('/imprint', function(req, res) {
	res.render('imprint.html');
});

// PROFILE SECTION
router.get('/profile', isLoggedIn, function(req, res) {
	res.render('profile.html', {
		user: req.user// get the user out of session and pass to template 
	});
});

// LOGOUT
router.get('/logout', function(req, res) {
	req.logout();
	res.redirect('/');
});


// --------------------------------------------------
// POST
// --------------------------------------------------

// process the signup form
router.post('/signup', function(req, res) {
	var user = new User(_.extend({}, req.body));

	User.register(new User(req.body), req.body.password, function(err, user) {
		if(err) {
			res.redirect('/signup');
		} else {
			res.redirect('/profile');
		}
	});
});

router.post('/login', passport.authenticate('local', {
	successRedirect: '/profile', // redirect to the secure profile section
	failureRedirect: '/login' // redirect back to the login page if there is an error
}));

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

	// if user is authenticated in the session, carry on 
	if (req.isAuthenticated()) return next();

	// if they aren't redirect them to the home page
	res.redirect('/');
}


module.exports = router;