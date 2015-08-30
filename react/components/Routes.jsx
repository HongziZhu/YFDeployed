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
var AfternoonAcademics = require('./AfternoonAcademics.jsx');
var OtherServices = require('./OtherServices.jsx');
var WritingClass = require('./WritingClass.jsx');

var routes = (
	<Route handler={YFApp} >
		<DefaultRoute name='home' handler={Home} />
		<Route name='signup' path='/signup' handler={Signup} />
		<Route name='login' path='/login' handler={Login} />
		<Route name='getStarted' path='/user/getStarted' handler={GetStarted} />
		
		<Route name='summer/attendance' path='/user/summer/attendance' handler={Attendance} />
		<Route name='summer/enrichment_activities' path='/user/summer/enrichment_activities' handler={EnrichmentActivities} />
		<Route name='summer/afternoon_academics' path='/user/summer/afternoon_academics' handler={AfternoonAcademics} />
		<Route name='summer/other_services' path='user/summer/other_services' handler={OtherServices} />
		<Route name='summer/writing_class' path='user/summer/writing_class' handler={WritingClass} />
	</Route>
);

module.exports = routes;