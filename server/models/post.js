const mongoose = require('mongoose');
const Tag = require('./tag');
const Admin = require('./admin');

const PostSchema = mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  sections: {
    type: [{
      subheading: String,
      cover_url: String,
      content: [String]
    }],
    required: true
  },
  cover_url: String,
  tags: [{
    type: mongoose.ObjectId,
    ref: Tag
  }],
  author: {
    type: mongoose.ObjectId,
    ref: Admin,
    required: true
  },
  post_date: {
    type: Date,
    required: true
  },
  last_modified: Date
});

const Post = module.exports = mongoose.model('Post', PostSchema);

// get all posts
module.exports.getAllPosts = (callback) => {
  Post.find({}, callback);
}
