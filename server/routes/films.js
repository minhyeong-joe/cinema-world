const express = require('express');
const router = express.Router();
const Film = require('../models/film');

// @desc  Returns a film retrieved by unique ID
// @route GET /api/films/:id
router.get('/:id', (req, res, next) => {
  let id = req.params['id'];
  Film.findById(id, (err, film) => {
    if (err) {
      res.json({success: false, message: err});
    }
    else {
      res.json({success: true, film: film });
    }
  });
});

module.exports = router
