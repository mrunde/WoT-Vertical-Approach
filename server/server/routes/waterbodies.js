// Required modules
var express = require('express');

// Required controllers
var get 		= require('../controllers/waterbodies/get');
var list 		= require('../controllers/waterbodies/list');
var listName	= require('../controllers/waterbodies/listName');
var listNames	= require('../controllers/waterbodies/listNames');
var post 		= require('../controllers/waterbodies/post');

// Set up the express router
var router = express.Router();

// --------------------------------------------------
// GET
// --------------------------------------------------

// Get one waterbody
router.get('/waterbodies/:waterbodyId', get.request);
// GET all waterbodies
router.get('/waterbodies', list.request);
// GET all waterbodies with the given name
router.get('/waterbodies/name/:name', listName.request);
// GET all waterbody names
router.get('/waterbodies/names/names', listNames.request);

// --------------------------------------------------
// POST
// --------------------------------------------------
router.post('/waterbodies', post.request);

module.exports = router;