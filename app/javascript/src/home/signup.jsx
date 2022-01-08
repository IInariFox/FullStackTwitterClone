import React from 'react';
import ReactDOM from 'react-dom';
import { safeCredentials, handleErrors } from '@utils/fetchHelper';

import './signup.scss';

class Signup extends React.Component {
  state = {
    email: '',
    username: '',
    password: '',
    error: '',
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    })
  }

  signup = (e) => {
   if (e) { e.preventDefault(); }
   this.setState({
     error: '',
   });

   fetch('/api/users', safeCredentials({
         method: 'POST',
         body: JSON.stringify({
           user: {
             username: this.state.username,
             email: this.state.email,
             password: this.state.password,
           }
         })
       }))
         .then(handleErrors)
         .then(data => {
           console.log(data)
           if (data.user) {
             this.login();
           }
         })
         .catch(error => {
           this.setState({
             error: 'Could not sign up.',
           })
         })
  }

  login = (e) => {
   if (e) { e.preventDefault(); }
   this.setState({
     error: '',
   });

   fetch('/api/sessions', safeCredentials({
         method: 'POST',
         body: JSON.stringify({
           user: {
             username: this.state.username,
             password: this.state.password,
           }
         })
       }))
         .then(handleErrors)
         .then(data => {
           if (data.success) {
             const params = new URLSearchParams(window.location.search);
             const redirect_url = params.get('redirect_url') || '/feed';
             window.location = redirect_url;
           }
         })
         .catch(error => {
           this.setState({
             error: 'Could not log in.',
           })
         })
  }



  render () {
    const { email, password, username, error } = this.state;

    return (
      <div className="sign-up col-xs-4 col-xs-offset-1">
        <form onSubmit={this.signup}>
          <div className="new-to-t">
            <p><strong>New to Twitter?</strong><span> Sign Up</span></p>
          </div>
          <div className="form-group">
            <input type="text" className="form-control username" placeholder="Username" name="username" value={username} onChange={this.handleChange} required />
          </div>
          <div className="form-group">
            <input type="email" className="form-control email" placeholder="Email" name="email" value={email} onChange={this.handleChange} required />
          </div>
          <div className="form-group">
            <input type="password" className="form-control password" placeholder="Password" name="password" value={password} onChange={this.handleChange} required />
          </div>
          <button type="submit" id="sign-up-btn" className="btn btn-default btn-warning pull-right">Sign up for Twitter</button>
        </form>
      </div>
    )
  }
}

export default Signup;
