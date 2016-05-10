// Required modules
var express = require('express');

// Required controllers
var get = require('../controllers/waterbodies/get');

// Set up the express router
var router = express.Router();

// --------------------------------------------------
// GET
// --------------------------------------------------

// Get one thing
router.get('/waterbodies/:waterbodyId', get.request);

module.exports = router;