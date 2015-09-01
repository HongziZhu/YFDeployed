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


var preWeek = 'week_2';
var postWeek = 'week_3';
var unitWeek = 'week_2_3';
var coveredDate = ['6/20-6/24', '6/27-7/1'];
var preWeekIdx = 1, postWeekIdx = 2;

var MathOlympiad = require('./MathOlympiad.jsx');
var EnrichmentActs = require('./EnrichmentActs.jsx');
var GATE = require('./GATE.jsx');
var WritingElective = require('./WritingElective.jsx');
var MathElective = require('./MathElective.jsx');
var AdvancedWrUnit = require('./AdvancedWrUnit.jsx');
var AdvancedMathUnit = require('./AdvancedMathUnit.jsx');

var Week2_3 = React.createClass({
  mixins: [ Navigation ],
  getInitialState: function() {
    YFActions.loadEnrollment();
    return { 
      timeConflict: false,
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
  handleSubmit: function(e) {
    e.preventDefault();
    this.setState({ done: true });
  },
  handleContinue: function(e) {
    var self = this;
    // YFActions.saveWeek2_3(self.state.language, function() {
    //   self.transitionTo('summer/writing_class');
    // });
    self.transitionTo('summer/week2_3');  
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
      <h2>Week 2&nbsp; ({coveredDate[0]})</h2>
      { !preShow ? 
        <h3>You plan not to attend in this week, please check out next week below.</h3> :
        <div>
        <EnrichmentActs curWeek={preWeek} incomingGrade={self.state.incomingGrade} summerCampWeeks={self.state.summerCampWeeks}/>
        {self.state.writing === 'elective' ?
        <WritingElective curWeek={preWeek} incomingGrade={self.state.incomingGrade} summerCampWeeks={self.state.summerCampWeeks}/> :
          <p></p>}
        {self.state.math === 'elective' ?
        <MathElective curWeek={preWeek} incomingGrade={self.state.incomingGrade} summerCampWeeks={self.state.summerCampWeeks}/> :
        <p></p>}
        <MathOlympiad curWeek={preWeek} incomingGrade={self.state.incomingGrade} summerCampWeeks={self.state.summerCampWeeks}/>
        <GATE curWeek={preWeek} incomingGrade={self.state.incomingGrade} summerCampWeeks={self.state.summerCampWeeks}/>

        </div>
      }
      <hr></hr>
      <h2>Week 3&nbsp; ({coveredDate[1]})</h2>
      { !postShow ? 
        <h3>You plan not to attend in this week, please click Submit below.</h3> :
        <div>
        <EnrichmentActs curWeek={postWeek} incomingGrade={self.state.incomingGrade} summerCampWeeks={self.state.summerCampWeeks}/>
        {self.state.writing === 'elective' ?
        <WritingElective curWeek={postWeek} incomingGrade={self.state.incomingGrade} summerCampWeeks={self.state.summerCampWeeks}/> :
          <p></p>}
        {self.state.math === 'elective' ?
        <MathElective curWeek={postWeek} incomingGrade={self.state.incomingGrade} summerCampWeeks={self.state.summerCampWeeks}/> :
        <p></p>}
        <MathOlympiad curWeek={postWeek} incomingGrade={self.state.incomingGrade} summerCampWeeks={self.state.summerCampWeeks}/>
        <GATE curWeek={postWeek} incomingGrade={self.state.incomingGrade} summerCampWeeks={self.state.summerCampWeeks}/>
        
        </div>
      }
      <hr></hr>
      {(self.state.writing === 'advanced' || self.state.math === 'advanced') ? 
      <div>
        <h2>Week 2 &amp; Week 3 Unit</h2>
          {(!preShow || !postShow) ? 
            <h3 className='bg-info'>Sorry, you can't enroll in this Advanced Writing(or Math) Unit due to at least one-week absence.</h3> :
            <div>
            {self.state.writing === 'advanced' ? 
            <AdvancedWrUnit curWeek={unitWeek} incomingGrade={self.state.incomingGrade} summerCampWeeks={self.state.summerCampWeeks}/> : <p></p>}
            {self.state.math === 'advanced' ? 
            <AdvancedMathUnit curWeek={unitWeek} incomingGrade={self.state.incomingGrade} summerCampWeeks={self.state.summerCampWeeks}/> : <p></p>}
            </div>
          }
      </div>
      : <p></p>}

      <div className="row">
        <div className='col-md-offset-1'>
          <button onClick={this.handleSubmit} ref='submitButton' className="btn btn-primary">Submit</button>&nbsp; <br></br>
        </div>
      </div>

      {(this.state.done) ? <button type="button" className="col-md-offset-10 btn btn-success" onClick={this.handleContinue}>Continue</button> : <p></p>}
      </div>
    );
  } 
});

module.exports = Week2_3;