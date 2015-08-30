'use strict';

var React = require('react');
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;
var Navigation = Router.Navigation;
var YFActions = require('../actions/YFActions');
var YFStore = require('../stores/YFStore.jsx');
var movies = require('../../lib/summer/movies.json');
var morningCare = require('../../lib/summer/morningExtendedCare.json');

var OtherServices = React.createClass({
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
    YFActions.saveOtherServices(self.state.language, function() {
      self.transitionTo('summer/writing');
    });
  },

  render: function () {
    var self = this;
    return (
      <div className='col-md-9 col-md-offset-3'>
      <h2>Other Services and Activities</h2>
        {movies[1].grade.indexOf(this.state.incomingGrade) > -1 ? <MovieBox summerCampWeeks={self.state.summerCampWeeks}/> : <p></p>}
        <MorningCare />
        <LunchBox summerCampWeeks={self.state.summerCampWeeks} />
        <PickupService summerCampWeeks={self.state.summerCampWeeks} />

        <div className="row">
          <div className='col-md-offset-1'>
            <button onClick={this.handleSubmit} ref='submitButton' className="btn btn-primary">Submit</button>&nbsp; {self.state.done ? <span className="bg-info"> Submitted, please Continue. </span> : <p></p>}
          </div>
        </div>

        {this.state.done ? <button type="button" className="col-md-offset-10 btn btn-success" onClick={this.handleContinue}>Continue</button> : <p></p>}
      </div>
    );
  } 
});

var PickupService = React.createClass({
  getInitialState: function() {
    return {
      canPickup: false
    };
  },
  changePickup: function(e) {
    var s = React.findDOMNode(this.refs.pickup).checked;
    this.setState({ canPickup: s });
  },
  render: function() {
    var pickupService = [];
    var self = this;
    var len = YFStore.getSummerWeeksNum();
    var absent, week, refs;
    if(this.props.summerCampWeeks.length === 10){
      for(var j = 1; j < (len+1); j++) {
        week = self.props.summerCampWeeks[j-1];
        absent = week.schedulePattern === "absence";
        refs = [j+'Mon', j+'Tue', j+'Wed', j+'Thu', j+'Fri'];
        if(!absent){
          pickupService.push(
            <tr key={j}>
              <td className='cell'><input type="checkbox" ref={j}/></td>
              <td>week_{j}&nbsp;({week.coveredDate})</td>
              <td className='cell'>{week.attendingDays.indexOf('Mon') > -1 ? 
                <input type="checkbox" ref={refs[0]}/> : <span>Absent</span>}</td>
              <td className='cell'>{week.attendingDays.indexOf('Tue') > -1 ? 
                <input type="checkbox" ref={refs[1]}/> : <span>Absent</span>}</td>
              <td className='cell'>{week.attendingDays.indexOf('Wed') > -1 ? 
                <input type="checkbox" ref={refs[2]}/> : <span>Absent</span>}</td>
              <td className='cell'>{week.attendingDays.indexOf('Thu') > -1 ? 
                <input type="checkbox" ref={refs[3]}/> : <span>Absent</span>}</td>
              <td className='cell'>{week.attendingDays.indexOf('Fri') > -1 ? 
                <input type="checkbox" ref={refs[4]}/> : <span>Absent</span>}</td>
            </tr>
          );
        }
      }
    }

    return (
      <div className="panel panel-default">
        <div className="panel-heading">
          <div className="panel-title">
            <h3> Pick up service (<ins>Only offered to students from San Ramon district summer camp program at Hidden Hills Elementary</ins>)</h3>
          </div>
        </div>

        <div className="panel-body">
          <div className="row">
            <div className='col-md-offset-1'> 
              <h4>Are you from San Ramon district summer camp program at Hidden Hills Elementary?</h4>
              <div className="radio">
                <label><input type="radio" name="pickup" ref="pickup" onChange={this.changePickup} />Yes</label>
              </div>
              <div className="radio">
                <label><input type="radio" name="pickup" onChange={this.changePickup} />No</label>
              </div>
              {this.state.canPickup ? 
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th>Select All</th>
                    <th>Week #</th>
                    <th>Mon</th>
                    <th>Tue</th>
                    <th>Wed</th>
                    <th>Thu</th>
                    <th>Fri</th>
                  </tr>
                </thead>
                <tbody>
                  {pickupService}
                </tbody>
              </table>
              : <p></p>}
            </div>
          </div>
        </div>
      </div>
    );
  }
});

var LunchBox = React.createClass({
  render: function() {
    var self = this;
    var lunches = [], refs = [];
    var len = YFStore.getSummerWeeksNum();
    var absent, week;
    if(this.props.summerCampWeeks.length === 10){
      for(var j = 1; j < (len+1); j++) {
        week = self.props.summerCampWeeks[j-1];
        absent = week.schedulePattern === "absence";
        refs = [j+'Mon', j+'Tue', j+'Wed', j+'Thu', j+'Fri'];
        if(!absent){
          lunches.push(
            <tr key={j}>
              <td className='cell'><input type="checkbox" ref={j}/></td>
              <td>week_{j}&nbsp;({week.coveredDate})</td>
              <td className='cell'>{week.attendingDays.indexOf('Mon') > -1 ? 
                <input type="checkbox" ref={refs[0]}/> : <span>Absent</span>}</td>
              <td className='cell'>{week.attendingDays.indexOf('Tue') > -1 ? 
                <input type="checkbox" ref={refs[1]}/> : <span>Absent</span>}</td>
              <td className='cell'>{week.attendingDays.indexOf('Wed') > -1 ? 
                <input type="checkbox" ref={refs[2]}/> : <span>Absent</span>}</td>
              <td className='cell'>{week.attendingDays.indexOf('Thu') > -1 ? 
                <input type="checkbox" ref={refs[3]}/> : <span>Absent</span>}</td>
              <td className='cell'>{week.attendingDays.indexOf('Fri') > -1 ? 
                <input type="checkbox" ref={refs[4]}/> : <span>Absent</span>}</td>
            </tr>
          );
        }
      }
    }
    return (
      <div className="panel panel-default">
        <div className="panel-heading">
          <div className="panel-title">
            <h3>Order Daily Fresh Lunches From Yang Fan</h3>
          </div>
        </div>

        <div className="panel-body">
          <div className="row">
            <div className='col-md-offset-1'> 
              <span className="bg-info">We will NOT charge Lunch fee to those who are eligible for our <strong>early bird specials.</strong></span>
            </div><br></br>

            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>Select All</th>
                  <th>Week #</th>
                  <th>Mon</th>
                  <th>Tue</th>
                  <th>Wed</th>
                  <th>Thu</th>
                  <th>Fri</th>
                </tr>
              </thead>
              <tbody>
                {lunches}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
});

var MorningCare = React.createClass({
  changeCare: function() {

  },
  render: function() {
    return (
      <div className="panel panel-default">
        <div className="panel-heading">
          <div className="panel-title">
            <h3>Morning Extended Care</h3>
          </div>
        </div>

        <div className="panel-body">
          <div className="row">
            <div className='col-md-offset-1'> 
              <strong>We provide morning extended care every workday! Select the time slot that works for you. </strong>
            </div><br></br>

            <div className="col-md-offset-1">
                <div className="radio">
                  <label>
                    <input type="radio" name="morningCare" onChange={this.changeCare} value="care1" defaultChecked/>
                    {morningCare[1].display_time}&nbsp;( ${morningCare[1].price_per_week} per week)
                  </label>
                </div>
                <div className="radio">
                  <label>
                    <input type="radio" name="morningCare" onChange={this.changeCare} value="care2" />
                    {morningCare[2].display_time}&nbsp;( ${morningCare[2].price_per_week} per week)
                  </label>
                </div>
                <div className="radio">
                  <label>
                    <input type="radio" name="morningCare" onChange={this.changeCare} value="care0" />
                    No, I don't need the extended care. Thanks.
                  </label>
                </div>                
              </div>  

          </div>
        </div>
      </div>
    );
  }
});

var MovieBox = React.createClass({
  render: function() {
    var self = this;
    var summerMovies = [];
    var len = YFStore.getSummerWeeksNum();
    var absent;
    if(this.props.summerCampWeeks.length === 10){
      for(var j = 1; j < (len+1); j++) {
        absent = this.props.summerCampWeeks[j-1].schedulePattern === "absence";
        if(!absent){
          summerMovies.push(
            <tr key={j}>
              <td className='cell'><input type="checkbox" ref={j}/>
              </td>
              <td>{movies[j].week}</td>
              <td>{movies[j].name} </td>
              <td>{movies[j].site} </td>
              <td>{movies[j].price_per_movie} </td>
              <td>{movies[j].weekday} </td>
              <td>{movies[j].date} </td>
            </tr>
          );
        }
      }
    }
    return (
      <div className="panel panel-default">
        <div className="panel-heading">
          <div className="panel-title">
            <h3>Movies</h3>
          </div>
        </div>

        <div className="panel-body">
          <div className="row">
            <div className='col-md-offset-1'> 
              <span className="bg-info">Check out our movie trips! Select the days you want to go!</span>
            </div><br></br>
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>Select</th>
                  <th>Week #</th>
                  <th>Movie Name</th>
                  <th>Site</th>
                  <th>Price per movie</th>
                  <th>Weekday</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {summerMovies}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = OtherServices;