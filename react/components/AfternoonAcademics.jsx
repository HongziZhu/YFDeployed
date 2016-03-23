'use strict';

var React = require('react');
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;
var Navigation = Router.Navigation;
var YFActions = require('../actions/YFActions');
var YFStore = require('../stores/YFStore.jsx');
var wrData = require('../../lib/summer/afternoonWritingElective.json');
var adWrData = require('../../lib/summer/afternoonAdvancedWriting.json');
var mathData = require('../../lib/summer/afternoonMathElective.json');
var adMathData = require('../../lib/summer/afternoonAdvancedMath.json');

var SideMenu = require('./helpers/SideMenu.jsx');

var AfternoonAcademics = React.createClass({
  mixins: [ Navigation ],
  getInitialState: function() {
    YFActions.loadEnrollment();
    YFStore.setSideHighlight('afternoonAcademics');
    return { 
      language: YFStore.getDailyLang() || 'DailyChinese',
      writing:  YFStore.getWritingChoice() || 'none',
      math: YFStore.getMathChoice() || 'none',
      done: false,
      showInfo: false,
      summerCampWeeks: YFStore.getSummerCampWeeks(),
      incomingGrade: YFStore.getIncomingGrade()
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
      language: YFStore.getDailyLang(),
      writing:  YFStore.getWritingChoice(),
      math: YFStore.getMathChoice(),
      summerCampWeeks: YFStore.getSummerCampWeeks(),
      incomingGrade: YFStore.getIncomingGrade()
    });
  },
  changeLang: function(e) {
    var lang = e.currentTarget.value;
    YFStore.setDailyLang(lang);
  },
  changeWriting: function(w) {
    YFStore.setMathChoice(w);
  },
  changeMath: function(m) {
    YFStore.setWritingChoice(m);
  },
  handleConfirm: function(e) {
    e.preventDefault();
    this.setState({ done: true, showInfo: true }, function() {
      React.findDOMNode(this.refs.confirmButton).blur();
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
    var info = (self.state.showInfo ? <h4><span className="bg-success">If you want to change, please choose another and confirm again. Then please click Continue below</span></h4> : <p></p>);
    return (
      <div className="page-container">
      <SideMenu />

      <div className='main-content col-md-12'>
        <div className="panel panel-primary panel-week">
          <div className="panel-heading">
            <div className="panel-title">
              <h2>Afternoon Academics</h2>
              <p>Choose your daily afternoon academics for the summer. </p>
            </div>
          </div>
        </div>
        <div className="panel panel-color panel-gray panel-course">
          <div className="panel-heading">
            <div className="panel-title">
              <strong>Daily Afternoon Academics</strong>
            </div>
          </div>

          <div className="panel-body">
          
            
              
                <div> 
              
                <strong>Select Daily Mathematical Course</strong>
                <p><i className="fa fa-info-circle fa-fw"></i> No additional expense, Daily Math has been Automatically included.
              </p></div>
                <div className='radio'>
                  <label>
                    <input type="radio" name="dailyMath" defaultChecked/>
                    Daily Math&nbsp;
                  </label>
                </div>
              <hr></hr>

              <div>
                <strong>Select a specific Language Art course</strong>
                <p><i className="fa fa-info-circle fa-fw"></i>No additional expense.</p>
                </div>
                <div className="radio">
                  <label>
                    {self.state.language === 'DailyChinese' ? 
                    <input type="radio" name="language" onChange={this.changeLang} value="DailyChinese" defaultChecked/> : 
                    <input type="radio" name="language" onChange={this.changeLang} value="DailyChinese" />}
                    Daily Chinese
                  </label>
                </div>  
                <div className="radio">
                  <label>
                    {self.state.language === 'DailySpanish' ? 
                    <input type="radio" name="language" onChange={this.changeLang} value="DailySpanish" defaultChecked/> :
                    <input type="radio" name="language" onChange={this.changeLang} value="DailySpanish" /> }
                    Daily Spanish
                  </label>
                </div> 
                <div className="radio">
                  <label>
                    {self.state.language === 'DailyHindi' ? 
                    <input type="radio" name="language" onChange={this.changeLang} value="DailyHindi" defaultChecked/> :
                    <input type="radio" name="language" onChange={this.changeLang} value="DailyHindi" /> }
                    Daily Hindi
                  </label>
                </div>              
                
            
          </div>
        </div>
        <hr></hr>
        {self.state.incomingGrade !== 'K' ?
        <div className="panel panel-primary panel-week">
          <div className="panel-heading">
            <div className="panel-title">
              <h2>Elective Preset</h2>
              <p>Before selecting courses for each week, you need to tell us your preferred writing and math classes since Elective and Boot Camp cannot be taken together.</p>
            </div>
          </div>
        </div> : <p></p>}
        {self.state.incomingGrade !== 'K' ?
          <WrMathChoice 
            writing={self.state.writing}
            math={self.state.math}
            incomingGrade={self.state.incomingGrade}
            handleWriting={self.changeWriting} 
            handleMath={self.changeMath}/> : <p></p>}

        <div className="row">
          <div className='col-md-offset-1'>
            <button onClick={this.handleConfirm} ref='confirmButton' className="btn btn-primary btn-lg">Confirm</button><br></br>
            {info}
          </div>
        </div>
        {this.state.done ? <button type="button" className="col-md-offset-10 btn btn-success btn-lg" onClick={this.handleContinue}>Continue</button> : 
          <button type="button" className="col-md-offset-10 btn btn-success btn-lg" onClick={this.handleContinue} disabled>Continue</button>}
      </div>
      </div>
    );
  } 
});

var WrMathChoice = React.createClass({
  changeMath: function(e){
    this.props.handleWriting(e.currentTarget.value);
  },
  changeWriting: function(e){
    this.props.handleMath(e.currentTarget.value);
  },
  render: function() {
    var self = this;
    var gd = this.props.incomingGrade;
    var wrInput = this.props.writing === 'elective' ? <input type="radio" name="writing" onChange={this.changeWriting} value="elective" defaultChecked/> : <input type="radio" name="writing" onChange={this.changeWriting} value="elective"/>;
    var adWrInput = self.props.writing === 'advanced' ? <input type="radio" name="writing" onChange={this.changeWriting} value="advanced" defaultChecked/> :
      <input type="radio" name="writing" onChange={this.changeWriting} value="advanced" />;
    var mathInput = self.props.math === 'elective' ? <input type="radio" name="math" onChange={this.changeMath} value="elective" defaultChecked/> : <input type="radio" name="math" onChange={this.changeMath} value="elective" />;
    var adMathInput = self.props.math === 'advanced' ? <input type="radio" name="math" onChange={this.changeMath} value="advanced" defaultChecked/> : <input type="radio" name="math" onChange={this.changeMath} value="advanced" />;
    return (

      <div className="panel panel-color panel-gray panel-course">
          <div className="panel-heading">
            <div className="panel-title">
              <strong>Writing and Math Choices</strong>
            </div>
          </div>

          <div className="panel-body">


            
              <div>
                <strong>Select one specific Writing Elective course for the summer</strong>
                <p><i className="fa fa-info-circle fa-fw"></i> You can decide the weeks you want to attend this course later.
              </p>
              </div>
                <div className="radio">
                  <label>
                  {wrData['grades'].indexOf(gd) > -1 ? {wrInput} :
                    <input type="radio" name="writing" onChange={this.changeWriting} value="elective" disabled/>}
                    Writing Elective Classes
                  {wrData['grades'].indexOf(gd) === -1 ? <span className="choice-danger">&nbsp;(Not Available for your incoming grade)</span> : <span></span>}
                  </label>
                </div>  
                <div className="radio">
                  <label>
                  {adWrData['grades'].indexOf(gd) > -1 ?
                    {adWrInput} :
                    <input type="radio" name="writing" onChange={this.changeWriting} value="advanced" disabled/>}
                    Advanced Writing Boot Camp
                  {adWrData['grades'].indexOf(gd) === -1 ? <span className="choice-danger">&nbsp;(Not Available for your incoming grade)</span> : <span></span>}
                  </label>
                </div> 
                <div className="radio">
                  <label>
                  {self.props.writing === 'none' ? <input type="radio" name="writing" onChange={this.changeWriting} value="none" defaultChecked/> : 
                  <input type="radio" name="writing" onChange={this.changeWriting} value="none" />}
                    No, thanks.
                  </label>
                </div>              
              
              <hr></hr>

              <div>
                <strong>Select one specific Math Elective course for the summer</strong>
                <p><i className="fa fa-info-circle fa-fw"></i> You can decide the weeks you want to attend this course later.
              </p>
              </div>
                <div className="radio">
                  <label>
                  {mathData['grades'].indexOf(gd) > -1 ? {mathInput} : 
                    <input type="radio" name="math" onChange={this.changeMath} value="elective" disabled/>}
                    Math Elective Classes
                  {mathData['grades'].indexOf(gd) === -1 ? <span className="choice-danger">&nbsp;(Not Available for your incoming grade)</span> : <span></span>}
                  </label>
                </div>  
                <div className="radio">
                  <label>
                  {adMathData['grades'].indexOf(gd) > -1 ? {adMathInput} : 
                    <input type="radio" name="math" onChange={this.changeMath} value="advanced" disabled/>}
                    Advanced Math Boot Camp
                  {adMathData['grades'].indexOf(gd) === -1 ? <span className="choice-danger">&nbsp;(Not Available for your incoming grade)</span> : <span></span>}
                  </label>
                </div> 
                <div className="radio">
                  <label>
                  {self.props.math === 'none' ? 
                    <input type="radio" name="math" onChange={this.changeMath} value="none" defaultChecked/> :
                    <input type="radio" name="math" onChange={this.changeMath} value="none" />}
                    No, thanks.
                  </label>
                </div>              
              
            
          </div>
        </div>
    );
  }
});

module.exports = AfternoonAcademics;
