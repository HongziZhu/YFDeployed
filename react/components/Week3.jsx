'use strict';

var React = require('react');
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;
var Navigation = Router.Navigation;
var YFActions = require('../actions/YFActions');
var YFStore = require('../stores/YFStore.jsx');

var preWeek = 'week_2';
var postWeek = 'week_3';
var preWeekIdx = 1;
var postWeekIdx = 2;
var preWeekTitle = 'Week 2';
var postWeekTitle = 'Week 3';
var unitWeek = 'week_2_3';
var coveredDate = ['6/20-6/24', '6/27-7/1'];

var MathOlympiad = require('./MathOlympiad.jsx');
var EnrichmentActs = require('./EnrichmentActs.jsx');
var GATE = require('./GATE.jsx');
var WritingElective = require('./WritingElective.jsx');
var MathElective = require('./MathElective.jsx');
var AdvancedWrUnit = require('./AdvancedWrUnit.jsx');
var AdvancedMathUnit = require('./AdvancedMathUnit.jsx');

var SideMenu = require('./helpers/SideMenu.jsx');

var Week3 = React.createClass({
  mixins: [ Navigation ],
  getInitialState: function() {
    YFActions.loadEnrollment();
    YFStore.setSideHighlight('summerCampWeeks');
    return { 
      done: false,
      writing: YFStore.getWritingChoice(),
      math: YFStore.getMathChoice(),
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
  handleConfirm: function(e) {
    e.preventDefault();
    var self = this;
    var res = YFStore.testTimeConflictInWeek(this.state.incomingGrade, postWeek, postWeekIdx);
    if(res.conflict){
      alert('Time Conflict! Please check ' + res.names[0] + ' and ' + res.names[1] + '.');
    } else {
      this.setState({ done: true }, function() {
        React.findDOMNode(self.refs.confirmButton).blur();
      });
    }
  },
  handleContinue: function(e) {
    var res = YFStore.testTimeConflictInWeek(this.state.incomingGrade, postWeek, postWeekIdx);
    if(res.conflict){
      alert('Time Conflict! Please check ' + res.names[0] + ' and ' + res.names[1] + '.');
    } else {
      YFActions.saveSummerWeek(postWeek, postWeekIdx);
      this.transitionTo('summer/week4');  
    }
  },

  render: function () {
    var self = this;
    var gd = self.state.incomingGrade;
    var preShow = false, postShow = false;
    if(self.state.summerCampWeeks.length === 10){
      preShow = self.state.summerCampWeeks[preWeekIdx].schedulePattern !== 'absence';
      postShow = self.state.summerCampWeeks[postWeekIdx].schedulePattern !== 'absence';
    }
    return (
      <div className='page-container'>
        <SideMenu 
          curWeekIdx={postWeekIdx}
          incomingGrade={this.state.incomingGrade} 
          summerCampWeeks={this.state.summerCampWeeks}/>
          
        <div className='main-content col-md-12'>
          <h2 className="bg-success">{postWeekTitle} &nbsp; ({coveredDate[1]})</h2><hr></hr>
          { !postShow ? 
            <h3>You plan not to attend in this week, please Confirm and Continue.</h3> :
            <div>
            <EnrichmentActs 
              curWeek={postWeek} 
              curWeekIdx={postWeekIdx}
              incomingGrade={self.state.incomingGrade} 
              summerCampWeeks={self.state.summerCampWeeks}/>
            {self.state.writing === 'elective' ?
            <WritingElective 
              curWeek={postWeek} 
              curWeekIdx={postWeekIdx}
              incomingGrade={self.state.incomingGrade} 
              summerCampWeeks={self.state.summerCampWeeks}/> :
              <p></p>}
            {self.state.math === 'elective' ?
            <MathElective 
              curWeek={postWeek} 
              curWeekIdx={postWeekIdx}
              incomingGrade={self.state.incomingGrade} 
              summerCampWeeks={self.state.summerCampWeeks}/> :
            <p></p>}
            <MathOlympiad 
              curWeek={postWeek} 
              curWeekIdx={postWeekIdx}
              incomingGrade={self.state.incomingGrade} 
              summerCampWeeks={self.state.summerCampWeeks}/>
            <GATE 
              curWeek={postWeek} 
              curWeekIdx={postWeekIdx}
              incomingGrade={self.state.incomingGrade} 
              summerCampWeeks={self.state.summerCampWeeks}/>
            </div>
          }
          <hr></hr>
          <div className="row">
            <div className='col-md-offset-1'>
              <button onClick={this.handleConfirm} ref='confirmButton' className="btn btn-primary btn-lg">Confirm</button>&nbsp; <br></br>
            </div>
          </div>

          {(this.state.done) ? <button type="button" className="col-md-offset-10 btn btn-success btn-lg" onClick={this.handleContinue}>Continue</button> : <button type="button" className="col-md-offset-10 btn btn-success btn-lg" onClick={this.handleContinue} disabled>Continue</button>}
        </div>
      </div>
    );
  } 
});

module.exports = Week3;