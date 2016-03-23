'use strict';

var React = require('react');
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;
var Navigation = Router.Navigation;
var YFActions = require('../actions/YFActions');
var YFStore = require('../stores/YFStore.jsx');

var Footer = require('./helpers/Footer.jsx');
/** Tips: We often pass the entire state of the store down the chain of views in a single object, allowing different descendants to use what they need.
**/
var YFApp = React.createClass({
  mixins: [ Navigation ],
  getInitialState: function() {
    YFStore.getUserFromStorage();
    return {
      user: YFStore.getUser(),
      loggedIn: YFStore.getLoggedIn()
    };
  },

  componentDidMount: function() {
    YFStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    YFStore.removeChangeListener(this._onChange);
  },

  handleLogout: function(e) {
    if(confirm('Are you sure to log out?') == true){
      YFActions.logout();
      this.transitionTo('home');
    }
  },

  toProfile: function(e) {
    this.transitionTo('profile');
  },

  render: function() {
    return (
      <div>
        <nav className="navbar navbar-default navbar-fixed-top">
          <div>
            <div className="navbar-header">
              <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
                <span className="sr-only">Toggle navigation</span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
              </button>
              <a className="navbar-brand" href="/">
                <img src="/img/logo.png" alt="user-image" className="img-circle img-inline" width={28} />
                <h4>Yang Fan Enrollment</h4>
              </a>
            </div>

            {this.state.loggedIn ? 
            <ul className="nav navbar-nav navbar-right">
              <li className="dropdown">
                <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
                {this.state.user.email} <span className="caret" /></a>
                <ul className="dropdown-menu">
                  <li>
                    <a href='/user/profile'>&nbsp;&nbsp;&nbsp;&nbsp;Edit Profile</a>
                  </li>
                  <li>
                    <button className='col-md-offset-3 btn btn-primary' onClick={this.handleLogout}>Log out
                    </button>
                  </li>
                </ul>
              </li>
            </ul>
            :
            <p></p>}

          </div>
        </nav>
        
        <div>
          <RouteHandler />
        </div>

        <Footer />
      </div>
    );
  },

  _onChange: function() {
    this.setState({ user: YFStore.getUser(), loggedIn: YFStore.getLoggedIn() });
  }
});

module.exports = YFApp;