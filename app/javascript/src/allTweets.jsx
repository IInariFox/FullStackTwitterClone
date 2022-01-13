import React from 'react';
import { handleErrors } from '@src/utils/fetchHelper';
import TweetCard from '@src/Components/tweetCard';
import AuthNavbar from '@src/Components/authNavbar'

class AllTweets extends React.Component {
	constructor(props){
		super(props);
		
		this.state = {
			tweets: [],
			username: ''
		}
	}

  componentDidMount() {
		fetch('/api/authenticated', {
      method: 'GET',
      headers: {'Content-Type': 'application/json'} 
    })
    .then(handleErrors)
    .then(data => {
      this.setState({
				username: data.username
      })
      if (!data.authenticated) {
        this.props.history.push('/')
      }
		})
		
		fetch('/api/tweets', {
			method: "GET",
			headers: {'Content-Type': 'application/json'}
		})
		.then(handleErrors)
		.then(data => {
			console.log(data)
			this.setState({
				tweets: data.tweets
			})
		})
	}

	render () {
		const { tweets, username } = this.state;
		console.log(username)

		return (
			<div>
				<AuthNavbar username={ username } history={ this.props.history } />
				<TweetCard tweets={ tweets } username={ username } disableDelete />
			</div>
		)
	}
}

export default AllTweets