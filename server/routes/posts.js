const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Post = require('../models/post');

// @desc  get all posts
// @route GET /api/posts/?lim=:lim&page=:page
router.get('/', (req, res) => {
  let lim = parseInt(req.query.lim);
  let page = parseInt(req.query.page);
  let skipped = (page - 1) * lim;
  Post.find()
      .populate('tags')
      .populate('author', 'username')
      .sort({'post_date': 'desc'})
      .skip(skipped)
      .limit(lim)
      .exec((err, posts) => {
        if (err) {
          res.status(500).json({success:false, message: "Unknown Error occurred"});
        } else {
          res.status(200).json({success: true, posts: posts});
        }
      });
});

// @desc  get posts by tags
// @route GET /api/posts/tag/?lim=:lim&page=:page&tag=:tagId&tag=:tagId
router.get('/tag', (req, res) => {
  let tag = req.query.tag;
  let lim = parseInt(req.query.lim);
  let page = parseInt(req.query.page);
  let skipped = (page - 1) * lim;
  Post.find({'tags': {$in: tag}})
      .populate('tags')
      .populate('author', 'username')
      .sort({'post_date' : 'desc'})
      .skip(skipped)
      .limit(lim)
      .exec((err, posts) => {
        if (err) {
          res.status(500).json({success:false, message: "Unknown Error occurred"});
        } else {
          res.status(200).json({success: true, posts: posts});
        }
      });
});

// @desc  get a post by id
// @route GET /api/posts/:id
router.get('/:id', (req, res) => {
  const id = req.params.id;
  Post.findById(id)
      .populate('tags')
      .populate('author', 'username')
      .exec((err, post) => {
        if (err) {
          res.status(500).json({success: false, message: "Unknown Error occurred"});
        } else {
          res.status(200).json({success: true, post: post});
        }
      });
});

module.exports = router;
