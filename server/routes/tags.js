const express = require('express');
const router = express.Router();
const Tag = require('../models/tag');

// @desc  get all tags
// @route GET /api/tags/
router.get('/', (req, res) => {
  Tag.find({}, (err, tags) => {
    if (err) {
      res.status(500).json({success:false, message: "Unknown Error occurred"});
    } else {
      res.status(200).json({success: true, tags: tags});
    }
  });
});

module.exports = router;
