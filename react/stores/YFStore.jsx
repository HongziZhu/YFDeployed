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
var summerWeeks = [
  { week: 'week_1', coveredDate: '6/13-6/17', selected: false, done: false },
  { week: 'week_2', coveredDate: '6/20-6/24', selected: false, done: false },
  { week: 'week_3', coveredDate: '6/27-7/1', selected: false, done: false },
  { week: 'week_4', coveredDate: '7/4-7/8', selected: false, done: false },
  { week: 'week_5', coveredDate: '7/11-7/15', selected: false, done: false },
  { week: 'week_6', coveredDate: '7/18-7/22', selected: false, done: false },
  { week: 'week_7', coveredDate: '7/25-7/29', selected: false, done: false },
  { week: 'week_8', coveredDate: '8/1-8/5', selected: false, done: false },
  { week: 'week_9', coveredDate: '8/8-8/12', selected: false, done: false },
  { week: 'week_10', coveredDate: '8/15-8/19', selected: false, done: false }
];
var summerWeekCount = 0;
var summerCampWeeks = [];
var allScheduled = false;
var enrichmentDone = false;
var summerWeeksNum = 10;
var enrollmentId = '';
var program = '';

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

function saveSummerSchedule(student, next) {
  var url = '/api/users/summer/schedule/new';
  var data = {
    student: student,
    summerCampWeeks: summerCampWeeks
  };
  request
  .post(url)
  .send(data)
  .accept('application/json')
  .end(function(err, enrollment) {
    if(err) { return console.error(err); }
    enrollmentId = enrollment.body._id;
    next();
  });
}

function saveSummerAfternoonAcademics(enrollmentId, language, next) {
  var url = 'api/users/summer/afternoon_academics/' + enrollmentId;
  var data = { language: language };
  request
  .put(url)
  .send(data)
  .accept('application/json')
  .end(function(err, res) {
    if(err) { return console.error(err); }
    next();
  });
}

var YFStore = assign({}, EventEmitter.prototype, {
  getUser: function() {
    return user;
  },
  getStudents: function() {
    return students;
  },
  getLoggedIn: function() {
    return loggedIn;
  },
  getAuthError: function() {
    return authError;
  },
  getEnrollmentId: function() {
    return enrollmentId;
  },
  resetAuthError: function() {
    authError = false;
  },
  setIncomingGradeAndIndex: function(grade, index) {
    incomingGrade = grade;
    selectedIndex = index;
    students[index].incomingGrade = grade;
  },
  getIncomingGrade: function() {
    return incomingGrade;
  },
  getCurrentStudent: function() {
    return students[selectedIndex];
  },
  getSummerWeeks: function() {
    return summerWeeks;
  },
  setSummerWeeks: function(schedulePattern, attendingDays, applied, next) {
    summerWeeks = applied;
    var days = [];
    for(var j = 0; j < 5; j++) {
      var d = attendingDays[j];
      if(d.selected) { days.push(d.day); }
    }
    for(var i = 0; i < summerWeeksNum; i++) {
      var w = summerWeeks[i];
      if(w.selected && !w.done){
        summerCampWeeks[i] = {
          coveredDate: w.coveredDate,
          schedulePattern: schedulePattern,
          attendingDays: days
        };
        w.selected = false;
        w.done = true;
        summerWeekCount ++;
      }
    }
    next();
  },
  getSummerWeekCount: function() {
    return summerWeekCount;
  },
  getSummerCampWeeks: function() {
    return summerCampWeeks;
  },
  getAllScheduled: function() {
    return allScheduled;
  },
  setAllScheduled: function(b) {
    allScheduled = b;
  },
  getEnrichmentDone: function() {
    return enrichmentDone;
  },
  setEnrichmentDone: function(b) {
    enrichmentDone = b;
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
    case YFConstants.YF_SAVE_SUMMER_SCHEDULE:
      saveSummerSchedule(action.student, action.next);
      break;
    case YFConstants.YF_SAVE_SUMMER_AFTERNOON_ACADEMICS:
      saveSummerAfternoonAcademics(enrollmentId, action.language, action.next);
      break;

    default:
      // no op
  }
});

module.exports = YFStore;