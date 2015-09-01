'use strict';

var React = require('react');
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;
var Navigation = Router.Navigation;
var YFActions = require('../actions/YFActions');
var YFStore = require('../stores/YFStore.jsx');
var adMathData = require('../../lib/summer/afternoonAdvancedMath.json');

var AdvancedMathUnit = React.createClass({
  changeAdvancedMathUnit: function(e) {

  },
  render: function() {
    var self = this;
    var gd = this.props.incomingGrade;
    var adMaths = [];
    var arr, obj, ref;
    if(self.props.summerCampWeeks.length === 10 && adMathData['grades'].indexOf(gd) > -1){
      arr = adMathData[gd];
      for(var j = 0; j < arr.length; j++) {
        obj = arr[j];
        ref = self.props.curWeek + '_' + 'AdvancedMathUnit_' + j;
        adMaths.push(
          <tr key={ref}>
            <td className='cell'>
              <input type="radio" name="AdvancedMathUnit" ref={ref} onChange={this.changeAdvancedMathUnit} value="" />
            </td>
            <td className='cell'>{obj['display_name']}</td>
            <td className='cell'>
              <span>{obj['weekday'][0]}&nbsp;/{obj['display_time']}</span><br></br>
              <span>{obj['weekday'][1]}&nbsp;/{obj['display_time']}</span>
            </td>
            <td className='cell'><p>{obj['class_size'][0]}-{obj['class_size'][1]}</p></td>
            <td className='cell'>${obj['price_per_class']}/week</td>
          </tr>
        );
      }
      adMaths.push(
        <tr key="-1">
          <td className='cell'>
            <input type="radio" name="AdvancedMathUnit" onChange={this.changeAdvancedMathUnit} value="" />
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
            <h3>Afternoon Advanced Math Boot Camp</h3>
          </div>
        </div>

        <div className="panel-body">
        {adMathData['grades'].indexOf(gd) > -1 ? 
          <div className="row">
              <div className='col-md-offset-1'> 
                <h4><span className="bg-info">{adMathData['note'][0]}</span></h4>
                <h4><span className="bg-info">{adMathData['note'][1]}</span></h4>
              </div>

              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th>Select</th>
                    <th>Class Name</th>
                    <th>Class Time (Twice a week)</th>
                    <th>Class Size</th>
                    <th>Price Per Class</th>
                  </tr>
                </thead><br></br>
                <tbody>
                  {adMaths}
                </tbody>
              </table>
            </div>
          : 
          <div className="row">
            <div className='col-md-offset-1'> 
              <h4><span className="bg-info">{adMathData['notAvailable']}</span></h4>
            </div>
          </div> }
        </div> 
      </div>
    );
  }
}); 

module.exports = AdvancedMathUnit;