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
var AfternoonAcademics = require('./AfternoonAcademics.jsx');
var OtherServices = require('./OtherServices.jsx');
var SummerAgreements = require('./SummerAgreements.jsx');
var Week1 = require('./Week1.jsx');
var Week2 = require('./Week2.jsx');
var Week3 = require('./Week3.jsx');
var Week4 = require('./Week4.jsx');
var Week5 = require('./Week5.jsx');
var Week6 = require('./Week6.jsx');
var Week7 = require('./Week7.jsx');
var Week8 = require('./Week8.jsx');
var Week9 = require('./Week9.jsx');
var Week10 = require('./Week10.jsx');
var ConfirmPage = require('./ConfirmPage.jsx');
var CompletePage = require('./CompletePage.jsx');

var routes = (
	<Route handler={YFApp} >
		<DefaultRoute name='home' handler={Home} />
		<Route name='signup' path='/signup' handler={Signup} />
		<Route name='login' path='/login' handler={Login} />
		<Route name='getStarted' path='/user/getStarted' handler={GetStarted} />
		
		<Route name='summer/attendance' path='/user/summer/attendance' handler={Attendance} />
		<Route name='summer/afternoon_academics' path='/user/summer/afternoon_academics' handler={AfternoonAcademics} />

		<Route name='summer/week1' path='/user/summer/week1' handler={Week1} />
		<Route name='summer/week2' path='/user/summer/week2' handler={Week2} />
		<Route name='summer/week3' path='/user/summer/week3' handler={Week3} />
		<Route name='summer/week4' path='/user/summer/week4' handler={Week4} />
		<Route name='summer/week5' path='/user/summer/week5' handler={Week5} />
		<Route name='summer/week6' path='/user/summer/week6' handler={Week6} />
		<Route name='summer/week7' path='/user/summer/week7' handler={Week7} />
		<Route name='summer/week8' path='/user/summer/week8' handler={Week8} />
		<Route name='summer/week9' path='/user/summer/week9' handler={Week9} />
		<Route name='summer/week10' path='/user/summer/week10' handler={Week10} />

		<Route name='summer/other_services' path='user/summer/other_services' handler={OtherServices} />
		<Route name='summer/agreements' path='user/summer/agreements' handler={SummerAgreements} />
		<Route name='summer/confirm' path='user/summer/confirm' handler={ConfirmPage} />
		<Route name='summer/complete' path='user/summer/complete' handler={CompletePage} />
	</Route>
);

module.exports = routes;