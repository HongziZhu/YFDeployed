'use strict';

var React = require('react/addons');
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;
var Navigation = Router.Navigation;
var YFActions = require('../actions/YFActions');
var YFStore = require('../stores/YFStore.jsx');

var StudentBox = require('./helpers/StudentBox.jsx');

var Profile = React.createClass({
  mixins: [ Navigation ],
	getInitialState: function() {
    YFActions.loadUserFromServer();
		return { 
      user: YFStore.getUser(),
      studentsNum: typeof YFStore.getUser().students === 'undefined' ? 1 : YFStore.getUser().students.length,
      newStudentsNum: 0,
      done: false
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
      user: YFStore.getUser(),
      studentsNum: typeof YFStore.getUser().students === 'undefined' ? 1 : YFStore.getUser().students.length
    });
  },

  // changePassword: function(e) {
  //   this.setState({ changePassword: e.currentTarget.checked})
  // },

  addStudent: function(e) {
    e.preventDefault();
    if(this.state.newStudentsNum <= 7){
      var s = this.state.newStudentsNum + 1;
      this.setState({ newStudentsNum: s });
    }
    React.findDOMNode(this.refs.addButton).blur();
  },
  cancelAddStudent: function(e) {
    e.preventDefault();
    if(this.state.newStudentsNum >= 1){
      var s = this.state.newStudentsNum - 1;
      this.setState({ newStudentsNum: s });
    } 
    React.findDOMNode(this.refs.cancelAddButton).blur();
  },
  handleConfirm: function(e) {
    e.preventDefault(); 
    this.setState({ done: true });
    React.findDOMNode(this.refs.confirmButton).blur();
  },

	handleSave: function(e) {
		e.preventDefault();
    var self = this;
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

    for(var j = 0; j < this.state.newStudentsNum; j++){
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
      newStudents: students,
      user: this.state.user
    };
    YFActions.updateUser(body, function(res) {
      if(res.user){
        window.location.reload();
      } 
      if(res.err){
        alert(res.err);
      }
    });
	},
  emailChange: function(e) {
    var s = React.addons.update(this.state, {
      user: {
        email: { $set: e.target.value }
      }
    });
    this.setState(s);
  },
  cellPhoneChange: function(e) {
    var s = React.addons.update(this.state, {
      user: {
        cellPhone: { $set: e.target.value }
      }
    });
    this.setState(s);
  },
  homePhoneChange: function(e) {
    var s = React.addons.update(this.state, {
      user: {
        homePhone: { $set: e.target.value }
      }
    });
    this.setState(s);
  },
  workPhoneChange: function(e) {
    var s = React.addons.update(this.state, {
      user: {
        workPhone: { $set: e.target.value }
      }
    });
    this.setState(s);
  },
  motherNameChange: function(e) {
    var s = React.addons.update(this.state, {
      user: {
        motherName: { $set: e.target.value }
      }
    });
    this.setState(s);
  },
  fatherNameChange: function(e) {
    var s = React.addons.update(this.state, {
      user: {
        fatherName: { $set: e.target.value }
      }
    });
    this.setState(s);
  },
  addressLine1Change: function(e) {
    var s = React.addons.update(this.state, {
      user: {
        homeAddress: {
          addressLine1: { $set: e.target.value }
        }
      }
    });
    this.setState(s);
  },
  addressLine2Change: function(e) {
    var s = React.addons.update(this.state, {
      user: {
        homeAddress: {
          addressLine2: { $set: e.target.value }
        }
      }
    });
    this.setState(s);
  },
  cityChange: function(e) {
    var s = React.addons.update(this.state, {
      user: {
        homeAddress: {
          city: { $set: e.target.value }
        }
      }
    });
    this.setState(s);
  },
  stateChange: function(e) {
    var s = React.addons.update(this.state, {
      user: {
        homeAddress: {
          state: { $set: e.target.value }
        }
      }
    });
    this.setState(s);
  },
  zipcodeChange: function(e) {
    var s = React.addons.update(this.state, {
      user: {
        homeAddress: {
          zipcode: { $set: e.target.value }
        }
      }
    });
    this.setState(s);
  },
  cancelChanges: function(e) {
    if(confirm('Are you sure to discard all changes?') == true){
      window.location.reload();
    }
  },

	render: function() {
    var SaveButton = (
      this.state.done ? <button type="button" className="col-md-offset-10 btn btn-success btn-lg" onClick={this.handleSave}>Save</button> : <button type="button" className="col-md-offset-10 btn btn-success btn-lg" disabled>Save</button>
    );
    // var PasswordBox = (
    //   <div className="form-group">
    //     <label htmlFor="password">Current Password<span className='req'>*</span></label>
    //     <input type="password" required maxLength="20" className="form-control" ref="oldPassword"/><br></br>
    //     <label htmlFor="password">New Password<span className='req'>*</span><span className='bg-info'>At lease 6 characters</span> </label>
    //     <input type="password" required maxLength="20" className="form-control" ref="password" placeholder="At least 6 characters"/><br></br>
    //     <label htmlFor="password">Confirm New Password<span className='req'>*</span><span className='bg-info'>At lease 6 characters</span></label>
    //     <input type="password" required maxLength="20" className="form-control" ref="password2" placeholder="At least 6 characters"  />
    //   </div>
    // );
    var HelpBlock = (
      this.state.done ? <h4><span className="bg-info">Information has been validated, please click Save below.</span></h4> : <p></p>
    );
    var Student1 = (
      this.state.newStudentsNum >= 1 ? <StudentBox ref='student1' stuIdx='1'/> : <p></p>
    );
    var Student2 = (
      this.state.newStudentsNum >= 2 ? <StudentBox ref='student2' stuIdx='2'/> : <p></p>
    );
    var Student3 = (
      this.state.newStudentsNum >= 3 ? <StudentBox ref='student3' stuIdx='3'/> : <p></p>
    );
    var Student4 = (
      this.state.newStudentsNum >= 4 ? <StudentBox ref='student4' stuIdx='4'/> : <p></p>
    );
    var Student5 = (
      this.state.newStudentsNum >= 5 ? <StudentBox ref='student5' stuIdx='5'/> : <p></p>
    );
    var Student6 = (
      this.state.newStudentsNum >= 6 ? <StudentBox ref='student6' stuIdx='6'/> : <p></p>
    );
    var Student7 = (
      this.state.newStudentsNum >= 7 ? <StudentBox ref='student7' stuIdx='7'/> : <p></p>
    );
    var Student8 = (
      this.state.newStudentsNum >= 8 ? <StudentBox ref='student8' stuIdx='8'/> : <p></p>
    );
    var StudentPanels = [];
    for(var j = 0; j < this.state.studentsNum; j++) {
      StudentPanels.push(
        <StudentProfile key={j} stuIdx={j}/>
      );
    }

		return (
      <div className='col-md-8 col-md-offset-2'>
        <hr></hr>
        <div className=" panel panel-primary">
          <div className="panel-heading">
            <div className="panel-title">
              <h3>Profile</h3>
            </div>
          </div>

          <div className="panel-body">
            <div className="row">
              <div> 
                <form className="col-md-10 col-md-offset-1" onSubmit={this.handleConfirm}>
                  <div className="form-group">
                    <label htmlFor="email">Email address<span className='req'>*</span></label>
                    <input type="email" required className="form-control" ref="email" value={this.state.user.email} onChange={this.emailChange}/>
                  </div>

                  {/*<div >
                    <label className='bg-info'>
                      <input type="checkbox" onChange={this.changePassword}/>&nbsp;Change Password
                    </label>
                  </div>*/}

                  <div className="form-group">
                    <label htmlFor="cellPhone">Cell Phone<span className='req'>*</span></label>
                    <input type="text" maxLength="10" required className="form-control" ref="cellPhone" value={this.state.user.cellPhone} onChange={this.cellPhoneChange} />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="homePhone">Home Phone</label>
                    <input type="text" maxLength="10" size="10" className="form-control" ref="homePhone" value={this.state.user.homePhone} onChange={this.homePhoneChange} />
                  </div>

                  <div className="form-group">
                    <label htmlFor="workPhone">Work Phone</label>
                    <input type="text" className="form-control" ref="workPhone" value={this.state.user.workPhone} onChange={this.workPhoneChange}/>
                  </div>

                  <div className="form-group">
                    <label >Parent(s) Name</label>
                    <div className="row">
                      <div className="col-md-6">
                        <input type="text" className=" form-control" ref="motherName" value={this.state.user.motherName} onChange={this.motherNameChange} />
                      </div>
                      <div className="col-md-6">
                        <input type="text" className="col-md-6 form-control" ref="fatherName" value={this.state.user.fatherName} onChange={this.fatherNameChange} />
                      </div>
                    </div>
                  </div>

                  {/**** Home Address ***/}
                  <div className="form-group">
                    <label>Home Address<span className='req'>*</span></label>
                    
                    <div className='row'>
                      <label className="col-md-2 control-label">Adress Line 1<span className='req'>*</span></label>
                      <div className="col-md-10">
                        <input type="text" required className="form-control" maxLength="26" ref="addressLine1" 
                        value={typeof this.state.user.homeAddress === 'undefined' ? '' : this.state.user.homeAddress.addressLine1} 
                        onChange={this.addressLine1Change} /><br></br>
                      </div>
                    </div>

                    <div className='row'>
                      <label className="col-md-2 control-label">Adress Line 2</label>
                      <div className="col-md-10">
                        <input type="text" className="form-control" maxLength="26" ref="addressLine2" value={typeof this.state.user.homeAddress === 'undefined' ? '' : this.state.user.homeAddress.addressLine2} onChange={this.addressLine2Change}/><br></br>
                      </div>
                    </div>

                    <div className='row'>
                      <label className="col-md-1 control-label" >City<span className='req'>*</span></label>
                      <div className="col-md-3">
                        <input type="text" required className="form-control" ref="city" value={typeof this.state.user.homeAddress === 'undefined' ? '' : this.state.user.homeAddress.city} onChange={this.cityChange}/><br></br>
                      </div>

                      <label className="col-md-1 control-label" >State<span className='req'>*</span></label>
                      <div className="col-md-3">
                        <select className='form-control' required ref="state" value={typeof this.state.user.homeAddress === 'undefined' ? '' : this.state.user.homeAddress.state} onChange={this.stateChange}> 
                          <option value="none">Please select</option>
                          <option value="AL">Alabama</option>
                          <option value="AK">Alaska</option>
                          <option value="AS">American Samoa</option>
                          <option value="AZ">Arizona</option>
                          <option value="AR">Arkansas</option>
                          <option value="AA">Armed Forces America</option>
                          <option value="AE">Armed Forces Europe</option>
                          <option value="AP">Armed Forces Pacific</option>
                          <option value="CA">California</option>
                          <option value="CZ">Canal Zone</option>
                          <option value="CO">Colorado</option>
                          <option value="CT">Connecticut</option>
                          <option value="DE">Delaware</option>
                          <option value="DC">District of Columbia</option>
                          <option value="FM">Federated States of Micronesia</option>
                          <option value="FL">Florida</option>
                          <option value="GA">Georgia</option>
                          <option value="GU">Guam</option>
                          <option value="HI">Hawaii</option>
                          <option value="ID">Idaho</option>
                          <option value="IL">Illinois</option>
                          <option value="IN">Indiana</option>
                          <option value="IA">Iowa</option>
                          <option value="KS">Kansas</option>
                          <option value="KY">Kentucky</option>
                          <option value="LA">Louisiana</option>
                          <option value="ME">Maine</option>
                          <option value="MH">Marshall Islands</option>
                          <option value="MD">Maryland</option>
                          <option value="MA">Massachusetts</option>
                          <option value="MI">Michigan</option>
                          <option value="MN">Minnesota</option>
                          <option value="MS">Mississippi</option>
                          <option value="MO">Missouri</option>
                          <option value="MT">Montana</option>
                          <option value="NE">Nebraska</option>
                          <option value="NV">Nevada</option>
                          <option value="NH">New Hampshire</option>
                          <option value="NJ">New Jersey</option>
                          <option value="NM">New Mexico</option>
                          <option value="NY">New York</option>
                          <option value="NC">North Carolina</option>
                          <option value="ND">North Dakota</option>
                          <option value="MP">Northern Mariana Islands</option>
                          <option value="OH">Ohio</option>
                          <option value="OK">Oklahoma</option>
                          <option value="OR">Oregon</option>
                          <option value="PI">Pacific Islands</option>
                          <option value="PW">Palau</option>
                          <option value="PA">Pennsylvania</option>
                          <option value="PR">Puerto Rico</option>
                          <option value="RI">Rhode Island</option>
                          <option value="SC">South Carolina</option>
                          <option value="SD">South Dakota</option>
                          <option value="TN">Tennessee</option>
                          <option value="TX">Texas</option>
                          <option value="VI">US Virgin Islands</option>
                          <option value="UT">Utah</option>
                          <option value="VT">Vermont</option>
                          <option value="VA">Virginia</option>
                          <option value="WA">Washington</option>
                          <option value="WV">West Virginia</option>
                          <option value="WI">Wisconsin</option>
                          <option value="WY">Wyoming</option>
                        </select>
                      </div>
                      <label className="col-md-1 control-label" >ZIP Code<span className='req'>*</span></label>
                      <div className="col-md-3">
                        <input type="number" required className="form-control" ref="zipcode" value={typeof this.state.user.homeAddress === 'undefined' ? '' : this.state.user.homeAddress.zipcode} onChange={this.zipcodeChange}/><br></br>
                      </div>
                    </div>
                  </div>
                  <hr></hr>

                  {/**** Student Infor ***/}
                  <div className="form-group">
                    <div className="panel panel-success">
                      <div className="panel-heading">
                        <div className="panel-title">
                          <h3>Student(s) Information</h3>
                        </div>
                      </div>

                      <div className="panel-body">
                        <div className="row">
                          {StudentPanels}
                          {Student1}
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
                              <button onClick={this.cancelAddStudent} ref='cancelAddButton' className="col-md-offset-1 btn btn-danger">- Cancel Adding Student</button>
                            </div>
                          </div>

                        </div>
                      </div>
                    </div>                    
                  </div>

                  <hr></hr>
                  {HelpBlock}
                  <div className="col-md-10 col-md-offset-1">
                    <div className='row'>
                      <button ref="cancelChanges" className="btn btn-default btn-lg" onClick={this.cancelChanges}>Cancel Changes</button>
                      <button type="submit" ref="confirmButton" className="col-md-offset-1 btn btn-primary btn-lg">Confirm Changes</button>
                    </div>
                  </div>
                  
                </form>
              </div><hr></hr>
            </div>
          </div>
        </div>
        {SaveButton}
      </div>		
		);
	}
});

var StudentProfile = React.createClass({
  getInitialState: function() {
    return {
      user: YFStore.getUser()
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
      user: YFStore.getUser()
    });
  },
  removeStudent: function(e) {
    e.preventDefault();
    if(confirm('Are you sure to FOREVER delete this student?') == true){
      YFActions.removeStudentFromUser(this.props.stuIdx);
    }
    React.findDOMNode(this.refs.deleteStudent).blur();
  },
  render: function() {
    var students = this.state.user.students;
    var idx = this.props.stuIdx;
    return (
      <div className='col-md-offset-0.5 col-md-12'>
      <div className="panel panel-primary">
        <div className="panel-heading">
          <div className="panel-title">
            <h4>{typeof students === 'undefined' ? '' : students[idx].firstName}&nbsp; {typeof students === 'undefined' ? '' : students[idx].lastName}</h4>
          </div>
        </div>

        <div className="panel-body">
          <div className="col-md-10 col-md-offset-1">
            <div className='row'>
              <button onClick={this.removeStudent} ref='deleteStudent' className="btn btn-danger">- Remove This Student</button>
            </div>
          </div>
          <hr></hr>
          <table className="table table-bordered table-striped">
            <thead>
              <tr>
                <th>Attribute</th>
                <th>Value</th>
              </tr>
            </thead>
            <tbody>
              <tr >
                <td>Student Full Name</td>
                <td>{typeof students === 'undefined' ? '' : students[idx].firstName}&nbsp; {typeof students === 'undefined' ? '' : students[idx].lastName}
                </td>
              </tr>

              <tr>
                <td>中文姓名(Chinese Name, if applicable)</td>
                <td>{(typeof students === 'undefined' || typeof students[idx].ChineseName === 'undefined') ? '' : students[idx].ChineseName.first || ''}&nbsp; {(typeof students === 'undefined' || typeof students[idx].ChineseName === 'undefined') ? '' : students[idx].ChineseName.last || ''}
                </td>
              </tr>

              <tr >
                <td>Birth Date</td>
                <td>{typeof students === 'undefined' ? '' : students[idx].birthday || ''}
                </td>
              </tr>

              <tr>
                <td>Gender</td>
                <td>{typeof students === 'undefined' ? '' : students[idx].gender || ''}
                </td>
              </tr>

              <tr>
                <td>Summer School Attended(if applicable)</td>
                <td>{typeof students === 'undefined' ? '' : students[idx].summerSchoolAttended || ''}
                </td>
              </tr>

              <tr >
                <td>School District</td>
                <td>{typeof students === 'undefined' ? '' : students[idx].schoolDistrict || ''}
                </td>
              </tr>

              <tr >
                <td>Pediatric Doctor Name</td>
                <td>{(typeof students === 'undefined' || typeof students[idx].pediatricDoctor === 'undefined') ? '' : students[idx].pediatricDoctor.name}
                </td>         
              </tr>

              <tr >
                <td>Pediatric Doctor Phone Number</td>
                <td>{(typeof students === 'undefined' || typeof students[idx].pediatricDoctor === 'undefined') ? '' : students[idx].pediatricDoctor.phone}
                </td>
              </tr>

              <tr >
                <td>Insurance Company</td>
                <td>{(typeof students === 'undefined' || typeof students[idx].insuranceInfor === 'undefined') ? '' : students[idx].insuranceInfor.insuranceCompany}
                </td>         
              </tr>

              <tr >
                <td>Insurance Policy Number</td>
                <td>{(typeof students === 'undefined' || typeof students[idx].insuranceInfor === 'undefined') ? '' : students[idx].insuranceInfor.policyNumber}
                </td>
              </tr>

              <tr >
                <td>Medical limitations and special conditions</td>
                <td>{typeof students === 'undefined' ? '' : students[idx].medicalDescription || ''}
                </td>         
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      </div>
    );
  }
});

module.exports = Profile;