'use strict';

var React = require('react');
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;
var Navigation = Router.Navigation;
var YFActions = require('../actions/YFActions');
var YFStore = require('../stores/YFStore.jsx');
var GATEData = require('../../lib/summer/afternoonGATE.json');

var GATE = React.createClass({
  getInitialState: function() {
    var m = YFStore.getGATEIdx(this.props.curWeekIdx);
    return {
      GATEIdx: isNaN(m) ? -1 : m
    };
  },
  changeMathOlympiad: function(e) {
    var self = this;
    var v = e.currentTarget.value;
    YFStore.setGATEIdx(self.props.curWeekIdx, v);
  },
  render: function() {
    var self = this;
    var gd = this.props.incomingGrade;
    var gates = [];
    var arr, obj, ref;
    if(self.props.summerCampWeeks.length === 10 && GATEData['grades'].indexOf(gd) > -1){
      arr = GATEData[gd];
      for(var j = 0; j < arr.length; j++) {
        obj = arr[j];
        ref = self.props.curWeek + '_' + 'GATE_' + j;
        gates.push(
          <tr key={ref}>
            <td className='cell'>
            {self.state.GATEIdx === j ? 
              <input type="radio" name="mathOlympiad" ref={ref} onChange={this.changeGATE} value={j} defaultChecked/> :
              <input type="radio" name="mathOlympiad" ref={ref} onChange={this.changeGATE} value={j} />}
            </td>
            <td className='cell'>{obj['display_name']}</td>
            <td className='cell'>
              <span>Mon&nbsp;({obj['class_time'][0]['display_time']})</span><br></br>
              <span>Wed&nbsp;({obj['class_time'][1]['display_time']})</span>
            </td>
            <td className='cell'><p>{obj['class_size'][0]}-{obj['class_size'][1]}</p></td>
            <td className='cell'>${obj['price_per_class']}/week</td>
          </tr>
        );
      }
      gates.push(
        <tr key="-1">
          <td className='cell'>
          {self.state.GATEIdx === -1 ? 
            <input type="radio" name="mathOlympiad" onChange={this.changeGATE} value={-1} defaultChecked/> :
            <input type="radio" name="mathOlympiad" onChange={this.changeGATE} value={-1} /> }
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
            <h3>Afternoon GATE Elective Classes</h3>
          </div>
        </div>

        <div className="panel-body">
        {GATEData['grades'].indexOf(gd) > -1 ? 
          <div className="row">
              <div className='col-md-offset-1'> 
                <h4><span className="bg-info">1.&nbsp;{GATEData['note'].a}</span></h4>
                <h4><span className="bg-info">2.&nbsp;{GATEData['note'].b}</span></h4>
              </div>

              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th>Select</th>
                    <th>Class Name</th>
                    <th>Class Time(Twice a week)</th>
                    <th>Class Size</th>
                    <th>Price Per Class</th>
                  </tr>
                </thead><br></br>
                <tbody>
                  {gates}
                </tbody>
              </table>
            </div>
          : 
          <div className="row">
            <div className='col-md-offset-1'> 
              <h4><span className="bg-info">{GATEData['notAvailable']}</span></h4><br></br>
            </div>
          </div> }
        </div> 
      </div>
    );
  }
}); 

module.exports = GATE;