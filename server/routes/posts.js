const express = require('express');
const router = express.Router();
const Post = require('../models/post');

// @desc  get all posts
// @route GET /api/posts/
router.get('/', (req, res) => {
  Post.find({}, (err, posts) => {
    if (err) {
      res.status(500).json({success:false, message: "Unknown Error occurred"});
    } else {
      res.status(200).json({success: true, posts: posts});
    }
  });
});

module.exports = router;
