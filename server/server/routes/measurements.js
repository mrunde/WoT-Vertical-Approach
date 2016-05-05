// Required modules
var express = require('express');

// Required controllers
var del          = require('../controllers/measurements/delete');
var get          = require('../controllers/measurements/get');
var list         = require('../controllers/measurements/list');
var listSpatial  = require('../controllers/measurements/listSpatial');
var listTemporal = require('../controllers/measurements/listTemporal');
var post         = require('../controllers/measurements/post');

// Set up the express router
var router = express.Router();

// --------------------------------------------------
// DELETE
// --------------------------------------------------
router.delete('/measurements/:measurementId', del.request);

// --------------------------------------------------
// GET
// --------------------------------------------------

// Get one measurement
router.get('/measurements/:measurementId', get.request);
// Get all measurements
router.get('/measurements', list.request);
// Get all measurements within one bounding box
router.get('/measurements/spatial/:bbox', listSpatial.request);
// Get all measurements within one time frame
router.get('/measurements/temporal/:dateFrom/:dateTo', listTemporal.request);

// --------------------------------------------------
// POST
// --------------------------------------------------
router.post('/measurements', post.request);

module.exports = router;