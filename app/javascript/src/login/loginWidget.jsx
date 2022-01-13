import React from 'react';
import { login } from '@src/login/loginCode';

class LoginWidget extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      params: {
        username: '',
        password: '',
      },
      error: ''
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleLogin = this.handleLogin.bind(this)
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

  handleLogin(e) {
    console.log(history)
    this.setState({ error: '' })
    login(e, this.state.params, (error) => {
      this.setState({ error })
    }, this.props.history)
  }

  render () {
    const { params: { username, password }, error } = this.state;
    const { optClass } = this.props

    return (
      <form onSubmit={(e) => { this.handleLogin(e) }} className={optClass}>
        <label className="font-weight-bold">Login</label>
        { error && <label className="pl-2 font-weight-bold text-danger"> USERNAME NOT FOUND, CHOOSE SOMETHING ELSE, BRO</label> }

        <div className="form-group">
          <input type="text" className="form-control" placeholder="Username" onChange={this.handleChange} name="username" value={username} />
        </div>

        <div className="form-inline">
          <input type="text" className="form-control flex-grow-1 mr-3" placeholder="Password" onChange={this.handleChange} name="password" value={password} />

          <button type="submit" className="btn btn-primary">Log in</button>
        </div>
      </form>
    )
  }
}

export default LoginWidget;
