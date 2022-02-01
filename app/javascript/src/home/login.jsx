import React from 'react';
import ReactDOM from 'react-dom';
import { safeCredentials, handleErrors, getAuthenticityToken } from '@utils/fetchHelper';
                
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

    // Log In
    login = (e) => {
        if (e) { e.preventDefault(); }
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
    }

    render () {
        const { username, password, error } = this.state;
        return (
            <React.Fragment>
                <div className='login'>
                    <form onSubmit={this.login}>
                        <h6><strong>Already on Twitter? </strong><span> Sign In</span></h6>
                        <input name='username' type='text' className='form-control mb-3' placeholder='Username' value={username} onChange={this.handleChange} required />
                        <div className='col-xs-8 form-group'>
                            <input name='password' type='text' className='form-control mb-3' placeholder='Password' value={password} onChange={this.handleChange} required />
                        </div>
                        
                        <button type='submit' id='login-button'className='col-xs-3 col-xs-offset-1 btn btn-primary btn-block pl-3'>Log In</button>
                        {error && <p className='text-danger mt-2'>{error}</p>}
                        <a href="#" className='forgot-button'><small>Forgot password...?</small></a>
                    </form>
                </div>
            </React.Fragment>
        )
    }
}
export default Login