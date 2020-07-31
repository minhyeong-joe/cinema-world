const express = require('express');
const router = express.Router();
const Film = require('../models/film');

// @desc  Returns `lim` amount of films at `page` page filtered by `year`
//        Also returns the count of all matching films
// @route GET /api/films/year?year=:year&page=:page&lim=:lim
router.get('/year', (req, res) => {
  let year = parseInt(req.query.year);
  let page = parseInt(req.query.page);
  let lim = parseInt(req.query.lim);
  let start = new Date(year, 0);
  let end = new Date(year+1, 0);
  let skipped = (page - 1) * lim;
  Film.aggregate([
    { $match: { release_date: { $gte: start, $lt: end }}},
    { $facet: {
      "films": [
        { $sort: { "release_date": -1}},
        { $skip: skipped },
        { $limit: lim },
      ],
      "total": [
        { $count: 'count' }
      ]
    }},
    { $unwind: { "path": "$total", "preserveNullAndEmptyArrays": true} },
    { $project: {
      count: "$total.count",
      films: "$films"
    }}
  ])
  .exec((err, data) => {
    if (err) {
      res.status(500).json({success: false, message: "Unknown Error occurred"});
    } else {
      if (data[0]['count'] == null) {
        data[0]['count'] = 0;
      }
      res.status(200).json({success: true, data: data[0]});
    }
  });
});

// @desc  Returns `lim` amount of films at `page` page filtered by `title`
//        Also returns the count of all matching films
// @route GET /api/films/title?title=:title&page=:page&lim=:lim
router.get('/title', (req, res) => {
  let title = req.query.title;
  let page = parseInt(req.query.page);
  let lim = parseInt(req.query.lim);
  let skipped = (page - 1) * lim;
  let titleLike = new RegExp(`.*${title}.*`, "gi");
  Film.aggregate([
    { $match: {title: { $regex: titleLike }}},
    { $facet: {
      "films": [
        { $sort: { "release_date": -1}},
        { $skip: skipped },
        { $limit: lim },
      ],
      "total": [
        { $count: 'count' }
      ]
    }},
    { $unwind: { "path": "$total", "preserveNullAndEmptyArrays": true} },
    { $project: {
      count: "$total.count",
      films: "$films"
    }}
  ])
  .exec((err, data) => {
    if (err) {
      res.status(500).json({success: false, message: "Unknown Error occurred"});
    } else {
      if (data[0]['count'] == null) {
        data[0]['count'] = 0;
      }
      res.status(200).json({success: true, data: data[0]});
    }
  });
});

// @desc  Returns `lim` amount of films at `page` page filtered by `director`
//        Also returns the count of all matching films
// @route GET /api/films/director?director=:director&page=:page&lim=:lim
router.get('/director', (req, res) => {
  let director = req.query.director;
  let page = parseInt(req.query.page);
  let lim = parseInt(req.query.lim);
  let skipped = (page - 1) * lim;
  let directorLike = new RegExp(`.*${director}.*`, "gi");
  Film.aggregate([
    { $match: {director: { $regex:directorLike }}},
    { $facet: {
      "films": [
        { $sort: { release_date: -1 }},
        { $skip: skipped },
        { $limit: lim }
      ],
      "total": [
        { $count: 'count' }
      ]
    }},
    { $unwind: { "path": "$total", "preserveNullAndEmptyArrays": true} },
    { $project: {
      count: "$total.count",
      films: "$films"
    }}
  ])
  .exec((err, data) => {
    if (err) {
      res.status(500).json({success: false, message: "Unknown Error occurred"});
    } else {
      if (data[0]['count'] == null) {
        data[0]['count'] = 0;
      }
      res.status(200).json({success: true, data: data[0]});
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

// @desc   returns prev film among list by year
// @route  GET /api/films/year-prev/:year/:id
router.get('/year-prev/:year/:id', (req, res) => {
  const year = parseInt(req.params['year']);
  const end = new Date(year+1, 0);
  const id = req.params['id'];
  Film.findById(id, (err, curFilm) => {
    if (err) throw err;
    Film.find({release_date: { $gt: curFilm.release_date, $lt: end } })
        .sort({release_date: 'asc'})
        .findOne({})
        .exec((err, film) => {
          if (err) {
            res.status(500).json({success:false, message: "Unknown Error occurred"});
          } else {
            const id = film? film._id : null;
            res.status(200).json({success:true, prev: id});
          }
        });
  });
});

// @desc   returns next film among list by year
// @route  GET /api/films/year-next/:year/:id
router.get('/year-next/:year/:id', (req, res) => {
  const year = parseInt(req.params['year']);
  const start = new Date(year, 0);
  const id = req.params['id'];
  Film.findById(id, (err, curFilm) => {
    Film.find({release_date: { $gte: start, $lt: curFilm.release_date }})
        .sort({release_date: 'desc'})
        .findOne({})
        .exec((err, film) => {
          if (err) {
            res.status(500).json({success:false, message: "Unknown Error occurred"});
          } else {
            const id = film? film._id : null;
            res.status(200).json({success:true, next: id});
          }
        });
  });
});

// @desc   returns prev film among list by title
// @route  GET /api/films/title-prev/:title/:id
router.get('/title-prev/:title/:id', (req, res) => {
  let title = req.params['title'];
  let titleLike = new RegExp(`.*${title}.*`, "gi");
  const id = req.params['id'];
  Film.findById(id, (err, curFilm) => {
    if (err) throw err;
    Film.find({title: { $regex: titleLike }, release_date: { $gt: curFilm.release_date }})
        .sort({release_date: 'asc'})
        .findOne({})
        .exec((err, film) => {
          if (err) {
            res.status(500).json({success:false, message: "Unknown Error occurred"});
          } else {
            const id = film? film._id : null;
            res.status(200).json({success:true, prev: id});
          }
        });
  });
});

// @desc   returns next film among list by title
// @route  GET /api/films/title-next/:title/:id
router.get('/title-next/:title/:id', (req, res) => {
  let title = req.params['title'];
  let titleLike = new RegExp(`.*${title}.*`, "gi");
  const id = req.params['id'];
  Film.findById(id, (err, curFilm) => {
    if (err) throw err;
    Film.find({title: { $regex: titleLike }, release_date: { $lt: curFilm.release_date }})
        .sort({release_date: 'desc'})
        .findOne({})
        .exec((err, film) => {
          if (err) {
            res.status(500).json({success:false, message: "Unknown Error occurred"});
          } else {
            const id = film? film._id : null;
            res.status(200).json({success:true, next: id});
          }
        });
  });
});

// @desc   returns prev film among list by director
// @route  GET /api/films/director-prev/:director/:id
router.get('/director-prev/:director/:id', (req, res) => {
  let director = req.params['director'];
  let directorLike = new RegExp(`.*${director}.*`, "gi");
  const id = req.params['id'];
  Film.findById(id, (err, curFilm) => {
    if (err) throw err;
    Film.find({director: { $regex: directorLike }, release_date: { $gt: curFilm.release_date }})
        .sort({release_date: 'asc'})
        .findOne({})
        .exec((err, film) => {
          if (err) {
            res.status(500).json({success:false, message: "Unknown Error occurred"});
          } else {
            const id = film? film._id : null;
            res.status(200).json({success:true, prev: id});
          }
        });
  });
});

// @desc   returns next film among list by director
// @route  GET /api/films/director-next/:director/:id
router.get('/director-next/:director/:id', (req, res) => {
  let director = req.params['director'];
  let directorLike = new RegExp(`.*${director}.*`, "gi");
  const id = req.params['id'];
  Film.findById(id, (err, curFilm) => {
    if (err) throw err;
    Film.find({director: { $regex: directorLike }, release_date: { $lt: curFilm.release_date }})
        .sort({release_date: 'desc'})
        .findOne({})
        .exec((err, film) => {
          if (err) {
            res.status(500).json({success:false, message: "Unknown Error occurred"});
          } else {
            const id = film? film._id : null;
            res.status(200).json({success:true, next: id});
          }
        });
  });
});

module.exports = router;
