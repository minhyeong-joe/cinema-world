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

// return films by year
module.exports.getFilmsByYear = (year, page, lim, callback) => {
  let start = new Date(year, 0);
  let end = new Date(year+1, 0);
  let skipped = (page - 1) * lim;
  Film.find({release_date: { $gte: start, $lt: end }}).sort({release_date: 'desc'}).skip(skipped).limit(lim).exec(callback);
}

// return films by title
module.exports.getFilmsByTitle = (title, page, lim, callback) => {
  let skipped = (page - 1) * lim;
  let titleLike = new RegExp(`.*${title}.*`, "gi");
  Film.find({title: { $regex: titleLike }}).sort({release_date: 'desc'}).skip(skipped).limit(lim).exec(callback);
}

// return films by director
module.exports.getFilmsByDirector = (director, page, lim, callback) => {
  let skipped = (page - 1) * lim;
  let directorLike = new RegExp(`.*${director}.*`, "gi");
  Film.find({director: { $regex: directorLike }}).sort({release_date: 'desc'}).skip(skipped).limit(lim).exec(callback);
}

// return a film by ID
module.exports.getFilmById = (id, callback) => {
  Film.findById(id, callback);
}
