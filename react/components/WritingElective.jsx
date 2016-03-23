'use strict';

var React = require('react');
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;
var Navigation = Router.Navigation;
var YFActions = require('../actions/YFActions');
var YFStore = require('../stores/YFStore.jsx');
var wrData = require('../../lib/summer/afternoonWritingElective.json');

var WritingElective = React.createClass({
  getInitialState: function() {
    var self = this;
    var w = YFStore.getWrElecIdx(self.props.curWeekIdx);
    return {
      wrElecIdx:  isNaN(w) ? -1 : w
    };
  },
  changeWritingElective: function(e) {
    var self = this;
    var v = e.currentTarget.value;
    YFStore.setWrElecIdx(self.props.curWeekIdx, v);
  },
  render: function() {
    var self = this;
    var gd = this.props.incomingGrade;
    var writings = [];
    var arr, obj, ref;
    if(self.props.summerCampWeeks.length === 10 && wrData['grades'].indexOf(gd) > -1){
      arr = wrData[gd];
      for(var j = 0; j < arr.length; j++) {
        obj = arr[j];
        ref = self.props.curWeek + '_' + 'WritingElective_' + j;
        writings.push(
          <tr key={ref}>
            <td className='cell'>
            {self.state.wrElecIdx === j ?
              <input type="radio" name="writingElective" ref={ref} onChange={this.changeWritingElective} value={j} defaultChecked/> :
              <input type="radio" name="writingElective" ref={ref} onChange={this.changeWritingElective} value={j} />}  
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
      writings.push(
        <tr key="-1">
          <td className='cell'>
          {self.state.wrElecIdx === -1 ? 
          <input type="radio" name="writingElective" onChange={this.changeWritingElective} value={-1} defaultChecked/> :
          <input type="radio" name="writingElective" onChange={this.changeWritingElective} value={-1} />}
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
            <strong>Afternoon Writing Elective Classes</strong>
          </div>
        </div>

        <div className="panel-body">
        {wrData['grades'].indexOf(gd) > -1 ? 
          <div >
              
                <h4><span className="bg-info">{wrData['note']}</span></h4>
              

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
                  {writings}
                </tbody>
              </table>
            </div>
          : 
          <div className="row">
            <div className='col-md-offset-1'> 
              <h4><span className="bg-info">{wrData['notAvailable']}</span></h4><br></br>
            </div>
          </div> }
        </div> 
      </div>
    );
  }
}); 

module.exports = WritingElective;