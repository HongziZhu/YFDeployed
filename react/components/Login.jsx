'use strict';

var React = require('react');
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;
var Navigation = Router.Navigation;
var Link = Router.Link;
var State = Router.State;
var YFActions = require('../actions/YFActions');
var YFStore = require('../stores/YFStore.jsx');

var Login = React.createClass({
	mixins: [ Navigation ],
	getInitialState: function() {
    return { 
    	authError: false
    };
  },
  handleSubmit: function (e) {
  	e.preventDefault();
  	YFStore.resetAuthError();
  	this.setState({ authError: false }, function() {
  		var self = this;
	  	var data = {
	  		email: React.findDOMNode(this.refs.email).value.trim(),
	  		password: React.findDOMNode(this.refs.password).value
	  	};
	    YFActions.login(data, function() {
	    	self.transitionTo('getStarted');
	    });
  	});
  },
  componentDidMount: function() {
    YFStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    YFStore.removeChangeListener(this._onChange);
  },
  _onChange: function() {
  	this.setState({ authError: YFStore.getAuthError() });
  },
  render: function () {
  	var errorAlert;
  	if(this.state.authError){
  		errorAlert = <div className="alert alert-danger col-sm-offset-2 col-sm-10" role="alert">Email or Password is wrong.</div>
  	} else {
  		<p>Success! </p>
  	}
    return (
    	<div className="col-md-6 col-md-offset-3">
    	{errorAlert}
    	<form className="form-horizontal " onSubmit={this.handleSubmit}>
			  <div className="form-group">
			    <label htmlFor="email" className="col-sm-2 control-label">Email</label>
			    <div className="col-sm-10">
			      <input type="email" autofocus className="form-control" ref="email" placeholder="Email"/>
			    </div>
			  </div>
			  <div className="form-group">
			    <label htmlFor="password" className="col-sm-2 control-label">Password</label>
			    <div className="col-sm-10">
			      <input type="password" className="form-control" ref="password" placeholder="Password"/>
			    </div>
			  </div>
			  <div className="form-group">
			    <div className="col-sm-offset-2 col-sm-10">
			      <button type="submit" className="btn btn-primary">Log in</button>
			    </div>
			  </div>
			</form>
			</div>
    );
  }
});

module.exports = Login;

