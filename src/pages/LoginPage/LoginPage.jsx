import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './LoginPage.css';
import userService from '../../utils/userService';

class LoginPage extends Component {
  
  state = {
    email: '',
    pw: ''
  };

  handleChange = (e) => {
    this.setState({
      // Using ES2015 Computed Property Names
      [e.target.name]: e.target.value
    });
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await userService.login(this.state);
      // Let <App> know a user has signed up!
      this.props.handleSignupOrLogin();
      // Successfully signed up - show GamePage
      this.props.history.push('/');
    } catch (err) {
      // Use a modal or toast in your apps instead of alert
      alert('Invalid Credentials!');
    }
  }

  render() {
    return (
      <div id="login">
        <h3 className="text-center">Login form</h3>
        <div className="container">
        <div id="login-row" className="row justify-content-center align-items-center">
        <div id="login-column" className="col-md-6">
        <div id="login-box" className="col-md-12">

        <form className="login-form" onSubmit={this.handleSubmit} >
          <div className="form-group">
          <h3 className="text-center text-info">Login</h3>
            <div className="form-group">
              <label for="email" className="text-info">Email</label>
              <input type="email" className="form-control" placeholder="Email" value={this.state.email} name="email" onChange={this.handleChange} />
            </div>
          </div>
          <div className="form-group">
              <label for="pw" className="text-info">Password</label>
              <input type="password" className="form-control" placeholder="Password" value={this.state.pw} name="pw" onChange={this.handleChange} />
            
          </div>
          <div className="form-group">
            
              <button className="btn btn-info btn-md">Log In</button>&nbsp;&nbsp;&nbsp;
              <Link to='/' className="text-info">Cancel</Link>
            
          </div>
        </form>
        </div>
        </div>
        </div>

        </div>
      </div>
    );
  }
};

export default LoginPage;