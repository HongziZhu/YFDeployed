'use strict';

var React = require('react');
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;
var Navigation = Router.Navigation;
var YFActions = require('../actions/YFActions');
var YFStore = require('../stores/YFStore.jsx');

var EnrichmentActivities = React.createClass({
  mixins: [ Navigation ],
  getInitialState: function() {
    return { 
      enrichmentDone: false,
      enrollmentId: ''
    };
  },
  componentDidMount: function() {
    var self = this;
    self.setState({ 
      enrichmentDone: YFStore.getEnrichmentDone(),
      enrollmentId: YFStore.getEnrollmentId()
    });
  },

  render: function () {
    return (
      <div className='col-md-9 col-md-offset-3'>
        <div className="panel panel-default">
          <div className="panel-heading">
            <div className="panel-title">
              Enrichment Activities
            </div>
          </div>

          <div className="panel-body">
          
            <div className="row">
              <div className="col-sm-12">
                <strong>Select Morning Enrichment Activities</strong>
                <br>
                </br>
              </div>

              <div className="col-sm-12">
                <div className="radio">
                  <label>
                    <input type="radio" name="attendPattern" onChange={this.changePattern} value="5_full" defaultChecked/>
                    5 full days per week (8:00 am - 6:30 pm) $235
                  </label>
                </div>               
              </div>  
            </div>
            <hr></hr>

          </div>
        </div>
        {this.state.enrichmentDone ? <button type="button" className="col-md-offset-10 btn btn-success" onClick={this.handleContinue}>Continue</button> : <p></p>}
      </div>
    );
  } 
});

module.exports = EnrichmentActivities;
