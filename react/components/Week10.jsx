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
var SideMenu = require('./helpers/SideMenu.jsx');

var Week10 = React.createClass({
  mixins: [ Navigation ],
  getInitialState: function() {
    YFActions.loadEnrollment();
    YFStore.setSideHighlight('summerCampWeeks');
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
      <div className='page-container'>
        <SideMenu 
          curWeekIdx={curWeekIdx}
          incomingGrade={this.state.incomingGrade} 
          summerCampWeeks={this.state.summerCampWeeks}/>
          
        <div className='main-content col-md-12'>
        <div className="panel panel-primary panel-week">
          <div className="panel-heading">
            <div className="panel-title">
              <h2>{curWeekTitle}</h2>
              <p>{coveredDate}</p>
            </div>
          </div>
        </div>
        { show ? 
          <h3>You plan not to attend in this week, please Continue.</h3> :
          <div>
            <div>
              <EnrichmentActs 
                curWeek={curWeek} 
                curWeekIdx={curWeekIdx}
                incomingGrade={self.state.incomingGrade} 
                summerCampWeeks={self.state.summerCampWeeks}/>          
            </div>


                <button onClick={this.handleConfirm} ref='confirmButton' className="middleplaceapply btn materialbtn btn-lanse">Confirm
                </button><br></br>

          </div>
        }

        {(this.state.done || show) ? <button type="button" className="middleplace btn materialbtn btn-green btn-lg" onClick={this.handleContinue}>Continue</button> : <button type="button" className="middleplace btn materialbtn btn-green btn-lg" disabled>Continue</button>}
        </div>
      </div>
    );
  } 
});

module.exports = Week10;