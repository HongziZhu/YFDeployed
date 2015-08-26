'use strict';

var React = require('react');
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;
var Navigation = Router.Navigation;
var YFActions = require('../actions/YFActions');
var YFStore = require('../stores/YFStore.jsx');

var EnrichmentActivities = React.createClass({
  mixins: [ Navigation ],
  getInitialState: function() {
    return { 
      x: ''
    };
  },
  componentDidMount: function() {
    var self = this;
  },

  render: function () {
    return (
      <p>EnrichmentActivities</p>
    );
  } 
});

module.exports = EnrichmentActivities;
