import React from 'react';
import { handleErrors } from '@utils/fetchHelper';
import Login from './login';
import Signup from './signup';
import './home.scss';
import background_1 from './images/background_1.png'; 
import background_2 from './images/background_2.png'; 
import background_3 from './images/background_3.jpg'; 

class Home extends React.Component {
  state = {
    authenticated: false,
  }

  componentDidMount() {
    fetch('/api/authenticated')
      .then(handleErrors)
      .then(data => {
        this.setState({
          authenticated: data.authenticated,
        })
      })
  }

  render () {
    function backgroundScheduler_1() {
      setTimeout(() => {
          document.querySelector("#backgroundOne").style.opacity = 0;
          document.querySelector("#backgroundTwo").style.opacity = 1;
          document.querySelector("#backgroundThree").style.opacity = 1;
          order(["-3", "-1", "-2"], () => { backgroundScheduler_2() }, 1000);
      }, 3000);
    }
    
    function backgroundScheduler_2() {
      setTimeout(() => {
          document.querySelector("#backgroundOne").style.opacity = 1;
          document.querySelector("#backgroundTwo").style.opacity = 0;
          document.querySelector("#backgroundThree").style.opacity = 1;
          order(["-2", "-3", "-1"], () => { backgroundScheduler_3() }, 1000);
      }, 3000);
    }
    
    function backgroundScheduler_3() {
      setTimeout(() => {
          document.querySelector("#backgroundOne").style.opacity = 1;
          document.querySelector("#backgroundTwo").style.opacity = 1;
          document.querySelector("#backgroundThree").style.opacity = 0;
          order(["-1", "-2", "-3"], () => { backgroundScheduler_1() }, 1000);
      }, 3000);
    }
    
    function order(array, callback, time) {
      setTimeout(() => {
          document.querySelector("#backgroundOne").style.zIndex = array[0];
          document.querySelector("#backgroundTwo").style.zIndex = array[1];
          document.querySelector("#backgroundThree").style.zIndex = array[2];
          callback();
      }, time);
    }
    
    backgroundScheduler_1();

    const { authenticated } = this.state;
      return (
        <React.Fragment>
          <nav className='navbar sticky-top'>
            <a className='navbar-brand' href='#'><h6>Twitter Clone</h6></a>   
            <ul className='language'>
              <li className='dropdown'>
                <a className='dropdown-toggle' data-toggle='dropdown' role='button' href='#'>
                  language: <strong>English</strong><span className='caret'></span>
                </a>
                <ul className='dropdown-menu row' role='menu'>
                  <li className="col-xs-12"><a href="#">Bahasa Malaya</a></li>
                  <hr className='py-0 my-0'/>
                  <li className="col-xs-12"><a href="#">Dansk</a></li>
                  <hr className='py-0 my-0'/>
                  <li className="col-xs-12"><a href="#">English</a></li>
                  <hr className='py-0 my-0'/>
                  <li className="col-xs-12"><a href="#">Japanese</a></li>
                  <hr className='py-0 my-0'/>
                  <li className="col-xs-12"><a href="#">Greek</a></li>
                  <hr className='py-0 my-0'/>
                  <li className="col-xs-12"><a href="#">Swahili</a></li>
                  <hr className='py-0 my-0'/>
                  <li className="col-xs-12"><a href="#">Icelandic</a></li>
                  <hr className='py-0 my-0'/>
                  <li className="col-xs-12"><a href="#">Russian</a></li>
                </ul>
              </li>
            </ul>
          </nav>
          <div className='main'>
            <div id='backgroundOne' style={{ backgroundImage:`url(${background_1})`,backgroundRepeat:"no-repeat",backgroundSize:"cover", minHeight:'100vh', minWidth:'100vw', position:'fixed' }}></div>
            <div id='backgroundTwo' style={{ backgroundImage:`url(${background_2})`,backgroundRepeat:"no-repeat",backgroundSize:"cover", minHeight:'100vh', minWidth:'100vw', position:'fixed' }}></div>
            <div id='backgroundThree' style={{ backgroundImage:`url(${background_3})`,backgroundRepeat:"no-repeat",backgroundSize:"cover", minHeight:'100vh', minWidth:'100vw', position:'fixed' }}></div>
            <div className='container'>
              <div className='row'>
                <div className='col-0 col-md-2'></div>
                <div className='col-12 col-md-5 homecard ml-3'>
                    <h1 className='mb-4'><strong>Welcome to Twitter.</strong></h1>
                    <p>Connect with your friends &#8212; and other fascinating people. Get in-the-moment updates on the things that interest you. And watch events unfold, in real time, from every angle.</p>    
                    <div className='info'>
                      <a href='https://github.com/IInariFox/FullStackTwitterClone/tree/master' target='_blank' id='me'>FullStack Twitter Clone Project</a>
                      <br />
                      <a href='altcademy.com' target='_blank' id='alt'>photos by @Hackpacific</a>
                    </div>              
                </div>
                <div className='col-0 col-md-1'></div>
                <div className='col-12 col-md-3 user-action mr-3'>
                    <Login />
                    <div className='mt-4'>
                      <Signup />
                    </div>
                  </div>
              </div>
            </div>
          </div>
        </React.Fragment>
      );
    
  }
}

export default Home;
