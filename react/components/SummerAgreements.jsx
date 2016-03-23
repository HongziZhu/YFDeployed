'use strict';

var React = require('react');
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;
var Navigation = Router.Navigation;
var YFActions = require('../actions/YFActions');
var YFStore = require('../stores/YFStore.jsx');

var ContactBox = require('./helpers/ContactBox.jsx');
var SideMenu = require('./helpers/SideMenu.jsx');

var SummerAgreements = React.createClass({
  mixins: [ Navigation ],
  getInitialState: function() {
    YFActions.loadEnrollment();
    YFStore.setSideHighlight('agreements');
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
  handleConfirm: function(e) {
    e.preventDefault();
    if(!YFStore.getEmergencyPermit()){
      return alert('You have to accept the consent for emergency medical treatment.');
    }
    this.setState({ done: true });
    React.findDOMNode(this.refs.confirmButton).blur();
  },
  handleContinue: function(e) {
    if(!YFStore.getEmergencyPermit()){
      return alert('You have to accept the consent for emergency medical treatment.');
    }
    var self = this;
    var contact1 = this.refs.emerBox.refs.primaryEmerContact; 
    var contact2 = this.refs.emerBox.refs.secondaryEmerContact;
    var primaryEmerContact = {
      name: React.findDOMNode(contact1.refs.name).value.trim(),
      relationship: React.findDOMNode(contact1.refs.relationship).value.trim(),
      cellPhone: React.findDOMNode(contact1.refs.cellPhone).value.trim(),
      workPhone: React.findDOMNode(contact1.refs.workPhone).value.trim(),
      homePhone: React.findDOMNode(contact1.refs.homePhone).value.trim(),
      email: React.findDOMNode(contact1.refs.email).value.trim()
    };
    var secondaryEmerContact = {
      name: React.findDOMNode(contact2.refs.name).value.trim(),
      relationship: React.findDOMNode(contact2.refs.relationship).value.trim(),
      cellPhone: React.findDOMNode(contact2.refs.cellPhone).value.trim(),
      workPhone: React.findDOMNode(contact2.refs.workPhone).value.trim(),
      homePhone: React.findDOMNode(contact2.refs.homePhone).value.trim(),
      email: React.findDOMNode(contact2.refs.email).value.trim()
    };
    YFActions.saveSummerAgreements(primaryEmerContact, secondaryEmerContact, function() {
      self.transitionTo('summer/confirm');
    });
  },

  render: function () {
    var self = this;
    return (
      <div className="page-container">
        <SideMenu />
        <div className='main-content col-md-12'>
        <h2>Summer Release Forms</h2>

        <div className="messageBox message_info" aria-atomic="true" aria-live="polite" role="alert" tabIndex={0}>
          <div className="messageIcon">Info</div>
          <span>Parents, please answer all the questions below. The enrollment will not be completed if questions are not answered in this page
          </span> 
        </div>

          <form onSubmit={this.handleConfirm} >
            <SummerTripPermit 
              incomingGrade={this.state.incomingGrade}/>
            <EmergencyBox ref='emerBox'/>
            <SunscreenPermit />
            <PhotoRelease />

            <div className="row">
              <div className='col-md-offset-1'>
                <button type='submit' ref='confirmButton' className="btn btn-primary btn-lg">Confirm</button>&nbsp; {self.state.done ? <h5><span className="bg-info"> Submitted, please Continue. </span></h5> : <p></p>}
              </div>
            </div>
          </form>

          {(this.state.done) ? <button type="button" className="col-md-offset-10 btn btn-success btn-lg" onClick={this.handleContinue}>Continue</button> : <button type="button" className="col-md-offset-10 btn btn-success btn-lg" onClick={this.handleContinue} disabled>Continue</button>}
        </div>
      </div>
    );
  } 
});

var PhotoRelease = React.createClass({
  getInitialState: function() {
    return {
      PhotoRelease: YFStore.getPhotoRelease()
    };
  },
  PhotoRelease: function(e) {
    var v = React.findDOMNode(this.refs.PhotoRelease).checked;
    this.setState({ PhotoRelease: v });
    YFStore.setPhotoRelease(v);
  },
  render: function() {
    var PhotoRelease = (
      <div className="permissionoption">
        <strong>Permit Yang Fan to upload pictures of my child to the school on-line albums?</strong>
        <div className="radio">
          <label>
            {this.state.PhotoRelease ? 
            <input type="radio" name="PhotoRelease" ref="PhotoRelease" onChange={this.PhotoRelease} defaultChecked/> :
            <input type="radio" name="PhotoRelease" ref="PhotoRelease" onChange={this.PhotoRelease} />}
            Yes 
          </label>
        </div>
        <div className="radio">
          <label>
            {!this.state.PhotoRelease ?
              <input type="radio" name="PhotoRelease" onChange={this.PhotoRelease} defaultChecked/> :
              <input type="radio" name="PhotoRelease" onChange={this.PhotoRelease} />}
            No
          </label>
        </div>
      </div> );
    
    return (
      <div className="panel panel-default">
        <div className="panel-heading">
          
            <h2>Photo Release</h2>
          
        </div>

        <div className="panel-body">
          
            <div className="agreement">
              <h4>Agreement for Photo Release</h4>
              <p>Throughout the summer, Yang Fan will take and upload the pictures of our camp activities to the school on-line albums (Access controlled) and allow our summer parents to view those pictures</p>
            </div>
              {PhotoRelease}
            
          
        </div>
      </div>
    );
  }
});
var SunscreenPermit = React.createClass({
  getInitialState: function() {
    return {
      applySunscreen: YFStore.getApplySunscreen(),
      spareSunCream: YFStore.getSpareSunCream(),
      allergySunscreen: YFStore.getAllergySunscreen()
    };
  },
  applySunscreen: function(e) {
    var v = React.findDOMNode(this.refs.applySunscreen).checked;
    this.setState({ applySunscreen: v });
    YFStore.setApplySunscreen(v);
  },
  spareSunCream: function(e) {
    var v = React.findDOMNode(this.refs.spareSunCream).checked;
    this.setState({ spareSunCream: v });
    YFStore.setSpareSunCream(v);
  },
  allergySunscreen: function(e) {
    var v = React.findDOMNode(this.refs.allergySunscreen).checked;
    this.setState({ allergySunscreen: v });
    YFStore.setAllergySunscreen(v);
  },

  render: function() {
    var applySunscreen = (
      <div className="permissionoption">
        <strong>I give permission for Yang Fan staffs to apply sun screen when my child needs it</strong>
        <div className="radio">
          <label>
            {this.state.applySunscreen ? 
            <input type="radio" name="applySunscreen" ref="applySunscreen" onChange={this.applySunscreen} defaultChecked/> :
            <input type="radio" name="applySunscreen" ref="applySunscreen" onChange={this.applySunscreen} />}
            Yes 
          </label>
        </div>
        <div className="radio">
          <label>
            {!this.state.applySunscreen ?
              <input type="radio" name="applySunscreen" onChange={this.applySunscreen} defaultChecked/> :
              <input type="radio" name="applySunscreen" onChange={this.applySunscreen} />}
            No
          </label>
        </div>
      </div> );
    var spareSunCream = (
      <div className="permissionoption">
        <strong>I give permission for Yang Fan staffs to use any spare sun cream that the school may have if I forget to bring sun cream in, or my sun cream runs out or is misplaced.</strong>
        <div className="radio">
          <label>
            {this.state.spareSunCream ? 
            <input type="radio" name="spareSunCream" ref="spareSunCream" onChange={this.spareSunCream} defaultChecked/> :
            <input type="radio" name="spareSunCream" ref="spareSunCream" onChange={this.spareSunCream} />}
            Yes 
          </label>
        </div>
        <div className="radio">
          <label>
            {!this.state.spareSunCream ?
              <input type="radio" name="spareSunCream" onChange={this.spareSunCream} defaultChecked/> :
              <input type="radio" name="spareSunCream" onChange={this.spareSunCream} />}
            No
          </label>
        </div>
      </div> );
    var allergySunscreen = (
      <div className="permissionoption">
        <strong>Does your child have any known allergies in association with sunscreens?</strong>
        <div className="radio">
          <label>
            {this.state.allergySunscreen ? 
            <input type="radio" name="allergySunscreen" ref="allergySunscreen" onChange={this.allergySunscreen} defaultChecked/> :
            <input type="radio" name="allergySunscreen" ref="allergySunscreen" onChange={this.allergySunscreen} />}
            Yes 
          </label>
        </div>
        <div className="radio">
          <label>
            {!this.state.allergySunscreen ?
              <input type="radio" name="allergySunscreen" onChange={this.allergySunscreen} defaultChecked/> :
              <input type="radio" name="allergySunscreen" onChange={this.allergySunscreen} />}
            No
          </label>
        </div>
      </div> );

    return (
      <div className="panel panel-default">
        <div className="panel-heading">
          
            <h2>Sunscreen Permission</h2>
          
        </div>

        <div className="panel-body">
            <div className="agreement">
              <h4>Agreement for Sunscreen</h4>
              <p>My child has my permission to attend below weekly off-campus activities throughout the Summer Camp. These activities include trips that use school vans, public transportation, light rail, and/or walking modes of transportation.</p>
            </div>
            
              {applySunscreen}
              {spareSunCream}
              {allergySunscreen}
           
          
        </div>
      </div>
    );
  }
});

var EmergencyBox = React.createClass({
  getInitialState: function() {
    return {
      emergencyPermit: YFStore.getEmergencyPermit()
    };
  },
  emergencyPermit: function() {
    var s = React.findDOMNode(this.refs.emergencyPermit).checked;
    this.setState({ emergencyPermit: s });
    YFStore.setEmergencyPermit(s);
  },
  render: function() {
    return (
      <div className="panel panel-default">
        <div className="panel-heading">
          
            <h2>Emergency Medical Treatment</h2>
          
        </div>

        <div className="panel-body">
          
            <div className="agreement">
              <h4>Consent for Emergency Medical Treatment</h4>
              <p>I hereby give consent to LIL (Yang Fan) to provide all emergency medical and/or dental care as prescribed by a duly licensed physician (M.D.) or dentist (D.D.S.) for my child. This care maybe given under whatever conditions are necessary to preserve the life, limb, or well being of my dependent.</p>
            </div>
              <div className="radio">
                <label>
                  {this.state.emergencyPermit ? 
                  <input type="radio" name="emergencyPermit" ref="emergencyPermit" onChange={this.emergencyPermit} defaultChecked/> :
                  <input type="radio" name="emergencyPermit" ref="emergencyPermit" onChange={this.emergencyPermit} />}
                  Agree 
                </label>
              </div>
              <div className="radio">
                <label>
                  {!this.state.emergencyPermit ?
                    <input type="radio" name="emergencyPermit" onChange={this.emergencyPermit} defaultChecked/> :
                    <input type="radio" name="emergencyPermit" onChange={this.emergencyPermit} />}
                  Disagree
                </label>
             

              {this.state.emergencyPermit ? 
                <div className='row'>
                  <hr></hr>
                  <div className="col-md-12 emergencycontact">
                  <strong>Please tell us the primary and secondary emergency contacts</strong>
                  </div>
                  <ContactBox 
                    ref='primaryEmerContact'
                    title='Primary Emergency Contact'
                  /> 
                  
                  <ContactBox
                    ref='secondaryEmerContact'
                    title='Secondary Emergency Contact'
                  />
                </div>
                : <p></p> }
            </div>
         
        </div>
      </div>
    );
  }
});

var SummerTripPermit = React.createClass({
  getInitialState: function() {
    return {
      swimPermit: YFStore.getSwimPermit(),
      moviePermit: YFStore.getMoviePermit(),
      fieldTripPermit: YFStore.getFieldTripPermit(),
      HartSportsPermit: YFStore.getHartSportsPermit()
    };
  },
  swimPermit: function(e) {
    var v = React.findDOMNode(this.refs.swimPermit).checked;
    this.setState({ swimPermit: v });
    YFStore.setSwimPermit(v);
  },
  moviePermit: function(e) {
    var v = React.findDOMNode(this.refs.moviePermit).checked;
    this.setState({ moviePermit: v });
    YFStore.setMoviePermit(v);
  },
  fieldTripPermit: function(e) {
    var v = React.findDOMNode(this.refs.fieldTripPermit).checked;
    this.setState({ fieldTripPermit: v });
    YFStore.setFieldTripPermit(v);
  },
  HartSportsPermit: function(e) {
    var v = React.findDOMNode(this.refs.HartSportsPermit).checked;
    this.setState({ HartSportsPermit: v });
    YFStore.setHartSportsPermit(v);
  },
  render: function() {
    var swimPermit = (
      <div className="permissionoption">
        <strong> Permit your child to attend Friday afternoon recreational Swimming trips? </strong>
        <p><i className="fa fa-info-circle fa-fw"></i>students must be able to swimming independently</p>
        <div className="radio">
          <label>
            {this.state.swimPermit ? 
            <input type="radio" name="swimPermit" ref="swimPermit" onChange={this.swimPermit} defaultChecked/> :
            <input type="radio" name="swimPermit" ref="swimPermit" onChange={this.swimPermit} />}
            Yes 
          </label>
        </div>
        <div className="radio">
          <label>
            {!this.state.swimPermit ?
              <input type="radio" name="swimPermit" onChange={this.swimPermit} defaultChecked/> :
              <input type="radio" name="swimPermit" onChange={this.swimPermit} />}
            No
          </label>
        </div>
      </div> );
    var moviePermit = (
      <div className="permissionoption">
        <strong>Permit your child to attend Tuesday morning summer movie at Dublin Regal movie theater ?</strong>
        <div className="radio">
          <label>
            {this.state.moviePermit ? 
            <input type="radio" name="moviePermit" ref="moviePermit" onChange={this.moviePermit} defaultChecked/> :
            <input type="radio" name="moviePermit" ref="moviePermit" onChange={this.moviePermit} />}
            Yes 
          </label>
        </div>
        <div className="radio">
          <label>
            {!this.state.moviePermit ?
              <input type="radio" name="moviePermit" onChange={this.moviePermit} defaultChecked/> :
              <input type="radio" name="moviePermit" onChange={this.moviePermit} />}
            No
          </label>
        </div>
      </div> );
    var fieldTripPermit = (
      <div className="permissionoption">
        <strong>Permit your child to attend Friday field trip?</strong>
        <div className="radio">
          <label>
            {this.state.fieldTripPermit ? 
            <input type="radio" name="fieldTripPermit" ref="fieldTripPermit" onChange={this.fieldTripPermit} defaultChecked/> :
            <input type="radio" name="fieldTripPermit" ref="fieldTripPermit" onChange={this.fieldTripPermit} />}
            Yes 
          </label>
        </div>
        <div className="radio">
          <label>
            {!this.state.fieldTripPermit ?
              <input type="radio" name="fieldTripPermit" onChange={this.fieldTripPermit} defaultChecked/> :
              <input type="radio" name="fieldTripPermit" onChange={this.fieldTripPermit} />}
            No
          </label>
        </div>
      </div> );
    var HartSportsPermit = (
      <div className="permissionoption">
        <strong>Permit your child to attend Hart Middle School Sports Field activities ?</strong>
        <div className="radio">
          <label>
            {this.state.HartSportsPermit ? 
            <input type="radio" name="HartSportsPermit" ref="HartSportsPermit" onChange={this.HartSportsPermit} defaultChecked/> :
            <input type="radio" name="HartSportsPermit" ref="HartSportsPermit" onChange={this.HartSportsPermit} />}
            Yes 
          </label>
        </div>
        <div className="radio">
          <label>
            {!this.state.HartSportsPermit ?
              <input type="radio" name="HartSportsPermit" onChange={this.HartSportsPermit} defaultChecked/> :
              <input type="radio" name="HartSportsPermit" onChange={this.HartSportsPermit} />}
            No
          </label>
        </div>
      </div> );


    return (
      <div className="panel panel-default">
        <div className="panel-heading">
            <h2>Summer Trip Permission</h2>
        </div>

        <div className="panel-body">
          
            
              <div className="agreement">
              <h4>Agreement about summer trip</h4>
              <p>My child has my permission to attend below weekly off-campus activities throughout the Summer Camp. These activities include trips that use school vans, public transportation, light rail, and/or walking modes of transportation.</p>
              </div>
              
              
              {this.props.incomingGrade !== 'K' ? {swimPermit} : <p></p>}
              {(this.props.incomingGrade !== 'K' && this.props.incomingGrade !== 'G1') ? 
              {moviePermit} : <p></p>}
              {this.props.incomingGrade !== 'K' ? {fieldTripPermit} : <p></p>}
              {HartSportsPermit}

            </div>
          
        
      </div>
    );
  }
});

module.exports = SummerAgreements;