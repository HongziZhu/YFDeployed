'use strict';

var AppDispatcher = require('../dispatcher/AppDispatcher');
var YFConstants = require('../constants/YFConstants');

var YFActions = {

  validateEmail: function(email, next) {
    AppDispatcher.dispatch({
      actionType: YFConstants.YF_VALIDATE_EMAIL,
      email: email,
      next: next
    });
  },

  createUser: function(body, next) {
    AppDispatcher.dispatch({
      actionType: YFConstants.YF_CREATE_USER,
      body: body,
      next: next
    });
  },

  login: function(data, next) {
    AppDispatcher.dispatch({
      actionType: YFConstants.YF_LOGIN,
      data: data,
      next: next
    });
  },

  logout: function() {
    AppDispatcher.dispatch({
      actionType: YFConstants.YF_LOGOUT
    });
  },

  findStudentsById: function() {
    AppDispatcher.dispatch({
      actionType: YFConstants.YF_LOAD_STUDENTS,
    });
  },

  loadPrevEnrollment: function(userId, stuFirstName, next) {
    AppDispatcher.dispatch({
      actionType: YFConstants.YF_LOAD_PREVIOUS_ENROLLMENT,
      userId: userId,
      stuFirstName: stuFirstName,
      next: next
    });
  },

  saveSummerSchedule: function(student, next) {
    AppDispatcher.dispatch({
      actionType: YFConstants.YF_SAVE_SUMMER_SCHEDULE,
      student: student,
      next: next
    });
  },

  deleteSummerEnrollment: function(enrollmentId, next) {
    AppDispatcher.dispatch({
      actionType: YFConstants.YF_DELETE_SUMMER_ENROLLMENT,
      enrollmentId: enrollmentId,
      next: next
    });
  },

  saveAfternoonAcademics: function(language, next) {
    AppDispatcher.dispatch({
      actionType: YFConstants.YF_SAVE_SUMMER_AFTERNOON_ACADEMICS,
      language: language,
      next: next
    });
  },

  saveSummerWeek: function(week, weekIdx) {
    AppDispatcher.dispatch({
      actionType: YFConstants.YF_SAVE_SUMMER_WEEK,
      week: week,
      weekIdx: weekIdx
    });
  },

  saveSummerOtherServices: function() {
    AppDispatcher.dispatch({
      actionType: YFConstants.YF_SAVE_SUMMER_OTHER_SERVICES
    });
  },

  saveSummerAgreements: function() {
    AppDispatcher.dispatch({
      actionType: YFConstants.YF_SAVE_SUMMER_AGREEMENT
    });
  },

  loadEnrollment: function() {
    AppDispatcher.dispatch({
      actionType: YFConstants.YF_LOAD_ENROLLMENT,
    });
  },

  sendConfirmEmail: function(next) {
    AppDispatcher.dispatch({
      actionType: YFConstants.YF_SEND_CONFIRM_EMAIL,
      next: next
    });
  }
};

module.exports = YFActions;
