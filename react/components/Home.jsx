'use strict';

var React=require('react');

//Home is component created by React.JS
var Home = React.createClass({
  render: function () {
    //in render function, all the html/css are in the return brackets.
    //Diff: 1. class -> className; 2. for -> htmlFor; 3. <input ..... />;  4. <br> -> <br></br>
    //5. a single element to contain the render stuff
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

module.exports = Home;
