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

  findStudentsById: function(id, next) {
    AppDispatcher.dispatch({
      actionType: YFConstants.YF_LOAD_STUDENTS,
      userId: id,
      next: next
    });
  }
};

module.exports = YFActions;
