const express = require('express');
const router = express.Router();
const Film = require('../models/film');

// @desc  Returns `lim` amount of films at `page` page filtered by `year`
// @route GET /api/films/year?year=:year&page=:page&lim=:lim
router.get('/year', (req, res) => {
  let year = parseInt(req.query.year);
  let page = parseInt(req.query.page);
  let lim = parseInt(req.query.lim);
  let start = new Date(year, 0);
  let end = new Date(year+1, 0);
  let skipped = (page - 1) * lim;
  Film.find({release_date: { $gte: start, $lt: end }})
      .sort({ release_date: 'desc' })
      .skip(skipped)
      .limit(lim)
      .exec((err, films) => {
        if (err) {
          res.status(500).json({success: false, message: "Unknown Error occurred"});
        } else {
          res.status(200).json({success: true, films: films});
        }
      });
});

// @desc  Returns `lim` amount of films at `page` page filtered by `title`
// @route GET /api/films/title?title=:title&page=:page&lim=:lim
router.get('/title', (req, res) => {
  let title = req.query.title;
  let page = parseInt(req.query.page);
  let lim = parseInt(req.query.lim);
  let skipped = (page - 1) * lim;
  let titleLike = new RegExp(`.*${title}.*`, "gi");
  Film.find({title: { $regex: titleLike }})
      .sort({release_date: 'desc'})
      .skip(skipped)
      .limit(lim)
      .exec((err, films) => {
        if (err) {
          res.status(500).json({success: false, message: "Unknown Error occurred"});
        } else {
          res.status(200).json({success: true, films: films});
        }
      });
});

// @desc  Returns `lim` amount of films at `page` page filtered by `director`
// @route GET /api/films/director?director=:director&page=:page&lim=:lim
router.get('/director', (req, res) => {
  let director = req.query.director;
  let page = parseInt(req.query.page);
  let lim = parseInt(req.query.lim);
  let skipped = (page - 1) * lim;
  let directorLike = new RegExp(`.*${director}.*`, "gi");
  Film.find({director: { $regex: directorLike }})
      .sort({release_date: 'desc'})
      .skip(skipped)
      .limit(lim)
      .exec((err, films) => {
        if (err) {
          res.status(500).json({success: false, message: "Unknown Error occurred"});
        } else {
          res.status(200).json({success: true, films: films});
        }
      });
});

// @desc  Returns a film retrieved by unique ID
// @route GET /api/films/:id
router.get('/:id', (req, res) => {
  let id = req.params['id'];
  Film.findById(id, (err, film) => {
    if (err) {
      res.status(500).json({success: false, message: "Unknown Error occurred"});
    }
    else {
      res.status(200).json({success: true, film: film });
    }
  });
});

// @desc  Returns total count of films matching the year
// @route GET /api/films/year-count/:year
router.get('/year-count/:year', (req, res) => {
  let year = parseInt(req.params['year']);
  let start = new Date(year, 0);
  let end = new Date(year+1, 0);
  Film.countDocuments({release_date: { $gte: start, $lt: end }})
      .exec((err, count) => {
        if (err) {
          res.status(500).json({success:false, message: "Unknown Error occurred"});
        } else {
          res.status(200).json({success: true, count: count});
        }
      });
});

// @desc  Returns total count of films matching the title
// @route GET /api/films/title-count/:title
router.get('/title-count/:title', (req, res) => {
  let title = req.params['title'];
  let titleLike = new RegExp(`.*${title}.*`, "gi");
  Film.countDocuments({title: { $regex: titleLike }})
      .exec((err, count) => {
        if (err) {
          res.status(500).json({success:false, message: "Unknown Error occurred"});
        } else {
          res.status(200).json({success: true, count: count});
        }
      });
});

// @desc  Returns total count of films matching the director
// @route GET /api/films/director-count/:director
router.get('/director-count/:director', (req, res) => {
  let director = req.params['director'];
  let directorLike = new RegExp(`.*${director}.*`, "gi");
  Film.countDocuments({director: { $regex: directorLike }})
      .exec((err, count) => {
        if (err) {
          res.status(500).json({success:false, message: "Unknown Error occurred"});
        } else {
          res.status(200).json({success: true, count: count});
        }
      });
});

module.exports = router;
