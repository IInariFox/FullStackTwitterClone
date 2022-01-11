import React from 'react'
import ReactDOM from 'react-dom'
import Header from './header.jsx'
import LanguageSelect from './languageSelect.jsx'
import { createNewUser } from './requests/user.js'
import { createSession } from './requests/sessions.js'

import background1 from './pictures/background1.jpg'
import background2 from './pictures/background2.jpg'
import background3 from './pictures/background3.jpg'
import background4 from './pictures/background4.jpg'
import background5 from './pictures/background5.jpg'

import './general.scss';
import './login.scss';

// background picture rotation

var picNumber = 1
var backgroundPic = background1

setInterval(()=>{
    
    switch(picNumber){
        case 1:
            backgroundPic = background2
            picNumber += 1
            break;
        case 2:
            backgroundPic = background3
            picNumber += 1
            break;
        case 3:
            backgroundPic = background4
            picNumber += 1
            break;
        case 4:
            backgroundPic = background5
            picNumber += 1
            break;
        case 5:
            backgroundPic = background1
            picNumber = 1
            break;
    }

    $('#background-image').fadeOut(1000, "swing", () => {
        $('#background-image').css('backgroundImage', `url(${backgroundPic})`)
    } ).fadeIn(1000);    
    
}, 12000);

// button listeners / event handlers

$(document).on('click', '#signup-btn', function (e) {
    e.preventDefault();
    let username = $('#signup-username').val();
    let email = $('#signup-email').val();
    let password = $('#signup-password').val();

    if (username != '' || email != '' || password != '') {
        createNewUser(username, password, email, (data) => {
            console.log(data)
            if (data.hasOwnProperty('user')) {
                if (data.user.success) {
                    console.log("got past data.user")
                    createSession(username, password, ()=>{
                        location.href = '/home'
                    }, (data)=>{
                        console.log('did not authenticate', data)
                    })
                }
            } else if (data.success == false){
                $('#signup-username').val('');
                $('#signup-email').val('');
                $('#signup-password').val('');
                window.alert("username or email invalid or already in use")
            }

        }, () => {
            console.log("did not work")
        }) 
    } 
})

$(document).on('click', '#login-btn', function (e) {
    e.preventDefault();
    let username = $('#login-username').val();
    let password = $('#login-password').val();

    if (username != '' || password != '') {
        createSession(username, password, (data)=>{
            if (data.success) {
                location.href = '/home'
            } else {
                $('#login-username').val('');
                $('#login-password').val('');
                window.alert("username or email invalid")
            }
        }, ()=>{
            console.log('did not authenticate')
        })
    } 
})

const Login = (props) => {
    return (
        <>
        <Header navComponent={<LanguageSelect />}/>
        <div className="background" id="background-image" style={{backgroundImage: `url(${background5})`}}>
            <div className="container mt-4 pt-4">
                <div className="row main">
                    <div className="col-1"></div>

                    <div className="col-6 bg-transparent text-white rounded">
                        <h1>Welcome to Twitter.</h1>
                        <blockquote className="blockquote pt-5 pr-5">
                            <p>Connect with your friends — and other fascinating people. Get in-the-moment updates on the things that interest you. And watch events unfold, in real time, from every angle.</p>
                        </blockquote>
                        <div className="sub-footer">
                            <a className="d-block text-white pt-5" href="">testing footer</a>
                            <a className="d-block text-white pt-2" href="">bottom footer</a>
                            <p className=" text-white">2021<sup>&#169;</sup></p>
                        </div>
                    </div>

                    <div className="col-3 bg-transparent rounded">
                        <div className="row bg-white rounded">
                            <div className="col-12">
                                <form>
                                    <div className="form-group rounded pt-3">
                                        <div className="row pb-2">
                                            <div className="col-12">
                                                <input type="text" className="form-control" 
                                                id="login-username"
                                                placeholder="Username" />
                                            </div>
                                        </div>                        
                                        <div className="row">
                                            <div className="col-8">
                                                <input type="password" className="form-control" id="login-password" placeholder="Password" />
                                            </div>
                                            <div className="col-4">
                                                <button type="submit" className="btn btn-primary float-right ml-5" id="login-btn">Log In</button>
                                            </div>                
                                        </div>
                                        <div className="row pt-2">
                                            <div className="col-12">
                                                <div className="form-check">
                                                    <input type="checkbox" className="form-check-input" id="rememberMe" />
                                                    <label className="form-check-label" htmlFor="rememberMe"><small>Remember me</small></label>
                                                    <small className="d-inline"> · <a href="">Forgot password?</a></small>
                                                </div>                                            
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>

                        <div className="row bg-white rounded mt-4 pb-3">
                            <div className="col-12">
                                <form>
                                    <div className="form-group rounded pt-3">
                                        <p><strong>New to Twitter?</strong><span className="text-secondary"> Sign up</span></p>
                                        <input type="text" className="form-control mb-2" id="signup-username" placeholder="Username" />
                                        <input type="email" className="form-control mb-2" id="signup-email" placeholder="Email" />
                                        <input type="password" className="form-control mb-2" id="signup-password" placeholder="Password" />
                                        <button type="submit" className="btn rounded float-right" id="signup-btn"><strong>Sign up for Twitter</strong></button>
                                            
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                    
                    <div className="col-2"></div>

                </div>
            </div>
        </div>
        </>
    )
}

document.addEventListener('DOMContentLoaded', () => {
    ReactDOM.render(
      <Login />,
      document.body.appendChild(document.createElement('div')),
      
    )
  })