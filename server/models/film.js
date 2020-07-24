const mongoose = require('mongoose');

const FilmSchema = mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  director: {
    type: [String]
  },
  release_date: {
    type: Date
  },
  poster_url: {
    type: String
  },
  rating: {
    type: Number
  },
  trailer_url: {
    type: String
  },
  gallery_url: {
    type: [String]
  },
  synopsis: {
    type: String
  },
  casts: {
    type: [String]
  }
});

const Film = module.exports = mongoose.model('Film', FilmSchema);
