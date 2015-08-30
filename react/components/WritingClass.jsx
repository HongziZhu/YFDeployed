'use strict';

var React = require('react');
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;
var Navigation = Router.Navigation;
var YFActions = require('../actions/YFActions');
var YFStore = require('../stores/YFStore.jsx');
var wrData = require('../../lib/summer/afternoonWritingElective.json');
var adWrData = require('../../lib/summer/afternoonAdvancedWriting.json');

var WritingClass = React.createClass({
  mixins: [ Navigation ],
  getInitialState: function() {
    YFActions.loadEnrollment();
    return { 
      incomingGrade: YFStore.getIncomingGrade(),
      done: false,
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
    // YFActions.saveOtherServices(self.state.language, function() {
    //   self.transitionTo('summer/writing_class');
    // });
  },

  render: function () {
    var self = this;
    return (
      <div className='col-md-9 col-md-offset-3'>
      <h2>Writing Classes</h2>
        {wrData.grades.indexOf(self.state.incomingGrade) > -1 ? <WritingElective summerCampWeeks={this.state.summerCampWeeks} incomingGrade={this.state.incomingGrade}/> : 
        <div className="panel panel-default">
          <div className="panel-heading">
            <div className="panel-title">
              <h3>Afternoon Writing Elective Classes</h3>
            </div>
          </div>

          <div className="panel-body">
            <div className="row">
              <div className='col-md-offset-1'> 
                <span className="bg-info">{wrData.notAvailable}</span>
              </div><br></br>
            </div>
          </div>
        </div>}

        {adWrData.grades.indexOf(self.state.incomingGrade) > -1 ? <AdvancedWriting summerCampWeeks={this.state.summerCampWeeks} incomingGrade={this.state.incomingGrade}/> : 
        <div className="panel panel-default">
          <div className="panel-heading">
            <div className="panel-title">
              <h3>Afternoon Advanced Writing Boot Camp</h3>
            </div>
          </div>

          <div className="panel-body">
            <div className="row">
              <div className='col-md-offset-1'> 
                <span className="bg-info">{adWrData.notAvailable}</span>
              </div><br></br>
            </div>
          </div>
        </div>}




        <div className="row">
          <div className='col-md-offset-1'>
            <button onClick={this.handleSubmit} ref='submitButton' className="btn btn-primary">Submit</button>&nbsp; <br></br>
          </div>
        </div>

        {this.state.done ? <button type="button" className="col-md-offset-10 btn btn-success" onClick={this.handleContinue}>Continue</button> : <p></p>}
      </div>
    );
  } 
});

var WritingElective = React.createClass({
  changeWritingElective: function(e) {

  },
  render: function() {
    var self = this;
    var grade = this.props.incomingGrade;
    var writingClass = [];
    var len = YFStore.getSummerWeeksNum();
    var absent, week, obj, name, ref;
    if(self.props.summerCampWeeks.length === 10){
      for(var j = 2; j < len; j++) {
        week = self.props.summerCampWeeks[j-1];
        absent = (week.schedulePattern === "absence" || week.schedulePattern === '5_morning');

        if(!absent){
          var choices = [];
          for(var x = 0; x < wrData[grade].length; x++){
            obj = wrData[grade][x];
            if(week.attendingDays.indexOf(obj.weekday) > -1){
              name = 'week' + j;
              ref = name + '_' + obj['database_name'];
              choices.push(
                <div key={ref}>
                  <label>
                    <input type="radio" name={name} ref={ref} onChange={self.changeWritingElective} value="" />&nbsp;
                    {obj['database_name']},&nbsp;{obj['weekday']}&nbsp;({obj['display_time']})
                  </label>
                </div>
              );
            }
          }
          if(choices.length === 0){
            choices.push(<span>No avaialble Classes</span>);
          }

          writingClass.push(
            <tr key={j}>
              <td>week_{j}&nbsp;({week.coveredDate})</td>
              <td className='cell'>{choices}</td>
              <td className='cell'>{wrData['class_size']}</td>
              <td className='cell'>{wrData['price_per_class']}</td>
            </tr>
          );
        }
      }
    }
    return (
      <div className="panel panel-default">
        <div className="panel-heading">
          <div className="panel-title">
            <h3>Afternoon Writing Elective Classes</h3>
          </div>
        </div>

        <div className="panel-body">
          <div className="row">
            <div className='col-md-offset-1'> 
              <span className="bg-info">{wrData.note}</span>
            </div><br></br>

            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>Week #</th>
                  <th>Class Choices</th>
                  <th>Class Size</th>
                  <th>Price Per Class</th>
                </tr>
              </thead>
              <tbody>
                {writingClass}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
});


var WritingElective = React.createClass({
  changeWritingElective: function(e) {

  },
  render: function() {
    var self = this;
    var grade = this.props.incomingGrade;
    var writingClass = [];
    var len = YFStore.getSummerWeeksNum();
    var absent, week, obj, name, ref;
    if(self.props.summerCampWeeks.length === 10){
      for(var j = 2; j < len; j++) {
        week = self.props.summerCampWeeks[j-1];
        absent = (week.schedulePattern === "absence" || week.schedulePattern === '5_morning');

        if(!absent){
          var choices = [];
          for(var x = 0; x < wrData[grade].length; x++){
            obj = wrData[grade][x];
            if(week.attendingDays.indexOf(obj.weekday) > -1){
              name = 'week' + j;
              ref = name + '_' + obj['database_name'];
              choices.push(
                <div key={ref}>
                  <label>
                    <input type="radio" name={name} ref={ref} onChange={self.changeWritingElective} value="" />&nbsp;
                    {obj['database_name']},&nbsp;{obj['weekday']}&nbsp;({obj['display_time']})
                  </label>
                </div>
              );
            }
          }
          if(choices.length === 0){
            choices.push(<span>No avaialble Classes</span>);
          }

          writingClass.push(
            <tr key={j}>
              <td>week_{j}&nbsp;({week.coveredDate})</td>
              <td className='cell'>{choices}</td>
              <td className='cell'>{wrData['class_size']}</td>
              <td className='cell'>{wrData['price_per_class']}</td>
            </tr>
          );
        }
      }
    }
    return (
      <div className="panel panel-default">
        <div className="panel-heading">
          <div className="panel-title">
            <h3>Afternoon Writing Elective Classes</h3>
          </div>
        </div>

        <div className="panel-body">
          <div className="row">
            <div className='col-md-offset-1'> 
              <span className="bg-info">{wrData.note}</span>
            </div><br></br>

            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>Week #</th>
                  <th>Class Choices</th>
                  <th>Class Size</th>
                  <th>Price Per Class</th>
                </tr>
              </thead>
              <tbody>
                {writingClass}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = WritingClass;