
/**
 * Module dependencies.
 */

var mongoose = require('mongoose');
var User = mongoose.model('User');
var utils = require('../../lib/utils');

exports.validateEmail = function (req, res) {
  var email = req.body;
  User.find({ email: email }, function (err, users) {
    if(err) { return console.error(err); }
    if(users.length === 0){
      res.json({ emailValid: true });
    } else {
      res.json({ emailValid: false});
    }
  });
};

exports.createUser = function (req, res) {
  var user = new User(req.body);
  user.provider = 'local';
  for(var i = 0; i < user.students.length; i++) {
      user.students[i].userId = user._id;
  }
  user.save(function (err, user) {
    //err => path('email').validate
    if(err) { return res.json({ err: err.errors.email.message }); }
    res.json({ user: user });
  });
};

exports.updateUser = function (req, res, next) {
  var userId = req.user._id;
  var user = req.body.user;
  User.findByIdAndUpdate(userId, user, function (err, user) {
    if(err) { return next(err); }
    if(req.body.newStudents !== undefined){
      for(var j = 0; j < req.body.newStudents.length; j++) {
        user.students.push(req.body.newStudents[j]);
      }
    }
    user.save(function (err, user) {
      if(err) { return res.json({ err: err.errors.email.message }); }
      res.json({ user: user });
    });
  });
};

exports.getStudents = function (req, res, next) {
  User.findById(req.params.id, function (err, user) {
    if(err) { return next(err); }
    res.json(user.students);
  });
};

exports.removeStudent = function (req, res, next) {
  var index = req.query.stuIdx;
  var user = req.user;
  user.students.splice(index, 1);
  user.save(function (err, user){
    if(err) { next(err); }
    res.json(user);
  });
};

exports.signin = function (req, res) {};

/**
 * Auth callback
 */

exports.authCallback = login;


/**
 * Logout
 */

exports.logout = function (req, res) {
  req.logout();
  res.redirect('/login');
};

/**
 * Session
 */

exports.session = login;

/**
 * Login
 */

function login (req, res) {
  var redirectTo = req.session.returnTo ? req.session.returnTo : '/';
  delete req.session.returnTo;
  res.redirect(redirectTo);
};
