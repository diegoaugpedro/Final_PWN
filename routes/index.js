const express = require('express');
const router = express.Router();
const passport = require('passport');

/* GET home page. */
router.get('/', function(_, res) {
  res.render('index');
});

module.exports = router;
