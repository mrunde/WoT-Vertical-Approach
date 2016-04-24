// Required modules
var express = require('express');

// Required controllers
var del  = require('../controllers/sensors/delete');
var get  = require('../controllers/sensors/get');
var list = require('../controllers/sensors/list');
var post = require('../controllers/sensors/post');

// Set up the express router
var router = express.Router();

router.delete('/sensors/:sensorId', del.request);
router.get('/sensors/:sensorId', get.request);
router.get('/sensors', list.request);
router.post('/sensors', post.request);

module.exports = router;