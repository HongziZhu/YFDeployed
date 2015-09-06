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
	getInitialState: function() {
		return { canSubmit: false };
	},
	enableButton: function() {
		this.setState({
			canSubmit: true
		});
	},
	disableButton: function() {
		this.setState({
			canSubmit: false
		});
	},
	handleSubmit: function(e) {
		e.preventDefault();
		var password = React.findDOMNode(this.refs.password).value;
		var password2 = React.findDOMNode(this.refs.password2).value;
		var student1 = this.refs.student1, student2 = this.refs.student2;
		var students = [];
		if(password === password2){
			students.push({
				firstName: React.findDOMNode(student1.refs.stu_fname).value.trim(),
				lastName: React.findDOMNode(student1.refs.stu_lname).value.trim(),
				birtyday: React.findDOMNode(student1.refs.stu_month).value + '/' + React.findDOMNode(student1.refs.stu_day).value + '/' + React.findDOMNode(student1.refs.stu_year).value,
				gender: React.findDOMNode(student1.refs.stu_male).checked ? 'male' : 'female'
			});

			students.push({
				firstName: React.findDOMNode(student2.refs.stu_fname).value.trim(),
				lastName: React.findDOMNode(student2.refs.stu_lname).value.trim(),
				birtyday: React.findDOMNode(student2.refs.stu_month).value + '/' + React.findDOMNode(student2.refs.stu_day).value + '/' + React.findDOMNode(student2.refs.stu_year).value,
				gender: React.findDOMNode(student2.refs.stu_male).checked ? 'male' : 'female'
			});

			var body = {
				students: students,
				phoneNumber: React.findDOMNode(this.refs.phoneNumber).value.trim(),
				email: React.findDOMNode(this.refs.email).value.trim(),
				password: React.findDOMNode(this.refs.password).value
			}
			YFActions.createUser(body);
			React.findDOMNode(this.refs.email).value = '';
			React.findDOMNode(this.refs.phoneNumber).value = '';
			React.findDOMNode(this.refs.password).value = '';
			React.findDOMNode(this.refs.password2).value = '';

		} else {
			alert('Passwords Not Match!');
			React.findDOMNode(this.refs.password).focus();
		}
	},
	render: function() {
		return (
			<form className="col-md-6 col-md-offset-3" onSubmit={this.handleSubmit}>
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
        	<legend>Student Information</legend>
        	<StudentBox ref='student1'/><hr></hr>
        	<StudentBox ref='student2'/>
        </div>

        <hr></hr>
       	<span className="help-block">Help Block...</span>
			  <button type="submit" className="btn btn-primary">Sign up</button>
			</form>
		);
	}
});

var StudentBox = React.createClass({
	render: function() {
		return (
				<div>
     			<label>Full Name</label>
          <div className="row">
            <div className="col-xs-6 col-md-6">
                <input type="text" className="form-control" ref='stu_fname' placeholder="First Name"/>                        
            </div>
            <div className="col-xs-6 col-md-6">
                <input type="text" className="form-control" ref='stu_lname' placeholder="Last Name"/>                        
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

            <div className='row col-md-6'>
                <label>Gender&nbsp;&nbsp;</label>                    
                <label className="radio-inline">
                <input type="radio" ref='stu_male' value="male" />Male</label>
                <label className="radio-inline">
                <input type="radio" ref='stu_female' value="female"/>Female</label>
            </div>  
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