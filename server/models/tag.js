const mongoose = require('mongoose');

const TagSchema = mongoose.Schema({
  name: String
});

const Tag = module.exports = mongoose.model('Tag', TagSchema);
