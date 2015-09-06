'use strict';

var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var YFConstants = require('../constants/YFConstants');
var assign = require('object-assign');
var request = require('superagent');

/* Original Data */
var enrichActData = require('../../lib/summer/enrichmentActivities.json');
var wrData = require('../../lib/summer/afternoonWritingElective.json');
var adWrData = require('../../lib/summer/afternoonAdvancedWriting.json');
var mathData = require('../../lib/summer/afternoonMathElective.json');
var adMathData = require('../../lib/summer/afternoonAdvancedMath.json');
var mathOlpData = require('../../lib/summer/afternoonMathOlympiad.json');
var GATEData = require('../../lib/summer/afternoonGATE.json');

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

function getWeekEnrollIdxes(grade, week, weekIdx){
  var morActIdx = YFStore.getMorActIdx(weekIdx);
  var aftActIdx = YFStore.getAftActIdx(weekIdx);
  var wrElecIdx = YFStore.getWrElecIdx(weekIdx);
  var mathElecIdx = YFStore.getMathElecIdx(weekIdx);
  var mathOlypIdx = YFStore.getMathOlypIdx(weekIdx);
  var GATEIdx = YFStore.getGATEIdx(weekIdx);
  var advWrIdx = YFStore.getAdvWrIdx(weekIdx);
  var advMathIdx = YFStore.getAdvMathIdx(weekIdx);
  var weekObj = {
    morActIdx: !isNaN(morActIdx) ? morActIdx : 0,
    aftActIdx: !isNaN(aftActIdx) ? aftActIdx : -1,
    wrElecIdx: !isNaN(wrElecIdx) ? wrElecIdx : -1,
    mathElecIdx: !isNaN(mathElecIdx) ? mathElecIdx : -1,
    mathOlypIdx: !isNaN(mathOlypIdx) ? mathOlypIdx : -1,
    GATEIdx: !isNaN(GATEIdx) ? GATEIdx : -1,
    advWrIdx: !isNaN(advWrIdx) ? advWrIdx : -1,
    advMathIdx: !isNaN(advMathIdx) ? advMathIdx : -1
  }
  return weekObj;
}

function saveSummerWeek(enrollmentId, grade, week, weekIdx, weekObj) {
  var url = '/api/users/summer/weeks/' + enrollmentId;
  var data = {
    grade: grade,
    week: week,
    weekIdx: weekIdx,
    weekObj: weekObj
  };
  request
  .put(url)
  .send(data)
  .accept('application/json')
  .end(function(err, res){
    if(err) { return console.error(err); }
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

function insertIntoLine(timeline, timeObj) {
  if(timeline.length === 1) { 
    timeline.splice(0, 0, timeObj); 
    return { conflict: false };
  }
  for(var j = 0; j < timeline.length; j++) {
    if(timeObj.time[1] <= timeline[j].time[0]){
      timeline.splice(j, 0, timeObj);
      return { conflict: false };
    } else if(timeObj.time[0] >= timeline[j].time[1]) {
      continue;
    } else {
      return {
        conflict: true,
        names: [timeObj.name, timeline[j].name]
      };
    }
  }
  return { conflict: false };
};

function saveSummerOtherServices(enrollmentId) {
  var weeklyMovies = [], pickups = [];
  var morningCare = YFStore.getMorningCare();
  var lunch = [
    { days: [] },
    { days: [] },
    { days: [] },
    { days: [] },
    { days: [] },
    { days: [] },
    { days: [] },
    { days: [] },
    { days: [] },
    { days: [] }
  ];
  for(var j = 0; j < 10; j++){
    weeklyMovies.push(
      YFStore.getWeeklyMovie(j)
    );
    pickups.push(
      YFStore.getPickup(j)
    );
    if(YFStore.getLunch(j+1)) {
      lunch[j].days = summerCampWeeks[j].attendingDays;
    } else {
      var x = j + 1;
      var refs = [x+'Mon', x+'Tue', x+'Wed', x+'Thu', x+'Fri'];
      var weekdays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
      for(var p = 0; p < refs.length; p++){
        if(YFStore.getLunch(refs[p])){
          lunch[j].days.push(weekdays[p]);
        }
      }
    }
  }

  var data = {
    weeklyMovies: weeklyMovies,
    morningCare: morningCare,
    lunch: lunch,
    pickups: pickups
  };

  var url = '/api/users/summer/other_services/' + enrollmentId;
  request
  .put(url)
  .send(data)
  .accept('application/json')
  .end(function(err, res){
    if(err) { return console.error(err); }
  });
}

function saveSummerAgreements(enrollmentId) {
  var url = '/api/users/summer/agreements/' + enrollmentId;
  var data = {
    
  };
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
  getEnrollment: function() {
    return enrollment;
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
          weekIndex: 'week_' + (i+1),
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
  setMorActIdx: function(weekIdx, v) {
    var key = weekIdx + 'morActIdx';
    sessionStorage.setItem(key, v);
  },
  getMorActIdx: function(weekIdx){
    var key = weekIdx + 'morActIdx';
    return parseInt(sessionStorage.getItem(key));
  },
  setAftActIdx: function(weekIdx, v) {
    var key = weekIdx + 'aftActIdx';
    sessionStorage.setItem(key, v);
  },
  getAftActIdx: function(weekIdx){
    var key = weekIdx + 'aftActIdx';
    return parseInt(sessionStorage.getItem(key));
  },
  setDailyLang: function(lang) {
    sessionStorage.setItem('dailyLang', lang);
  },
  getDailyLang: function() {
    return sessionStorage.getItem('dailyLang');
  },
  setWrElecIdx: function(weekIdx, v) {
    var key = weekIdx + 'wrElecIdx';
    sessionStorage.setItem(key, v);
  },
  getWrElecIdx: function(weekIdx){
    var key = weekIdx + 'wrElecIdx';
    return parseInt(sessionStorage.getItem(key));
  },
  setAdvWrIdx: function(weekIdx, v) {
    var key = weekIdx + 'advWrIdx';
    sessionStorage.setItem(key, v);
  },
  getAdvWrIdx: function(weekIdx){
    var key = weekIdx + 'advWrIdx';
    return parseInt(sessionStorage.getItem(key));
  },
  setMathElecIdx: function(weekIdx, v) {
    var key = weekIdx + 'mathElecIdx';
    sessionStorage.setItem(key, v);
  },
  getMathElecIdx: function(weekIdx){
    var key = weekIdx + 'mathElecIdx';
    return parseInt(sessionStorage.getItem(key));
  },
  setAdvMathIdx: function(weekIdx, v) {
    var key = weekIdx + 'advMathIdx';
    sessionStorage.setItem(key, v);
  },
  getAdvMathIdx: function(weekIdx){
    var key = weekIdx + 'advMathIdx';
    return parseInt(sessionStorage.getItem(key));
  },
  setMathOlypIdx: function(weekIdx, v) {
    var key = weekIdx + 'mathOlypIdx';
    sessionStorage.setItem(key, v);
  },
  getMathOlypIdx: function(weekIdx){
    var key = weekIdx + 'mathOlypIdx';
    return parseInt(sessionStorage.getItem(key));
  },
  setGATEIdx: function(weekIdx, v) {
    var key = weekIdx + 'GATEIdx';
    sessionStorage.setItem(key, v);
  },
  getGATEIdx: function(weekIdx){
    var key = weekIdx + 'GATEIdx';
    return parseInt(sessionStorage.getItem(key));
  },
  setWeeklyMovie(weekIdx, v){
    var key = weekIdx + 'movie';
    sessionStorage.setItem(key, v);
  },
  getWeeklyMovie(weekIdx){
    var key = weekIdx + 'movie';
    if(sessionStorage.getItem(key) === 'true') { return true; }
    return false; 
  },
  setMorningCare(v){
    var key = 'morningCare';
    sessionStorage.setItem(key, v);
  },
  getMorningCare(){
    var key = 'morningCare';
    //'oneHour', 'halfHour', 'none'
    return sessionStorage.getItem(key) ? sessionStorage.getItem(key) : 'none'; 
  },
  setLunch(ref, v){
    var key = ref + 'lunch';
    sessionStorage.setItem(key, v);
  },
  getLunch(ref){
    var key = ref + 'lunch';
    if(sessionStorage.getItem(key) === 'true') { return true; }
    return false;  
  },
  setCanPickup(v){
    var key = 'canPickup';
    sessionStorage.setItem(key, v);
  },
  getCanPickup(){
    var key = 'canPickup';
    if(sessionStorage.getItem(key) === 'true') { return true; }
    return false; 
  },
  setNeedPickup(v){
    var key = 'needPickup';
    sessionStorage.setItem(key, v);
  },
  getNeedPickup(){
    var key = 'needPickup';
    if(sessionStorage.getItem(key) === 'true') { return true; }
    return false; 
  },  
  setPickup(weekIdx, v){
    var key = weekIdx + 'pickup';
    sessionStorage.setItem(key, v);
  },
  getPickup(weekIdx){
    var key = weekIdx + 'pickup';
    if(sessionStorage.getItem(key) === 'true') { return true; }
    return false; 
  },  
  setSwimPermit(v){
    var key = 'swimPermit';
    sessionStorage.setItem(key, v);
  },
  getSwimPermit(){
    var key = 'swimPermit';
    if(sessionStorage.getItem(key) === 'true') { return true; }
    return false; 
  },
  setMoviePermit(v){
    var key = 'moviePermit';
    sessionStorage.setItem(key, v);
  },
  getMoviePermit(){
    var key = 'moviePermit';
    if(sessionStorage.getItem(key) === 'true') { return true; }
    return false; 
  }, 
  setFieldTripPermit(v){
    var key = 'fieldTripPermit';
    sessionStorage.setItem(key, v);
  },
  getFieldTripPermit(){
    var key = 'fieldTripPermit';
    if(sessionStorage.getItem(key) === 'true') { return true; }
    return false; 
  },
  setHartSportsPermit(v){
    var key = 'HartSportsPermit';
    sessionStorage.setItem(key, v);
  },
  getHartSportsPermit(){
    var key = 'HartSportsPermit';
    if(sessionStorage.getItem(key) === 'true') { return true; }
    return false; 
  }, 
  setEmergencyPermit(v){
    var key = 'EmergencyPermit';
    sessionStorage.setItem(key, v);
  },
  getEmergencyPermit(){
    var key = 'EmergencyPermit';
    if(sessionStorage.getItem(key) === 'true') { return true; }
    return false; 
  },
  setApplySunscreen(v){
    var key = 'ApplySunscreen';
    sessionStorage.setItem(key, v);
  },
  getApplySunscreen(){
    var key = 'ApplySunscreen';
    if(sessionStorage.getItem(key) === 'true') { return true; }
    return false; 
  },
  setSpareSunCream(v){
    var key = 'SpareSunCream';
    sessionStorage.setItem(key, v);
  },
  getSpareSunCream(){
    var key = 'SpareSunCream';
    if(sessionStorage.getItem(key) === 'true') { return true; }
    return false; 
  },
  setAllergySunscreen(v){
    var key = 'AllergySunscreen';
    sessionStorage.setItem(key, v);
  },
  getAllergySunscreen(){
    var key = 'AllergySunscreen';
    if(sessionStorage.getItem(key) === 'true') { return true; }
    return false; 
  },
  setPhotoRelease(v){
    var key = 'PhotoRelease';
    sessionStorage.setItem(key, v);
  },
  getPhotoRelease(){
    var key = 'PhotoRelease';
    if(sessionStorage.getItem(key) === 'true') { return true; }
    return false; 
  },
  setSideHighlight(v){
    var key = 'SideHighlight';
    sessionStorage.setItem(key, v);
  },
  getSideHighlight(){
    var key = 'SideHighlight';
    return sessionStorage.getItem(key); 
  },
  testTimeConflictInWeek(grade, week, weekIdx) {
    var morActIdx = YFStore.getMorActIdx(weekIdx);
    var aftActIdx = YFStore.getAftActIdx(weekIdx);
    var wrElecIdx = YFStore.getWrElecIdx(weekIdx);
    var mathElecIdx = YFStore.getMathElecIdx(weekIdx);
    var mathOlypIdx = YFStore.getMathOlypIdx(weekIdx);
    var GATEIdx = YFStore.getGATEIdx(weekIdx);
    var advWrIdx = YFStore.getAdvWrIdx(weekIdx);
    var advMathIdx = YFStore.getAdvMathIdx(weekIdx);
    var timeline = [
      { name: 'tail', time: [600, 700] }
    ];
    var attendingDays = summerCampWeeks[weekIdx].attendingDays;
    var idxArr = [morActIdx, aftActIdx, wrElecIdx, mathElecIdx, mathOlypIdx, GATEIdx, advWrIdx, advMathIdx];
    var timesArr = [
      morActIdx > -1 ? enrichActData['morning_time'].conflict_test : {},
      aftActIdx > -1 ? enrichActData['afternoon_time'].conflict_test : {},
      wrElecIdx > -1 ? wrData[grade][wrElecIdx].conflict_test : {},
      mathElecIdx > -1 ? mathData[grade][mathElecIdx].conflict_test : {},
      mathOlypIdx > -1 ? mathOlpData[grade][mathOlypIdx].conflict_test : {},
      GATEIdx > -1 ? GATEData[grade][GATEIdx].conflict_test : {},
      advWrIdx > -1 ? adWrData[grade][advWrIdx].conflict_test : {},
      advMathIdx > -1 ? adMathData[grade][advMathIdx].conflict_test : {}
    ];

    for(var j = 0; j < idxArr.length; j++){
      if(isNaN(idxArr[j])) { continue; }
      if(idxArr[j] > -1){
        for(var q = 0; q < timesArr[j].length; q++){
          var timeObj = timesArr[j][q];
          if(attendingDays.indexOf(timeObj.weekday) > -1){
            var res = insertIntoLine(timeline, timeObj);
            if(res.conflict){
              return res;
            } else {
              continue;
            }
          }
        }
      }
    }
    return { conflict: false };
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
  var body, data, id, week, weekIdx, weekObj;
  var grade = YFStore.getIncomingGrade();

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
    case YFConstants.YF_SAVE_SUMMER_WEEK:
      enrollmentId = sessionStorage.getItem('enrollmentId');
      week = action.week; weekIdx = action.weekIdx; 
      weekObj = getWeekEnrollIdxes(grade, week, weekIdx);
      saveSummerWeek(enrollmentId, grade, week, weekIdx, weekObj);
      break;
    case YFConstants.YF_SAVE_SUMMER_OTHER_SERVICES:
      enrollmentId = sessionStorage.getItem('enrollmentId');
      saveSummerOtherServices(enrollmentId);
      break;
    case YFConstants.YF_SAVE_SUMMER_AGREEMENTS:
      enrollmentId = sessionStorage.getItem('enrollmentId');
      saveSummerAgreements(enrollmentId);
      break;

    default:
      return;
  }
});

module.exports = YFStore;