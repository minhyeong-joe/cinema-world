const express = require('express');
const router = express.Router();
const Film = require('../models/film');

// @desc  Returns `lim` amount of films at `page` page filtered by `year`
// @route GET /api/films/byYear?year=:year&page=:page&lim=:lim
router.get('/byYear', (req, res, next) => {
  let year = parseInt(req.query.year);
  let page = parseInt(req.query.page);
  let lim = parseInt(req.query.lim);
  Film.getFilmsByYear(year, page, lim, (err, films) => {
    if (err) {
      res.json({success: false, message: "Unknown Error occurred"});
    } else {
      res.json({success: true, films: films});
    }
  });
});

// @desc  Returns `lim` amount of films at `page` page filtered by `title`
// @route GET /api/films/byTitle?title=:title&page=:page&lim=:lim
router.get('/byTitle', (req, res, next) => {
  let title = req.query.title;
  let page = parseInt(req.query.page);
  let lim = parseInt(req.query.lim);
  Film.getFilmsByTitle(title, page, lim, (err, films) => {
    if (err) {
      res.json({success: false, message: "Unknown Error occurred"});
    } else {
      res.json({success: true, films: films});
    }
  });
});

// @desc  Returns `lim` amount of films at `page` page filtered by `director`
// @route GET /api/films/byDirector?director=:director&page=:page&lim=:lim
router.get('/byDirector', (req, res, next) => {
  let director = req.query.director;
  let page = parseInt(req.query.page);
  let lim = parseInt(req.query.lim);
  Film.getFilmsByDirector(director, page, lim, (err, films) => {
    if (err) {
      res.json({success: false, message: "Unknown Error occurred"});
    } else {
      res.json({success: true, films: films});
    }
  });
});

// @desc  Returns a film retrieved by unique ID
// @route GET /api/films/:id
router.get('/:id', (req, res, next) => {
  let id = req.params['id'];
  Film.findById(id, (err, film) => {
    if (err) {
      res.json({success: false, message: "Unknown Error occurred"});
    }
    else {
      res.json({success: true, film: film });
    }
  });
});

module.exports = router;
