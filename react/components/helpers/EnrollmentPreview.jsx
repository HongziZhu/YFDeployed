'use strict';

var React = require('react');
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;
var Navigation = Router.Navigation;
var YFActions = require('../../actions/YFActions');
var YFStore = require('../../stores/YFStore.jsx');
var results = require('../../../lib/EnrollResults.json');

var EnrollmentPreview = React.createClass({
  render: function() {
    var weekRows = [];
    var obj;
    if(this.props.summerCampWeeks.length === 10){
      for(var j = 0; j < this.props.summerCampWeeks.length; j++) {
        obj = this.props.summerCampWeeks[j];
        weekRows.push(
          <tr key={j}>
            <td className='cell'>
              {obj['weekIndex']}
            </td>
            <td className='cell'>{obj['coveredDate']}</td>
            <td className='cell'>{obj['schedulePattern']}</td>
            <td className='cell'>{obj['attendingDays']}</td>
            <td className='cell'>{obj['extendedCare']['category']}</td>
            <td className='cell'>{obj['enrichmentActs']['morning']['activityName'] || ''}</td>
            <td className='cell'>{obj['enrichmentActs']['afternoon']['activityName'] || ''}</td>
            <td className='cell'>{obj['movie']['isAttend']}</td>
            <td className='cell'>{obj['afternoonAcademics']['language']}</td>
            <td className='cell'>
              <ul>
              {obj['writingElective']['isAttend'] ? <li>Writing Elective</li> : <span></span>}
              {obj['mathElective']['isAttend'] ? <li>Math Elective</li> : <span></span>}
              {obj['advWriting']['isAttend'] ? <li>Advanced Writing</li> : <span></span>}
              {obj['advMath']['isAttend'] ? <li>Advanced Math</li> : <span></span>}
              {obj['mathOlympiad']['isAttend'] ? <li>Math Olympiad</li> : <span></span>}
              {obj['GATE']['isAttend'] ? <li>GATE</li> : <span></span>}
              </ul>
            </td>
          </tr>
        );
      }
    }
    return (
      <table className="dataintable" border={0} cellPadding={0} cellSpacing={0}>
        <thead>
          <tr>
            <th className='time'>Week #</th>
            <th className='time'>Covered Date</th>
            <th className='time'>Schedule</th>
            <th className='time'>Days Attending</th>
            <th className='time'>Extended Care</th>
            <th className='time'>Morning Enrichment</th>
            <th className='time'>Afternoon Enrichment</th>
            <th className='time'>Movie</th>
            <th className='time'>Language Art</th>
            <th className='time'>Afternoon Acedemics</th>
          </tr>
        </thead>

        <tbody>
          {weekRows}
        </tbody>
      </table>
      );
}
}); 

module.exports = EnrollmentPreview;