'use strict';

var React = require('react');
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;
var Navigation = Router.Navigation;
var YFActions = require('../actions/YFActions');
var YFStore = require('../stores/YFStore.jsx');
var movies = require('../../lib/summer/movies.json');
var morningCare = require('../../lib/summer/morningExtendedCare.json');

var SideMenu = require('./helpers/SideMenu.jsx');

var OtherServices = React.createClass({
  mixins: [ Navigation ],
  getInitialState: function() {
    YFActions.loadEnrollment();
    YFStore.setSideHighlight('otherServices');
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
  handleConfirm: function(e) {
    e.preventDefault();
    this.setState({ done: true });
    React.findDOMNode(this.refs.confirmButton).blur();
  },
  handleContinue: function(e) {
    YFActions.saveSummerOtherServices();
    this.transitionTo('summer/agreements');
  },

  render: function () {
    var self = this;
    return (
      <div className='page-container'>
      <SideMenu />
        <div className='main-content col-md-12'>
        <h2 className='bg-success'>Other Services and Activities</h2><hr></hr>
          {movies[1].grade.indexOf(this.state.incomingGrade) > -1 ? 
            <MovieBox 

              summerCampWeeks={self.state.summerCampWeeks}/> 
            : <p></p>}
          <MorningCare />
          <LunchBox summerCampWeeks={self.state.summerCampWeeks} />
          <PickupService summerCampWeeks={self.state.summerCampWeeks} />

          <div className="row">
            <div className='col-md-offset-1'>
              <button onClick={this.handleConfirm} ref='confirmButton' className="btn btn-primary btn-lg">Confirm</button>&nbsp; {self.state.done ? <h5><span className="bg-info"> Submitted, please Continue. </span></h5> : <p></p>}
            </div>
          </div>

          {(this.state.done) ? <button type="button" className="col-md-offset-10 btn btn-success btn-lg" onClick={this.handleContinue}>Continue</button> : <button type="button" className="col-md-offset-10 btn btn-success btn-lg" onClick={this.handleContinue} disabled>Continue</button>}
        </div>
      </div>
    );
  } 
});

var PickupService = React.createClass({
  getInitialState: function() {
    return {
      canPickup: YFStore.getCanPickup(),
      needPickup: YFStore.getNeedPickup()
    };
  },
  changeCanPick: function(e) {
    var s = React.findDOMNode(this.refs.pickup).checked;
    YFStore.setCanPickup(s);
    this.setState({ canPickup: s });
  },
  changeNeed: function(e) {
    var s = React.findDOMNode(this.refs.needpick).checked;
    YFStore.setNeedPickup(s);
    this.setState({ needPickup: s });
  },
  changePickup: function(e) {
    var weekIdx = e.currentTarget.value;
    var v = e.currentTarget.checked;
    YFStore.setPickup(weekIdx, v);
  },
  render: function() {
    var self = this;
    var pickupService = [];
    var len = YFStore.getSummerWeeksNum();
    var absent;
    if(this.props.summerCampWeeks.length === 10){
      for(var j = 1; j < (len+1); j++) {
        absent = this.props.summerCampWeeks[j-1].schedulePattern === "absence" || this.props.summerCampWeeks[j-1].schedulePattern === "5_morning";
        if(!absent){
          pickupService.push(
            <tr key={j}>
              <td className='cell'>
                {YFStore.getPickup(j-1) ? 
                  <input type="checkbox" ref={j} value={j-1} onChange={self.changePickup} defaultChecked/> :
                  <input type="checkbox" ref={j} value={j-1} onChange={self.changePickup}/>}
              </td>
              <td>{self.props.summerCampWeeks[j-1].weekIndex}&nbsp;({self.props.summerCampWeeks[j-1].coveredDate})</td>
              <td>Hidden Hills Elementary / 12:05 PM</td>
              <td>$5 per trip</td>
            </tr>
          );
        }
      }
    }

    return (
      <div className="panel panel-primary">
        <div className="panel-heading">
          <div className="panel-title">
            <h3>Pick-up Service</h3>
          </div>
        </div>

        <div className="panel-body">
          <div className="row">
            <div className='col-md-offset-1'> 
              <h4><span className='bg-info'>Only offered to students from San Ramon district summer camp program at Hidden Hills Elementary</span></h4><hr></hr>
              <h4>Are you from San Ramon district summer camp program at Hidden Hills Elementary?</h4>
              <div className="radio">
                <label>
                  {this.state.canPickup  ?
                  <input type="radio" name="pickup" ref="pickup" onChange={this.changeCanPick} defaultChecked/> :
                  <input type="radio" name="pickup" ref="pickup" onChange={this.changeCanPick} />}
                  Yes
                </label>
              </div>
              <div className="radio">
                <label>
                  {!this.state.canPickup ? 
                  <input type="radio" name="pickup" onChange={this.changeCanPick} defaultChecked/> :
                  <input type="radio" name="pickup" onChange={this.changeCanPick} />}
                  No
                </label>
              </div>

              {this.state.canPickup ? 
              <div>
                <h4>Do you need pick-up service?</h4>
                <div className="radio">
                  <label>
                    {this.state.needPickup  ? 
                    <input type="radio" name="needpick" ref="needpick" onChange={this.changeNeed} defaultChecked/> :
                    <input type="radio" name="needpick" ref="needpick" onChange={this.changeNeed} />}
                    Yes 
                  </label>
                </div>
                <div className="radio">
                  <label>
                    {!this.state.needPickup  ? 
                      <input type="radio" name="needpick" onChange={this.changeNeed} defaultChecked/> :
                      <input type="radio" name="needpick" onChange={this.changeNeed} />}
                    No
                  </label>
                </div>
              </div> 
              : <p></p>}

              {(this.state.canPickup && this.state.needPickup) ?
              <table className="table table-bordered table-striped">
                <thead>
                  <tr>
                    <th>Select</th>
                    <th>Week #</th>
                    <th>Pick-up Spot / Time</th>
                    <th>Price Per Trip</th>
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
  getInitialState: function() {
    return {
      allSelectedWeeks: [
        { week: 'week_1', selected: false },
        { week: 'week_2', selected: false },
        { week: 'week_3', selected: false },
        { week: 'week_4', selected: false },
        { week: 'week_5', selected: false },
        { week: 'week_6', selected: false },
        { week: 'week_7', selected: false },
        { week: 'week_8', selected: false },
        { week: 'week_9', selected: false },
        { week: 'week_10', selected: false }
      ]
    };
  },
  changeLunch: function(e) {
    var ref = e.currentTarget.value;
    var v = e.currentTarget.checked;
    YFStore.setLunch(ref, v);
  },
  selectWholeWeek: function(e) {
    var j = e.currentTarget.value;
    var state = [
      { week: 'week_1', 
        selected: React.findDOMNode(this.refs.week_1) ? React.findDOMNode(this.refs.week_1).checked : false },
      { week: 'week_2', 
        selected: React.findDOMNode(this.refs.week_2) ? React.findDOMNode(this.refs.week_2).checked : false },
      { week: 'week_3', 
        selected: React.findDOMNode(this.refs.week_3) ? React.findDOMNode(this.refs.week_3).checked : false },
      { week: 'week_4', 
        selected: React.findDOMNode(this.refs.week_4) ? React.findDOMNode(this.refs.week_4).checked : false },
      { week: 'week_5', 
        selected: React.findDOMNode(this.refs.week_5) ? React.findDOMNode(this.refs.week_5).checked : false },
      { week: 'week_6', 
        selected: React.findDOMNode(this.refs.week_6) ? React.findDOMNode(this.refs.week_6).checked : false },
      { week: 'week_7', 
        selected: React.findDOMNode(this.refs.week_7) ? React.findDOMNode(this.refs.week_7).checked : false },
      { week: 'week_8', 
        selected: React.findDOMNode(this.refs.week_8) ? React.findDOMNode(this.refs.week_8).checked : false },
      { week: 'week_9', 
        selected: React.findDOMNode(this.refs.week_9) ? React.findDOMNode(this.refs.week_9).checked : false },
      { week: 'week_10', 
        selected: React.findDOMNode(this.refs.week_10) ? React.findDOMNode(this.refs.week_10).checked : false }
    ];
    this.setState({ allSelectedWeeks: state });
    var v = e.currentTarget.checked;
    YFStore.setLunch(j, v);
    // var refs = [j+'Mon', j+'Tue', j+'Wed', j+'Thu', j+'Fri'];
    // for(var x = 0; x < refs.length; x++) {
    //   YFStore.setLunch(refs[x], v);
    // }
  },
  render: function() {
    var self = this;
    var lunches = [], refs = [];
    var len = YFStore.getSummerWeeksNum();
    var absent, week, weekRef;
    if(this.props.summerCampWeeks.length === 10){
      for(var j = 1; j < (len+1); j++) {
        week = self.props.summerCampWeeks[j-1];
        absent = week.schedulePattern === "absence";
        refs = [j+'Mon', j+'Tue', j+'Wed', j+'Thu', j+'Fri'];
        weekRef = 'week_' + j;
        if(!absent){
          lunches.push(
            <tr key={j}>
              <td className='cell'>
                {(YFStore.getLunch(j) || self.state.allSelectedWeeks[j-1].selected) ? 
                  <label>
                    <input type="checkbox" onChange={self.selectWholeWeek} ref={weekRef} value={j} defaultChecked/>&nbsp;<span className='bg-warning'>The whole week selected</span>
                  </label>
                  :<input type="checkbox" onChange={self.selectWholeWeek} ref={weekRef} value={j}/>}
              </td>
              <td>week_{j}&nbsp;({week.coveredDate})</td>
              <td className='cell'>{week.attendingDays.indexOf('Mon') > -1 ? 
                (YFStore.getLunch(refs[0]) ? 
                  <input type="checkbox" onChange={self.changeLunch} value={refs[0]} defaultChecked/> :
                  <input type="checkbox" onChange={self.changeLunch} value={refs[0]} /> )
                : <span>Absent</span>}
              </td>
              <td className='cell'>{week.attendingDays.indexOf('Tue') > -1 ? 
                (YFStore.getLunch(refs[1]) ? 
                  <input type="checkbox" onChange={self.changeLunch} value={refs[1]} defaultChecked/> :
                  <input type="checkbox" onChange={self.changeLunch} value={refs[1]} /> )
                : <span>Absent</span>}
              </td>
              <td className='cell'>{week.attendingDays.indexOf('Wed') > -1 ? 
                (YFStore.getLunch(refs[2]) ? 
                  <input type="checkbox" onChange={self.changeLunch} value={refs[2]} defaultChecked/> :
                  <input type="checkbox" onChange={self.changeLunch} value={refs[2]} /> )
                : <span>Absent</span>}
              </td>
              <td className='cell'>{week.attendingDays.indexOf('Thu') > -1 ? 
                (YFStore.getLunch(refs[3]) ? 
                  <input type="checkbox" onChange={self.changeLunch} value={refs[3]} defaultChecked/> :
                  <input type="checkbox" onChange={self.changeLunch} value={refs[3]} /> ) 
                : <span>Absent</span>}
              </td>
              <td className='cell'>{week.attendingDays.indexOf('Fri') > -1 ? 
                (YFStore.getLunch(refs[4]) ? 
                  <input type="checkbox" onChange={self.changeLunch} value={refs[4]} defaultChecked/> :
                  <input type="checkbox" onChange={self.changeLunch} value={refs[4]} /> )
                : <span>Absent</span>}
              </td>
            </tr>
          );
        }
      }
    }
    return (
      <div className="panel panel-primary">
        <div className="panel-heading">
          <div className="panel-title">
            <h3>Order Daily Fresh Lunches From Yang Fan</h3>
          </div>
        </div>

        <div className="panel-body">
          <div className="row">
            <div className='col-md-offset-1'> 
              <h4><span className="bg-info">We will NOT charge Lunch fee to those who are eligible for our early bird specials.</span></h4>
            </div><br></br>

            <table className="table table-bordered table-striped">
              <thead>
                <tr>
                  <th>Select All Attending Days In the Week</th>
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
  changeCare: function(e) {
    YFStore.setMorningCare(e.currentTarget.value);
  },
  render: function() {
    return (
      <div className="panel panel-primary">
        <div className="panel-heading">
          <div className="panel-title">
            <h3>Morning Extended Care</h3>
          </div>
        </div>

        <div className="panel-body">
          <div className="row">
            <div className='col-md-offset-1'> 
              <h4><span className="bg-info">We provide morning extended care every workday! Select the time slot that works for you. </span></h4>
            </div><br></br>

            <div className="col-md-offset-1">
                <div className="radio">
                  <label>
                    {YFStore.getMorningCare() === 'oneHour' ? 
                    <input type="radio" name="morningCare" onChange={this.changeCare} value="oneHour" defaultChecked/> : 
                    <input type="radio" name="morningCare" onChange={this.changeCare} value="oneHour"/>}
                    {morningCare[1].display_time}&nbsp;( ${morningCare[1].price_per_week} per week)
                  </label>
                </div>
                <div className="radio">
                  <label>
                    {YFStore.getMorningCare() === 'halfHour' ? 
                    <input type="radio" name="morningCare" onChange={this.changeCare} value="halfHour" defaultChecked/> :
                    <input type="radio" name="morningCare" onChange={this.changeCare} value="halfHour" />}
                    {morningCare[2].display_time}&nbsp;( ${morningCare[2].price_per_week} per week)
                  </label>
                </div>
                <div className="radio">
                  <label>
                    {(YFStore.getMorningCare() === 'none') ? 
                    <input type="radio" name="morningCare" onChange={this.changeCare} value="none" defaultChecked/> :
                    <input type="radio" name="morningCare" onChange={this.changeCare} value="none" />}
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
  changeMovie: function(e) {
    var v = e.currentTarget.checked;
    var weekIdx = e.currentTarget.value;
    YFStore.setWeeklyMovie(weekIdx, v);
  },
  render: function() {
    var self = this;
    var summerMovies = [];
    var len = YFStore.getSummerWeeksNum();
    var absent;
    if(this.props.summerCampWeeks.length === 10){
      for(var j = 1; j < (len+1); j++) {
        absent = (this.props.summerCampWeeks[j-1].schedulePattern === "absence") || (this.props.summerCampWeeks[j-1].attendingDays.indexOf('Tue') === -1);
        if(!absent){
          summerMovies.push(
            <tr key={j}>
              <td className='cell'>
                {YFStore.getWeeklyMovie(j-1) ? 
                  <input type="checkbox" ref={j} value={j-1} onChange={self.changeMovie} defaultChecked/> :
                  <input type="checkbox" ref={j} value={j-1} onChange={self.changeMovie}/>}
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
      <div className="panel panel-primary">
        <div className="panel-heading">
          <div className="panel-title">
            <h3>Movies</h3>
          </div>
        </div>

        <div className="panel-body">
          <div className="row">
            <div className='col-md-offset-1'> 
              <h4><span className="bg-info">Check out our movie trips! Select the days you want to go!</span></h4>
            </div><br></br>
            <table className="table table-bordered table-striped">
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