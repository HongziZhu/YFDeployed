'use strict';

var React = require('react');
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;
var Navigation = Router.Navigation;
var YFActions = require('../../actions/YFActions');
var YFStore = require('../../stores/YFStore.jsx');

var CourseView = React.createClass({
  render: function() {

    return (
      <div className="panel panel-info">
        <div className="panel-heading">
          <div className="panel-title">
            <h3>Activities and Classes Overview</h3>
          </div>
        </div>

        <div className="panel-body">
          <table className="dataintable" border={0} cellPadding={0} cellSpacing={0}>
            <tbody>
              <tr className="days">
                <th />
                <th>Monday</th>
                <th>Tuesday</th>
                <th>Wednesday</th>
                <th>Thursday</th>
                <th>Friday</th>
              </tr>
              <tr>
                <th className="time">8:00 AM <br />-<br /> 12:30 PM</th>
                <td className="enrichment-activity blue">Enrichment Activity</td>
                <td className="enrichment-activity blue">Enrichment Activity</td>
                <td className="enrichment-activity blue">Enrichment Activity</td>
                <td />
                <td />
              </tr>
              <tr>
                <th className="time" />
                <td />
                <td className="movie orange">Movie Trip</td>
                <td />
                <td />
                <td />
              </tr>
              <tr>
                <th className="time">1:00 PM <br />-<br /> 6:30 PM</th>
                <td className="enrichment-activity blue">Enrichment Activity</td>
                <td className="afternoon-academics green">Academics</td>
                <td className="afternoon-academics green">Academics</td>
                <td className="enrichment-activity blue">Enrichment Activity</td>
                <td className="enrichment-activity blue">Enrichment Activity</td>
              </tr>
              <tr>
                <th className="time" />
                <td className="afternoon-academics green">Academics</td>
                <td className="writing-electives red">Writing Elective Classes</td>
                <td className="gate-electives purple">GATE Elective Classes</td>
                <td className="afternoon-academics green">Academics</td>
                <td />
              </tr>
              <tr>
                <th className="time" />
                <td className="gate-electives purple">GATE Elective Classes</td>
                <td />
                <td className="math-electives brown">Math Elective Classes</td>
                <td />
                <td />
              </tr>
            </tbody>
          </table>
        </div>  
      </div>
    );
  }
}); 

module.exports = CourseView;