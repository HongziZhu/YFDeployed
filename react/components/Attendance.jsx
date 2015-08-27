'use strict';

var React=require('react');

var Attendance = React.createClass({
  render: function () {
    
    return (
      <div className='col-md-6 col-md-offset-3'>
        <div className="panel panel-default">
          <div className="panel-heading">
            <div className="panel-title">
              Attendance
            </div>
          </div>

          <div className="panel-body">
            <div className="row">
              <div className="col-sm-12">
                <strong>How many days do you want to attend per week?</strong>
                <br>
                </br>
              </div>

              <div className="col-sm-12">
                <div className="radio">
                  <label>
                    <input type="radio" name="attendPattern" value="option1" defaultChecked/>
                    5 full days per week (8:00 am -6:30 pm) $235
                  </label>
                </div>
                <div className="radio">
                  <label>
                    <input type="radio" name="attendPattern" value="option2"/>
                    4 full days per week (8:00 am -6:30 pm) $210
                  </label>
                </div>
                <div className="radio">
                  <label>
                    <input type="radio" name="attendPattern" value="option1"/>
                    3 full days per week (8:00 am -6:30 pm) $190
                  </label>
                </div>
                <div className="radio">
                  <label>
                    <input type="radio" name="attendPattern" value="option2"/>
                    5 mornings per week (8:00 am -12:30 pm) $175
                  </label>
                </div>
                <div className="radio">
                  <label>
                    <input type="radio" name="attendPattern" value="option2"/>
                    5 afternoons per week (1:00 pm -6:30 pm) $175
                  </label>
                </div>                
              </div>  
            </div>
            <hr></hr>

            <div className="row">
              <div className="col-sm-12">
                <strong>Choose the attending weekdays</strong>
                <br>
                </br>
              </div>

              <div className="col-sm-12">
                <label className="checkbox-inline">
                  <input type="checkbox" value="option1"/> Monday
                </label>
                <label className="checkbox-inline">
                  <input type="checkbox" value="option2"/> Tuesday
                </label>
                <label className="checkbox-inline">
                  <input type="checkbox" value="option3"/> Wednesday
                </label>
                <label className="checkbox-inline">
                  <input type="checkbox" value="option2"/> Thursday
                </label>
                <label className="checkbox-inline">
                  <input type="checkbox" value="option3"/> Friday
                </label>
              </div>
            </div>
            <hr></hr>

            <div className="row">
              <div className="col-sm-12">
                <strong>Choose the weeks to apply</strong>
                <br>
                </br>
                <ul >
                  <label className="checkbox">
                    <input type="checkbox" className="icheck-15" value="option1"/>Week 1 (6/15-6/19)
                  </label>
                  <label className="checkbox">
                    <input type="checkbox" value="option2"/>Week 2 (6/22-6/26)
                  </label>
                  <label className="checkbox">
                    <input type="checkbox" value="option3"/>Week 3 (6/29-7/2 Yang Fan is CLOSED on Friday)
                  </label>
                  <label className="checkbox">
                    <input type="checkbox" value="option2"/>Week 4 (7/6-7/10)
                  </label>
                  <label className="checkbox">
                    <input type="checkbox" value="option3"/>Week 5 (7/13-7/17)
                  </label>
                  <label className="checkbox">
                    <input type="checkbox" value="option1"/>Week 6 (7/20-7/24)
                  </label>
                  <label className="checkbox">
                    <input type="checkbox" value="option2"/>Week 7 (7/27-7/31)
                  </label>
                  <label className="checkbox">
                    <input type="checkbox" value="option3"/>Week 8 (8/3-8/7)
                  </label>
                  <label className="checkbox">
                    <input type="checkbox" value="option2"/>Week 9 (8/10-8/14)
                  </label>
                  <label className="checkbox">
                    <input type="checkbox" value="option3"/>Week 10 (8/17-8/21)
                  </label>
                </ul>
              </div>
            </div>
            <hr></hr>

            <div className="row">
              <div className="col-sm-12">
                <button className="btn btn-info">Submit</button>
              </div>  
            </div>

          </div>
        </div>
      </div>
    );
  }
});

module.exports = Attendance;
