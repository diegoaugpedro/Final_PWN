const express = require('express');
const router = express.Router();
const passport = require('passport');
const List= require('../users/List')


function ensureAuthenticated (req, res, next) {
  if (req.isAuthenticated()) {
  return next(); }
  res.redirect('/login')
}

router.get( '/:id' , ensureAuthenticated, async function (req, res) {
  var id = req.params.id;
  var user = req.session.passport.user
  var list = await List.find({username: req.params.id})
  if(user == id){
  res.render('admin', {list, id})}
  else res.redirect('/login')
});

router.post( '/:id' , ensureAuthenticated, function (req, res) {
    var id = req.params.id;
    List.create(
        {username: req.params.id,
        listName: req.body.listName,
        tasks: req.body.tasks}
    )
    res.redirect(`/admin/${id}`)
  });


router.get( '/:id/list/:listid' , ensureAuthenticated, async function (req, res) {
    var user = req.session.passport.user;
    var list = await List.findById(req.params.listid);
    if (req.params.id == user){
    res.render('list', {list})}
    else res.redirect('/login')
});

router.get( '/:id/list/:listid/delete' , ensureAuthenticated, async function (req, res) {
  var user = req.session.passport.user;
  if (req.params.id == user){
  await List.findByIdAndDelete(req.params.listid);
  res.redirect(`/admin/${req.params.id}`)}
  else redirect('/login')
});

router.post( '/:id/list/:listid/rename' , ensureAuthenticated, async function (req, res) {
  var user = req.session.passport.user;
  if (req.params.id == user){
  await List.findByIdAndUpdate(req.params.listid, {listName: req.body.newListName});
  res.redirect(`/admin/${req.params.id}`)}
  else res.redirect('/login')
});

router.post( '/:id/list/:listid/addtask' , ensureAuthenticated, async function (req, res) {
  var user = req.session.passport.user;
  if (req.params.id == user){
  await List.findByIdAndUpdate(req.params.listid, {$push:{tasks: req.body.tasks}});
  res.redirect(`/admin/${req.params.id}/list/${req.params.listid}`)}
  else res.redirect('/login')
});

router.get( '/:id/list/:listid/deletetask/:task' , ensureAuthenticated, async function (req, res) {
  var user = req.session.passport.user;
  if (req.params.id == user){
    await List.findByIdAndUpdate(req.params.listid, {$pull:{tasks: req.params.task}});
    res.redirect(`/admin/${req.params.id}/list/${req.params.listid}`)}
  else redirect('/login')
});

router.post( '/:id/list/:listid/renametask/:index' , ensureAuthenticated, async function (req, res) {
  var user = req.session.passport.user;
  var index = req.params.index;
  var editContent = req.body.editTask;
  if (req.params.id == user){
  await List.findByIdAndUpdate(req.params.listid, { $set: {[`tasks.${index}`]: editContent}});
  res.redirect(`/admin/${req.params.id}/list/${req.params.listid}`)}
  else res.redirect('/login')
});


module.exports = router;
