'use strict';

var React = require('react');
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;
var Navigation = Router.Navigation;
var YFActions = require('../../actions/YFActions');
var YFStore = require('../../stores/YFStore.jsx');

var AddressBox = React.createClass({
  render: function() {
    return (
      <div className="form-group">
        
        
          <label className="col-sm-2 control-label">Home Address 1<span className='req'>*</span></label>
          <div className="col-sm-10">
            <input type="text" required className="form-control" maxLength="26" ref="addressLine1"/><br></br>
          </div>
        
          <label className="col-sm-2 control-label">Home Address 2</label>
          <div className="col-sm-10">
            <input type="text" className="form-control" maxLength="26" ref="addressLine2" /><br></br>
          </div>
        
        
          <label className="col-md-2 control-label" >City<span className='req'>*</span></label>
          <div className="col-md-3">
            <input type="text" required className="form-control" ref="city"/><br></br>
          </div>
          <label className="col-md-1 control-label" >State<span className='req'>*</span></label>
          <div className="col-md-3">
            <select className='form-control' required ref="state"> 
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
          <div className="col-md-2">
            <input type="number" required className="form-control" ref="zipcode"/><br></br>
          </div>
        
      </div>
    );
  }
});

module.exports = AddressBox;