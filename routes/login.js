const express = require('express');
const router = express.Router();
const User = require('../users/User');
const passport = require('passport');


router.get('/', (_, res) => {
  res.render('login');
});

router.post('/', passport.authenticate('local'), (req, res) => {
  User.findOne({
    username: req.body.username
  }, (err) => {
    res.redirect(`/admin/${req.body.username}`)
  });
});

module.exports = router;