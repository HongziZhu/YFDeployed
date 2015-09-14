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
        <footer className="footer-distributed">

          <div className="footer-right">

            <a href="#"><i className="fa fa-facebook"></i></a>
            <a href="#"><i className="fa fa-twitter"></i></a>
            <a href="#"><i className="fa fa-linkedin"></i></a>
            <a href="#"><i className="fa fa-github"></i></a>

          </div>

          <div className="footer-left">

            <p className="footer-links">
              <a href="#">Home</a>
              &nbsp;·&nbsp;
              <a href="#">Blog</a>
              &nbsp;·&nbsp;
              <a href="#">About</a>
              &nbsp;·&nbsp;
              <a href="#">Contact</a>
            </p>

            <p>Yang Fan Academy &copy; 2015</p>
            <p>Developed By Haoran Jia, Shawn Cai, Peipei Wang, Emma Zhu</p>
          </div>

        </footer>
      </div>
    );
  }
});

module.exports = Footer;