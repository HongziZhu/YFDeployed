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

var GradeBox = React.createClass({
  render: function() {
    return (
      <div className="panel panel-primary">
        <div className="panel-heading">
          <strong>Select Incoming Grade For {this.props.stu_fname}</strong>
        </div>
        <div className="panel-body">
          <select className="form-control" onChange={this.props.handleChange}>
            <option value='K'>K</option>
            <option value='G1'>G1</option>
            <option>G2</option>
            <option>G3</option>
            <option>G4</option>
            <option>G5</option>
            <option>G6</option>
            <option>G7</option>
            <option>G8</option>
            <option>G9</option>
            <option>G10</option>
            <option>G11</option>
            <option>G12</option>
          </select> 
        </div>
      </div>
    );
  }
});

var GetStarted = React.createClass({
	mixins: [ Navigation ],
	getInitialState: function() {
    return { 
      user: {},
      students: [],
      selectedIndex: 0,
      showGrade: false,
      grade: ''
    };
  },
  componentDidMount: function() {
    var self = this;
    this.setState({ user: YFStore.getUser() }, function() {
      YFActions.findStudentsById(self.state.user._id, function(students) {
        self.setState({ students: students });
      });
    }); 
  },
  handleSelectStudent: function(e) {
    this.setState({ selectedIndex: e.currentTarget.value });
  },
  showGradeBox: function(e) {
    e.preventDefault();
    this.setState({ showGrade: true });
    React.findDOMNode(this.refs.stu_btn).blur();
  },
  handleSelectGrade: function(e) {
    e.preventDefault();
    this.setState({ grade: e.currentTarget.value });
  },

  render: function () {
    var studentRows = [];
    for (var i = 0; i < this.state.students.length; i++) {
      if(i === 0){
        studentRows.push(
          <div className="radio" key={i} >
            <label><input type="radio" name='student' defaultChecked value={i} onChange={this.handleSelectStudent}/>{this.state.students[i].firstName}</label>
          </div>);
      } else {
        studentRows.push(
          <div className="radio" key={i}>
            <label><input type="radio" name='student' value={i} onChange={this.handleSelectStudent} />{this.state.students[i].firstName}</label>
          </div>);
      }
    }

    return (
      <div>
      <div className="panel panel-primary">
        <div className="panel-heading">
          <strong>Select Your Child</strong>
        </div>
        <div className="panel-body">
          {studentRows}
          <button type="button" className="btn btn-primary" ref='stu_btn' onClick={this.showGradeBox}>Confirm</button>
        </div>
      </div>
      {this.state.showGrade ? <GradeBox stu_fname={this.state.students[this.state.selectedIndex].firstName} handleChange={this.handleSelectGrade} /> : <p></p> }
      </div>
    );
  } 
});

module.exports = GetStarted;