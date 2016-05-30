// Required modules
var express = require('express');

// Required controllers
var del                    		= require('../controllers/things/delete');
var get                    		= require('../controllers/things/get');
var getNearest             		= require('../controllers/things/getNearest');
var list                   		= require('../controllers/things/list');
var listSensors            		= require('../controllers/things/listSensors');
var listMeasurements       		= require('../controllers/things/listMeasurements');
var listMeasurementsLatest 		= require('../controllers/things/listMeasurementsLatest');
var listMeasurementsLatestAll	= require('../controllers/things/listMeasurementsLatestAll');
var listSpatial            		= require('../controllers/things/listSpatial');
var listSpatialWaterbody		= require('../controllers/things/listSpatialWaterbody');
var listTemporal           		= require('../controllers/things/listTemporal');
var listSpatialTemporal			= require('../controllers/things/listSpatialTemporal');
var post                   		= require('../controllers/things/post');

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
// Get the latest measurements of one thing
router.get('/things/:thingId/measurements/latest', listMeasurementsLatest.request);
// Get the latest measurements of all things
router.get('/things/measurements/latest', listMeasurementsLatestAll.request);
// Get the nearest other thing
router.get('/things/:thingId/nearest', getNearest.request);
// Get all things within one bounding box
router.get('/things/spatial/bbox/:bbox', listSpatial.request);
// Get all things close to a waterbody
router.get('/things/spatial/waterbodies/:waterbodyId', listSpatialWaterbody.request);
// Get all all things within one time frame
router.get('/things/temporal/:dateFrom/:dateTo', listTemporal.request);
// Get all things within one time frame and one bounding box
router.get('/things/temporal/:dateFrom/:dateTo/spatial/:bbox', listSpatialTemporal.request);

// --------------------------------------------------
// POST
// --------------------------------------------------
router.post('/things', post.request);

module.exports = router;