// Required modules
var express = require('express');

// Required controllers
var del              = require('../controllers/sensors/delete');
var get              = require('../controllers/sensors/get');
var list             = require('../controllers/sensors/list');
var listMeasurements = require('../controllers/sensors/listMeasurements');
var post             = require('../controllers/sensors/post');

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

// --------------------------------------------------
// POST
// --------------------------------------------------
router.post('/sensors', post.request);

module.exports = router;