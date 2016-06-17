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
router.get('/register', function(req, res) {
	res.redirect('/internal#/register');
});

// LOGIN show the login form
router.get('/internal', function(req, res) {
	res.render('internal.html');
});

router.get('/internal/profile', function(req, res) {
	res.redirect('/internal#/profile');
});

router.get('/internal/thing/:thingId', function(req, res) {
	res.redirect('/internal#/thing/' + req.params.thingId);
})

router.get('/user', isLoggedIn, function(req, res) {
	res.jsonp(req.user);
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

router.post('/login', passport.authenticate('local'), function(req, res) {
	res.jsonp(req.user);
});

// process the signup form
router.post('/register', function(req, res) {
	var user = new User(_.extend({}, req.body));

	User.register(new User(req.body), req.body.password, function(err, user) {
		if(err) {
			res.send(err);
		} else {
			res.jsonp(user);
		}
	});
});

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

	// if user is authenticated in the session, carry on 
	if (req.isAuthenticated()) return next();

	// if they aren't redirect them to the home page
	res.redirect('/');
}


module.exports = router;