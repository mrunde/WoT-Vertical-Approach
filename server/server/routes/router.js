// Required modules
const express = require('express');

// Required routes
const features     = require('./features');
const measurements = require('./measurements');
const sensors      = require('./sensors');
const things       = require('./things');
const users        = require('./users');
const waterbodies  = require('./waterbodies');

// Set up the express router
const router = express.Router();

// --------------------------------------------------
// FEATURES
// --------------------------------------------------

// Get one Feature
router.get('/features/:featureId', features.get.request);
// Get all Features
router.get('/features', features.list.request);

// Create one Feature
router.post('/features', features.post.request);

// --------------------------------------------------
// MEASUREMENTS
// --------------------------------------------------

// Delete one Measurement
router.delete('/measurements/:measurementId', measurements.del.request);

// Get one Measurement
router.get('/measurements/:measurementId', measurements.get.request);
// Get all Measurements
router.get('/measurements', measurements.list.request);
// Get all Measurements within one bounding box
router.get('/measurements/spatial/:bbox', measurements.listSpatial.request);
// Get all Measurements within one time frame
router.get('/measurements/temporal/:dateFrom/:dateTo', measurements.listTemporal.request);
// Get all Measurements within one time frame and one bounding box
router.get('/measurements/temporal/:dateFrom/:dateTo/spatial/:bbox', measurements.listSpatialTemporal.request);

// Create one Measurement
router.post('/measurements', measurements.post.request);

// --------------------------------------------------
// SENSORS
// --------------------------------------------------

// Delete one Sensor
router.delete('/sensors/:sensorId', sensors.del.request);

// Get one Sensor
router.get('/sensors/:sensorId', sensors.get.request);
// Get all Sensors
router.get('/sensors', sensors.list.request);
// Get all Measurements of one Sensor
router.get('/sensors/:sensorId/measurements', sensors.listMeasurements.request);
// Get all Sensors within one bounding box
router.get('/sensors/spatial/:bbox', sensors.listSpatial.request);
// Get all all Sensors within one time frame
router.get('/sensors/temporal/:dateFrom/:dateTo', sensors.listTemporal.request);
// Get all Sensors within one time frame and a bounding box
router.get('/sensors/temporal/:dateFrom/:dateTo/spatial/:bbox', sensors.listSpatialTemporal.request);

// Create one Sensor
router.post('/sensors', sensors.post.request);

// Edit one Sensor
router.put('/sensors/:sensorId', sensors.put.request);

// --------------------------------------------------
// THINGS
// --------------------------------------------------

// Delete one Thing
router.delete('/things/:thingId', things.del.request);

// Get one Thing
router.get('/things/:thingId', things.get.request);
// Get all Things
router.get('/things', things.list.request);
// Get all Sensors of one Thing
router.get('/things/:thingId/sensors', things.listSensors.request);
// Get all Measurements of one Thing
router.get('/things/:thingId/measurements', things.listMeasurements.request);
// Get the latest Measurements of one Thing
router.get('/things/:thingId/measurements/latest', things.listMeasurementsLatest.request);
// Get the latest Measurements of all Things
router.get('/things/measurements/latest', things.listMeasurementsLatestAll.request);
// Get the nearest other Thing
router.get('/things/:thingId/nearest', things.getNearest.request);
// Get all Things within one bounding box
router.get('/things/spatial/bbox/:bbox', things.listSpatial.request);
// Get all Things close to a waterbody
router.get('/things/spatial/waterbodies/:name', things.listSpatialWaterbody.request);
// Get all all Things within one time frame
router.get('/things/temporal/:dateFrom/:dateTo', things.listTemporal.request);
// Get all Things within one time frame and one bounding box
router.get('/things/temporal/:dateFrom/:dateTo/spatial/:bbox', things.listSpatialTemporal.request);

// Create one Thing
router.post('/things', things.post.request);

// --------------------------------------------------
// USERS
// --------------------------------------------------

// Delete one User
router.delete('/users/:userId', users.del.request);

// Get one User
router.get('/users/:userId', users.get.request);
// Get all Users
router.get('/users', users.list.request);
// Get all Things of one User
router.get('/users/:userId/things', users.listThings.request);

// Create one User
router.post('/users', users.post.request);

// Update a user
router.put('/users/:userId', users.put.request);

// --------------------------------------------------
// WATERBODIES
// --------------------------------------------------

// Get one Waterbody
router.get('/waterbodies/:waterbodyId', waterbodies.get.request);
// GET one Waterbody with the given name
router.get('/waterbodies/name/:name', waterbodies.getName.request);
// GET all Waterbodies
router.get('/waterbodies', waterbodies.list.request);
// GET all Waterbodies names
router.get('/waterbodies/names/names', waterbodies.listNames.request);

// Create one Waterbody
router.post('/waterbodies', waterbodies.post.request);

module.exports = router;