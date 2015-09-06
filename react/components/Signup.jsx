'use strict';

var React = require('react');
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;
var Navigation = Router.Navigation;
var Link = Router.Link;
var State = Router.State;
var YFActions = require('../actions/YFActions');
var request = require('superagent');
var Formsy = require('formsy-react');

var Signup = React.createClass({
  mixins: [ Navigation ],
	getInitialState: function() {
		return { 
      done: false,
      studentsNum: 1
    };
	},
  addStudent: function(e) {
    e.preventDefault();
    var self = this;
    var s = this.state.studentsNum + 1;
    this.setState({ studentsNum: s });
  },
  handleConfirm: function(e) {
    e.preventDefault();
    var password = React.findDOMNode(this.refs.password).value;
    var password2 = React.findDOMNode(this.refs.password2).value;
    if(password !== password2){
      alert('Passwords Not Match!');
      React.findDOMNode(this.refs.password).focus();
    } else {
      this.setState({ done: true });
    }
    React.findDOMNode(this.refs.confirmButton).blur();
  },

	handleSignup: function(e) {
		e.preventDefault();
		var password = React.findDOMNode(this.refs.password).value;
		var password2 = React.findDOMNode(this.refs.password2).value;
		var student2 = this.refs.student2;
    var stuRefs = [
      this.refs.student1,
      this.refs.student2,
      this.refs.student3,
      this.refs.student4,
      this.refs.student5,
      this.refs.student6,
      this.refs.student7,
      this.refs.student8
    ];
		var students = [];
    var stuRef;
		if(password === password2){
      for(var j = 0; j < this.state.studentsNum; j++){
        stuRef = stuRefs[j];
        students.push({
          firstName: React.findDOMNode(stuRef.refs.stu_fname).value.trim(),
          lastName: React.findDOMNode(stuRef.refs.stu_lname).value.trim(),
          birtyday: React.findDOMNode(stuRef.refs.stu_month).value + '/' + React.findDOMNode(stuRef.refs.stu_day).value + '/' + React.findDOMNode(stuRef.refs.stu_year).value,
          gender: React.findDOMNode(stuRef.refs.stu_male).checked ? 'male' : 'female'
        });
      }

			var body = {
				students: students,
				phoneNumber: React.findDOMNode(this.refs.phoneNumber).value.trim(),
				email: React.findDOMNode(this.refs.email).value.trim(),
				password: React.findDOMNode(this.refs.password).value
			}
			YFActions.createUser(body);
      this.transitionTo('home');
		} else {
			alert('Passwords Not Match!');
			React.findDOMNode(this.refs.password).focus();
		}
	},
	render: function() {
    var SignupButton = (
      this.state.done ? <button type="button" className="col-md-offset-10 btn btn-success btn-lg" onClick={this.handleSignup}>Sign Up</button> : <button type="button" className="col-md-offset-10 btn btn-success btn-lg" disabled>Sign Up</button>
    );
    var Student2 = (
      this.state.studentsNum >= 2 ? <StudentBox ref='student2' stuIdx='2'/> : <p></p>
    );
    var Student3 = (
      this.state.studentsNum >= 3 ? <StudentBox ref='student3' stuIdx='3'/> : <p></p>
    );
    var Student4 = (
      this.state.studentsNum >= 4 ? <StudentBox ref='student4' stuIdx='4'/> : <p></p>
    );
    var Student5 = (
      this.state.studentsNum >= 5 ? <StudentBox ref='student5' stuIdx='5'/> : <p></p>
    );
    var Student6 = (
      this.state.studentsNum >= 6 ? <StudentBox ref='student6' stuIdx='6'/> : <p></p>
    );
    var Student7 = (
      this.state.studentsNum >= 7 ? <StudentBox ref='student7' stuIdx='7'/> : <p></p>
    );
    var Student8 = (
      this.state.studentsNum >= 8 ? <StudentBox ref='student8' stuIdx='8'/> : <p></p>
    );
    var HelpBlock = (
      this.state.done ? <h4><span className="bg-info">Information has been validated, please click Sign Up below.</span></h4> : <p></p>
    );

		return (
      <div className='col-md-8 col-md-offset-2'>
        <hr></hr>
        <div className=" panel panel-primary">
          <div className="panel-heading">
            <div className="panel-title">
              <h3>Sign up</h3>
            </div>
          </div>

          <div className="panel-body">
            <div className="row">
              <div> 
                <form className="col-md-10 col-md-offset-1" onSubmit={this.handleConfirm}>
                  <div className="form-group">
                    <label htmlFor="email">Email address</label>
                    <input type="email" required className="form-control" ref="email" placeholder="Email"/>
                  </div>
                  <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" required pattern=".{6}" className="form-control" ref="password" placeholder="At least 6 characters"/><br></br>
                    <input type="password" required pattern=".{6}" className="form-control" ref="password2" placeholder="At least 6 characters"  />
                  </div>
                  <div className="form-group">
                    <label htmlFor="phoneNumber">Phone Number</label>
                    <input type="text" required className="form-control" ref="phoneNumber" placeholder="Please enter numbers only. e.g. 9998887777" />
                  </div>
                  <div className="form-group">
                    <div className="panel panel-success">
                      <div className="panel-heading">
                        <div className="panel-title">
                          <h3>Student(s) Information</h3>
                        </div>
                      </div>

                      <div className="panel-body">
                        <div className="row">
                          <StudentBox ref='student1' stuIdx='1'/>
                          {Student2}
                          {Student3}
                          {Student4}
                          {Student5}
                          {Student6}
                          {Student7}
                          {Student8}
                          <div className="col-md-10 col-md-offset-1">
                            <button onClick={this.addStudent} className="btn btn-info">+ Add Student</button>
                          </div>
                        </div>
                      </div>
                    </div>                    
                  </div>

                  <hr></hr>
                  {HelpBlock}
                  <button type="submit" ref="confirmButton" className="btn btn-primary btn-lg">Confirm</button>
                </form>
              </div><hr></hr>
            </div>
          </div>
        </div>
        {SignupButton}
      </div>
			
		);
	}
});

var StudentBox = React.createClass({
	render: function() {
		return (
  			<div className="col-md-10 col-md-offset-1">
     			<label>Full Name</label>
          <div className="row">
            <div className="col-xs-6 col-md-6">
                <input type="text" required className="form-control" ref='stu_fname' placeholder="First Name"/>                        
            </div>
            <div className="col-xs-6 col-md-6">
                <input type="text" required className="form-control" ref='stu_lname' placeholder="Last Name"/>                        
            </div>
          </div><br></br>  
                         
          <label>Birth Date</label>                    
          <div className="row">
              <div className="col-xs-4 col-md-4">
                  <select ref="stu_month" className="form-control">
                      <option value="01">Jan</option>
                      <option value="02">Feb</option>
                      <option value="03">Mar</option>
                      <option value="04">Apr</option>
                      <option value="05">May</option>
                      <option value="06">Jun</option>
                      <option value="07">Jul</option>
                      <option value="08">Aug</option>
                      <option value="09">Sep</option>
                      <option value="10">Oct</option>
                      <option value="11">Nov</option>
                      <option value="12">Dec</option>
                  </select>                        
              </div>
              <div className="col-xs-4 col-md-4">
                  <select ref="stu_day" className = "form-control">
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                      <option value="6">6</option>
                      <option value="7">7</option>
                      <option value="8">8</option>
                      <option value="9">9</option>
                      <option value="10">10</option>
                      <option value="11">11</option>
                      <option value="12">12</option>
                      <option value="13">13</option>
                      <option value="14">14</option>
                      <option value="15">15</option>
                      <option value="16">16</option>
                      <option value="17">17</option>
                      <option value="18">18</option>
                      <option value="19">19</option>
                      <option value="20">20</option>
                      <option value="21">21</option>
                      <option value="22">22</option>
                      <option value="23">23</option>
                      <option value="24">24</option>
                      <option value="25">25</option>
                      <option value="26">26</option>
                      <option value="27">27</option>
                      <option value="28">28</option>
                      <option value="29">29</option>
                      <option value="30">30</option>
                      <option value="31">31</option>
                  </select>                        
              </div>
              <div className="col-xs-4 col-md-4">
                  <select ref="stu_year" className = "form-control">
                      <option value="1995">1995</option>
                      <option value="1996">1996</option>
                      <option value="1997">1997</option>
                      <option value="1998">1998</option>
                      <option value="1999">1999</option>
                      <option value="2000">2000</option>
                      <option value="2001">2001</option>
                      <option value="2002">2002</option>
                      <option value="2003">2003</option>
                      <option value="2004">2004</option>
                      <option value="2005">2005</option>
                      <option value="2006">2006</option>
                      <option value="2007">2007</option>
                      <option value="2008">2008</option>
                      <option value="2009">2009</option>
                      <option value="2010">2010</option>
                      <option value="2011">2011</option>
                      <option value="2012">2012</option>
                      <option value="2013">2013</option>
                      <option value="2012">2014</option>
                      <option value="2013">2015</option>
                  </select>                        
              </div>
          </div><br></br>

          <label>Gender&nbsp;&nbsp;</label>                 
          <label className="radio-inline">
          <input type="radio" ref='stu_male' name={this.props.stuIdx} value="male" />Male</label>
          <label className="radio-inline">
          <input type="radio" ref='stu_female' name={this.props.stuIdx} value="female"/>Female</label>
          <hr></hr>
        </div>
		);
	}
});

var ParentBox = React.createClass({
	render: function() {
		return (
			<div className="container" id="wrap">
			  <div className="row">
	        <div className="col-md-6">
	        	<legend>Parent(s) Information</legend>
       			<label>Mother</label><br/>
       			<label>Full Name</label>
            <div className="row">
              <div className="col-xs-6 col-md-6">
                  <input type="text" name="firstname" value="" className="form-control" placeholder="First Name"/>                        
              </div>
              <div className="col-xs-6 col-md-6">
                  <input type="text" name="lastname" value="" className="form-control" placeholder="Last Name"  />                        
              </div>
            </div>
            <div className='row'> 
	            <div className="form-group col-md-6 col-xs-6">
						    <label htmlFor="motherEmail">Email</label>
						    <input type="email" className="form-control" id="motherEmail" placeholder="Email"/>
						  </div> 
						  <div className="form-group col-md-6 col-xs-6">
						    <label htmlFor="motherPhone">Phone</label>
						    <input type="number" className="form-control" id="motherPhone" placeholder="Please enter numbers only. e.g. 12345567890."/>
						  </div>
		        </div> 

		        <label>Father</label><br/>
       			<label>Full Name</label>
            <div className="row">
              <div className="col-xs-6 col-md-6">
                  <input type="text" name="firstname" value="" className="form-control" placeholder="First Name"/>                        
              </div>
              <div className="col-xs-6 col-md-6">
                  <input type="text" name="lastname" value="" className="form-control" placeholder="Last Name"  />                        
              </div>
            </div>
            <div className='row'> 
	            <div className="form-group col-md-6 col-xs-6">
						    <label htmlFor="fatherEmail">Email</label>
						    <input type="email" className="form-control" id="fatherEmail" placeholder="Email"/>
						  </div> 
						  <div className="form-group col-md-6 col-xs-6">
						    <label htmlFor="fatherPhone">Phone</label>
						    <input type="number" className="form-control" id="fatherPhone" placeholder="Please enter numbers only. e.g. 12345567890."/>
						  </div>
		        </div>
	        </div>            
			  </div>
			</div>
		);
	}
});

module.exports = Signup;