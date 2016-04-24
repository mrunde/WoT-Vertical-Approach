// Required modules
var express = require('express');

// Required controllers
var del  = require('../controllers/things/delete');
var get  = require('../controllers/things/get');
var list = require('../controllers/things/list');
var post = require('../controllers/things/post');

// Set up the express router
var router = express.Router();

router.delete('/things/:thingId', del.request);
router.get('/things/:thingId', get.request);
router.get('/things', list.request);
router.post('/things', post.request);

module.exports = router;