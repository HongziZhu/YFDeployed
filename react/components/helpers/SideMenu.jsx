'use strict';

var React=require('react');
var YFActions = require('../../actions/YFActions');
var YFStore = require('../../stores/YFStore.jsx');

var SideMenu = React.createClass({
  getInitialState: function () {
    return {
      hightlight: YFStore.getSideHighlight()
    };
  },
  render: function () {

    return (
      <div className="sidebar-menu toggle-others fixed">
        <div className="sidebar-menu-inner">  
          <ul id="main-menu" className="main-menu">
            {this.state.hightlight === 'getStarted' ?
            <li className="active opened active">
              <a>
                <i className="linecons-paper-plane" />
                <span className="title">Get Started</span>
              </a>
            </li> :
            <li>
              <a>
                <i className="linecons-paper-plane" />
                <span className="title">Get Started</span>
              </a>
            </li>}
            {this.state.hightlight === 'attendence' ?
            <li className="active opened active">
              <a>
                <i className="linecons-calendar" />
                <span className="title">Schedule Attendence</span>
              </a>
            </li> :
            <li>
              <a>
                <i className="linecons-calendar" />
                <span className="title">Schedule Attendence</span>
              </a>
            </li>}
            {this.state.hightlight === 'afternoonAcademics' ?
            <li className="active opened active">
              <a>
                <i className="linecons-pencil" />
                <span className="title">Afternoon Academics</span>
              </a>
            </li> :
            <li>
              <a>
                <i className="linecons-pencil" />
                <span className="title">Afternoon Academics</span>
              </a>
            </li>}
            {this.state.hightlight === 'summerCampWeeks' ?
            <li className="active opened active">
              <a>
                <i className="linecons-shop" />
                <span className="title">Summer Camp Weeks</span>
              </a>
            </li> :
            <li>
              <a>
                <i className="linecons-shop" />
                <span className="title">Summer Camp Weeks</span>
              </a>
            </li>}
            {this.state.hightlight === 'otherServices' ?
            <li className="active opened active">
              <a>
                <i className="linecons-food" />
                <span className="title">Other Services</span>
              </a>
            </li> :
            <li>
              <a>
                <i className="linecons-food" />
                <span className="title">Other Services</span>
              </a>
            </li>}
            {this.state.hightlight === 'agreements' ?
            <li className="active opened active">
              <a>
                <i className="linecons-doc" />
                <span className="title">Agreements</span>
              </a>
            </li> :
            <li>
              <a>
                <i className="linecons-doc" />
                <span className="title">Agreements</span>
              </a>
            </li>}
            {this.state.hightlight === 'confirm' ?
            <li className="active opened active">
              <a>
                <i className="linecons-attach" />
                <span className="title">Confirmation</span>
              </a>
            </li> :
            <li>
              <a>
                <i className="linecons-attach" />
                <span className="title">Confirmation</span>
              </a>
            </li>}
          </ul>
        </div>
      </div>
    );
  }
});

module.exports = SideMenu;
