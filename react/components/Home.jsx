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
        <div className="col-md-offset-3 col-md-9">
          <div className="page-header">
            <h1>Welcome to Yang Fan Enrollment System!</h1>
            <hr></hr>
            <h1>Please &nbsp;
              <a href='/login' className='btn btn-success btn-lg'>Log in</a>
              &nbsp; or &nbsp;
              <a href='/signup' className='btn btn-primary btn-lg'>Sign up</a>
            </h1> 
          </div>
        </div>
      </div>
    );
  }
});

module.exports = Home;
