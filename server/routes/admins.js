const express = require('express');
const router = express.Router();
const Admin = require('../models/admin');

// @desc  get all admins
// @route GET /api/tags/
router.get('/', (req, res, next) => {
  Admin.getAllAdmins((err, admins) => {
    if (err) throw err;
    res.json({success: true, admins: admins});
  });
});

module.exports = router;
