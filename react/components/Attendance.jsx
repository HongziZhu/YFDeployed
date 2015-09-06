'use strict';

var React=require('react');
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;
var Navigation = Router.Navigation;
var YFActions = require('../actions/YFActions');
var YFStore = require('../stores/YFStore.jsx');

var CourseView = require('./CourseView.jsx');
var SideMenu = require('./helpers/SideMenu.jsx');

var Attendance = React.createClass({
  //TODO show but disable Continue
  mixins: [ Navigation ],
  getInitialState: function() {
    YFActions.findStudentsById();
    YFStore.setSideHighlight('attendence');
    return { 
      currentStudent: YFStore.getCurrentStudent(),
      allScheduled: YFStore.getAllScheduled(),
      summerWeeks: YFStore.getSummerWeeks(),
      incomingGrade: YFStore.getIncomingGrade(),
      schedulePattern: '5_full',
      attendingDays: [
        { day: 'Mon', selected: true },
        { day: 'Tue', selected: true },
        { day: 'Wed', selected: true },
        { day: 'Thu', selected: true },
        { day: 'Fri', selected: true }
      ],
      daysMatched: true,
      canContinue: false
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
      currentStudent: YFStore.getCurrentStudent(),
      allScheduled: YFStore.getAllScheduled(),
      summerWeeks: YFStore.getSummerWeeks(),
      incomingGrade: YFStore.getIncomingGrade()
    });
  },
  changePattern: function(e) {
    var self = this;
    var pat = e.currentTarget.value;
    var dayNum = 0;
    for(var i = 0; i < 5; i++){
      dayNum += self.state.attendingDays[i].selected ? 1 : 0;
    }
    var p = pat === 'absence' ? 0 : parseInt(pat.substring(0, 1));
    if(p === dayNum){
      self.setState({ schedulePattern: pat, daysMatched: true });
    } else {
      self.setState({ schedulePattern: pat, daysMatched: false });
    }
  },
  changeWeekday: function() {
    var self = this;
    var state = [
      { day: 'Mon', selected: React.findDOMNode(self.refs.Mon).checked },
      { day: 'Tue', selected: React.findDOMNode(self.refs.Tue).checked },
      { day: 'Wed', selected: React.findDOMNode(self.refs.Wed).checked },
      { day: 'Thu', selected: React.findDOMNode(self.refs.Thu).checked },
      { day: 'Fri', selected: React.findDOMNode(self.refs.Fri).checked }
    ];
    var dayNum = 0;
    for(var i = 0; i < 5; i++){
      dayNum += state[i].selected ? 1 : 0;
    }
    var pat = self.state.schedulePattern;
    var p = pat === 'absence' ? 0 : parseInt(pat.substring(0, 1));
    if(p === dayNum){
      this.setState({ attendingDays: state, daysMatched: true });
    } else {
      this.setState({ attendingDays: state, daysMatched: false });
    }
    
  },
  applyWeeks: function(e) {
    e.preventDefault();
    var self = this;
    if(!this.state.daysMatched){
      return alert('Please choose the correct attending weekdays.');
    }
    var applied = [
      { week: 'week_1', coveredDate: '6/13-6/17', 
      selected: React.findDOMNode(this.refs.week_1).checked, 
      done: this.state.summerWeeks[0].done},
      { week: 'week_2', coveredDate: '6/20-6/24', 
      selected: React.findDOMNode(this.refs.week_2).checked, 
      done: this.state.summerWeeks[1].done},
      { week: 'week_3', coveredDate: '6/27-7/1', 
      selected: React.findDOMNode(this.refs.week_3).checked, 
      done: this.state.summerWeeks[2].done},
      { week: 'week_4', coveredDate: '7/4-7/8', 
      selected: React.findDOMNode(this.refs.week_4).checked, 
      done: this.state.summerWeeks[3].done},
      { week: 'week_5', coveredDate: '7/11-7/15', 
      selected: React.findDOMNode(this.refs.week_5).checked, 
      done: this.state.summerWeeks[4].done},
      { week: 'week_6', coveredDate: '7/18-7/22', 
      selected: React.findDOMNode(this.refs.week_6).checked, 
      done: this.state.summerWeeks[5].done},
      { week: 'week_7', coveredDate: '7/25-7/29', 
      selected: React.findDOMNode(this.refs.week_7).checked, 
      done: this.state.summerWeeks[6].done},
      { week: 'week_8', coveredDate: '8/1-8/5', 
      selected: React.findDOMNode(this.refs.week_8).checked, 
      done: this.state.summerWeeks[7].done},
      { week: 'week_9', coveredDate: '8/8-8/12', 
      selected: React.findDOMNode(this.refs.week_9).checked, 
      done: this.state.summerWeeks[8].done},
      { week: 'week_10', coveredDate: '8/15-8/19', 
      selected: React.findDOMNode(this.refs.week_10).checked, 
      done: this.state.summerWeeks[9].done}
    ];
    YFStore.setSummerWeeks(this.state.schedulePattern, this.state.attendingDays, applied, function() {
      self.setState({ summerWeeks: YFStore.getSummerWeeks() }, function() {
        React.findDOMNode(self.refs.submitButton).blur();
        if(YFStore.getSummerWeekCount() === 10){
          YFStore.setAllScheduled(true);
          self.setState({ allScheduled: YFStore.getAllScheduled() });
        }
      });
    });
  },
  changeWeeks: function() {
    var state = [
      { week: 'week_1', coveredDate: '6/13-6/17', 
      selected: React.findDOMNode(this.refs.week_1).checked, 
      done: this.state.summerWeeks[0].done},
      { week: 'week_2', coveredDate: '6/20-6/24', 
      selected: React.findDOMNode(this.refs.week_2).checked, 
      done: this.state.summerWeeks[1].done},
      { week: 'week_3', coveredDate: '6/27-7/1', 
      selected: React.findDOMNode(this.refs.week_3).checked, 
      done: this.state.summerWeeks[2].done},
      { week: 'week_4', coveredDate: '7/4-7/8', 
      selected: React.findDOMNode(this.refs.week_4).checked, 
      done: this.state.summerWeeks[3].done},
      { week: 'week_5', coveredDate: '7/11-7/15', 
      selected: React.findDOMNode(this.refs.week_5).checked, 
      done: this.state.summerWeeks[4].done},
      { week: 'week_6', coveredDate: '7/18-7/22', 
      selected: React.findDOMNode(this.refs.week_6).checked, 
      done: this.state.summerWeeks[5].done},
      { week: 'week_7', coveredDate: '7/25-7/29', 
      selected: React.findDOMNode(this.refs.week_7).checked, 
      done: this.state.summerWeeks[6].done},
      { week: 'week_8', coveredDate: '8/1-8/5', 
      selected: React.findDOMNode(this.refs.week_8).checked, 
      done: this.state.summerWeeks[7].done},
      { week: 'week_9', coveredDate: '8/8-8/12', 
      selected: React.findDOMNode(this.refs.week_9).checked, 
      done: this.state.summerWeeks[8].done},
      { week: 'week_10', coveredDate: '8/15-8/19', 
      selected: React.findDOMNode(this.refs.week_10).checked, 
      done: this.state.summerWeeks[9].done}
    ];
    this.setState({ summerWeeks: state });
  },
  handleContinue: function(e) {
    e.preventDefault();
    var self = this;
    YFActions.saveSummerSchedule(self.state.currentStudent, function() {
      console.log('summer schedule saved.');
      self.transitionTo('summer/afternoon_academics');
    });
  },
  selectAllWeeks: function() {
    // e.preventDefault();
    var v = React.findDOMNode(this.refs.allWeeks).checked;
    var self = this;
    var state = [
      { week: 'week_1', coveredDate: '6/13-6/17', selected: v, 
      done: self.state.summerWeeks[0].done},
      { week: 'week_2', coveredDate: '6/20-6/24', selected: v, 
      done: self.state.summerWeeks[1].done},
      { week: 'week_3', coveredDate: '6/27-7/1', selected: v, 
      done: self.state.summerWeeks[2].done},
      { week: 'week_4', coveredDate: '7/4-7/8', selected: v, 
      done: self.state.summerWeeks[3].done},
      { week: 'week_5', coveredDate: '7/11-7/15', selected: v, 
      done: self.state.summerWeeks[4].done},
      { week: 'week_6', coveredDate: '7/18-7/22', selected: v, 
      done: self.state.summerWeeks[5].done},
      { week: 'week_7', coveredDate: '7/25-7/29', selected: v, 
      done: self.state.summerWeeks[6].done},
      { week: 'week_8', coveredDate: '8/1-8/5', selected: v, 
      done: self.state.summerWeeks[7].done},
      { week: 'week_9', coveredDate: '8/8-8/12', selected: v, 
      done: self.state.summerWeeks[8].done},
      { week: 'week_10', coveredDate: '8/15-8/19', selected: v, 
      done: self.state.summerWeeks[9].done}
    ];
    this.setState({ summerWeeks: state}, function() {
      self.forceUpdate();
    });
  },

  render: function () {
    var self = this;
    var weekdaysHelper = !this.state.daysMatched ? (<p className='bg-danger'>Please choose EXACT {self.state.schedulePattern === 'absence' ? 0 : this.state.schedulePattern.substring(0, 1)} weekday(s) to attend.</p>) : <p></p> 

    var weekdays = this.state.attendingDays.map(function(d){
      return (
        <label className="checkbox-inline" key={d.day}>
          <input type="checkbox" ref={d.day}  checked={d.selected} onChange={self.changeWeekday} />{d.day}
        </label>
      );
    });

    var summerWeeks = this.state.summerWeeks.map(function(w, index){
      if(w.done){
        var weeks = YFStore.getSummerCampWeeks();
        var days = weeks[index].attendingDays.map(function(d) {
          return ( d + '. ');
        });
        return (
          <label className="checkbox" key={w.week}>
            <input type="checkbox" ref={w.week} disabled/>{w.week} ({w.coveredDate})&nbsp;<span className="bg-warning">Scheduled: {weeks[index].schedulePattern}  {days}</span> 
          </label>
        );
      } else {
        return (
          <label className="checkbox" key={w.week}>
            <input type="checkbox" ref={w.week} checked={w.selected} onChange={self.changeWeeks} />{w.week} ({w.coveredDate})
          </label>
        );
      }
    });

    var continueHelper = this.state.allScheduled ? (<span className="bg-success">All summer weeks have been scheduled, please click Continue button below.</span>) : <p></p>;
    
    return (
      <div className="page-container">
      <SideMenu />
      <div className="main-content">
        <div className='col-md-12'>
          <CourseView />
          <div className="panel panel-primary">
            <div className="panel-heading">
              <div className="panel-title">
                <h2>Attendance</h2>
              </div>
            </div>

            <div className="panel-body">
              <div className='panel panel-success'>
                <div className="panel-heading">
                  <div className="panel-title">
                    <h3>First, schedule attending pattern.</h3>
                  </div>
                </div>

                <div className="panel-body">
                  <div className="row">
                    <div className="col-md-offset-1">
                      <h4><strong>How many days do you want to attend per week?</strong></h4>
                      <br>
                      </br>
                    </div>

                    <div className="col-md-offset-1">
                      <div className="radio">
                        <label>
                          <input type="radio" name="attendPattern" onChange={this.changePattern} value="5_full" defaultChecked/>
                          5 full days per week (8:00 am - 6:30 pm) $235
                        </label>
                      </div>
                      <div className="radio">
                        <label>
                          <input type="radio" name="attendPattern" onChange={this.changePattern} value="4_full"/>
                          4 full days per week (8:00 am - 6:30 pm) $210
                        </label>
                      </div>
                      <div className="radio">
                        <label>
                          <input type="radio" name="attendPattern" onChange={this.changePattern} value="3_full"/>
                          3 full days per week (8:00 am - 6:30 pm) $190
                        </label>
                      </div>
                      <div className="radio">
                        <label>
                          <input type="radio" name="attendPattern" onChange={this.changePattern} value="5_morning"/>
                          5 mornings per week (8:00 am - 12:30 pm) $175
                        </label>
                      </div>
                      <div className="radio">
                        <label>
                          <input type="radio" name="attendPattern" onChange={this.changePattern} value="5_afternoon"/>
                          5 afternoons per week (1:00 pm - 6:30 pm) $175
                        </label>
                      </div>  
                      <div className="radio">
                        <label>
                          <input type="radio" name="attendPattern" onChange={this.changePattern} value="absence"/>
                          Absence&nbsp;<span className="bg-info">If you don't plan to attend, please choose this.</span>
                        </label>
                      </div>                
                    </div>  
                  </div>
                  <hr></hr>

                  <div className="row">
                    <div className="col-md-offset-1">
                      <h4><strong>Choose the attending weekdays</strong></h4><br></br>
                      {weekdaysHelper}
                      {weekdays}
                    </div>
                  </div>
                  <hr></hr>
                </div>
              </div>

              <div className='panel panel-success'>
                <div className="panel-heading">
                  <div className="panel-title">
                    <h3>Then, choose some weeks to apply your attending pattern above.</h3>
                  </div>
                </div>

                <div className="panel-body">
                  <form className="form-horizontal" onSubmit={this.applyWeeks}>
                    <div className="row">
                      <div className="col-md-offset-1">
                        <h4><span className="bg-info">No worry, you can change the attending pattern and apply them to other weeks.</span></h4>
                        <br></br>
                        <ul >
                          <label className="checkbox text-primary">
                            <input type="checkbox" ref='allWeeks' onChange={this.selectAllWeeks} /><strong>Select All Weeks</strong>
                          </label>
                          <br></br>
                          {summerWeeks}
                        </ul>
                      </div>
                    </div>
                    <hr></hr>

                    <div className="row">
                      <div className="col-md-offset-1">
                        <button type="submit" ref='submitButton' className="btn btn-primary">Apply</button>&nbsp;
                        {continueHelper}
                      </div> 
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
          {this.state.allScheduled ? <button type="button" className="col-md-offset-10 btn btn-success" onClick={this.handleContinue}>Continue</button> : <button type="button" className="col-md-offset-10 btn btn-success" onClick={this.handleContinue} disabled>Continue</button> }
        </div>
      </div>
      </div>
    );
  }
});

module.exports = Attendance;
