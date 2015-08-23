'use strict';

var React = require('react');
var Router = require('react-router');
var routes = require('./components/Routes.jsx');


// React.render(
//   <TodoApp />,
//   document.getElementById('react')
// );

if (typeof window !== 'undefined') {
	window.onload = function() {
		Router.run(routes, Router.HistoryLocation, function (Root) {
			React.render(<Root />, document.getElementById('react'));
		});
	};
}