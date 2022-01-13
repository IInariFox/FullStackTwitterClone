import React from 'react';
import { signup } from '@src/login/loginCode';

class SignupWidget extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      params: {
        username: '',
        password: '',
        email: '',
      },
      error: '',
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSignup = this.handleSignup.bind(this)
  }

  handleChange = (e) => {
    const oldParams = this.state.params
    this.setState({
      params: {
        ...oldParams,
        [e.target.name]: e.target.value
      }
    })
  }

  handleSignup(e) {
    this.setState({ error: '' })
    signup(e, this.state.params, (error) => {
      this.setState({ error })
    }, this.props.history)
  }

  render() {
    const { params: { username, password, email }, error } = this.state;

    return (
      <form onSubmit={this.handleSignup}>
        <label className="font-weight-bold">New to Twitter?</label>
        { error && <label className="pl-2 font-weight-bold text-danger">Error, username taken</label> }

        <div className="form-group">
          <input type="text" className="form-control" placeholder="Username" onChange={this.handleChange} name="username" value={username} />
        </div>

        <div className="form-group">
          <input type="text" className="form-control" placeholder="Email" onChange={this.handleChange} name="email" value={email} />
        </div>

        <div className="form-group">
          <input type="text" className="form-control" placeholder="Password" onChange={this.handleChange} name="password" value={password} />
        </div>

        <button type="submit" className="btn btn-warning d-inline">Sign up for Twitter</button>
      </form>
    )
  }
}

export default SignupWidget;
