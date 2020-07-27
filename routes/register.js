const express = require('express');
const router = express.Router();
const passport = require('passport');
const User = require('../users/User');

router.get('/', function(_, res) {
  res.render('register');
});


router.post("/", function(req, res){
  User.register({username: req.body.username}, req.body.password, function(err) {
    if (err) {
      var message = err.message
      res.json({message})
    }
    else {
      res.redirect('/login')
    }
  })
});

module.exports = router;