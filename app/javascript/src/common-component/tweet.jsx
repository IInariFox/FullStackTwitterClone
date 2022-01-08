import React from 'react';
import ReactDOM from 'react-dom';
import { safeCredentials, handleErrors } from '@utils/fetchHelper';

import './tweet.scss';

class Tweet extends React.Component {

  delete = (id) => {
    if(!id) {
      console.log("no tweet id");
    }

    fetch(`/api/tweets/${id}`, safeCredentials({
      method: "DELETE",
      mode:"cors",
      headers: { "Content-Type": "application/json" },
    })).then((data) => {
        console.log('success');
        this.props.getTweets();
      })
      .catch((error) => {
        console.log('could not delete tweet');
      })
  }


  render () {

    const { tweet } = this.props;
    const { id, message, username, image } = tweet;

    return (
      <div className="tweetBox col-xs-12">
        <a className="tweetUsername" href={`/${username}`}>{username}</a>
        <a className="screenName" href={`/${username}`}>  @{username}</a>
        <p>{message}</p>
        <img src={image} className="img img-responsive"/>
        <button className="btn delete-tweet" onClick={() => this.delete(id)}>Delete</button>
      </div>
    )
  }
}

export default Tweet;
