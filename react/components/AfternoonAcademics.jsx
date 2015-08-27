'use strict';

var React = require('react');
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;
var Navigation = Router.Navigation;
var YFActions = require('../actions/YFActions');
var YFStore = require('../stores/YFStore.jsx');

var AfternoonAcademics = React.createClass({
  mixins: [ Navigation ],
  getInitialState: function() {
    return { 
      language: '',
      done: false,
      showInfo: false
    };
  },
  componentDidMount: function() {
    
  },
  changeLang: function(e) {
    var lang = e.currentTarget.value;
    this.setState({ language: lang });
  },
  handleSubmit: function(e) {
    e.preventDefault();
    var self = this;
    this.setState({ done: true, showInfo: true }, function() {
      React.findDOMNode(this.refs.submitButton).blur();
    });
  },
  handleContinue: function(e) {
    e.preventDefault();
    var self = this;
    YFActions.saveAfternoonAcademics(self.state.language, function() {
      self.transitionTo('enrichment_activities');
    });
  },

  render: function () {
    var self = this;
    var info = (self.state.showInfo ? <span className="bg-success">{self.state.language} is chosed. If you want to change, please choose another and submit again. Then please click Continue below</span> : <p></p>);
    return (
      <div className='col-md-6 col-md-offset-3'>
        <div className="panel panel-default">
          <div className="panel-heading">
            <div className="panel-title">
              <h2>Afternoon Academics</h2>
            </div>
          </div>

          <div className="panel-body">
          
            <div className="row">
              <div className='col-md-offset-1'> 
                <p className="bg-info">No additional expense for Afternoon Academics(Math and Language), all have been included in the Basic Camp Fee.</p>
              </div>
            </div><hr></hr>

            <div className='row'>
              <div className='col-md-offset-1'>
                <strong>Mathematical Course</strong><br></br>
                <div className='radio'>
                  <label>
                    <input type="radio" name="dailyMath" defaultChecked/>
                    Daily Math&nbsp;<span className='bg-success'>(Automatically included)</span>
                  </label>
                </div>
              </div><hr></hr>

              <div className='col-md-offset-1'>
                <strong>Language Art</strong>
                <div className="radio">
                  <label>
                    <input type="radio" name="language" onChange={this.changeLang} value="Daily Chinese" />
                    Daily Chinese
                  </label>
                </div>  
                <div className="radio">
                  <label>
                    <input type="radio" name="language" onChange={this.changeLang} value="Daily Spanish" />
                    Daily Spanish
                  </label>
                </div> 
                <div className="radio">
                  <label>
                    <input type="radio" name="language" onChange={this.changeLang} value="Daily Hindi" />
                    Daily Hindi
                  </label>
                </div>              
              </div>  
            </div><hr></hr>

            <div className="row">
              <div className='col-md-offset-1'>
                <button onClick={this.handleSubmit} ref='submitButton' className="btn btn-primary">Submit</button>&nbsp; <br></br>
                {info}
              </div>
            </div>
          </div>
        </div>
        {this.state.done ? <button type="button" className="col-md-offset-10 btn btn-success" onClick={this.handleContinue}>Continue</button> : <p></p>}
      </div>
    );
  } 
});

module.exports = AfternoonAcademics;
