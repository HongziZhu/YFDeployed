'use strict';

var AppDispatcher = require('../dispatcher/AppDispatcher');
var YFConstants = require('../constants/YFConstants');

var YFActions = {

  /**
   * @param  {string} text
   */
  createUser: function(body) {
    AppDispatcher.dispatch({
      actionType: YFConstants.YF_CREATE_USER,
      body: body
    });
  },

  login: function(data, next) {
    AppDispatcher.dispatch({
      actionType: YFConstants.YF_LOGIN,
      data: data,
      next: next
    });
  },

  findStudentsById: function() {
    AppDispatcher.dispatch({
      actionType: YFConstants.YF_LOAD_STUDENTS,
    });
  },

  saveSummerSchedule: function(student, next) {
    AppDispatcher.dispatch({
      actionType: YFConstants.YF_SAVE_SUMMER_SCHEDULE,
      student: student,
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

  saveSummerEnrichActs: function() {
    
  }

  loadEnrollment: function() {
    AppDispatcher.dispatch({
      actionType: YFConstants.YF_LOAD_ENROLLMENT,
    });
  }
};

module.exports = YFActions;
