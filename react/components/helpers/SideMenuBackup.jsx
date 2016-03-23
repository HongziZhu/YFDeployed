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
    var self = this;
    var ProgramName = (
      (this.state.hightlight !== 'getStarted') ? 
      <li>
        <a>
          <h5><span className="title">Program Name: <ins>{YFStore.getProgramName()}</ins></span></h5>
        </a>
      </li> : <p></p>
    );
    var StudentName = (
      (this.state.hightlight !== 'getStarted') ? 
       <li>
        <a>
          <h5><span className="title">Student Name: <ins>{YFStore.getStudentFullName()}</ins></span></h5>
        </a>
      </li> : <p></p>
    );
    var GradeLine = (
      (this.state.hightlight !== 'getStarted' ) ? 
      <li>
        <a>
          <h5><span className="title">Incoming Grade: <ins>{YFStore.getIncomingGrade()}</ins></span></h5>
        </a>
      </li> : <p></p>
    );
    var schedule = 'absent';
    var ScheduleInWeek;
    if(this.state.hightlight === 'summerCampWeeks' && this.props.summerCampWeeks.length === 10){
      var curSummerWeek = this.props.summerCampWeeks[this.props.curWeekIdx];
      switch(curSummerWeek.schedulePattern) {
        case '5_full':
          schedule = '5 full weekdays';
          break;
        case '5_morning':
          schedule = '5 mornings / 8:00 AM-12:30 PM';
          break;
        case '5_afternoon':
          schedule = '5 faternoons / 1:00 PM-6:30 PM';
          break;
        case '4_full':
          schedule = '4 full days /';
          for(var j = 0; j < curSummerWeek.attendingDays.length; j++) {
            schedule = schedule + ' ' + curSummerWeek.attendingDays[j];
          }
          break;
        case '3_full':
          schedule = '3 full days /';
          for(var j = 0; j < curSummerWeek.attendingDays.length; j++) {
            schedule = schedule + ' ' + curSummerWeek.attendingDays[j];
          }
          break;
        case 'absence':
          schedule = 'absent';
          break;

        default:
          return;
      }    
    }
    ScheduleInWeek = (
      <li>
        <a>
          <h5><span className="title">Schedule: <ins>{schedule}</ins></span></h5>
        </a>
      </li>
    );
  
    return (
      <div className="sidebar-menu toggle-others fixed">
            <div className="widget" id="widget-profileinfo">
        <div className="widget-body">
          <div className="userinfo ">
            <div className="avatar pull-left">
              <img src="../img/avatar_15.png" className="img-responsive img-circle" /> 
            </div>
            <div className="information">
              <span className="username">Jonathan Smith</span>
              <span className="useremail">Summer Camp | G3</span>
            </div>
          </div>
        </div>
      </div>

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
            <hr></hr>
            {ProgramName}
            {StudentName}
            {GradeLine}
            {this.state.hightlight === 'summerCampWeeks' ? ScheduleInWeek : <p></p> }
          </ul>
        </div>
      </div>
    );
  }
});

module.exports = SideMenu;
