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
    YFActions.loadEnrollment();
    return { 
      language: '',
      writing: '',
      math: '',
      done: false,
      showInfo: false,
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
  changeLang: function(e) {
    var lang = e.currentTarget.value;
    this.setState({ language: lang });
  },
  changeWriting: function(w) {
    this.setState({ writing: w });
  },
  changeMath: function(m) {
    this.setState({ math: m });
  },
  handleSubmit: function(e) {
    e.preventDefault();
    var self = this;
    if(self.state.language === '' || self.state.writing === '' || self.state.math === ''){
      return alert('Please finish all questions.');
    }
    this.setState({ done: true, showInfo: true }, function() {
      React.findDOMNode(this.refs.submitButton).blur();
    });
  },
  handleContinue: function(e) {
    e.preventDefault();
    var self = this;
    YFActions.saveAfternoonAcademics(self.state.language, function() {
      self.transitionTo('summer/week1');
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
                <span className="bg-info">No additional expense for Afternoon Academics(Math and Language), all have been included in the Basic Camp Fee.</span>
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
            </div>
          </div>
        </div>

        <WrMathChoice handleWriting={self.changeWriting} handleMath={self.changeMath}/>

        <div className="row">
          <div className='col-md-offset-1'>
            <button onClick={this.handleSubmit} ref='submitButton' className="btn btn-primary">Submit</button>&nbsp; <br></br>
            {info}
          </div>
        </div>
        {this.state.done ? <button type="button" className="col-md-offset-10 btn btn-success" onClick={this.handleContinue}>Continue</button> : <p></p>}
      </div>
    );
  } 
});

var WrMathChoice = React.createClass({
  changeMath: function(e){
    this.props.handleWriting(e.currentTarget.value);
    YFStore.setMathChoice(e.currentTarget.value);
  },
  changeWriting: function(e){
    this.props.handleMath(e.currentTarget.value);
    YFStore.setWritingChoice(e.currentTarget.value);
  },
  render: function() {
    return (
      <div className="panel panel-default">
          <div className="panel-heading">
            <div className="panel-title">
              <h2>Writing and Math Choices</h2>
            </div>
          </div>

          <div className="panel-body">
          
            <div className="row">
              <div className='col-md-offset-1'> 
                <span className="bg-info">Please choose preferred writing and math classes.</span>
              </div>
            </div><hr></hr>

            <div className='row'>
              <div className='col-md-offset-1'>
                <strong>Writing</strong>
                <div className="radio">
                  <label>
                    <input type="radio" name="writing" onChange={this.changeWriting} value="elective" />
                    Writing Elective Classes
                  </label>
                </div>  
                <div className="radio">
                  <label>
                    <input type="radio" name="writing" onChange={this.changeWriting} value="advanced" />
                    Advanced Writing Boot Camp
                  </label>
                </div> 
                <div className="radio">
                  <label>
                    <input type="radio" name="writing" onChange={this.changeWriting} value="none" />
                    No, thanks.
                  </label>
                </div>              
              </div>
              <hr></hr>

              <div className='col-md-offset-1'>
                <strong>Math</strong>
                <div className="radio">
                  <label>
                    <input type="radio" name="math" onChange={this.changeMath} value="elective" />
                    Math Elective Classes
                  </label>
                </div>  
                <div className="radio">
                  <label>
                    <input type="radio" name="math" onChange={this.changeMath} value="advanced" />
                    Advanced Math Boot Camp
                  </label>
                </div> 
                <div className="radio">
                  <label>
                    <input type="radio" name="math" onChange={this.changeMath} value="none" />
                    No, thanks.
                  </label>
                </div>              
              </div>  
            </div>
          </div>
        </div>
    );
  }
});

module.exports = AfternoonAcademics;
