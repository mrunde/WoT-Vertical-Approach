// Required modules
var express = require('express');

// Required controllers
var del  = require('../controllers/users/delete');
var get  = require('../controllers/users/get');
var list = require('../controllers/users/list');
var post = require('../controllers/users/post');

// Set up the express router
var router = express.Router();

// --------------------------------------------------
// DELETE
// --------------------------------------------------
router.delete('/users/:userId', del.request);

// --------------------------------------------------
// GET
// --------------------------------------------------

// Get one user
router.get('/users/:userId', get.request);
// Get all users
router.get('/users', list.request);

// --------------------------------------------------
// POST
// --------------------------------------------------
router.post('/users', post.request);

module.exports = router;