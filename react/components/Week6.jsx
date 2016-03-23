'use strict';

var React = require('react');
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;
var Navigation = Router.Navigation;
var YFActions = require('../actions/YFActions');
var YFStore = require('../stores/YFStore.jsx');

var preWeek = 'week_6';
var postWeek = 'week_7';
var preWeekIdx = 5;
var postWeekIdx = 6;
var preWeekTitle = 'Week 6';
var postWeekTitle = 'Week 7';
var unitWeek = 'week_6_7';
var coveredDate = ['7/18-7/22', '7/25-7/29'];

var MathOlympiad = require('./MathOlympiad.jsx');
var EnrichmentActs = require('./EnrichmentActs.jsx');
var GATE = require('./GATE.jsx');
var WritingElective = require('./WritingElective.jsx');
var MathElective = require('./MathElective.jsx');
var AdvancedWrUnit = require('./AdvancedWrUnit.jsx');
var AdvancedMathUnit = require('./AdvancedMathUnit.jsx');
var SideMenu = require('./helpers/SideMenu.jsx');

var Week6 = React.createClass({
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
      this.transitionTo('summer/week7');  
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
          curWeekIdx={preWeekIdx}
          incomingGrade={this.state.incomingGrade} 
          summerCampWeeks={this.state.summerCampWeeks}/>
          
        <div className='main-content col-md-12 '>
        <div className="panel panel-primary panel-week">
          <div className="panel-heading">
            <div className="panel-title">
              <h2>{preWeekTitle}</h2>
              <p>{coveredDate[0]}</p>
            </div>
          </div>
        </div>    
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
              <p className="absence"></p>}
            {self.state.math === 'elective' ?
            <MathElective 
              curWeek={preWeek} 
              curWeekIdx={preWeekIdx}
              incomingGrade={self.state.incomingGrade} 
              summerCampWeeks={self.state.summerCampWeeks}/> :
            <p className="absence"></p>}
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
        <div className="panel panel-primary panel-week">
          <div className="panel-heading">
            <div className="panel-title">
              <h2>{preWeekTitle} &amp; {postWeekTitle} Unit</h2>
              
            </div>
          </div>
        </div>  
            {(!preShow || !postShow) ? 
              <h3>Sorry, you can't enroll in this Advanced Writing(or Math) Unit due to at least one-week absence.</h3> :
              <div>
              {self.state.writing === 'advanced' ? 
              <AdvancedWrUnit 
                preWeek={preWeek}
                preWeekIdx={preWeekIdx} 
                postWeek={postWeek}
                postWeekIdx={postWeekIdx}
                incomingGrade={self.state.incomingGrade} 
                summerCampWeeks={self.state.summerCampWeeks}/> : <p className="absence"></p>}
              {self.state.math === 'advanced' ? 
              <AdvancedMathUnit 
                preWeek={preWeek}
                preWeekIdx={preWeekIdx} 
                postWeek={postWeek}
                postWeekIdx={postWeekIdx} 
                incomingGrade={self.state.incomingGrade} 
                summerCampWeeks={self.state.summerCampWeeks}/> : <p className="absence"></p>}
              </div>
            }
        </div>
        : <p></p>}

        <div className="row">
          <div className='col-md-offset-1'>
            <button onClick={this.handleConfirm} ref='confirmButton' className="btn btn-primary btn-lg">Confirm</button>
          </div>
        </div>

        {(this.state.done) ? <button type="button" className="col-md-offset-10 btn btn-success btn-lg" onClick={this.handleContinue}>Continue</button> : <button type="button" className="col-md-offset-10 btn btn-success btn-lg" onClick={this.handleContinue} disabled>Continue</button>}
        </div>
      </div>
    );
  } 
});

module.exports = Week6;