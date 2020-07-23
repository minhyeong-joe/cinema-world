const express = require('express');
const router = express.Router();
const Post = require('../models/post');

// @desc  get all posts
// @route GET /api/posts/
router.get('/', (req, res, next) => {
  Post.getAllPosts((err, posts) => {
    if (err) throw err;
    res.json({success: true, posts: posts});
  });
});

module.exports = router;
