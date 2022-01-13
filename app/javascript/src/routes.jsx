import React from 'react';
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import Home from './home'
import UserProfile from './user-profile'
import AllTweets from './allTweets'

const Routes = (props) => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Home}  />
        <Route path="/users/:username" exact component={UserProfile}  />
        <Route path="/tweets" exact component={AllTweets} />
      </Switch>
    </Router>
  );
}

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Routes />,
    document.body.appendChild(document.createElement('div')),
  )
})