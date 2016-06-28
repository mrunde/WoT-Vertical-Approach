// Required modules
var express = require('express');

// Required controllers
var get  = require('../controllers/features/get');
var list = require('../controllers/features/list');
var post = require('../controllers/features/post');

// Set up the express router
var router = express.Router();

// --------------------------------------------------
// GET
// --------------------------------------------------

// Get one feature
router.get('/features/:featureId', get.request);
// Get all features
router.get('/features', list.request);

// --------------------------------------------------
// POST
// --------------------------------------------------
router.post('/features', post.request);

module.exports = router;