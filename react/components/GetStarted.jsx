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
            <option value='G2'>G2</option>
            <option value='G3'>G3</option>
            <option value='G4'>G4</option>
            <option value='G5'>G5</option>
            <option value='G6'>G6</option>
            <option value='G7'>G7</option>
            <option value='G8'>G8</option>
            <option value='G9'>G9</option>
            <option value='G10'>G10</option>
            <option value='G11'>G11</option>
            <option value='G12'>G12</option>
          </select> 
          <br></br>
          <button type="button" className="btn btn-info" ref='stu_btn' onClick={this.props.showContinue}>Confirm</button>
        </div>
      </div>
    );
  }
});

var GetStarted = React.createClass({
  mixins: [ Navigation ],
  getInitialState: function() {
    return { 
      user: YFStore.getUser(),
      students: [],
      program: 'Summer Camp',
      selectedIndex: 0, //which student
      incomingGrade: 'K',
      showGrade: false,
      showChild: false,
      showContinue: false
    };
  },
  componentDidMount: function() {
    var self = this;
    // this.setState({ user: YFStore.getUser() }, function() {
    //   YFActions.findStudentsById(self.state.user._id, function(students) {
    //     self.setState({ students: students });
    //   });
    // });
    YFStore.addChangeListener(self._onChange);
  },
  componentWillUnmount: function() {
    YFStore.removeChangeListener(this._onChange);
  },
  handleSelectProgram: function(e) {
    this.setState({ program: e.currentTarget.value });
  },
  handleSelectStudent: function(e) {
    this.setState({ selectedIndex: e.currentTarget.value });
  },
  showChildBox: function(e) {
    e.preventDefault();
    this.setState({ showChild: true });
    React.findDOMNode(this.refs.program_btn).blur();
  },
  showGradeBox: function(e) {
    e.preventDefault();
    this.setState({ showGrade: true });
    React.findDOMNode(this.refs.stu_btn).blur();
  },
  handleSelectGrade: function(e) {
    e.preventDefault();
    this.setState({ incomingGrade: e.currentTarget.value });
  },
  handleContinue: function(e) {
    e.preventDefault();
    YFStore.setIncomingGradeAndIndex(this.state.incomingGrade, this.state.selectedIndex);
    this.transitionTo('attendance');
  },
  showContinue: function(e) {
    e.preventDefault();
    this.setState({ showContinue: true });
  },
  _onChange: function() {
    this.setState({ user: YFStore.getUser(), students: YFStore.getStudents() });
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
      <div className="col-md-6 col-md-offset-3">
      <div className="panel panel-primary">
        <div className="panel-heading">
          <strong>Select the Program to Enroll</strong>
        </div>
        <div className="panel-body">
          <div className="radio">
            <label><input type="radio" onChange={this.handleSelectProgram} value="Summer Camp" name='program' defaultChecked/>Summer Camp</label>
          </div>
          <div className="radio">
            <label><input type="radio" onChange={this.handleSelectProgram} value="After School" name='program' />After School</label>
          </div>
          <div className="radio">
            <label><input type="radio" onChange={this.handleSelectProgram} value="Elective and Enrichment" name='program' />Elective and Enrichment</label>
          </div>

          <button type="button" className="btn btn-info" ref='program_btn' onClick={this.showChildBox}>Confirm</button>
        </div>
      </div>


      {this.state.showChild ? 
      <div className="panel panel-primary">
        <div className="panel-heading">
          <strong>Select Your Child</strong>
        </div>
        <div className="panel-body">
          {studentRows}
          <button type="button" className="btn btn-info" ref='stu_btn' onClick={this.showGradeBox}>Confirm</button>
        </div>
      </div> : <p></p>}

      {this.state.showGrade ? <GradeBox 
        stu_fname={this.state.students[this.state.selectedIndex].firstName} 
        handleChange={this.handleSelectGrade} 
        showContinue={this.showContinue} /> : <p></p> }

      {this.state.showContinue ? <button type="button" className="col-md-offset-10 btn btn-success" onClick={this.handleContinue}>Continue</button> : <p></p>}
      </div>
    );
  } 
});

module.exports = GetStarted;
