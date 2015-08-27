'use strict';

var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var YFConstants = require('../constants/YFConstants');
var assign = require('object-assign');
var request = require('superagent');

var CHANGE_EVENT = 'change';
var user = {};
var loggedIn = false;
var authError = false;
var students = [];
var selectedIndex = 0; //selected student index
var incomingGrade = '';

/**Tips: More than simply managing a collection of ORM-style objects, stores manage the application state for a particular domain within the application.
*/
//Register new user in a family unit
function createUser(body) {
  var url = '/api/users/new';
  request
  .post(url)
  .send(body)
  .accept('application/json')
  .end(function(err, user){
    if(err) { return console.error(err); }
  });
} 

function login(data, next) {
  var url = '/api/users/session';
  request
  .post(url)
  .send(data)
  .accept('application/json')
  .end(function(err, res){
    if(err) {
      authError = true;
    } else {
      loggedIn = true;
      user = res.body;
      console.log(JSON.stringify(user, null, 4));
    }
    next();
  });
}

function findStudentsById(id, next) {
  var url = '/api/users/' + id + '/students';
  request
  .get(url)
  .accept('application/json')
  .end(function(err, res){
    if(err) { return console.error(err); }
    students = res.body;
    next(students);
  });
}

var YFStore = assign({}, EventEmitter.prototype, {
  getUser: function() {
    return user;
  },
  getLoggedIn: function() {
    return loggedIn;
  },
  getAuthError: function() {
    return authError;
  },
  resetAuthError: function() {
    authError = false;
  },
  setIncomingGradeAndIndex: function(grade, index) {
    incomingGrade = grade;
    selectedIndex = index;
  },
  getIncomingGrade: function() {
    return incomingGrade;
  },

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  /**
   * @param {function} callback
   */
  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  /**
   * @param {function} callback
   */
  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }
});


// Register callback to handle all updates
AppDispatcher.register(function(action) {
  var body, data, id;

  switch(action.actionType) {
    case YFConstants.YF_CREATE_USER:
      body = action.body;
      createUser(body);
      break;

    case YFConstants.YF_LOGIN:
      data = action.data;
      login(data, function() {
        YFStore.emit(CHANGE_EVENT);
        if(!authError) { action.next(); }
      });
      break;

    case YFConstants.YF_LOAD_STUDENTS:
      id = action.userId;
      findStudentsById(id, function(students) {
        action.next(students);
      });
      break;

    default:
      // no op
  }
});

module.exports = YFStore;