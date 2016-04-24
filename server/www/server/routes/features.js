// Required modules
var express = require('express');

// Required controllers
var del  = require('../controllers/features/delete');
var get  = require('../controllers/features/get');
var list = require('../controllers/features/list');
var post = require('../controllers/features/post');

// Set up the express router
var router = express.Router();

router.delete('/features/:featureId', del.request);
router.get('/features/:featureId', get.request);
router.get('/features', list.request);
router.post('/features', post.request);

module.exports = router;