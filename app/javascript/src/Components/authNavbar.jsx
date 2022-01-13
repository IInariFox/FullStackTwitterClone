import React from 'react'
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import { handleErrors } from '@src/utils/fetchHelper';

class AuthNavbar extends React.Component {

	handleLogout(e) {
		e.preventDefault(); 

    fetch('/api/sessions', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' }
    })
    .then(handleErrors)
    this.setState({
      authenticated: false,
      username: {}
    })
    this.props.history.push('/')
  }

	render() {
		const { username } = this.props
		const isAllTweet = location.pathname === '/tweets'

		return (
			<Navbar className="navbar navbar-expand navbar-light bg-light">
				<Link to="/">
					<span className="navbar-brand mb-0 h1 pl-2"><i className="fa fa-twitter fa-2x" aria-hidden="true"></i></span>
				</Link>
				{
					isAllTweet ? (
						<Link to={`/users/${username}`}>My profile</Link>
						): (
						<Link to="/tweets">All Tweets</Link> 
					)
				}
				<Navbar.Collapse className="justify-content-end">
					<Navbar.Text>
						<a onClick={(e) => { this.handleLogout(e) }} href="#">Logout</a>
					</Navbar.Text>
				</Navbar.Collapse>
			</Navbar>
		)
	}
}

export default AuthNavbar;