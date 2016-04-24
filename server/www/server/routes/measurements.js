// Required modules
var express = require('express');

// Required controllers
var del  = require('../controllers/measurements/delete');
var get  = require('../controllers/measurements/get');
var list = require('../controllers/measurements/list');
var post = require('../controllers/measurements/post');

// Set up the express router
var router = express.Router();

router.delete('/measurements/:measurementId', del.request);
router.get('/measurements/:measurementId', get.request);
router.get('/measurements', list.request);
router.post('/measurements', post.request);

module.exports = router;