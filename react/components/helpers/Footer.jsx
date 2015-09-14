'use strict';

var React = require('react');
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;
var Navigation = Router.Navigation;
var YFActions = require('../../actions/YFActions');
var YFStore = require('../../stores/YFStore.jsx');

var Footer = React.createClass({
  render: function() {
    return (
      <div>
        <footer className="main-footer sticky footer-type-1" style={{}}>
          <div className="footer-inner">
            {/* Add your copyright text here */}
            <div className="footer-text">
              
              © 2015 
              
              <a href="http://yangfanacademy.org" target="_blank"><strong> Yang Fan Academy </strong></a>
               
              
              designed and developed by 
              
             <a href="http://justcodeit.net" target="_blank"><strong><strong> JustCodeIt Team</strong></strong></a>       
        
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

module.exports = Footer;