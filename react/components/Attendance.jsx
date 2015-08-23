'use strict';

var React=require('react');

var Attendance = React.createClass({
  render: function () {
    
    return (
      <div className="row">
        <div className="col-sm-12">
          <h2>YangFan Enrollment System</h2>
          <div className="lead">
            Welcome!  
          </div>
          <input type="submit" value="Submit"/>
        </div>
      </div>
    );
  }
});

module.exports = Attendance;
