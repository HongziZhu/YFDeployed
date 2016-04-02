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

          <div className="footer-left">

            <p className="footer-links">
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