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

var Week2 = React.createClass({
  mixins: [ Navigation ],
  getInitialState: function() {
    YFActions.loadEnrollment();
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
    var res = YFStore.testTimeConflictInWeek(this.state.incomingGrade, preWeek, preWeekIdx);
    if(res.conflict){
      alert('Time Conflict! Please check ' + res.names[0] + ' and ' + res.names[1] + '.');
    } else {
      this.setState({ done: true }, function() {
        React.findDOMNode(self.refs.confirmButton).blur();
      });
    }
  },
  handleContinue: function(e) {
    var res = YFStore.testTimeConflictInWeek(this.state.incomingGrade, preWeek, preWeekIdx);
    if(res.conflict){
      alert('Time Conflict! Please check ' + res.names[0] + ' and ' + res.names[1] + '.');
    } else {
      YFActions.saveSummerWeek(preWeek, preWeekIdx);
      this.transitionTo('summer/week3');  
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
      <div className='col-md-9 col-md-offset-3'>
      <h2>{preWeekTitle}&nbsp; ({coveredDate[0]})</h2>
      { !preShow ? 
        <h3>You plan not to attend in this week, please Confirm and Continue.</h3> :
        <div>
          <EnrichmentActs 
            curWeek={preWeek} 
            curWeekIdx={preWeekIdx}
            incomingGrade={self.state.incomingGrade} 
            summerCampWeeks={self.state.summerCampWeeks}/>
          {self.state.writing === 'elective' ?
          <WritingElective 
            curWeek={preWeek} 
            curWeekIdx={preWeekIdx}
            incomingGrade={self.state.incomingGrade} 
            summerCampWeeks={self.state.summerCampWeeks}/> :
            <p></p>}
          {self.state.math === 'elective' ?
          <MathElective 
            curWeek={preWeek} 
            curWeekIdx={preWeekIdx}
            incomingGrade={self.state.incomingGrade} 
            summerCampWeeks={self.state.summerCampWeeks}/> :
          <p></p>}
          <MathOlympiad 
            curWeek={preWeek} 
            curWeekIdx={preWeekIdx}
            incomingGrade={self.state.incomingGrade} 
            summerCampWeeks={self.state.summerCampWeeks}/>
          <GATE 
            curWeek={preWeek} 
            curWeekIdx={preWeekIdx}
            incomingGrade={self.state.incomingGrade} 
            summerCampWeeks={self.state.summerCampWeeks}/>
        </div>
      }
      <hr></hr>

      {(self.state.writing === 'advanced' || self.state.math === 'advanced') ? 
      <div>
        <h2>{preWeekTitle} &amp; {postWeekTitle} Unit</h2>
          {(!preShow || !postShow) ? 
            <h3 className='bg-info'>Sorry, you can't enroll in this Advanced Writing(or Math) Unit due to at least one-week absence.</h3> :
            <div>
            {self.state.writing === 'advanced' ? 
            <AdvancedWrUnit 
              preWeek={preWeek}
              preWeekIdx={preWeekIdx} 
              postWeek={postWeek}
              postWeekIdx={postWeekIdx}
              incomingGrade={self.state.incomingGrade} 
              summerCampWeeks={self.state.summerCampWeeks}/> : <p></p>}
            {self.state.math === 'advanced' ? 
            <AdvancedMathUnit 
              preWeek={preWeek}
              preWeekIdx={preWeekIdx} 
              postWeek={postWeek}
              postWeekIdx={postWeekIdx} 
              incomingGrade={self.state.incomingGrade} 
              summerCampWeeks={self.state.summerCampWeeks}/> : <p></p>}
            </div>
          }
      </div>
      : <p></p>}

      <div className="row">
        <div className='col-md-offset-1'>
          <button onClick={this.handleConfirm} ref='confirmButton' className="btn btn-primary">Confirm</button>
        </div>
      </div>

      {(this.state.done) ? <button type="button" className="col-md-offset-10 btn btn-success" onClick={this.handleContinue}>Continue</button> : <button type="button" className="col-md-offset-10 btn btn-success" onClick={this.handleContinue} disabled>Continue</button>}
      </div>
    );
  } 
});

module.exports = Week2;