'use strict';

var React=require('react');

//Home is component created by React.JS
var Home = React.createClass({
  render: function () {
    //in render function, all the html/css are in the return brackets.
    //Diff: 1. class -> className; 2. for -> htmlFor; 3. <input ..... />;  4. <br> -> <br></br>
    //5. a single element to contain the render stuff
    return (

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


    );
  }
});

module.exports = Home;
