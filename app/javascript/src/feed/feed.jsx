import React from 'react';
import ReactDOM from 'react-dom';
import Navbar from '@src/common-component/navbar';
import Tweet from '@src/common-component/tweet';
import ProfileCard from '@src/common-component/profileCard';
import TweetForm from '@src/common-component/tweetForm';

import { safeCredentials, handleErrors } from '@utils/fetchHelper';

import './feed.scss';

class Feed extends React.Component {
  state = {
    tweets: [],
    username: 'User',
    tweetNumber: 0,
  }

  componentDidMount() {
    this.authenticate();
  }

  authenticate = (e) => {
    fetch(`/api/authenticated`, safeCredentials({
      method: 'GET',
    }))
    .then(handleErrors)
    .then(res => {
      this.setState({ username: res.username });
      this.getTweets();
    })
  }

  getTweets = () => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const searchInput = urlParams.get('searchInput');

    if (!searchInput) {
      fetch('/api/tweets')
        .then(handleErrors)
        .then(data => {
          this.setState({
            tweets: data.tweets,
          })
        })
    } else {
      fetch(`/api/tweets/search/${searchInput}`)
        .then(handleErrors)
        .then(data => {
          //console.log(data)
          this.setState({
            tweets: data.tweets,
          })
        })
    }
      this.countTweet();
  }

  countTweet = () => {
    fetch(`/api/users/${this.state.username}/tweets`)
      .then(handleErrors)
      .then(data => {
        //console.log(data)
        this.setState({
          tweetNumber: data.tweets.length,
        })
      })
  }

  render () {
    const { tweets, tweetNumber, username } = this.state;

    return (
      <React.Fragment>
        <Navbar username={this.state.username} />
        <div id="feedPage">
          <div className="row">
            <div className="col-xs-3 profile-trends">
              <ProfileCard tweetNumber={this.state.tweetNumber} username={this.state.username}/>
            </div>
            <div className="col-xs-6 feed-box">
              <TweetForm getTweets={this.getTweets} />
              <div className="feed">
                {tweets.length > 0 ? tweets.map((tweet) => {
                  return (<Tweet
                    key={tweet.id}
                    tweet={tweet}
                    getTweets={this.getTweets}
                  />);
                }) : <p>no tweets here</p>}

              </div>
            </div>
            <div className="col-xs-3 follow-suggest">
            </div>
          </div>
        </div>
      </React.Fragment>
    )
  }
}

export default Feed;
