'use strict';

var React = require('react');
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;
var Navigation = Router.Navigation;
var YFActions = require('../actions/YFActions');
var YFStore = require('../stores/YFStore.jsx');
var enrichActData = require('../../lib/summer/enrichmentActivities.json');
var wrData = require('../../lib/summer/afternoonWritingElective.json');
var adWrData = require('../../lib/summer/afternoonAdvancedWriting.json');
var mathData = require('../../lib/summer/afternoonMathElective.json');
var adMathData = require('../../lib/summer/afternoonAdvancedMath.json');
var mathOlpData = require('../../lib/summer/afternoonMathOlympiad.json');
var GATEData = require('../../lib/summer/afternoonGATE.json');


var curWeek = 'week_1';
var coveredDate = '6/13-6/17';
var curWeekIdx = 0;
var ENTER_KEY_CODE = 13;

var EnrichmentActs = require('./EnrichmentActs.jsx');

var Week1 = React.createClass({
  mixins: [ Navigation ],
  getInitialState: function() {
    YFActions.loadEnrollment();
    return { 
      timeConflict: false,
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
      summerCampWeeks: YFStore.getSummerCampWeeks()
    });
  },
  handleSubmit: function(e) {
    e.preventDefault();
    this.setState({ done: true });
  },
  handleContinue: function(e) {
    var self = this;
    
    self.transitionTo('summer/week2_3');  
  },

  render: function () {
    var self = this;
    var show = false;
    if(self.state.summerCampWeeks.length === 10){
      show = self.state.summerCampWeeks[curWeekIdx].schedulePattern === 'absence';
    }
    return (
      <div className='col-md-9 col-md-offset-3'>
      <h2>Week 1&nbsp; ({coveredDate})</h2>
      { show ? 
        <h3>You plan not to attend in this week, please click Continue below.</h3> :
        <div>
          <EnrichmentActs 
            curWeek={curWeek} 
            incomingGrade={self.state.incomingGrade} 
            summerCampWeeks={self.state.summerCampWeeks}/>

          <div className="row">
            <div className='col-md-offset-1'>
              <button onClick={this.handleSubmit} ref='submitButton' className="btn btn-primary">Submit
              </button><br></br>
            </div>
          </div>
        </div>
      }

        {this.state.done? <button type="button" className="col-md-offset-10 btn btn-success" onClick={this.handleContinue}>Continue</button> : <button type="button" className="col-md-offset-10 btn btn-success" disabled>Continue</button>}
      </div>
    );
  } 
});

module.exports = Week1;