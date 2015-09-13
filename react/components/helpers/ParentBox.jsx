'use strict';

var React = require('react');
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;
var Navigation = Router.Navigation;
var YFActions = require('../../actions/YFActions');
var YFStore = require('../../stores/YFStore.jsx');

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

module.exports = ParentBox;