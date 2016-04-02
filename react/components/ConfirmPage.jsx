'use strict';

var React = require('react');
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;
var Navigation = Router.Navigation;
var YFActions = require('../actions/YFActions');
var YFStore = require('../stores/YFStore.jsx');

var SideMenu = require('./helpers/SideMenu.jsx');
var EnrollmentPreview = require('./helpers/EnrollmentPreview.jsx');

var ConfirmPage = React.createClass({
  mixins: [ Navigation ],
  getInitialState: function() {
    YFActions.loadEnrollment();
    YFStore.setSideHighlight('confirm');
    return { 
      done: false,

      incomingGrade: YFStore.getIncomingGrade(),
      summerCampWeeks: YFStore.getSummerCampWeeks()
    };
  },
  componentDidMount: function() {
    YFStore.addChangeListener(this._onChange);
  },
  componentWillUnmount: function() {
    YFStore.removeChangeListener(this._onChange);
  },
  _onChange: function() {
    this.setState({
      incomingGrade: YFStore.getIncomingGrade(),
      summerCampWeeks: YFStore.getSummerCampWeeks()
    });
  },
  handleConfirm: function(e) {
    e.preventDefault();
    this.setState({ done: true });
  },
  handleContinue: function(e) {
    var self = this;
    this.transitionTo('summer/complete');
  },

  render: function () {
    var self = this;
    var test = 'testItem';
    return (
      <div className="page-container">
        <SideMenu />
        <div className='main-content col-md-12'>
          <div className="panel panel-primary">
            <div className="panel-heading">
              <div className="panel-title">
                <h3>Preview of Summer Camp Enrollment</h3>
              </div>
            </div>

            <div className="panel-body">
              <div className="row">
                <pre>
                  <EnrollmentPreview 
                    summerCampWeeks={self.state.summerCampWeeks}/>
                  
                </pre>
              </div>
            </div>
          </div>


              <button onClick={this.handleConfirm} ref='confirmButton' className="middleplaceapply btn materialbtn btn-lanse">Confirm</button>&nbsp; <br></br>


          {this.state.done ? <button type="button" className="middleplace btn materialbtn btn-green btn-lg" onClick={this.handleContinue}>Continue</button> : <p></p>}
          <hr></hr>
        </div>
      </div>
    );
  } 
});

module.exports = ConfirmPage;