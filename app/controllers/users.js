
/**
 * Module dependencies.
 */

var mongoose = require('mongoose');
var User = mongoose.model('User');
var utils = require('../../lib/utils');

/**
 * Load
 */

exports.load = function (req, res, next, id) {
  var options = {
    criteria: { _id : id }
  };
  User.load(options, function (err, user) {
    if (err) return next(err);
    if (!user) return next(new Error('Failed to load User ' + id));
    req.profile = user;
    next();
  });
};

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

exports.getStudents = function (req, res, next) {
  User.findById(req.params.id, function (err, user) {
    if(err) { return next(err); }
    res.json(user.students);
  });
};

/**
 *  Show profile
 */

exports.show = function (req, res) {
  var user = req.profile;
  res.render('users/show', {
    title: user.name,
    user: user
  });
};

exports.signin = function (req, res) {};

/**
 * Auth callback
 */

exports.authCallback = login;

/**
 * Show login form
 */

exports.login = function (req, res) {
  res.render('users/login', {
    title: 'Login'
  });
};

/**
 * Show sign up form
 */

exports.signup = function (req, res) {
  res.render('users/signup', {
    title: 'Sign up',
    user: new User()
  });
};

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
