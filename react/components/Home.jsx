'use strict';

var React=require('react');

var Home = React.createClass({
  render: function () {
    return (
      <div className="row">
        <div className="col-sm-12">
          <h2>YangFan Enrollment System</h2>
          <div className="lead">
            Welcome!  
          </div>
        </div>
      </div>
    );
  }
});

module.exports = Home;
