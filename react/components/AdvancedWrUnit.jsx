'use strict';

var React = require('react');
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;
var Navigation = Router.Navigation;
var YFActions = require('../actions/YFActions');
var YFStore = require('../stores/YFStore.jsx');
var adWrData = require('../../lib/summer/afternoonAdvancedWriting.json');

var AdvancedWrUnit = React.createClass({
  getInitialState: function() {
    var a = YFStore.getAdvWrIdx(this.props.preWeekIdx);
    return {
      advWrIdx: isNaN(a) ? -1 : a
    };
  },
  changeAdvancedWrUnit: function(e) {
    var v = e.currentTarget.value;
    YFStore.setAdvWrIdx(this.props.preWeekIdx, v);
    YFStore.setAdvWrIdx(this.props.postWeekIdx, v);
  },
  render: function() {
    var self = this;
    var gd = this.props.incomingGrade;
    var adWrs = [];
    var arr, obj, ref;
    if(self.props.summerCampWeeks.length === 10 && adWrData['grades'].indexOf(gd) > -1){
      arr = adWrData[gd];
      for(var j = 0; j < arr.length; j++) {
        obj = arr[j];
        ref = self.props.curWeek + '_' + 'AdvancedWrUnit_' + j;
        adWrs.push(
          <tr key={ref}>
            <td className='cell'>
            {self.state.advWrIdx === j ?
              <input type="radio" name="AdvancedWrUnit" ref={ref} onChange={this.changeAdvancedWrUnit} value={j} defaultChecked/> :
              <input type="radio" name="AdvancedWrUnit" ref={ref} onChange={this.changeAdvancedWrUnit} value={j} />}
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
      adWrs.push(
        <tr key="-1">
          <td className='cell'>
          {self.state.advWrIdx === -1 ? 
            <input type="radio" name="AdvancedWrUnit" onChange={this.changeAdvancedWrUnit} value={-1} defaultChecked/> :
            <input type="radio" name="AdvancedWrUnit" onChange={this.changeAdvancedWrUnit} value={-1} />}
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
            <strong>Advanced Writing</strong>
          </div>
        </div>

        <div className="panel-body">
        {adWrData['grades'].indexOf(gd) > -1 ? 
          <div>
              <strong>Select a Afternoon Advanced Writing Boot Camp</strong>
              <p><i className="fa fa-sign-in fa-fw"></i>{adWrData['note'][0]}<br></br>
                <i className="fa fa-info-circle fa-fw"></i> {adWrData['note'][1]}
              </p>
              

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
                  {adWrs}
                </tbody>
              </table>
            </div>
          : 
          <div>
            
              <strong>{adWrData['notAvailable']}</strong>
            
          </div> }
        </div> 
      </div>
    );
  }
}); 

module.exports = AdvancedWrUnit;