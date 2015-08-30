'use strict';

var React = require('react');
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;
var Navigation = Router.Navigation;
var YFActions = require('../actions/YFActions');
var YFStore = require('../stores/YFStore.jsx');
var writingElective = require('../../lib/summer/afternoonWritingElective.json');

var WritingClass = React.createClass({
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
  handleSubmit: function(e) {
    e.preventDefault();
    this.setState({ done: true });
  },
  handleContinue: function(e) {
    var self = this;
    YFActions.saveOtherServices(self.state.language, function() {
      self.transitionTo('summer/writing_class');
    });
  },

  render: function () {
    var self = this;
    return (
      <div className='col-md-9 col-md-offset-3'>
      <h2>Writing Classes</h2>
        {movies[1].grade.indexOf(this.state.incomingGrade) > -1 ? <MovieBox summerCampWeeks={this.state.summerCampWeeks}/> : <p></p>}


        <div className="row">
          <div className='col-md-offset-1'>
            <button onClick={this.handleSubmit} ref='submitButton' className="btn btn-primary">Submit</button>&nbsp; <br></br>
          </div>
        </div>

        {this.state.done ? <button type="button" className="col-md-offset-10 btn btn-success" onClick={this.handleContinue}>Continue</button> : <p></p>}
      </div>
    );
  } 
});

module.exports = WritingClass;