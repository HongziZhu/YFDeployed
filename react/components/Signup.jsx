'use strict';

var React = require('react');
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;
var Navigation = Router.Navigation;
var YFActions = require('../actions/YFActions');
var YFStore = require('../stores/YFStore.jsx');

var StudentBox = require('./helpers/StudentBox.jsx');
var AddressBox = require('./helpers/AddressBox.jsx');

var Signup = React.createClass({
  mixins: [ Navigation ],
	getInitialState: function() {
		return { 
      done: false,
      studentsNum: 1,
      showLiabilityRelease: false,
      acceptLiabilityRelease: false
    };
	},
  addStudent: function(e) {
    e.preventDefault();
    if(this.state.studentsNum <= 7){
      var s = this.state.studentsNum + 1;
      this.setState({ studentsNum: s });
    }
    React.findDOMNode(this.refs.addButton).blur();
  },
  removeStudent: function(e) {
    e.preventDefault();
    if(this.state.studentsNum >= 2){
      var s = this.state.studentsNum - 1;
      this.setState({ studentsNum: s });
    } 
    React.findDOMNode(this.refs.removeButton).blur();
  },
  showLiabilityRelease: function(e) {
    e.preventDefault();
    var s = this.state.showLiabilityRelease;
    this.setState({ showLiabilityRelease: !s });
  },
  changeAccept: function(e) {
    var s = e.currentTarget.checked;
    this.setState({ acceptLiabilityRelease: s });
  },
  handleConfirm: function(e) {
    e.preventDefault();
    var email = React.findDOMNode(this.refs.email).value.trim();
    
    var password = React.findDOMNode(this.refs.password).value;
    var password2 = React.findDOMNode(this.refs.password2).value;
    if(!this.state.acceptLiabilityRelease){
      return alert('Please accept the Liability Release.');
    }
    if(password !== password2){
      alert('Passwords Not Match!');
      React.findDOMNode(this.refs.password).focus();
    } else {
      if(password.length < 6){
        return alert('Passwords must be longer than six characters.');
      }
      this.setState({ done: true });
    }
    React.findDOMNode(this.refs.confirmButton).blur();
  },

	handleSignup: function(e) {
		e.preventDefault();
    var self = this;
		var password = React.findDOMNode(this.refs.password).value;
		var password2 = React.findDOMNode(this.refs.password2).value;
    var addressRef = this.refs.address;
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
    if(!this.state.acceptLiabilityRelease){
      return alert('Please accept the Liability Release.');
    }
    if(password.length < 6 || password2.length < 6){
      return alert('Passwords must be longer than six characters.');
    }
		if(password === password2){
      for(var j = 0; j < this.state.studentsNum; j++){
        stuRef = stuRefs[j];
        students.push({
          firstName: React.findDOMNode(stuRef.refs.stu_fname).value.trim(),
          lastName: React.findDOMNode(stuRef.refs.stu_lname).value.trim(),
          ChineseName: {
            first: React.findDOMNode(stuRef.refs.cn_fname).value.trim(),
            last: React.findDOMNode(stuRef.refs.cn_lname).value.trim()
          },
          birthday: React.findDOMNode(stuRef.refs.stu_month).value + '/' + React.findDOMNode(stuRef.refs.stu_day).value + '/' + React.findDOMNode(stuRef.refs.stu_year).value,
          gender: React.findDOMNode(stuRef.refs.stu_male).checked ? 'male' : 'female',
          summerSchoolAttended: React.findDOMNode(stuRef.refs.summerSchoolAttended).value.trim(),
          schoolDistrict: React.findDOMNode(stuRef.refs.schoolDistrict).value.trim(),
          pediatricDoctor: {
            name: React.findDOMNode(stuRef.refs.doctorName).value.trim(),
            phone: React.findDOMNode(stuRef.refs.doctorPhone).value.trim()
          },
          insuranceInfor: {
            insuranceCompany: React.findDOMNode(stuRef.refs.insuranceCompany).value.trim(),
            policyNumber: React.findDOMNode(stuRef.refs.policyNumber).value.trim(),
          },
          medicalDescription: React.findDOMNode(stuRef.refs.medicalDescription).value.trim()
        });
      }

			var body = {
				students: students,
				cellPhone: React.findDOMNode(this.refs.cellPhone).value.trim(),
        homePhone: React.findDOMNode(this.refs.homePhone).value.trim(),
        workPhone: React.findDOMNode(this.refs.homePhone).value.trim(),
				email: React.findDOMNode(this.refs.email).value.trim(),
				password: React.findDOMNode(this.refs.password).value,
        motherName: React.findDOMNode(this.refs.motherName).value.trim(),
        fatherName: React.findDOMNode(this.refs.fatherName).value.trim(),
        homeAddress: {
          addressLine1: React.findDOMNode(addressRef.refs.addressLine1).value.trim(),
          addressLine2: React.findDOMNode(addressRef.refs.addressLine2).value.trim(),
          city: React.findDOMNode(addressRef.refs.city).value.trim(),
          state: React.findDOMNode(addressRef.refs.state).value,
          zipcode: React.findDOMNode(addressRef.refs.zipcode).value
        }
			};
			YFActions.createUser(body, function(res) {
        if(res.user){
          YFStore.setSignup(true);
          return self.transitionTo('login');
        } 
        if(res.err){
          alert(res.err);
        }
      });
      
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
      <div className='page-container'>
      <div className='main-content'>
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
                <form className="col-md-12 col-md-offset-0.5" onSubmit={this.handleConfirm}>
                  <div className="form-group">
                    <label htmlFor="email">Email address<span className='req'>*</span></label>
                    <input type="email" required className="form-control" ref="email" placeholder="Email"/>
                  </div>

                  <div className="form-group">
                    <label htmlFor="password">Password<span className='req'>*</span><span className='bg-info'>At lease 6 characters</span> </label>
                    <input type="password" required maxLength="20" className="form-control" ref="password" placeholder="At least 6 characters"/><br></br>
                    <label htmlFor="password">Confirm Your Password<span className='req'>*</span><span className='bg-info'>At lease 6 characters</span></label>
                    <input type="password" required maxLength="20" className="form-control" ref="password2" placeholder="At least 6 characters"  />
                  </div>

                  <div className="form-group">
                    <label htmlFor="cellPhone">Cell Phone<span className='req'>*</span></label>
                    <input type="text" maxLength="10" size="10" required className="form-control" ref="cellPhone" placeholder="Please enter numbers only." />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="homePhone">Home Phone</label>
                    <input type="text" maxLength="10" size="10" className="form-control" ref="homePhone" placeholder="Please enter numbers only." />
                  </div>

                  <div className="form-group">
                    <label htmlFor="workPhone">Work Phone</label>
                    <input type="text" className="form-control" ref="workPhone" />
                  </div>

                  <div className="form-group">
                    <label >Parent(s) Name</label>
                    <div className="row">
                      <div className="col-md-6">
                        <input type="text" className=" form-control" ref="motherName" placeholder="Mother's Name" />
                      </div>
                      <div className="col-md-6">
                        <input type="text" className="col-md-6 form-control" ref="fatherName" placeholder="Father's Name" />
                      </div>
                    </div>
                  </div>

                  <AddressBox ref='address' />
                  <hr></hr>

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
                            <div className='row'>
                              <button onClick={this.addStudent} ref='addButton' className="btn btn-info">+ Add Student</button>
                              <button onClick={this.removeStudent} ref='removeButton' className="col-md-offset-1 btn btn-danger">- Remove Student</button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>                    
                  </div>

                  <div className="checkbox">
                    <label>
                      <h4><input type="checkbox" onChange={this.changeAccept}/>
                      I accept the <a onClick={this.showLiabilityRelease}>Liability Release</a> from Yang Fan Academy.</h4>
                      {this.state.showLiabilityRelease ? <div className="bg-info">
                        I, the undersigned, in consideration of participation in the programs offered by Little Ivy League/Yang Fan Academy 扬帆课后书苑 (the “Program”), agree to indemnify and release the Program from any and all liabilities from any injuries which may be suffered by the above named child, arising out of, or in any way connected with participation in the classes or activities offered by the Program, except to the extent attributable to willful act or active negligence of the Program or its officers, staff, agents or employees. I, the undersigned, as the parent/guardian, acknowledge that the above named child is being enrolled in a program that consists of entertaining and recreational components, and that the Program is an exempt, NOT licensed childcare. I ACKNOWLEDGE THAT I HAVE READ THE ABOVE AGREEMENT AND RELEASE, AND FULLY UNDERSTAND THAT I HAVE ASSUMED ALL THE RISKS FOR INJURY THAT MAY INVOLVE IN THE ACTIVITIES OFFERED BY THE PROGRAM. I hereby further authorize the Program as my agent for the above named child to consent to any medical diagnosis or treatment and hospital care rendered by and under the general supervision and advice of a licensed physician or surgeon in case of accident or illness during the session of any classes or activities offered by the Program.
                      </div> : <p></p> }
                    </label>
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
      </div>
      </div>		
		);
	}
});

module.exports = Signup;