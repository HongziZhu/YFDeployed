'use strict';

var React = require('react');
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;
var Navigation = Router.Navigation;
var YFActions = require('../../actions/YFActions');
var YFStore = require('../../stores/YFStore.jsx');

var ScheduleTable = React.createClass({
	propTypes: {
		summerCampWeeks: React.PropTypes.array.isRequired
	},
	deleteSchedule: function(e) {
		e.preventDefault();
		var self = this;
		if(confirm('Are you sure to delete this schedule with all related enrollment data?') == true){
			YFActions.deleteSummerEnrollment(this.props.enrollmentId, function(){
 				self.props.afterDelete();
			});
		}	
	},
  render: function() {
  	var weeks = [];
  	var oneWeek;
  	if(this.props.summerCampWeeks.length === 10){
  		for(var j = 0; j < 10; j++) {
  			oneWeek = this.props.summerCampWeeks[j];
  			var days = oneWeek.attendingDays.map(function(d) {
          return ( d + '. ');
        });
  			weeks.push(
 					<tr key={j}>
	          <td className='cell'>{oneWeek.weekIndex}</td>
	          <td className='cell'>{oneWeek.coveredDate}</td>
	          <td className='cell'>{oneWeek.schedulePattern}</td>
	          <td className='cell'>{days}</td>
	        </tr>
  			)
  		}
  	}
    return (
      <div className="panel-body">
      <div className="introduction">
        <p>You have already set up your attendence for this summer. </p>
      </div>
        <table className="table table-bordered table-striped">
          <thead>
            <tr>
              <th>Week #</th>
              <th>Covered Date</th>
              <th>Schedule Pattern</th>
              <th>Attending Weekdays</th>
            </tr>
          </thead><br></br>
          <tbody>
            {weeks}
          </tbody>
        </table>

        <div className="row">
        <div className="col-md-12">
            <button ref='deleteButton' className="btn materialbtn btn-red" onClick={this.deleteSchedule}>Delete This Schedule</button>
            {/*  <span className="bg-warning"><strong>(All related enrollment data will also be deleted)</strong></span> */}
        <div className="messageBox warning_info" aria-atomic="true" aria-live="polite" role="alert" tabIndex={0} style={{marginTop: 10}}><div className="messageIcon">Info</div><span>All related enrollment data will also be deleted.</span> </div>
        </div>
        </div>
      </div>
    );
  }
});

module.exports = ScheduleTable;