const express = require('express');
const router = express.Router();
const Admin = require('../models/admin');

// @desc  get all admins
// @route GET /api/admins/
router.get('/', (req, res) => {
  Admin.find()
       .exec((err, admins) => {
        if (err) throw err;
        res.json({success: true, admins: admins});
      });
});

module.exports = router;
