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
      <div className="panel panel-default">
        <div className="panel-heading">
          <div className="panel-title">
            <h3>Afternoon Math Olympiad Elective Classes</h3>
          </div>
        </div>

        <div className="panel-body">
        {mathOlpData['grades'].indexOf(gd) > -1 ? 
          <div className="row">
              <div className='col-md-offset-1'> 
                <h4><span className="bg-info">{mathOlpData['note']}</span></h4>
              </div>

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
          <div className="row">
            <div className='col-md-offset-1'> 
              <h4><span className="bg-info">{mathOlpData['notAvailable']}</span></h4><br></br>
            </div>
          </div> }
        </div> 
      </div>
    );
  }
}); 

module.exports = MathOlympiad;