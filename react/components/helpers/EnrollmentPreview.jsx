'use strict';

var React = require('react');
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;
var Navigation = Router.Navigation;
var YFActions = require('../../actions/YFActions');
var YFStore = require('../../stores/YFStore.jsx');
var results = require('../../../lib/EnrollResults.json');

var EnrollmentPreview = React.createClass({
  render: function() {
    var weekRows = [];
    
    return (
      <table className="dataintable" border={0} cellPadding={0} cellSpacing={0}>
        <thead>
          <tr>
            <th>Week #</th>
            <th>Covered Date</th>
            <th>Schedule</th>
            <th>Days Attending</th>
            <th>Extended Care</th>
            <th>Morning Enrichment</th>
            <th>Afternoon Enrichment</th>
            <th>Movie</th>
            <th>Language Art</th>
            <th>Afternoon Acedemics</th>
          </tr>
        </thead>

        <tbody>
          
        </tbody>
      </table>
      );
}
}); 

module.exports = EnrollmentPreview;