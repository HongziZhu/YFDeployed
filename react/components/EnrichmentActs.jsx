'use strict';

var React = require('react');
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;
var Navigation = Router.Navigation;
var YFActions = require('../actions/YFActions');
var YFStore = require('../stores/YFStore.jsx');
var enrichActData = require('../../lib/summer/enrichmentActivities.json');

var EnrichmentActs = React.createClass({
  getInitialState: function() {
    var self = this;
    var a = YFStore.getAftActIdx(self.props.curWeekIdx);
    var b = YFStore.getMorActIdx(self.props.curWeekIdx);
    return {
      morActIdx: b || 0,
      aftActIdx: isNaN(a) ? -1 : a
    };
  },
  changeMorningAct: function(e) {
    var self = this;
    var v = e.currentTarget.value;
    YFStore.setMorActIdx(self.props.curWeekIdx, v);
  },
  changeAfternoonAct: function(e) {
    var self = this;
    var v = e.currentTarget.value;
    YFStore.setAftActIdx(self.props.curWeekIdx, v);
  },
  render: function() {
    var self = this;
    var morningActs = [], afternoonActs = [];
    var grade = this.props.incomingGrade;
    var acts, hide, obj, ref, morAbsent, aftAbsent;
    if(self.props.summerCampWeeks.length === 10){
      morAbsent = self.props.summerCampWeeks[self.props.curWeekIdx].schedulePattern === '5_afternoon';
      aftAbsent = self.props.summerCampWeeks[self.props.curWeekIdx].schedulePattern === '5_morning';
      acts = enrichActData[self.props.curWeek]['morning'];
      obj = acts[0];
      //morning 
      morningActs.push(
        <tr key="0">
          <td className='cell'>
            {self.state.morActIdx === 0 ? 
              <input type="radio" name="morning_acts" ref={ref} onChange={this.changeMorningAct} value={0} defaultChecked/> :
              <input type="radio" name="morning_acts" ref={ref} onChange={this.changeMorningAct} value={0}/>}
          </td>
          <td className='cell'>
            <span className='text-primary'>{obj['activity_name']}</span>&nbsp;(Weekly Theme:&nbsp;{obj['theme']})</td>
          <td className='cell'>{obj['class_size'] === 'unlimited' ? <p>unlimited</p> : 
            <p>{obj['class_size'][0]}-{obj['class_size'][1]}</p>}
          </td>
          <td className='cell'>Free for 6 hours/week</td>
        </tr>
      )
      for(var j = 1; j < acts.length; j++) {
        obj = acts[j];
        hide = obj.grade.indexOf(grade) === -1;

        if(!hide){
          ref = "morning_" + j;
          morningActs.push(
            <tr key={j}>
              <td className='cell'>
              {(self.state.morActIdx || 0) === j ? 
                <input type="radio" name="morning_acts" ref={ref} onChange={this.changeMorningAct} value={j} defaultChecked/> :
                <input type="radio" name="morning_acts" ref={ref} onChange={this.changeMorningAct} value={j} />}
              </td>
              <td className='cell'>{obj['activity_name']}</td>
              <td className='cell'>{obj['class_size'] === 'unlimited' ? <p>unlimited</p> : 
                <p>{obj['class_size'][0]}-{obj['class_size'][1]}</p>}
              </td>
              <td className='cell'>${obj['price']} for 6 hours/week</td>
            </tr>
          );
        }
      }
      //afternoon
      acts = enrichActData[self.props.curWeek].afternoon;
      for(var j = 0; j < acts.length; j++) {
        obj = acts[j];
        hide = obj.grade.indexOf(grade) === -1;

        if(!hide){
          ref = "afternoon_" + j;
          afternoonActs.push(
            <tr key={j}>
              <td className='cell'>
              {self.state.aftActIdx === j ? 
                <input type="radio" name="afternoon_acts" ref={ref} onChange={this.changeAfternoonAct} value={j} defaultChecked/> :
                <input type="radio" name="afternoon_acts" ref={ref} onChange={this.changeAfternoonAct} value={j} />}
              </td>
              <td className='cell'>{obj['activity_name']}</td>
              <td className='cell'>{obj['class_size'] === 'unlimited' ? <p>unlimited</p> : 
                <p>{obj['class_size'][0]}-{obj['class_size'][1]}</p>}
              </td>
              <td className='cell'>${obj['price']} for 4.5 hours/week</td>
            </tr>
          );
        }
      }
      afternoonActs.push(
        <tr key='-1'>
          <td className='cell'>
          {self.state.aftActIdx === -1 ?
            <input type="radio" name="afternoon_acts" ref={ref} onChange={this.changeAfternoonAct} value={-1} defaultChecked/> :
            <input type="radio" name="afternoon_acts" ref={ref} onChange={this.changeAfternoonAct} value={-1} />}
          </td>
          <td className='cell'>I don't need it, thanks.</td>
          <td className='cell'>---</td>
          <td className='cell'>---</td>
        </tr>
      );
    }
    
    return (
      <div className="panel panel-default">
        <div className="panel-heading">
          <div className="panel-title">
            <h3>Enrichment Activities</h3>
          </div>
        </div>

        <div className="panel-body">
          <div className="row">
          {morAbsent ? 
            <div className='col-md-offset-1'> 
              <h3>Morning Activities--{enrichActData['morning_time'].display_time}</h3>
              <span className="bg-info">Sorry, you won't attend in the mornings.</span>
            </div> :
            <div>
            <div className='col-md-offset-1'> 
              <h3>Morning Activities--{enrichActData['morning_time'].display_time}</h3>
              <span className="bg-info">1.{enrichActData['note']}</span><br></br>
              <span className="bg-info">2. Every avtivity has the same time: {enrichActData['morning_time'].display_time}</span>
            </div>

            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>Select</th>
                  <th>Activity</th>
                  <th>Class Size</th>
                  <th>Price Per Week</th>
                </tr>
              </thead><br></br>
              <tbody>
                {morningActs}
              </tbody>
            </table>
            </div> }
            <hr></hr>

            {aftAbsent ? 
            <div className='col-md-offset-1'> 
              <h3>Afternoon Activities--{enrichActData['afternoon_time'].display_time}</h3>
              <span className="bg-info">Sorry, you won't attend in the afternoons.</span>
            </div> : 
            <div>
            <div className='col-md-offset-1'> 
              <h3>Afternoon Activities--{enrichActData['afternoon_time'].display_time}</h3>
              <span className="bg-info">2. Every avtivity has the same time: {enrichActData['afternoon_time'].display_time}</span>
            </div>

            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>Select</th>
                  <th>Activity</th>
                  <th>Class Size</th>
                  <th>Price Per Week</th>
                </tr>
              </thead><br></br>
              <tbody>
                {afternoonActs}
              </tbody>
            </table>
            </div> }
          </div>
        </div>
      </div>
    );
  }
});

module.exports = EnrichmentActs;