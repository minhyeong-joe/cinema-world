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
  Post.aggregate([
    { $match: {}},
    { $facet: {
      "posts": [
        { $sort: { "post_date": -1}},
        { $skip: skipped },
        { $limit: lim },
        { $lookup: {from: 'tags', localField: 'tags', foreignField: '_id', as: 'tags'}},
        { $lookup: {
          from: 'admins',
          let: { author: '$author'},
          pipeline: [
            { $match: { $expr: { $eq: ['$_id', '$$author']}}},
            { $project: {
              username: 1,
            }}
          ],
          as: 'author'
        }},
      ],
      "total": [
        { $count: 'count' }
      ]
    }},
    { $unwind: { "path": "$total", "preserveNullAndEmptyArrays": true }},
    { $project: {
      count: "$total.count",
      posts: "$posts"
    }}
  ])
  .exec((err, data) => {
    if (err) {
      res.status(500).json({success: false, message: "Unknown Error occurred", error: err});
    } else {
      if (data[0]['count'] == null) {
        data[0]['count'] = 0;
      }
      res.status(200).json({success: true, data: data[0]});
    }
  });
});


// @desc  get posts by tags
// @route GET /api/posts/tag/?lim=:lim&page=:page&tag=:tagId&tag=:tagId
router.get('/tag', (req, res) => {
  let tag = Array.isArray(req.query.tag)? req.query.tag: [req.query.tag];
  let lim = parseInt(req.query.lim);
  let page = parseInt(req.query.page);
  let skipped = (page - 1) * lim;
  Post.aggregate([
    { $match: {
      'tags': { $in: tag.map(id => new mongoose.Types.ObjectId(id))}
    }},
    { $facet: {
      "posts": [
        { $sort: { "post_date": -1}},
        { $skip: skipped },
        { $limit: lim },
        { $lookup: {from: 'tags', localField: 'tags', foreignField: '_id', as: 'tags'}},
        { $lookup: {
          from: 'admins',
          let: { author: '$author'},
          pipeline: [
            { $match: { $expr: { $eq: ['$_id', '$$author']}}},
            { $project: {
              _id: 1,
              username: 1,
            }}
          ],
          as: 'author'
        }}
      ],
      "total": [
        { $count: 'count' }
      ]
    }},
    { $unwind: { "path": "$total", "preserveNullAndEmptyArrays": true} },
    { $project: {
      count: "$total.count",
      posts: "$posts"
    }}
  ])
  .exec((err, data) => {
    if (err) {
      res.status(500).json({success: false, message: "Unknown Error occurred", error: err});
    } else {
      if (data[0]['count'] == null) {
        data[0]['count'] = 0;
      }
      res.status(200).json({success: true, data: data[0]});
    }
  });
});


// @desc  get posts by title
// @route GET /api/posts/title/?lim=:lim&page=:page&title=:title
router.get('/title', (req, res) => {
  let title = req.query.title;
  let lim = parseInt(req.query.lim);
  let page = parseInt(req.query.page);
  let skipped = (page - 1) * lim;
  let titleLike = new RegExp(`.*${title}.*`, "gi");
  Post.aggregate([
    { $match: {title: {$regex: titleLike}}},
    { $facet: {
      "posts": [
        { $sort: { "post_date": -1}},
        { $skip: skipped },
        { $limit: lim },
        { $lookup: {from: 'tags', localField: 'tags', foreignField: '_id', as: 'tags'}},
        { $lookup: {
          from: 'admins',
          let: { author: '$author'},
          pipeline: [
            { $match: { $expr: { $eq: ['$_id', '$$author']}}},
            { $project: {
              _id: 1,
              username: 1,
            }}
          ],
          as: 'author'
        }}
      ],
      "total": [
        { $count: 'count' }
      ]
    }},
    { $unwind: { "path": "$total", "preserveNullAndEmptyArrays": true} },
    { $project: {
      count: "$total.count",
      posts: "$posts"
    }}
  ])
  .exec((err, data) => {
    if (err) {
      res.status(500).json({success: false, message: "Unknown Error occurred", error: err});
    } else {
      if (data[0]['count'] == null) {
        data[0]['count'] = 0;
      }
      res.status(200).json({success: true, data: data[0]});
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
