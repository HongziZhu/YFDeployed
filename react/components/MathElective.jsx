'use strict';

var React = require('react');
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;
var Navigation = Router.Navigation;
var YFActions = require('../actions/YFActions');
var YFStore = require('../stores/YFStore.jsx');
var mathData = require('../../lib/summer/afternoonMathElective.json');

var MathElective = React.createClass({
  getInitialState: function() {
    var m = YFStore.getMathElecIdx(this.props.curWeekIdx);
    return {
      mathElecIdx: isNaN(m) ? -1 : m
    };
  },
  changeMathElective: function(e) {
    var self = this;
    var v = e.currentTarget.value;
    YFStore.setMathElecIdx(self.props.curWeekIdx, v);
  },
  render: function() {
    var self = this;
    var gd = this.props.incomingGrade;
    var maths = [];
    var arr, obj, ref;
    if(self.props.summerCampWeeks.length === 10 && mathData['grades'].indexOf(gd) > -1){
      arr = mathData[gd];
      for(var j = 0; j < arr.length; j++) {
        obj = arr[j];
        ref = self.props.curWeek + '_' + 'MathElective_' + j;
        maths.push(
          <tr key={ref}>
            <td className='cell'>
            {self.state.mathElecIdx === j ? 
              <input type="radio" name="mathElective" ref={ref} onChange={this.changeMathElective} value={j} defaultChecked/> :
              <input type="radio" name="mathElective" ref={ref} onChange={this.changeMathElective} value={j} />}
            </td>
            <td className='cell'>{obj['display_name']}</td>
            <td className='cell'>
              <span>{obj['weekday']}&nbsp;/{obj['display_time']}</span>
            </td>
            <td className='cell'><p>{obj['class_size'][0]}-{obj['class_size'][1]}</p></td>
            <td className='cell'>${obj['price_per_class']}/week</td>
          </tr>
        );
      }
      maths.push(
        <tr key="-1">
          <td className='cell'>
          {self.state.mathElecIdx === j ?
            <input type="radio" name="mathElective" onChange={this.changeMathElective} value={-1} defaultChecked/> :
            <input type="radio" name="mathElective" onChange={this.changeMathElective} value={-1} />}
          </td>
          <td className='cell'>No, thanks.</td>
          <td className='cell'>---</td>
          <td className='cell'>---</td>
          <td className='cell'>---</td>
        </tr>
      )
    }

    return (
      <div className="panel panel-primary">
        <div className="panel-heading">
          <div className="panel-title">
            <h3>Afternoon Math Elective Classes</h3>
          </div>
        </div>

        <div className="panel-body">
        {mathData['grades'].indexOf(gd) > -1 ? 
          <div className="row">
              <div className='col-md-offset-1'> 
                <h4><span className="bg-info">{mathData['note']}</span></h4>
              </div>

              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th>Select</th>
                    <th>Class Name</th>
                    <th>Weekday / Class Time</th>
                    <th>Class Size</th>
                    <th>Price Per Class</th>
                  </tr>
                </thead><br></br>
                <tbody>
                  {maths}
                </tbody>
              </table>
            </div>
          : 
          <div className="row">
            <div className='col-md-offset-1'> 
              <h4><span className="bg-info">{mathData['notAvailable']}</span></h4><br></br>
            </div>
          </div> }
        </div> 
      </div>
    );
  }
}); 

module.exports = MathElective;