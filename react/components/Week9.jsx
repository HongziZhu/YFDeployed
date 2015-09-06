'use strict';

var React = require('react');
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;
var Navigation = Router.Navigation;
var YFActions = require('../actions/YFActions');
var YFStore = require('../stores/YFStore.jsx');

var preWeek = 'week_8';
var postWeek = 'week_9';
var preWeekIdx = 7;
var postWeekIdx = 8;
var preWeekTitle = 'Week 8';
var postWeekTitle = 'Week 9';
var unitWeek = 'week_8_9';
var coveredDate = ['8/1-8/5', '8/8-8/12'];

var MathOlympiad = require('./MathOlympiad.jsx');
var EnrichmentActs = require('./EnrichmentActs.jsx');
var GATE = require('./GATE.jsx');
var WritingElective = require('./WritingElective.jsx');
var MathElective = require('./MathElective.jsx');
var AdvancedWrUnit = require('./AdvancedWrUnit.jsx');
var AdvancedMathUnit = require('./AdvancedMathUnit.jsx');

var SideMenu = require('./helpers/SideMenu.jsx');

var Week9 = React.createClass({
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
      this.transitionTo('summer/week10');  
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
        <SideMenu />
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
              <button onClick={this.handleConfirm} ref='confirmButton' className="btn btn-primary">Confirm</button>&nbsp; <br></br>
            </div>
          </div>

          {(this.state.done) ? <button type="button" className="col-md-offset-10 btn btn-success" onClick={this.handleContinue}>Continue</button> : <button type="button" className="col-md-offset-10 btn btn-success" onClick={this.handleContinue} disabled>Continue</button>}
        </div>
      </div>
    );
  } 
});

module.exports = Week9;