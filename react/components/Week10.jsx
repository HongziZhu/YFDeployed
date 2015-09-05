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


var curWeek = 'week_10';
var coveredDate = '8/15-8/19';
var curWeekTitle = 'Week 10';
var curWeekIdx = 9;
var ENTER_KEY_CODE = 13;

var EnrichmentActs = require('./EnrichmentActs.jsx');

var Week10 = React.createClass({
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
      incomingGrade: YFStore.getIncomingGrade(),
      summerCampWeeks: YFStore.getSummerCampWeeks()
    });
  },
  handleConfirm: function(e) {
    e.preventDefault();
    this.setState({ done: true });
    React.findDOMNode(this.refs.confirmButton).blur();
  },
  handleContinue: function(e) {
    YFActions.saveSummerWeek(curWeek, curWeekIdx);
    this.transitionTo('summer/other_services');  
  },

  render: function () {
    var self = this;
    var show = false;
    if(self.state.summerCampWeeks.length === 10){
      show = self.state.summerCampWeeks[curWeekIdx].schedulePattern === 'absence';
    }
    return (
      <div className='col-md-9 col-md-offset-3'>
      <h2>{curWeekTitle} &nbsp; ({coveredDate})</h2>
      { show ? 
        <h3>You plan not to attend in this week, please Confirm and Continue.</h3> :
        <div>
          <EnrichmentActs 
            curWeek={curWeek} 
            curWeekIdx={curWeekIdx}
            incomingGrade={self.state.incomingGrade} 
            summerCampWeeks={self.state.summerCampWeeks}/>   
        </div>
      }
      <div className="row">
        <div className='col-md-offset-1'>
          <button onClick={this.handleConfirm} ref='confirmButton' className="btn btn-primary">Confirm
          </button><br></br>
        </div>
      </div>

        {this.state.done? <button type="button" className="col-md-offset-10 btn btn-success" onClick={this.handleContinue}>Continue</button> : <button type="button" className="col-md-offset-10 btn btn-success" disabled>Continue</button>}
      </div>
    );
  } 
});

module.exports = Week10;