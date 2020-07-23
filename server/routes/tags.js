const express = require('express');
const router = express.Router();
const Tag = require('../models/tag');

// @desc  get all tags
// @route GET /api/tags/
router.get('/', (req, res, next) => {
  Tag.getAllTags((err, tags) => {
    if (err) throw err;
    res.json({success: true, tags: tags});
  });
});

module.exports = router;
