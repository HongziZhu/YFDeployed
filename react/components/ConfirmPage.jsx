'use strict';

var React = require('react');
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;
var Navigation = Router.Navigation;
var YFActions = require('../actions/YFActions');
var YFStore = require('../stores/YFStore.jsx');
var results = require('../../lib/EnrollResults.json');

var SideMenu = require('./helpers/SideMenu.jsx');

var ConfirmPage = React.createClass({
  mixins: [ Navigation ],
  getInitialState: function() {
    YFActions.loadEnrollment();
    YFStore.setSideHighlight('confirm');
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
  },
  handleContinue: function(e) {
    var self = this;
    YFActions.sendConfirmEmail(function() {
      self.transitionTo('complete');
    });
  },

  render: function () {
    var self = this;
    return (
      <div className="page-container">
        <SideMenu />
        <div className='main-content col-md-12'>
          <div className="panel panel-primary">
            <div className="panel-heading">
              <div className="panel-title">
                <h3>Preview of Summer Camp Enrollment</h3>
              </div>
            </div>

            <div className="panel-body">
              <div className="row">
                <pre>
                  <table className="dataintable" border={0} cellPadding={0} cellSpacing={0}>
            <tbody>
              <tr className="days">
                <th />
                <th>Week 1</th>
                <th>Week 2</th>
                <th>Week 3</th>
                <th>Week 4</th>
                <th>Week 5</th>
                <th>Week 6</th>
                <th>Week 7</th>
                <th>Week 8</th>        
                <th>Week 9</th>
                <th>Week 10</th>
              </tr>
              <tr>
                <th className="time">Covered Date</th>
                <td>{results['summerCampWeeks'][0]['coveredDate']}</td>
                <td>{results['summerCampWeeks'][1]['coveredDate']}</td>
                <td>{results['summerCampWeeks'][2]['coveredDate']}</td>
                <td>{results['summerCampWeeks'][3]['coveredDate']}</td>
                <td>{results['summerCampWeeks'][4]['coveredDate']}</td>
                <td>{results['summerCampWeeks'][5]['coveredDate']}</td>
                <td>{results['summerCampWeeks'][6]['coveredDate']}</td>
                <td>{results['summerCampWeeks'][7]['coveredDate']}</td>
                <td>{results['summerCampWeeks'][8]['coveredDate']}</td>
                <td>{results['summerCampWeeks'][9]['coveredDate']}</td>
              </tr>
              <tr>
                <th className="time">Schedule</th>
                <td>{results['summerCampWeeks'][0]['schedulePattern']}</td>
                <td>{results['summerCampWeeks'][1]['schedulePattern']}</td>
                <td>{results['summerCampWeeks'][2]['schedulePattern']}</td>
                <td>{results['summerCampWeeks'][3]['schedulePattern']}</td>
                <td>{results['summerCampWeeks'][4]['schedulePattern']}</td>
                <td>{results['summerCampWeeks'][5]['schedulePattern']}</td>
                <td>{results['summerCampWeeks'][6]['schedulePattern']}</td>
                <td>{results['summerCampWeeks'][7]['schedulePattern']}</td>
                <td>{results['summerCampWeeks'][8]['schedulePattern']}</td>
                <td>{results['summerCampWeeks'][9]['schedulePattern']}</td>
              </tr>
              <tr>
                <th className="time">Days Attending</th>
                <td>{results['summerCampWeeks'][0]['schedulePattern']==='absence' ? <span></span> : <span>{['summerCampWeeks'][0]['attendingDays']}</span> }</td>
                <td>{results['summerCampWeeks'][1]['schedulePattern']==='absence' ? <span></span> : <span>{['summerCampWeeks'][1]['attendingDays']}</span> }</td>
                <td>{results['summerCampWeeks'][2]['schedulePattern']==='absence' ? <span></span> : <span>{results['summerCampWeeks'][2]['attendingDays']}</span> }</td>
                <td>{results['summerCampWeeks'][3]['schedulePattern']==='absence' ? <span></span> : <span>{results['summerCampWeeks'][3]['attendingDays']}</span> }</td>
                <td>{results['summerCampWeeks'][4]['schedulePattern']==='absence' ? <span></span> : <span>{results['summerCampWeeks'][4]['attendingDays']}</span> }</td>
                <td>{results['summerCampWeeks'][5]['schedulePattern']==='absence' ? <span></span> : <span>{results['summerCampWeeks'][5]['attendingDays']}</span> }</td>
                <td>{results['summerCampWeeks'][6]['schedulePattern']==='absence' ? <span></span> : <span>{results['summerCampWeeks'][6]['attendingDays']}</span> }</td>
                <td>{results['summerCampWeeks'][7]['schedulePattern']==='absence' ? <span></span> : <span>{results['summerCampWeeks'][7]['attendingDays']}</span> }</td>
                <td>{results['summerCampWeeks'][8]['schedulePattern']==='absence' ? <span></span> : <span>{results['summerCampWeeks'][8]['attendingDays']}</span> }</td>
                <td>{results['summerCampWeeks'][9]['schedulePattern']==='absence' ? <span></span> : <span>{results['summerCampWeeks'][9]['attendingDays']}</span> }</td>
              </tr>
              <tr>
                <th className="time">Morning Enrichment(Camp)</th>
    {results['summerCampWeeks'][0]['schedulePattern']==='absence' ? <td></td> : <td className='enrichment-activity blue'>{results['summerCampWeeks'][0]['enrichmentActs']['morning']['activityName']}</td> }            
    {results['summerCampWeeks'][1]['schedulePattern']==='absence' ? <td></td> : <td className='enrichment-activity blue'>{results['summerCampWeeks'][1]['enrichmentActs']['morning']['activityName']}</td> }   
                {results['summerCampWeeks'][2]['schedulePattern']==='absence' ? <td></td> : <td className='enrichment-activity blue'>{results['summerCampWeeks'][2]['enrichmentActs']['morning']['activityName']}</td> }   
                {results['summerCampWeeks'][3]['schedulePattern']==='absence' ? <td></td> : <td className='enrichment-activity blue'>{results['summerCampWeeks'][3]['enrichmentActs']['morning']['activityName']}</td>}
                {results['summerCampWeeks'][4]['schedulePattern']==='absence' ? <td></td> : <td className='enrichment-activity blue'>{results['summerCampWeeks'][4]['enrichmentActs']['morning']['activityName']}</td>}
                {results['summerCampWeeks'][5]['schedulePattern']==='absence' ? <td></td> : <td className='enrichment-activity blue'>{results['summerCampWeeks'][5]['enrichmentActs']['morning']['activityName']}</td>}
                {results['summerCampWeeks'][6]['schedulePattern']==='absence' ? <td></td> : <td className='enrichment-activity blue'>{results['summerCampWeeks'][6]['enrichmentActs']['morning']['activityName']}</td>}
                {results['summerCampWeeks'][7]['schedulePattern']==='absence' ? <td></td> : <td className='enrichment-activity blue'>{results['summerCampWeeks'][7]['enrichmentActs']['morning']['activityName']}</td>}
                {results['summerCampWeeks'][8]['schedulePattern']==='absence' ? <td></td> : <td className='enrichment-activity blue'>{results['summerCampWeeks'][8]['enrichmentActs']['morning']['activityName']}</td>}
                {results['summerCampWeeks'][9]['schedulePattern']==='absence' ? <td></td> : <td className='enrichment-activity blue'>{results['summerCampWeeks'][9]['enrichmentActs']['morning']['activityName']}</td>}
              </tr>
              <tr>
                <th className="time">Covered Date</th>
                <td>{results['summerCampWeeks'][0]['coverdDate']}</td>
                <td>Enrichment Activity</td>
                <td>Enrichment Activity</td>
                <td>Enrichment Activity</td>
                <td>Enrichment Activity</td>
                <td>Enrichment Activity</td>
                <td>Enrichment Activity</td>
                <td>Enrichment Activity</td>
                <td>Enrichment Activity</td>
                <td>Enrichment Activity</td>
              </tr>
                      <tr>
                <th className="time">Covered Date</th>
                <td>{results['summerCampWeeks'][0]['coverdDate']}</td>
                <td>Enrichment Activity</td>
                <td>Enrichment Activity</td>
                <td>Enrichment Activity</td>
                <td>Enrichment Activity</td>
                <td>Enrichment Activity</td>
                <td>Enrichment Activity</td>
                <td>Enrichment Activity</td>
                <td>Enrichment Activity</td>
                <td>Enrichment Activity</td>
              </tr>
                      <tr>
                <th className="time">Covered Date</th>
                <td>{results['summerCampWeeks'][0]['coverdDate']}</td>
                <td>Enrichment Activity</td>
                <td>Enrichment Activity</td>
                <td>Enrichment Activity</td>
                <td>Enrichment Activity</td>
                <td>Enrichment Activity</td>
                <td>Enrichment Activity</td>
                <td>Enrichment Activity</td>
                <td>Enrichment Activity</td>
                <td>Enrichment Activity</td>
              </tr>
                      <tr>
                <th className="time">Covered Date</th>
                <td>{results['summerCampWeeks'][0]['coverdDate']}</td>
                <td>Enrichment Activity</td>
                <td>Enrichment Activity</td>
                <td>Enrichment Activity</td>
                <td>Enrichment Activity</td>
                <td>Enrichment Activity</td>
                <td>Enrichment Activity</td>
                <td>Enrichment Activity</td>
                <td>Enrichment Activity</td>
                <td>Enrichment Activity</td>
              </tr>
                      <tr>
                <th className="time">Covered Date</th>
                <td>{results['summerCampWeeks'][0]['coverdDate']}</td>
                <td>Enrichment Activity</td>
                <td>Enrichment Activity</td>
                <td>Enrichment Activity</td>
                <td>Enrichment Activity</td>
                <td>Enrichment Activity</td>
                <td>Enrichment Activity</td>
                <td>Enrichment Activity</td>
                <td>Enrichment Activity</td>
                <td>Enrichment Activity</td>
              </tr>
                      <tr>
                <th className="time">Covered Date</th>
                <td>{results['summerCampWeeks'][0]['coverdDate']}</td>
                <td>Enrichment Activity</td>
                <td>Enrichment Activity</td>
                <td>Enrichment Activity</td>
                <td>Enrichment Activity</td>
                <td>Enrichment Activity</td>
                <td>Enrichment Activity</td>
                <td>Enrichment Activity</td>
                <td>Enrichment Activity</td>
                <td>Enrichment Activity</td>
              </tr>
            </tbody></table>
                  {JSON.stringify(results, null, 2)}
                </pre>
              </div>
            </div>
          </div>

          <div className="row">
            <div className='col-md-offset-1'>
              <button onClick={this.handleConfirm} ref='confirmButton' className="btn btn-primary btn-lg">Confirm</button>&nbsp; <br></br>
            </div>
          </div>

          {this.state.done ? <button type="button" className="col-md-offset-10 btn btn-success btn-lg" onClick={this.handleContinue}>Continue</button> : <p></p>}
        </div>
      </div>
    );
  } 
});

module.exports = ConfirmPage;