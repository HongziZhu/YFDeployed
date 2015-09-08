'use strict';

var React=require('react');


//Home is component created by React.JS
var Home = React.createClass({
  render: function () {
    //in render function, all the html/css are in the return brackets.
    //Diff: 1. class -> className; 2. for -> htmlFor; 3. <input ..... />;  4. <br> -> <br></br>
    //5. a single element to contain the render stuff
    return (
      <div className="web-boy" style={{width: '100vw', height: '100vh', margin: 0, padding: 0, background: 'url("http://i.imgur.com/UP7fWfg.jpg") no-repeat center center', backgroundSize: 'cover', fontFamily: '"Lato", sans-serif'}}>
        <form className="sub-form">
          <div className="input-contain">
            <div className="circle circle-quill" />
            <h2 className="info">Welcome to Yang Fan Enrollment</h2>
            <div className="allsub">
              <a href='/login' >
                <div className="submit">
                  Log in
                </div>
              </a>
              <a href='/signup' >
                <div className="submit">
                  Sign up
                </div>
              </a>
            </div>{/*allsub*/}
            <p className="success-dialog">
              We’ll be in touch shortly.<br />
              In the meantime, <br />
              check out our <br />
              <a href="#">weekly offerings.</a>
            </p>
          </div>{/*input-contain*/}
        </form>
      </div>
    );
  }
});

module.exports = Home;