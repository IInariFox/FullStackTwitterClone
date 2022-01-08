import React from 'react';
import ReactDOM from 'react-dom';
import Navbar from './navbar';
import Login from './login';
import Signup from './signup';

import './home.scss';

import background_1 from '../../images/background_1.png'
import background_2 from '../../images/background_2.png'
import background_3 from '../../images/background_3.jpg'

const backgroundURL = [
  background_1,
  background_2,
  background_3,
]

class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      backStep: 0,
    }
  }

  componentDidMount () {
    this.backgroundTimer = window.setInterval(() => {
      let backStep = this.state.backStep + 1;
      if (backStep == backgroundURL.length) {
        backStep = 0;
      };
      this.setState({ backStep });
    }, 8000);
  }

  componentWillUnmount () {
    window.clearInterval(this.backgroundTimer);
  }

  render () {

    const backgroundImg = backgroundURL[this.state.backStep];

    return (
      <React.Fragment>
        <Navbar />
        <div id="homeback" style={{backgroundImage: `url(${backgroundImg})`}}>
        </div>
        <div className="main">
          <div className="container">
            <div className="row">
              <div className="front-card col-xs-10 col-xs-offset-1">
                <div className="col-xs-6 welcome">
                  <div id="welcome-text">
                    <h1><strong>Welcome to Twitter.</strong></h1>
                    <p>Connect with your friends &#8212; and other fascinating people. Get in-the-moment updates on the things that interest you. And watch events unfold, in real time, from every angle.</p>
                  </div>
                  <p><a href="#" id="twit-info">Hack Pacific - Backendium Twitter Project</a></p>
                  <p><a href="#" id="twit-account">Tweet and photo by @Hackpacific<br/>3:20 PM - 15 December 2016</a></p>
                </div>
                <Login />
                <Signup />
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    )
  }
}

export default Home;
