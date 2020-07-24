const mongoose = require('mongoose');

const AdminSchema = mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true,
    select: false
  },
  name: {
    type: {
      first_name: {
        type: String,
        required: true
      },
      last_name: {
        type: String,
        required: true
      }
    },
    required: true
  },
  created_at: {
    type: Date,
    required: true
  },
  last_logged_in: Date,
  role: {
    type: String,
    required: true
  }
});

const Admin = module.exports = mongoose.model('Admin', AdminSchema);
