import React from 'react';
import { handleErrors } from '@src/utils/fetchHelper';
import TweetCard from '@src/Components/tweetCard';

import './user-profile.scss';

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import AuthNavbar from './Components/authNavbar';

class UserProfile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      params: {
        message: "",
        images: null,
        username: "",
      },
      tweets: [],
    }

    this.addTweet = this.addTweet.bind(this);
    this.deleteTweet = this.deleteTweet.bind(this);
  }

  componentDidMount() {
    fetch('/api/authenticated', {
      method: 'GET',
      headers: {'Content-Type': 'application/json'} 
    })
    .then(handleErrors)
    .then(data => {
      this.setState({
        params: {
          ...this.state.params,
          username: data.username
        }
      })
      if (!data.authenticated) {
        this.props.history.push('/')
      }
    })

    fetch(`/api/users/${this.props.match.params.username}/tweets`, {
      method: 'GET',
      headers: {'Content-Type': 'application/json'} 
    })
    .then(handleErrors)
    .then(data => {
      this.setState({
        tweets: data.tweets.reverse()
      })
    })
  }
  
  handleChange = (e) => {
    this.setState({
      params: {
        ...this.state.params,
        message: e.target.value
      }
    })
  }
  
  addTweet() {
    fetch('/api/tweets', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({tweet: this.state.params})
    })
    .then(handleErrors)
    .then(data => {
      this.setState({
        tweets: [data.tweet, ...this.state.tweets]
      })
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  }
  
  deleteTweet(id) {
    console.log(id)
    console.log("delete")

    fetch(`/api/tweets/${id}`, {
      method: 'DELETE',
      headers: {'Content-Type': 'application/json'},
    })
    .then(handleErrors)
    .then(data => {
      if (data.success) {
        this.setState({
          tweets: this.state.tweets.filter((tweet) => {
            return tweet.id != id;
          })
        })
      }
    })
    .catch((error) => {
      console.error('Error:', error);
    })
  }
  
  render() {
    const { params: { message, images, username }, tweets } = this.state;
    return (
      <React.Fragment>
        <AuthNavbar username={username} history={this.props.history}/>

        <Container>
          <Row>
            <Col xs={3}>
              <div className="card" >
                <div className="card-body">
                  <h5 className="card-title">{username}</h5>
                </div>
              </div>
            </Col>
            <Col xs={6}>
              <div className="card bg-primary">
                <div className="card-body">
                  <Form.Control as="textarea" rows="3" className="multiline" type="email" placeholder="What's happening?" id="tweet-margin" onChange={this.handleChange}/>
                  <Button style={{ float:'right' }} onClick={() => { this.addTweet() }} variant="light" size="sm">Tweet</Button>
                </div>
              </div>
            </Col>
          </Row>
          <TweetCard tweets={ tweets } deleteTweet={ this.deleteTweet } username={ username }/>
        </Container>
      </React.Fragment>
    )
  }
}

export default UserProfile;