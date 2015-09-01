'use strict';

var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var YFConstants = require('../constants/YFConstants');
var assign = require('object-assign');
var request = require('superagent');

/* Constants */
var CHANGE_EVENT = 'change';
var summerWeeksNum = 10;
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

/* States */
var user = {};
var loggedIn = false;
var authError = false;
var students = [];
var studentIndex = 0; //selected student index
var incomingGrade = '';
var summerWeekCount = 0;
var summerCampWeeks = [];
var enrollmentId = '';
var enrollment = {};
var writingChoice = 'none', mathChoice = 'none'; //["elective", "advanced", "none"]
var done = {
  scheduled: false,
  enrichmentActivities: false
};

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
      sessionStorage.setItem('loggedIn', true);
      sessionStorage.setItem('userId', user._id);
      sessionStorage.setItem('email', user.email);
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
    next();
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
    sessionStorage.setItem('enrollmentId', enrollmentId);
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

function loadEnrollment(enrollmentId, next) {
  if(enrollmentId !== ''){
    var url = 'api/users/enroll/' + enrollmentId;
    request
    .get(url)
    .accept('application/json')
    .end(function(err, res) {
      if(err) { return console.error(err); }
      enrollment = res.body;
      summerCampWeeks = res.body.summerCampWeeks;
      next();
    });
  }
}

var YFStore = assign({}, EventEmitter.prototype, {
  getStateFromStorage: function() {
    loggedIn = sessionStorage.getItem('loggedIn') || false;
    if(loggedIn) {
      user._id = sessionStorage.getItem('userId');
      user.email = sessionStorage.getItem('email');
    }
  },
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
  setIncomingGradeAndIndexAndProgram: function(grade, index, program) {
    // incomingGrade = grade;
    sessionStorage.setItem('incomingGrade', grade);
    // studentIndex = index;
    sessionStorage.setItem('studentIndex', index);
    sessionStorage.setItem('program', program);
  },
  getIncomingGrade: function() {
    return sessionStorage.getItem('incomingGrade');
  },
  setWritingChoice: function(w) {
    sessionStorage.setItem('writingChoice', w);
  },
  setMathChoice: function(m) {
    sessionStorage.setItem('mathChoice', m);
  },
  getWritingChoice: function(){
    return sessionStorage.getItem('writingChoice');
  },
  getMathChoice: function(){
    return sessionStorage.getItem('mathChoice');
  },
  getCurrentStudent: function() {
    var i = sessionStorage.getItem('studentIndex');
    return students[i];
  },
  getSummerWeeksNum: function() {
    return summerWeeksNum;
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
    return done.scheduled;
  },
  setAllScheduled: function(b) {
    done.scheduled = b;
  },
  getEnrichmentDone: function() {
    return done.enrichmentActivities;
  },
  setEnrichmentDone: function(b) {
    done.enrichmentActivities = b;
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
        YFStore.emitChange();
        if(!authError) { action.next(); }
      });
      break;

    case YFConstants.YF_LOAD_STUDENTS:
      id = user._id;
      findStudentsById(id, function() {
        YFStore.emitChange();
      });
      break;
    case YFConstants.YF_LOAD_ENROLLMENT:
      loadEnrollment(sessionStorage.getItem('enrollmentId'), function() {
        YFStore.emitChange();
      });
      break;
    case YFConstants.YF_SAVE_SUMMER_SCHEDULE:
      saveSummerSchedule(action.student, action.next);
      break;
    case YFConstants.YF_SAVE_SUMMER_AFTERNOON_ACADEMICS:
      enrollmentId = sessionStorage.getItem('enrollmentId');
      saveSummerAfternoonAcademics(enrollmentId, action.language, action.next);
      break;
  
    default:
      return;
  }
});

module.exports = YFStore;