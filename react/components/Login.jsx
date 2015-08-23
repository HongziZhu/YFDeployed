'use strict';

var React = require('react');
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;
var Navigation = Router.Navigation;
var Link = Router.Link;
var State = Router.State;
var Formsy = require('formsy-react');
var YFActions = require('../actions/YFActions');
var YFStore = require('../stores/YFStore.jsx');

var Login = React.createClass({
	mixins: [ Navigation ],
	getInitialState: function() {
    return { 
    	canSubmit: false,
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
  // enableButton: function () {
  //   this.setState({
  //     canSubmit: true
  //   });
  // },
  // disableButton: function () {
  //   this.setState({
  //     canSubmit: false
  //   });
  // },
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
    	<div>
    	{errorAlert}
    	<form className="form-horizontal" onSubmit={this.handleSubmit}>
			  <div className="form-group">
			    <label htmlFor="email" className="col-sm-2 control-label">Email</label>
			    <div className="col-sm-10">
			      <input type="email" className="form-control" ref="email" placeholder="Email"/>
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

var MyOwnInput = React.createClass({

  // Add the Formsy Mixin
  mixins: [Formsy.Mixin],

  // setValue() will set the value of the component, which in
  // turn will validate it and the rest of the form
  changeValue: function (event) {
    this.setValue(event.currentTarget.value);
  },
  render: function () {

    // Set a specific className based on the validation
    // state of this component. showRequired() is true
    // when the value is empty and the required prop is
    // passed to the input. showError() is true when the
    // value typed is invalid
    var className = this.props.className + ' ' + (this.showRequired() ? 'required' : this.showError() ? 'error' : null);

    // An error message is returned ONLY if the component is invalid
    // or the server has returned an error message
    var errorMessage = this.getErrorMessage();

    return (
      <div className='form-group'>
        <label htmlFor={this.props.name} className="col-sm-2 control-label">{this.props.title}</label>
        <div className="col-sm-6">
	        <input className="form-control" type={this.props.type || 'text'} name={this.props.name} onChange={this.changeValue} value={this.getValue()}/>        
	      </div>
	      <span className='validation-error badge'>{errorMessage}</span>
      </div>
    );
  }
});
// <Formsy.Form onSubmit={this.handleSubmit} onValid={this.enableButton} onInvalid={this.disableButton} className="form-horizontal">
//         <MyOwnInput name="email" title="Email" validations="isEmail" validationError="Invalid Email Address." required />
//         <MyOwnInput name="password" title="Password" type="password" required />
        
//         <div className="form-group">
// 			    <div className="col-sm-offset-2 col-sm-10">
// 			      <button type="submit" className="btn btn-primary" disabled={!this.state.canSubmit}>Log in</button>
// 			    </div>
// 			  </div>
//       </Formsy.Form>
module.exports = Login;

