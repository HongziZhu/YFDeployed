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
        <SideMenu />
        <div className="col-md-12">
          <div className="lead">
            Welcome to YangFan Enrollment System!  
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
