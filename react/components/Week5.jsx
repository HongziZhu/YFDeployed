'use strict';

var React = require('react');
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;
var Navigation = Router.Navigation;
var YFActions = require('../actions/YFActions');
var YFStore = require('../stores/YFStore.jsx');

var preWeek = 'week_4';
var postWeek = 'week_5';
var preWeekIdx = 3;
var postWeekIdx = 4;
var preWeekTitle = 'Week 4';
var postWeekTitle = 'Week 5';
var unitWeek = 'week_4_5';
var coveredDate = ['7/4-7/8', '7/11-7/15'];

var MathOlympiad = require('./MathOlympiad.jsx');
var EnrichmentActs = require('./EnrichmentActs.jsx');
var GATE = require('./GATE.jsx');
var WritingElective = require('./WritingElective.jsx');
var MathElective = require('./MathElective.jsx');
var AdvancedWrUnit = require('./AdvancedWrUnit.jsx');
var AdvancedMathUnit = require('./AdvancedMathUnit.jsx');

var SideMenu = require('./helpers/SideMenu.jsx');

var Week5 = React.createClass({
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
      this.transitionTo('summer/week6');  
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
            <div className="panel panel-primary panel-week">
              <div className="panel-heading">
                <div className="panel-title">
                  <h2>{postWeekTitle}</h2>
                  <p>{coveredDate[1]}</p>
                </div>
            </div>
          </div> 
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
              <p className="absence"></p>}
            {self.state.math === 'elective' ?
            <MathElective 
              curWeek={postWeek} 
              curWeekIdx={postWeekIdx}
              incomingGrade={self.state.incomingGrade} 
              summerCampWeeks={self.state.summerCampWeeks}/> :
            <p className="absence"></p>}
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


              <button onClick={this.handleConfirm} ref='confirmButton' className="middleplaceapply btn materialbtn btn-lanse">Confirm</button>&nbsp; <br></br>


          {(this.state.done) ? <button type="button" className="middleplace btn materialbtn btn-green btn-lg" onClick={this.handleContinue}>Continue</button> : <button type="button" className="middleplace btn materialbtn btn-green btn-lg" onClick={this.handleContinue} disabled>Continue</button>}
        </div>
      </div>
    );
  } 
});

module.exports = Week5;