'use strict';

var React = require('react');
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;
var Navigation = Router.Navigation;
var YFActions = require('../actions/YFActions');
var YFStore = require('../stores/YFStore.jsx');

var SideMenu = require('./helpers/SideMenu.jsx');

var CompletePage = React.createClass({
  mixins: [ Navigation ],
  getInitialState: function() {
    YFActions.loadEnrollment();
    YFStore.setSideHighlight('confirm');
    return { 
      studentName: YFStore.getStudentFullName()
    };
  },

  render: function () {
    var self = this;
    return (
      <div className="page-container">
        <SideMenu />
        <div className='main-content col-md-12'>
          <div className="panel panel-primary">
            <div className="panel-heading">
              <div className="panel-title">
                <h3>Enrollment Finished!</h3>
              </div>
            </div>

            <div className="panel-body">
              
                
                  You have successfully finshed the summer camp enrollment for {this.state.studentName}.<br></br>
                  Now, you can LOG OUT or <a href='/user/getStarted'>START OVER</a> for your another child.
                
              
            </div>
          </div>

        </div>
      </div>
    );
  } 
});

module.exports = CompletePage;