'use strict';

var React = require('react');
var Router = require('react-router');
var Route = Router.Route;
var DefaultRoute = Router.DefaultRoute;
var RouteHandler = Router.RouteHandler;

var YFApp = require('./YFApp.jsx');
var Signup = require('./Signup.jsx');
var Login = require('./Login.jsx');
var Home = require('./Home.jsx');
var GetStarted = require('./GetStarted.jsx');
var Attendance = require('./Attendance.jsx');
var EnrichmentActivities = require('./EnrichmentActivities.jsx');

var routes = (
	<Route handler={YFApp} >
		<Route name='signup' path='/signup' handler={Signup} />
		<Route name='login' path='/login' handler={Login} />
		<Route name='getStarted' path='/user/getStarted' handler={GetStarted} />
		<Route name='attendance' path='/user/attendance' handler={Attendance} />
		<Route name='enrichment_activities' path='/user/enrichment_activities' handler={EnrichmentActivities} />
		<DefaultRoute name='home' handler={Home} />
	</Route>
);

module.exports = routes;