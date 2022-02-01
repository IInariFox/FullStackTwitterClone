import React from 'react';
import ReactDOM from 'react-dom';
import { safeCredentials, handleErrors } from '@utils/fetchHelper';

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
                    email: this.state.email,
                    username: this.state.username,
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
                if(data.success) {
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
        const { email, username, password, error } = this.state;
        return (
            <React.Fragment>
                <div className='signup'>
                    <form onSubmit={this.signup}>
                        <h6><strong>New to Twitter? </strong><span> Sign Up</span></h6>
                        <input name='username' type='text' className='form-control mb-3' placeholder='Username' vlaue={username} onChange={this.handleChange} required />
                        <input name='email' type='text' className='form-control mb-3' placeholder='Email' value={email} onChange={this.handleChange} required />
                        <input name='password' type='text' className='form-control mb-3' placeholder='Password' value={password} onChange={this.handleChange} required />
                        <button type='submit' id='signup-button' className='btn btn-warning btn-block'>Sign up for Twitter!</button> 
                    </form>
                </div>
            </React.Fragment>
        )
    }
}

export default Signup