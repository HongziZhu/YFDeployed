'use strict';

var React=require('react');

//Home is component created by React.JS
var Home = React.createClass({
  render: function () {
    //in render function, all the html/css are in the return brackets.
    //Diff: 1. class -> className; 2. for -> htmlFor; 3. <input ..... />;  4. <br> -> <br></br>
    //5. a single element to contain the render stuff
    return (
<div className="page-container">

<div className="sidebar-menu toggle-others fixed">
        <div className="sidebar-menu-inner">  
          <ul id="main-menu" className="main-menu">
            <li>
              <a>
                <i className="linecons-cog" />
                <span className="title">Get Started</span>
              </a>
            </li>
            <li>
              <a>
                <i className="linecons-desktop" />
                <span className="title">Attendance</span>
              </a>
            </li>
            <li>
              <a>
                <i className="linecons-note" />
                <span className="title">Enrichment Activities</span>
              </a>
            </li>
            <li>
              <a>
                <i className="linecons-database" />
                <span className="title">Afternoon Academics</span>
              </a>
            </li>
            <li className="active opened active">
              <a>
                <i className="linecons-cog" />
                <span className="title">Writing Classes</span>
              </a>
            </li>
            <li>
              <a>
                <i className="linecons-cog" />
                <span className="title">Math Classes</span>
              </a>
            </li>
            <li>
              <a>
                <i className="linecons-cog" />
                <span className="title">GATE Elective</span>
              </a>
            </li>
            <li>
              <a>
                <i className="linecons-params" />
                <span className="title">Other Services and Activitie</span>
              </a>
            </li>
          </ul>
        </div>
      </div>

<div className="col-md-12">
     <table className="dataintable" >
<tbody><tr>
<th style={{width: '5%'}}></th>
<th style={{width: '19%'}}>Monday</th>
<th style={{width: '19%'}}>Tuesday</th>
<th style={{width: '19%'}}>Wednesday</th>
<th style={{width: '19%'}}>Thursday</th>
<th style={{width: '19%'}}>Friday</th>
</tr>

<tr>
<th>AM</th>
<td>
    <ul>
        <li><span className = "morning-care">Morning Extended Care</span></li>
        <li><span className = "enrichment-activity">Morning Enrichment Activity</span></li>
    </ul>
</td>
<td>
  <ul>
    <li><span className = "morning-care">Morning Extended Care</span></li>
    <li><span className = "enrichment-activity">Morning Enrichment Activity</span></li>
    <li><span className = "movie">Movie Trip</span></li>
  </ul>
 </td>

<td>
  <ul>
  <li><span className = "morning-care">Morning Extended Care</span></li>
  <li>circle</li>
  </ul>
</td>
<td>
  <ul>
  <li><span className = "morning-care">Morning Extended Care</span></li>
  <li>circle</li>
  </ul>
</td>
<td>
  <ul>
  <li><span className = "morning-care">Morning Extended Care</span></li>
  <li><span className = "enrichment-activity">Morning Enrichment Activity</span></li>
  <li>circle</li>
  </ul>
</td>
</tr>

<tr>
<th>PM</th>
<td><ul>
    <li><span className = "enrichment-activity">Afternoon Enrichment Activity</span></li>
  <li><span className = "afternoon-academics">Afternoon Academics</span></li>
  <li><span className = "electives">Elective Classes</span></li>
    </ul></td>
<td>
  <ul>
  <li><span className = "afternoon-academics">Afternoon Academics</span></li>
  <li><span className = "electives">Elective Classes</span></li>
  <li>circle</li>
  </ul>
</td>
<td>
  <ul>
  <li><span className = "afternoon-academics">Afternoon Academics</span></li>
  <li><span className = "electives">Elective Classes</span></li>
  <li>circle</li>
  </ul>
</td>
<td><ul>
    <li><span className = "enrichment-activity">Afternoon Enrichment Activity</span></li>
  <li><span className = "afternoon-academics">Afternoon Academics</span></li>
  <li><span className = "electives">Elective Classes</span></li>
    </ul></td>
<td><ul>
    <li><span className = "enrichment-activity">Afternoon Enrichment Activity</span></li>
  <li>square</li>
  <li>circle</li>
    </ul></td>
</tr>
</tbody></table>
</div>









<div className="col-md-12">
          <div className="panel panel-primary">
            <div classname="panel-heading">
              <strong>Select Afternoon Enrichment Activities</strong>
            </div>
            {/* ------------------------------------------------------Week 1------------------------------------------------------------------------ */}
            <div className="panel-body">
              <strong>Week 1 (6/15-6/19): 4-5:30 pm on Mon., Wed., and Thu..</strong>
              <br />
              <br />
              <div className="radio">
                <label>
                  <input type="radio" name="optionsRadios" id="optionsRadios1" defaultValue="option1" defaultChecked />
                  4-5:30 pm: Public Speaking (G3 &amp;up, class size 15) ($35 for 4.5 hr per week)
                </label>
              </div>
              <div className="radio">
                <label>
                  <input type="radio" name="optionsRadios" id="optionsRadios2" defaultValue="option2" />
                  4-5:30 pm: Kung Fu (K &amp;up, class size 15) ($30 for 4.5 hr per week)
                </label>
              </div>
            </div>
            {/* ------------------------------------------------------Week 2------------------------------------------------------------------------ */}
            <div className="panel-body">
              <strong>Week 2 (6/22-6/26): 4-5:30 pm on Mon., Wed., and Thu..</strong>
              <br />
              <br />
              <div className="radio">
                <label>
                  <input type="radio" name="optionsRadios" id="optionsRadios1" defaultValue="option1" defaultChecked />
                  4-5:30 pm: Chess (G1-G2, class size 15) ($28 for 4.5 hr per week)
                </label>
              </div>
              <div className="radio">
                <label>
                  <input type="radio" name="optionsRadios" id="optionsRadios2" defaultValue="option2" />
                  4-5:30 pm: Swimming (G1 &amp;up. 3 levels offered each day. Beginner/Intermediate/Advanced, 5-7 students per class) ($40 for 4.5 hr per week)
                </label>
              </div>
            </div>
            {/* ------------------------------------------------------Week 3------------------------------------------------------------------------ */}
            <div className="panel-body">
              <strong>Week 3 (6/29-7/3): 4-5:30 pm on Mon., Wed., and Thu..</strong>
              <br />
              <br />
              <div className="radio">
                <label>
                  <input type="radio" name="optionsRadios" id="optionsRadios1" defaultValue="option1" defaultChecked />
                  4-5:30 pm: Chess (G1-G2, class size 15) ($28 for 4.5 hr per week)
                </label>
              </div>
              <div className="radio">
                <label>
                  <input type="radio" name="optionsRadios" id="optionsRadios2" defaultValue="option2" />
                  4-5:30 pm: Swimming (G1 &amp;up. 3 levels offered each day. Beginner/Intermediate/Advanced, 5-7 students per class) ($40 for 4.5 hr per week)
                </label>
              </div>
            </div>
            {/* ------------------------------------------------------Week 4------------------------------------------------------------------------ */}
            <div className="panel-body">
              <strong>Week 4 (7/6-7/10): 4-5:30 pm on Mon., Wed., and Thu..</strong>
              <br />
              <br />
              <div className="radio">
                <label>
                  <input type="radio" name="optionsRadios" id="optionsRadios1" defaultValue="option1" defaultChecked />
                  4-5:30 pm: Chess (G1-G2, class size 15) ($28 for 4.5 hr per week)
                </label>
              </div>
              <div className="radio">
                <label>
                  <input type="radio" name="optionsRadios" id="optionsRadios2" defaultValue="option2" />
                  4-5:30 pm: Swimming (G1 &amp;up. 3 levels offered each day. Beginner/Intermediate/Advanced, 5-7 students per class) ($40 for 4.5 hr per week)
                </label>
              </div>
              <div className="radio">
                <label>
                  <input type="radio" name="optionsRadios" id="optionsRadios2" defaultValue="option2" />
                  4-5:30 pm: Public Speaking (K-G2, class size 15) ($35 for 4.5 hr per wee
                </label>
              </div>
            </div>
            {/* ------------------------------------------------------Week 5------------------------------------------------------------------------ */}
            <div className="panel-body">
              <div className="panel-body">
                <strong>Week 5 (7/13-7/17): 4-5:30 pm on Mon., Wed., and Thu..</strong>
                <br />
                <br />
                <div className="radio">
                  <label>
                    <input type="radio" name="optionsRadios" id="optionsRadios1" defaultValue="option1" defaultChecked />
                    4-5:30 pm: Chess (G1-G2, class size 15) ($28 for 4.5 hr per week)
                  </label>
                </div>
                <div className="radio">
                  <label>
                    <input type="radio" name="optionsRadios" id="optionsRadios2" defaultValue="option2" />
                    4-5:30 pm: Swimming (G1 &amp;up. 3 levels offered each day. Beginner/Intermediate/Advanced, 5-7 students per class) ($40 for 4.5 hr per week)
                  </label>
                </div>
                <div className="radio">
                  <label>
                    <input type="radio" name="optionsRadios" id="optionsRadios2" defaultValue="option2" />
                    4-5:30 pm: Public Speaking (K-G2, class size 15) ($35 for 4.5 hr per wee
                  </label>
                </div>
              </div>
            </div>
            {/* ------------------------------------------------------Week 6------------------------------------------------------------------------ */}
            <div className="panel-body">
              <strong>Week 6 (7/20-7/24): 4-5:30 pm on Mon., Wed., and Thu..</strong>
              <br />
              <br />
              <div className="radio">
                <label>
                  <input type="radio" name="optionsRadios" id="optionsRadios1" defaultValue="option1" defaultChecked />
                  4-5:30 pm: Swimming (G1 &amp;up. 3 levels offered each day. Beginner/Intermediate/Advanced, 5-7 students per class) ($40 for 4.5 hr per week)
                </label>
              </div>
            </div>
            {/* ------------------------------------------------------Week 7------------------------------------------------------------------------ */}
            <div className="panel-body">
              <strong>Week 7 (7/20-7/24): 4-5:30 pm on Mon., Wed., and Thu..</strong>
              <br />
              <br />
              <div className="radio">
                <label>
                  <input type="radio" name="optionsRadios" id="optionsRadios1" defaultValue="option1" defaultChecked />
                  4-5:30 pm: Chess (G1-G2, class size 15) ($28 for 4.5 hr per week)
                </label>
              </div>
              <div className="radio">
                <label>
                  <input type="radio" name="optionsRadios" id="optionsRadios2" defaultValue="option2" />
                  4-5:30 pm: Swimming (G1 &amp;up. 3 levels offered each day. Beginner/Intermediate/Advanced, 5-7 students per class) ($40 for 4.5 hr per week)
                </label>
              </div>
            </div>
            {/* ------------------------------------------------------Week 8------------------------------------------------------------------------ */}
            <div className="panel-body">
              <strong>Week 8 (8/3-8/7): 4-5:30 pm on Mon., Wed., and Thu..</strong>
              <br />
              <br />
              <div className="radio">
                <label>
                  <input type="radio" name="optionsRadios" id="optionsRadios1" defaultValue="option1" defaultChecked />
                  4-5:30 pm: Chess (G3 &amp;up, class size 15) ($28 for 4.5 hr per week)
                </label>
              </div>
              <div className="radio">
                <label>
                  <input type="radio" name="optionsRadios" id="optionsRadios2" defaultValue="option2" />4-5:30 pm: Swimming (G1 &amp;up. 3 levels offered each day. Beginner/Intermediate/Advanced, 5-7 students per class) ($40 for 4.5 hr per week)
                </label>
              </div>
              <div className="radio">
                <label>
                  <input type="radio" name="optionsRadios" id="optionsRadios2" defaultValue="option2" />
                  4-5:30 pm: Role Playing (K-G2, class size 20) ($30 for 4.5 hr per week)
                </label>
              </div>
            </div>
            {/* ------------------------------------------------------Week 9------------------------------------------------------------------------ */}
            <div className="panel-body">
              <strong>Week 8 (8/3-8/7): 4-5:30 pm on Mon., Wed., and Thu..</strong>
              <br />
              <br />
              <div className="radio">
                <label>
                  <input type="radio" name="optionsRadios" id="optionsRadios1" defaultValue="option1" defaultChecked />
                  4-5:30 pm: Chess (G3 &amp;up, class size 15) ($28 for 4.5 hr per week)
                </label>
              </div>
              <div className="radio">
                <label>
                  <input type="radio" name="optionsRadios" id="optionsRadios2" defaultValue="option2" />
                  4-5:30 pm: Swimming (G1 &amp;up. 3 levels offered each day. Beginner/Intermediate/Advanced, 5-7 students per class) ($40 for 4.5 hr per week)
                </label>
              </div>
              <div className="radio">
                <label>
                  <input type="radio" name="optionsRadios" id="optionsRadios2" defaultValue="option2" />
                  4-5:30 pm: Public Speaking (K-G2, class size 15) ($35 for 4.5 hr per wee
                </label>
              </div>
            </div>
            {/* ------------------------------------------------------Week 10------------------------------------------------------------------------ */}
            <div className="panel-body">
              <strong>Week 8 (8/3-8/7): 4-5:30 pm on Mon., Wed., and Thu..</strong>
              <br />
              <br />
              <div className="radio">
                <label>
                  <input type="radio" name="optionsRadios" id="optionsRadios1" defaultValue="option1" defaultChecked />
                  4-5:30 pm: Kun Fu (K &amp;up, class size 15) ($30 for 4.5 hr per week)
                </label>
              </div>
            </div>
          </div>    

        <div className="col-sm-12">
          <h2>YangFan Enrollment System</h2>
          <div className="lead">
            Welcome!  
          </div>

        </div>
</div>
</div>

    );
  }
});

module.exports = Home;
