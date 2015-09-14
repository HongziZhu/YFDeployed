'use strict';

var React = require('react');
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;
var Navigation = Router.Navigation;
var YFActions = require('../../actions/YFActions');
var YFStore = require('../../stores/YFStore.jsx');

var StudentBox = React.createClass({
	render: function() {
		return (
      <div className='col-md-offset-0.5 col-md-12'>
        <div className="panel panel-primary">
          <div className="panel-heading">
          </div>

          <div className="panel-body">
            <div className="col-md-10 col-md-offset-1">
              <label>Student Full Name<span className="req">*</span></label>
              <div className="row">
                <div className="col-md-6">
                    <input type="text" required className="form-control" ref='stu_fname' placeholder="First Name"/>                        
                </div>
                <div className="col-md-6">
                    <input type="text" required className="form-control" ref='stu_lname' placeholder="Last Name"/>                        
                </div>
              </div><br></br>  
              <label>中文姓名(Chinese Name, if applicable)</label>
              <div className="row">
                <div className="col-md-6">
                    <input type="text" className="form-control" ref='cn_fname' placeholder="姓"/>                        
                </div>
                <div className="col-md-6">
                    <input type="text" className="form-control" ref='cn_lname' placeholder="名"/>                        
                </div>
              </div><br></br>  
                             
              <label>Birth Date<span className="req">*</span></label>                    
              <div className="row">
                  <div className="col-md-4">
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
                  <div className="col-md-4">
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
                  <div className="col-md-4">
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

              <div>    
                <label>Gender<span className="req">*</span>&nbsp;&nbsp;</label>            
                <label className="radio-inline">
                  <input type="radio" ref='stu_male' name={this.props.stuIdx} value="male" />Male
                </label>
                <label className="radio-inline">
                  <input type="radio" ref='stu_female' name={this.props.stuIdx} value="female"/>Female
                </label>
              </div><br></br>

              <div className="form-group">
                <label >Summer School Attended(if applicable)</label>
                <input type="text" className="form-control" ref="summerSchoolAttended"/>
                <br></br>
                <label >School District</label>
                <input type="text" className="form-control" ref="schoolDistrict"/>
              </div>

              <div className="form-group">
                <label >Pediatric Doctor</label>
                <div className="row">
                  <div className="col-md-6">
                    <input type="text" className="form-control" ref="doctorName" placeholder="Doctor Name"/>
                  </div>
                  <div className="col-md-6">
                    <input type="text" className="form-control" ref="doctorPhone" placeholder="Doctor Phone" />
                  </div>
                </div>
              </div>

              <div className="form-group">
                <label >Insurance Information</label>
                <div className="row">
                  <div className="col-md-6">
                    <input type="text" className="form-control" ref="insuranceCompany" placeholder="Insurance Company Name"/>
                  </div>
                  <div className="col-md-6">
                    <input type="text" className="form-control" ref="policyNumber" placeholder="Insurance Policy Number" />
                  </div>
                </div>
              </div>

              <div className="form-group">
                <label >Please list all medical limitations and special conditions</label>
                <textarea className="form-control" rows="4" ref='medicalDescription' placeholder="Allergies to medicine or food, asthma, etc.">
                </textarea>
              </div>

              <hr></hr>
            </div>
          </div>
        </div><hr></hr>
      </div>
  			
		);
	}
});

module.exports = StudentBox;