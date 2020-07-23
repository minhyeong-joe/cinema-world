const mongoose = require('mongoose');

const TagSchema = mongoose.Schema({
  name: String
});

const Tag = module.exports = mongoose.model('Tag', TagSchema);

// return list of all tags
module.exports.getAllTags = (callback) => {
  Tag.find({}, callback);
}
