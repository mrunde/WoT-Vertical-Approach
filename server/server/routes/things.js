// Required modules
var express = require('express');

// Required controllers
var del              = require('../controllers/things/delete');
var get              = require('../controllers/things/get');
var getNearest       = require('../controllers/things/getNearest');
var list             = require('../controllers/things/list');
var listSensors      = require('../controllers/things/listSensors');
var listMeasurements = require('../controllers/things/listMeasurements');
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

// --------------------------------------------------
// POST
// --------------------------------------------------
router.post('/things', post.request);

module.exports = router;