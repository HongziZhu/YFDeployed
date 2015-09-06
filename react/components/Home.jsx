'use strict';
var SideMenu = require('./helpers/SideMenu.jsx');

var React=require('react');

//Home is component created by React.JS
var Home = React.createClass({
  render: function () {
    //in render function, all the html/css are in the return brackets.
    //Diff: 1. class -> className; 2. for -> htmlFor; 3. <input ..... />;  4. <br> -> <br></br>
    //5. a single element to contain the render stuff
    return (
      <div className="page-container">
        <div className="col-md-12">
          <div className="lead">
            Welcome to YangFan Enrollment System!  
          </div>
          <div>
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
          </tbody></table>
      </div>
                
        </div>
<footer className="main-footer sticky footer-type-1">
        <div className="footer-inner">
          {/* Add your copyright text here */}
          <div className="footer-text">
            © 2015
            <strong>Yang Fan Academy</strong> 
          </div>
          {/* Go to Top Link, just add rel="go-top" to any link to add this functionality */}
          <div className="go-up">
            <a href="#" rel="go-top">
              <i className="fa-angle-up" />
            </a>
          </div>
        </div>
      </footer>
      </div>
    );
  }
});

module.exports = Home;
