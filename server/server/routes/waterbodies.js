// Required modules
var express = require('express');

// Required controllers
var get       = require('../controllers/waterbodies/get');
var getName   = require('../controllers/waterbodies/getName');
var list      = require('../controllers/waterbodies/list');
var listNames = require('../controllers/waterbodies/listNames');
var post      = require('../controllers/waterbodies/post');

// Set up the express router
var router = express.Router();

// --------------------------------------------------
// GET
// --------------------------------------------------

// Get one waterbody
router.get('/waterbodies/:waterbodyId', get.request);
// GET one waterbody with the given name
router.get('/waterbodies/name/:name', getName.request);
// GET all waterbodies
router.get('/waterbodies', list.request);
// GET all waterbody names
router.get('/waterbodies/names/names', listNames.request);

// --------------------------------------------------
// POST
// --------------------------------------------------
router.post('/waterbodies', post.request);

module.exports = router;