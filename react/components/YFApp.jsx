'use strict';

var React = require('react');
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;
var Navigation = Router.Navigation;
var YFActions = require('../actions/YFActions');
var YFStore = require('../stores/YFStore.jsx');
var CourseView = require('./helpers/CourseView.jsx');
var Footer = require('./helpers/Footer.jsx');
var Profile = require('./Profile.jsx');
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
      this.transitionTo('login');
    }
  },

  toProfile: function(e) {
    this.transitionTo('profile');
  },

  render: function() {
    return (
      <div>
        {this.state.loggedIn ?
        <nav className="navbar navbar-default navbar-fixed-top">
          <div>
            <div className="navbar-header">
              <a className="navbar-brand" >
                <img src="/img/yf-logo.png" alt="user-image" className="img-circle img-inline" width={40} />
                <h4>Yang Fan Enroll</h4>
              </a>
            </div>
      <ul className="nav navbar-nav"> 
        <li className="dropdown"> 
          <a id="drop1" href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false"> Course Overview <span className="caret" /> 
          </a> 
           {/*
          <ul className="dropdown-menu" aria-labelledby="drop1"> 
            <li><a href="#">Action</a></li> 
            <li><a href="#">Another action</a></li> 
            <li><a href="#">Something else here</a></li> 
            <li role="separator" className="divider" /> 
            <li><a href="#">Separated link</a></li> 
          </ul> */}
          <div className="dropdown-menu coursedrop" aria-labelledby="drop1">
          <CourseView />
          </div>
        </li> 
      </ul>               {/* Modal */}
<div className="modal fade bs-example-modal-lg" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
  <div className="modal-dialog modal-lg">
    <div className="modal-content">
      <div className="modal-header">
        <button type="button" className="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span className="sr-only">Close</span></button>
        <h4 className="modal-title" id="myModalLabel">Edit Profile</h4>
      </div>
      <div className="modal-body">
        <Profile />
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
        <button type="button" className="btn btn-primary">Save changes</button>
      </div>
    </div>
  </div>
</div>

            {/*{this.state.loggedIn ?   */}
            <ul className="nav navbar-nav navbar-right">
              <li className="dropdown">
                <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
                {this.state.user.email} <span className="caret" /></a>
                <ul className="dropdown-menu">
                  <li>
                    <a href='/user/profile'>Edit Profile</a>
                  </li>
                  <li>
                    <a data-toggle="modal" data-target=".bs-example-modal-lg">Model</a>
                  </li>
                  <li>
                    <a onClick={this.handleLogout}>Log Out
                    </a>
                  </li>
                </ul>
              </li>
            </ul>
            {/* :  <a className="navbar-remaining"></a>   }  */}


          </div>
        </nav> : <span></span>}
        
        <div>
          <RouteHandler />
        </div>
{this.state.loggedIn ?
        <Footer />: <span></span>}
 
        



      </div>
    );
  },

  _onChange: function() {
    this.setState({ user: YFStore.getUser(), loggedIn: YFStore.getLoggedIn() });
  }
});

module.exports = YFApp;