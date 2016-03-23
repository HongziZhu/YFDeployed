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
    	authError: YFStore.getAuthError(),
      signUped: YFStore.getSignup()
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
    React.findDOMNode(this.refs.email).focus();
    YFStore.addChangeListener(this._onChange);
  },
  componentWillUnmount: function() {
    YFStore.removeChangeListener(this._onChange);
  },
  _onChange: function() {
  	this.setState({ authError: YFStore.getAuthError() });
  },

  render: function () {
  	var errorAlert = this.state.authError ? <div className="alert alert-danger col-sm-10" role="alert">Email or Password is wrong.</div> : <p></p>;
    
    var signUpInfo = this.state.signUped ? <p className='bg-info'>Congratulations! Sign up successfully.</p> : <p></p>

    return (
      <div className='page-container'>
      <div className='main-content loginbg col-md-12'>
      <div className="col-md-4 col-md-offset-2">
      
      <div className="panel panel-primary">
        <div className="panel-heading loginlogo">
          <div className="panel-title">
            <h3><img src="/img/yf-logo.png" alt="user-image" className="img-circle img-inline" width={60} /> <span>Yang Fan Enroll</span></h3>
          </div>
        </div>

        <div className="panel-body">
          <div className="row">
            <div className='col-md-12'> 
             
             
              <form className="-form-horizontal " onSubmit={this.handleSubmit}>


                <div className="form-group">
                  {/* <label htmlFor="email" className="col-sm-3 control-label">Email</label> */}
                  <div className="input-group margin-bottom-sm">
                    <span className="input-group-addon"><i className="fa fa-envelope-o fa-fw"></i></span>
                    <input type="email" autofocus className="form-control" ref="email" placeholder="Email"/>
                  </div>
                </div>


                <div className="form-group">
                  {/* <label htmlFor="password" className="col-sm-3 control-label">Password</label>*/}
                  <div className="input-group">
                    <span className="input-group-addon"><i className="fa fa-key fa-fw"></i></span>
                    <input type="password" maxLength="20" className="form-control" ref="password" placeholder="Password"/>
                  </div>
                </div>
                 {signUpInfo}
              {errorAlert}
                <div className="form-group">
                  <div className="input-group btn-block">
                    <button type="submit" className="btn btn-primary btn-block">Log in</button>
                  </div>
                  <br />
                  <p>Need a new account? <a href="/Signup">Create one now</a></p>
                  
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      </div>
       
      <img className="col-md-4 col-md-offset-1" src="img/yf-log-in.png" />



      </div>
      </div>
    );
  }
});

module.exports = Login;

