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

// GET CURRENT USER
router.get('/user', isLoggedIn, function(req, res) {
	res.jsonp(req.user);
});

// LOGOUT
router.get('/logout', isLoggedIn, function(req, res) {
	req.logout();
	res.redirect('/');
});

// ALL OTHER ANGULAR ROUTES
router.get('*', function(req, res) {
	res.render('index.html');
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