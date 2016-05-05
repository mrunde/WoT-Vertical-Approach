// Required modules
var express = require('express');

// Required controllers
var del              = require('../controllers/things/delete');
var get              = require('../controllers/things/get');
var getNearest       = require('../controllers/things/getNearest');
var list             = require('../controllers/things/list');
var listSensors      = require('../controllers/things/listSensors');
var listMeasurements = require('../controllers/things/listMeasurements');
var listSpatial      = require('../controllers/things/listSpatial');
var listTemporal     = require('../controllers/things/listTemporal');
var post             = require('../controllers/things/post');

// Set up the express router
var router = express.Router();

// --------------------------------------------------
// DELETE
// --------------------------------------------------
router.delete('/things/:thingId', del.request);

// --------------------------------------------------
// GET
// --------------------------------------------------

// Get one thing
router.get('/things/:thingId', get.request);
// Get all things
router.get('/things', list.request);
// Get all sensors of one thing
router.get('/things/:thingId/sensors', listSensors.request);
// Get all measurements of one thing
router.get('/things/:thingId/measurements', listMeasurements.request);
// Get the nearest other thing
router.get('/things/:thingId/nearest', getNearest.request);
// Get all things within one bounding box
router.get('/things/spatial/:bbox', listSpatial.request);
// Get all all things within one time frame
router.get('/things/temporal/:date', listTemporal.request);

// --------------------------------------------------
// POST
// --------------------------------------------------
router.post('/things', post.request);

module.exports = router;