// simply redirects api calls to different controllers
// @route /api

const express = require('express');
const router = express.Router();
const films = require('./films');

// @desc  Film controller
// @route /api/films
router.use('/films', films);

module.exports = router;
