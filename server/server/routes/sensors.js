// Required modules
var express = require('express');

// Required controllers
var del              = require('../controllers/sensors/delete');
var get              = require('../controllers/sensors/get');
var list             = require('../controllers/sensors/list');
var listMeasurements = require('../controllers/sensors/listMeasurements');
var listSpatial      = require('../controllers/sensors/listSpatial');
var post             = require('../controllers/sensors/post');

var sensordate		 = require('../controllers/sensors/temporal:date');

// Set up the express router
var router = express.Router();

// --------------------------------------------------
// DELETE
// --------------------------------------------------
router.delete('/sensors/:sensorId', del.request);

// --------------------------------------------------
// GET
// --------------------------------------------------

// Get one sensor
router.get('/sensors/:sensorId', get.request);
// Get all sensors
router.get('/sensors', list.request);
// Get all measurements of one sensor
router.get('/sensors/:sensorId/measurements', listMeasurements.request);
// Get all sensors within one bounding box
router.get('/sensors/spatial/:bbox', listSpatial.request);

// Get all all sensors within one time frame
router.get('/sensors/temporal/:date', sensordate.request);

// --------------------------------------------------
// POST
// --------------------------------------------------
router.post('/sensors', post.request);

module.exports = router;