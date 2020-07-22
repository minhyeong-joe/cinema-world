const mongoose = require('mongoose');

const FilmSchema = mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  director: {
    type: [String]
  },
  releaseDate: {
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

// return a film by ID
module.exports.getFilmById = (id, callback) => {
  Film.findById(id, callback);
}
