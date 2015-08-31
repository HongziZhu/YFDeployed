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
    // YFActions.saveWeek1(self.state.language, function() {
    //   self.transitionTo('summer/writing_class');
    // });
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
        <EnrichmentActs incomingGrade={self.state.incomingGrade} summerCampWeeks={self.state.summerCampWeeks}/>
        <div className="row">
          <div className='col-md-offset-1'>
            <button onClick={this.handleSubmit} ref='submitButton' className="btn btn-primary">Submit</button>&nbsp; <br></br>
          </div>
        </div>
        </div>
      }

        {(this.state.done || show) ? <button type="button" className="col-md-offset-10 btn btn-success" onClick={this.handleContinue}>Continue</button> : <p></p>}
      </div>
    );
  } 
});

var EnrichmentActs = React.createClass({
  render: function() {
    var self = this;
    var morningActs = [], afternoonActs = [];
    var grade = this.props.incomingGrade;
    var acts, hide, obj, ref;
    if(self.props.summerCampWeeks.length === 10){
      acts = enrichActData[curWeek].morning;
      obj = acts[0];
      //morning 
      morningActs.push(
        <tr key={j}>
          <td className='cell'>
            <input type="radio" name="morning_acts" ref={ref} onChange={this.changeMorningAct} value="" />
          </td>
          <td className='cell'>
            <span className='text-primary'>{obj['activity_name']}</span>&nbsp;(Weekly Theme:&nbsp;{obj['theme']})</td>
          <td className='cell'>{obj['class_size'] === 'unlimited' ? <p>unlimited</p> : 
            <p>{obj['class_size'][0]}-{obj['class_size'][1]}</p>}
          </td>
          <td className='cell'>Free for 6 hours/week</td>
        </tr>
      )
      for(var j = 1; j < acts.length; j++) {
        obj = acts[j];
        hide = obj.grade.indexOf(grade) === -1;

        if(!hide){
          ref = "morning_" + j;
          morningActs.push(
            <tr key={j}>
              <td className='cell'>
                <input type="radio" name="morning_acts" ref={ref} onChange={this.changeMorningAct} value="" />
              </td>
              <td className='cell'>{obj['activity_name']}</td>
              <td className='cell'>{obj['class_size'] === 'unlimited' ? <p>unlimited</p> : 
                <p>{obj['class_size'][0]}-{obj['class_size'][1]}</p>}
              </td>
              <td className='cell'>${obj['price']} for 6 hours/week</td>
            </tr>
          );
        }
      }
      //afternoon
      acts = enrichActData[curWeek].afternoon;
      for(var j = 0; j < acts.length; j++) {
        obj = acts[j];
        hide = obj.grade.indexOf(grade) === -1;

        if(!hide){
          ref = "afternoon_" + j;
          afternoonActs.push(
            <tr key={j}>
              <td className='cell'>
                <input type="radio" name="afternoon_acts" ref={ref} onChange={this.changeAfternoonAct} value="" />
              </td>
              <td className='cell'>{obj['activity_name']}</td>
              <td className='cell'>{obj['class_size'] === 'unlimited' ? <p>unlimited</p> : 
                <p>{obj['class_size'][0]}-{obj['class_size'][1]}</p>}
              </td>
              <td className='cell'>${obj['price']} for 4.5 hours/week</td>
            </tr>
          );
        }
      }
      afternoonActs.push(
        <tr key='-1'>
          <td className='cell'>
            <input type="radio" name="afternoon_acts" ref={ref} onChange={this.changeAfternoonAct} value="" />
          </td>
          <td className='cell'>I don't need it, thanks.</td>
          <td className='cell'>---</td>
          <td className='cell'>---</td>
        </tr>
      );
    }
    return (
      <div className="panel panel-default">
        <div className="panel-heading">
          <div className="panel-title">
            <h3>Enrichment Activities</h3>
          </div>
        </div>

        <div className="panel-body">
          <div className="row">
            <div className='col-md-offset-1'> 
              <h3>Morning Activities--{enrichActData['morning_time'].display_time}</h3>
              <span className="bg-info">1.{enrichActData['note']}</span><br></br>
              <span className="bg-info">2. Every avtivity has the same time: {enrichActData['morning_time'].display_time}</span>
            </div>

            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>Select</th>
                  <th>Activity</th>
                  <th>Class Size</th>
                  <th>Price Per Week</th>
                </tr>
              </thead><br></br>
              <tbody>
                {morningActs}
              </tbody>
            </table>
            <hr></hr>

            <div className='col-md-offset-1'> 
              <h3>Afternoon Activities--{enrichActData['afternoon_time'].display_time}</h3>
              <span className="bg-info">2. Every avtivity has the same time: {enrichActData['afternoon_time'].display_time}</span>
            </div>

            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>Select</th>
                  <th>Activity</th>
                  <th>Class Size</th>
                  <th>Price Per Week</th>
                </tr>
              </thead><br></br>
              <tbody>
                {afternoonActs}
              </tbody>
            </table>
            <hr></hr>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = Week1;