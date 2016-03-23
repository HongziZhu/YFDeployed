'use strict';

var React = require('react');
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;
var Navigation = Router.Navigation;
var YFActions = require('../actions/YFActions');
var YFStore = require('../stores/YFStore.jsx');
var mathOlpData = require('../../lib/summer/afternoonMathOlympiad.json');

var MathOlympiad = React.createClass({
  getInitialState: function() {
    var m = YFStore.getMathOlypIdx(this.props.curWeekIdx);
    return {
      mathOlypIdx: isNaN(m) ? -1 : m
    };
  },
  changeMathOlympiad: function(e) {
    var self = this;
    var v = e.currentTarget.value;
    YFStore.setMathOlypIdx(self.props.curWeekIdx, v);
  },
  render: function() {
    var self = this;
    var gd = this.props.incomingGrade;
    var mathOlps = [];
    var arr, obj, ref;
    if(self.props.summerCampWeeks.length === 10 && mathOlpData['grades'].indexOf(gd) > -1){
      arr = mathOlpData[gd];
      for(var j = 0; j < arr.length; j++) {
        obj = arr[j];
        ref = self.props.curWeek + '_' + 'mathOlympiad_' + j;
        mathOlps.push(
          <tr key={ref}>
            <td className='cell'>
            {self.state.mathOlypIdx === j ? 
              <input type="radio" name="mathOlympiad" ref={ref} onChange={this.changeMathOlympiad} value={j} defaultChecked/> :
              <input type="radio" name="mathOlympiad" ref={ref} onChange={this.changeMathOlympiad} value={j} />}
            </td>
            <td className='cell'>{obj['display_name']}</td>
            <td className='cell'>{obj['weekday']}&nbsp;/ {obj['display_time']}</td>
            <td className='cell'><p>{obj['class_size'][0]}-{obj['class_size'][1]}</p></td>
            <td className='cell'>${obj['price_per_class']}/week</td>
          </tr>
        );
      }
      mathOlps.push(
        <tr key="-1">
          <td className='cell'>
          {self.state.mathOlypIdx === -1 ? 
            <input type="radio" name="mathOlympiad" onChange={this.changeMathOlympiad} value={-1} defaultChecked/> :
            <input type="radio" name="mathOlympiad" onChange={this.changeMathOlympiad} value={-1} />}  
          </td>
          <td className='cell'>No, thanks.</td>
          <td className='cell'>---</td>
          <td className='cell'>---</td>
          <td className='cell'>---</td>
        </tr>
      )
    }
    return (
      <div className="panel panel-color panel-gray panel-course">
        <div className="panel-heading">
          <div className="panel-title">
            <strong>Math Olympiad</strong>
          </div>
        </div>

        <div className="panel-body">
        {mathOlpData['grades'].indexOf(gd) > -1 ? 
          <div>
            <strong>Select a Afternoon Math Olympiad Elective Class</strong>
            <p><i className="fa fa-info-circle fa-fw"></i> {mathOlpData['note']}
              </p>


              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th>Select</th>
                    <th>Class Name</th>
                    <th>Weekday / Class Time</th>
                    <th>Class Size</th>
                    <th>Price Per Week</th>
                  </tr>
                </thead><br></br>
                <tbody>
                  {mathOlps}
                </tbody>
              </table>
            </div>
          : 
          
            <div> 
              <strong>{mathOlpData['notAvailable']}</strong><br></br>
            </div>
           }
        </div> 
      </div>
    );
  }
}); 

module.exports = MathOlympiad;