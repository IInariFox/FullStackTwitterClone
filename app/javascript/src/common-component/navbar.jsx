import React from 'react';
import ReactDOM from 'react-dom';
import { safeCredentials, handleErrors } from '@utils/fetchHelper';

import './navbar.scss';

class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchInput: '',
    }
    this.handleChange = this.handleChange.bind(this);
    this.submit = this.submit.bind(this);
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    })
    console.log(this.state.searchInput);
  }

  submit() {
    console.log(this.state.searchInput);
  }

  logout = (e) => {
    event.preventDefault();

    fetch(`/api/sessions`, safeCredentials({
      method: 'DELETE',
    }))
    .then(handleErrors)
    .then(res => {
      if (res.success) {
        const params = new URLSearchParams(window.location.search);
        const redirect_url = params.get('redirect_url') || '/';
        window.location = redirect_url;
      }
    })
  }

  render () {
    const { searchInput } = this.state;

    return (
      <React.Fragment>
          <nav className="navbar-default navbar-fixed-top">
            <div className="container">
              <div className="navbar-header">
                <a className="navbar-brand" href={`/feed`}>
                  <i className="fa fa-twitter"></i>
                </a>
              </div>
              <ul className="nav navbar-nav navbar-right">
                <li className="dropdown">
                  <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false"><span id="user-icon">{this.props.username}</span></a>
                  <ul className="dropdown-menu row" role="menu">
                    <li ><a href={`/${this.props.username}`} className="username">{this.props.username}</a></li>
                    <li role="presentation" className="divider"></li>
                    <li ><a href="#">Lists</a></li>
                    <li role="presentation" className="divider"></li>
                    <li ><a href="#">Help</a></li>
                    <li ><a href="#">Keyboard shortcuts</a></li>
                    <li role="presentation" className="divider"></li>
                    <li ><a href="#">Settings</a></li>
                    <li ><a id="log-out" href="#" onClick={this.logout}>Log out</a></li>
                  </ul>
                </li>
              </ul>
              <div className="search-bar col-xs-3 nav navbar-right">
                <form className="input-group" onSubmit={this.submit}>
                  <input type="text" className="form-control search-input" placeholder="Search for..." onChange={this.handleChange} name="searchInput" value={searchInput} required/>
                  <span className="input-group-btn">
                    <button className="btn btn-default search-btn" type="submit">Go!</button>
                  </span>
                </form>
              </div>
            </div>
          </nav>
        </React.Fragment>
    )
  }
}

export default Navbar;
