import React from 'react'
// import { BrowserRouter as Router, Link } from "react-router-dom";
import './header.scss';

var twitterLogo = require('./pictures/twitterlogo')

const Header = (props) => {
    return (
        <nav className="navbar fixed-top navbar-light bg-white pb-0" >
            <div className="container-fluid">
                <button className="bg-transparent border-0" id="logo" ><img src={twitterLogo} width="40" height="40" /></button>
                <h3>{props.searchbar}</h3>
                <h3>{props.navComponent}</h3>
            </div>
        </nav>
    )
}

export default Header;