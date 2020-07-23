// simply redirects api calls to different controllers
// @route /api

const express = require('express');
const router = express.Router();
const films = require('./films');
const posts = require('./posts');
const admins = require('./admins');
const tags = require('./tags');

// @desc  Film controller
// @route /api/films
router.use('/films', films);

// @desc  Post controller
// @route /api/posts
router.use('/posts', posts);

// @desc  Admin controller
// @route /api/admins
router.use('/admins', admins);

// @desc  Tag controller
// @route /api/tags
router.use('/tags', tags);

module.exports = router;
