'use strict';

var React = require('react');
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;
var Navigation = Router.Navigation;
var YFActions = require('../actions/YFActions');
var YFStore = require('../stores/YFStore.jsx');

var ContactBox = require('./helpers/ContactBox.jsx');

var SummerAgreements = React.createClass({
  mixins: [ Navigation ],
  getInitialState: function() {
    YFActions.loadEnrollment();
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
    this.setState({ done: true });
    React.findDOMNode(this.refs.confirmButton).blur();
  },
  handleContinue: function(e) {
    YFActions.saveSummerAgreements();
    this.transitionTo('summer/confirm');
  },

  render: function () {
    var self = this;
    return (
      <div className='col-md-9 col-md-offset-3'>
      <h2>Summer Release Forms</h2>
        <h3 className='bg-info'>Parents, please answer all the questions below. <ins>The enrollment is not completed if questions are not answered in this page</ins>
        </h3><hr></hr>
        <SummerTripPermit 
          incomingGrade={this.state.incomingGrade}/>
        <EmergencyBox />
        <SunscreenPermit />
        <PhotoRelease />

        <div className="row">
          <div className='col-md-offset-1'>
            <button onClick={this.handleConfirm} ref='confirmButton' className="btn btn-primary">Confirm</button>&nbsp; {self.state.done ? <h5><span className="bg-info"> Submitted, please Continue. </span></h5> : <p></p>}
          </div>
        </div>

        {(this.state.done) ? <button type="button" className="col-md-offset-10 btn btn-success" onClick={this.handleContinue}>Continue</button> : <button type="button" className="col-md-offset-10 btn btn-success" onClick={this.handleContinue} disabled>Continue</button>}
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
      <div>
        <h4>I permit Yang Fan to upload pictures of my child to the school on-line albums</h4>
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
      <div className="panel panel-primary">
        <div className="panel-heading">
          <div className="panel-title">
            <h3>Photo Release</h3>
          </div>
        </div>

        <div className="panel-body">
          <div className="row">
            <div className='col-md-offset-1 col-md-10'> 
              <h4 className="bg-info">Throughout the summer, Yang Fan will take and upload the pictures of our camp activities to the school on-line albums (Access controlled) and allow our summer parents to view those pictures
              </h4><hr></hr>
              {PhotoRelease}
            </div>
          </div>
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
      <div>
        <h4>I give permission for Yang Fan staffs to apply sun screen when my child needs it</h4>
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
      <div>
        <h4 className='bg-danger'>If I forget to bring sun cream in, or my sun cream runs out or is misplaced, I give permission for Yang Fan staffs to use any spare sun cream that the school may have.</h4>
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
      <div>
        <h4>Does your child have any known allergies in association with sunscreens?</h4>
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
      <div className="panel panel-primary">
        <div className="panel-heading">
          <div className="panel-title">
            <h3>Summer Trip Permission</h3>
          </div>
        </div>

        <div className="panel-body">
          <div className="row">
            <div className='col-md-offset-1 col-md-10'> 
              <h4 className="bg-info">
              My child has my permission to attend below weekly off-campus activities throughout the Summer Camp. These activities include trips that use school vans, public transportation, light rail, and/or walking modes of transportation.
              </h4><hr></hr>
              {applySunscreen}
              {spareSunCream}
              {allergySunscreen}
            </div>
          </div>
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
      <div className="panel panel-primary">
        <div className="panel-heading">
          <div className="panel-title">
            <h3>Consent for Emergency Medical Treatment</h3>
          </div>
        </div>

        <div className="panel-body">
          <div className="row">
            <div className='col-md-offset-1 col-md-10'> 
              <h4 className="bg-info">
              I hereby give consent to LIL (Yang Fan) to provide all emergency medical and/or dental care as prescribed by a duly licensed physician (M.D.) or dentist (D.D.S.) for my child. This care maybe given under whatever conditions are necessary to preserve the life, limb, or well being of my dependent.
              </h4>
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
              </div><hr></hr>

              {this.state.emergencyPermit ? 
                <div className='row'>
                  <ContactBox 
                    title='Primary Emergency Contact'
                  /> 
                  <ContactBox
                  title='Secondary Emergency Contact'
                  />
                </div>
                : <p></p> }
            </div><hr></hr>
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
      <div>
        <h4>Friday afternoon recreational Swimming trips (<strong>students must be able to swimming independently</strong>)</h4>
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
      <div>
        <h4>Tuesday morning summer movie at Dublin Regal movie theater</h4>
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
      <div>
        <h4>Friday field trip</h4>
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
      <div>
        <h4>Hart Middle School Sports Field activities</h4>
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
      <div className="panel panel-primary">
        <div className="panel-heading">
          <div className="panel-title">
            <h3>Summer Trip Permission</h3>
          </div>
        </div>

        <div className="panel-body">
          <div className="row">
            <div className='col-md-offset-1 col-md-10'> 
              <h4 className="bg-info">
              My child has my permission to attend below weekly off-campus activities throughout the Summer Camp. These activities include trips that use school vans, public transportation, light rail, and/or walking modes of transportation.
              </h4><hr></hr>
              {this.props.incomingGrade !== 'K' ? {swimPermit} : <p></p>}
              {(this.props.incomingGrade !== 'K' && this.props.incomingGrade !== 'G1') ? 
              {moviePermit} : <p></p>}
              {this.props.incomingGrade !== 'K' ? {fieldTripPermit} : <p></p>}
              {HartSportsPermit}

            </div>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = SummerAgreements;