const db = require("../models");
const passport = require('passport')


// Defining methods for the UsersController
module.exports = {
  findAll: function(req, res) {
    console.log(req.user)
    db.User
      .find({})
      .sort({ date: -1 })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findById: function(req, res) {
    console.log(req.user)
    db.User
      .findById(req.user)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findUser: function(req,res) {
    console.log(req.body.email)
    db.User
    .findOne({email: req.body.email})
    .then(user => res.json(user))
    
  },
  authenticate: function(req, res, next) {
    passport.authenticate("local", {
            successRedirect: "/",
            failureRedirect: "/login",
          })(req, res, next)  
  },
  create: function(req, res) {
    db.User
      .create(req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  update: function(req, res) {
    console.log(req.user)
    db.User
      .findOneAndUpdate({ _id: req.user }, req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  remove: function(req, res) {
    db.User
      .findById({ _id: req.params.id })
      .then(dbModel => dbModel.remove())
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  logOut: function(req, res) {
    req.logout()
    res.redirect(200, "/")
  }
};
