'use strict';

var React=require('react');

var SideMenu = React.createClass({
  render: function () {

    return (
      <div className="sidebar-menu toggle-others fixed">
        <div className="sidebar-menu-inner">  
          <ul id="main-menu" className="main-menu">
            <li>
              <a>
                <i className="linecons-cog" />
                <span className="title">Get Started</span>
              </a>
            </li>
            <li>
              <a>
                <i className="linecons-desktop" />
                <span className="title">Attendance</span>
              </a>
            </li>
            <li>
              <a>
                <i className="linecons-note" />
                <span className="title">Enrichment Activities</span>
              </a>
            </li>
            <li>
              <a>
                <i className="linecons-database" />
                <span className="title">Afternoon Academics</span>
              </a>
            </li>
            <li className="active opened active">
              <a>
                <i className="linecons-cog" />
                <span className="title">Writing Classes</span>
              </a>
            </li>
            <li>
              <a>
                <i className="linecons-cog" />
                <span className="title">Math Classes</span>
              </a>
            </li>
            <li>
              <a>
                <i className="linecons-cog" />
                <span className="title">GATE Elective</span>
              </a>
            </li>
            <li>
              <a>
                <i className="linecons-params" />
                <span className="title">Other Services and Activitie</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    );
  }
});

module.exports = SideMenu;
