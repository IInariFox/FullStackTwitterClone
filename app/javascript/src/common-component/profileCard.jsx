import React from 'react';
import ReactDOM from 'react-dom';
import { safeCredentials, handleErrors } from '@utils/fetchHelper';

import './profileCard.scss';

class ProfileCard extends React.Component {

  render () {

    return (
      <div>
        <div className="profileCard col-xs-12">
          <div className="profileCard-content">
            <div className="user-field col-xs-12">
              <a className="username" href={`/${this.props.username}`}>{this.props.username}</a><br/>
              <a className="screenName" href={`/${this.props.username}`}>@{this.props.username}</a>
            </div>
            <div className="user-stats">
              <div className="col-xs-3">
                <a href="">
                  <span>Tweets<br/></span>
                  <span className="user-stats-tweets">{this.props.tweetNumber}</span>
                </a>
              </div>
              <div className="col-xs-4">
                <a href="">
                  <span>Following<br/></span>
                  <span className="user-stats-following">0</span>
                </a>
              </div>
              <div className="col-xs-4">
                <a href="">
                  <span>Followers<br/></span>
                  <span className="user-stats-followers">0</span>
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="trends col-xs-12">
          <div className="col-xs-12">
            <div className="trends-header">
              <span>Trends</span><span> &#183; </span><small><a href="">Change</a></small>
            </div>
            <ul className="trends-list">
              <li><a href="#">#Hongkong</a></li>
              <li><a href="#">#Ruby</a></li>
              <li><a href="#">#foobarbaz</a></li>
              <li><a href="#">#rails</a></li>
              <li><a href="#">#API</a></li>
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default ProfileCard;
