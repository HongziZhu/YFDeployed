'use strict';

var React = require('react');
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;
var Navigation = Router.Navigation;
var YFActions = require('../actions/YFActions');
var YFStore = require('../stores/YFStore.jsx');

var CourseView = React.createClass({
  render: function() {

    return (
      <div className="panel panel-default">
        <div className="panel-heading">
          <div className="panel-title">
            <h3>Activities and Classes Overview</h3>
          </div>
        </div>

        <div className="panel-body">
          <table className="dataintable" >
            <tbody><tr>
            <th style={{width: '5%'}}></th>
            <th style={{width: '19%'}}>Monday</th>
            <th style={{width: '19%'}}>Tuesday</th>
            <th style={{width: '19%'}}>Wednesday</th>
            <th style={{width: '19%'}}>Thursday</th>
            <th style={{width: '19%'}}>Friday</th>
            </tr>

            <tr>
            <th>AM</th>
            <td>
                <ul>
                    <li><span className = "morning-care">Morning Extended Care</span></li>
                    <li><span className = "enrichment-activity">Morning Enrichment Activity</span></li>
                </ul>
            </td>
            <td>
              <ul>
                <li><span className = "morning-care">Morning Extended Care</span></li>
                <li><span className = "enrichment-activity">Morning Enrichment Activity</span></li>
                <li><span className = "movie">Movie Trip</span></li>
              </ul>
             </td>

            <td>
              <ul>
              <li><span className = "morning-care">Morning Extended Care</span></li>
              <li>circle</li>
              </ul>
            </td>
            <td>
              <ul>
              <li><span className = "morning-care">Morning Extended Care</span></li>
              <li>circle</li>
              </ul>
            </td>
            <td>
              <ul>
              <li><span className = "morning-care">Morning Extended Care</span></li>
              <li><span className = "enrichment-activity">Morning Enrichment Activity</span></li>
              <li>circle</li>
              </ul>
            </td>
            </tr>

            <tr>
            <th>PM</th>
            <td><ul>
                <li><span className = "enrichment-activity">Afternoon Enrichment Activity</span></li>
              <li><span className = "afternoon-academics">Afternoon Academics</span></li>
              <li><span className = "electives">Elective Classes</span></li>
                </ul></td>
            <td>
              <ul>
              <li><span className = "afternoon-academics">Afternoon Academics</span></li>
              <li><span className = "electives">Elective Classes</span></li>
              <li>circle</li>
              </ul>
            </td>
            <td>
              <ul>
              <li><span className = "afternoon-academics">Afternoon Academics</span></li>
              <li><span className = "electives">Elective Classes</span></li>
              <li>circle</li>
              </ul>
            </td>
            <td><ul>
                <li><span className = "enrichment-activity">Afternoon Enrichment Activity</span></li>
              <li><span className = "afternoon-academics">Afternoon Academics</span></li>
              <li><span className = "electives">Elective Classes</span></li>
                </ul></td>
            <td><ul>
                <li><span className = "enrichment-activity">Afternoon Enrichment Activity</span></li>
              <li>square</li>
              <li>circle</li>
                </ul></td>
            </tr>
            </tbody></table>
          </div> 
        </div>
      );
  }
}); 

module.exports = CourseView;