import React from 'react';
import ReactDOM from 'react-dom';
import { safeCredentials, handleErrors } from '@utils/fetchHelper';

import './login.scss';

class Login extends React.Component {
  state = {
    username: '',
    password: '',
    error: '',
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
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
    const { username, password, error } = this.state;

    return (
      <div className="log-in col-xs-4 col-xs-offset-1">
        <form onSubmit={this.login}>
          <div className="form-group">
          </div>
          <input type="text" className="form-control username" placeholder="Username" name="username" value={username} onChange={this.handleChange} required/>
          <div className="form-group col-xs-8">
            <input type="password" className="form-control password" placeholder="Password" name="password" value={password} onChange={this.handleChange} required/>
          </div>
          <button type="submit" id="log-in-btn" className="btn btn-default btn-primary col-xs-3 col-xs-offset-1">Log in</button>
          {error && <p className="text-danger mt-2">{error}</p>}
        </form>
        <label>
          <input type="checkbox"/>
          <span>Remember me</span>
          <span> &#183; </span>
        </label>
        <a href="#">Forgot password?</a>

      </div>
    )
  }
}

export default Login;
