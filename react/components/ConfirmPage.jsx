'use strict';

var React = require('react');
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;
var Navigation = Router.Navigation;
var YFActions = require('../actions/YFActions');
var YFStore = require('../stores/YFStore.jsx');

var ConfirmPage = React.createClass({
  mixins: [ Navigation ],
  getInitialState: function() {
    YFActions.loadEnrollment();
    return { 
      incomingGrade: YFStore.getIncomingGrade(),
      done: false,
      summerCampWeeks: YFStore.getSummerCampWeeks()
    };
  },
  componentDidMount: function() {
    YFStore.addChangeListener(this._onChange);
  },
  componentWillUnmount: function() {
    YFStore.removeChangeListener(this._onChange);
  },
  _onChange: function() {
    this.setState({
      summerCampWeeks: YFStore.getSummerCampWeeks()
    });
  },
  handleConfirm: function(e) {
    e.preventDefault();
    this.setState({ done: true });
  },
  handleContinue: function(e) {
    var self = this;
  },

  render: function () {
    var self = this;
    return (
      <div className='col-md-9 col-md-offset-3'>
      <h2>Preview of your Summer Camp Enrollment</h2>

        <div className="row">
          <div className='col-md-offset-1'>
            <button onClick={this.handleConfirm} ref='confirmButton' className="btn btn-primary">Confirm</button>&nbsp; <br></br>
          </div>
        </div>

        {this.state.done ? <button type="button" className="col-md-offset-10 btn btn-success" onClick={this.handleContinue}>Continue</button> : <p></p>}
      </div>
    );
  } 
});

module.exports = ConfirmPage;