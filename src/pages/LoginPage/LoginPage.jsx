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
      <div>
        <div id="login">
        <h3 class="text-center text-white pt-5">Login form</h3>
        <div class="container">
            <div id="login-row" class="row justify-content-center align-items-center">
                <div id="login-column" class="col-md-6">
                    <div id="login-box" class="col-md-12">
                        <form id="login-form" class="form" onSubmit={this.handleSubmit}>
                            <h3 class="text-center text-info">Login</h3>
                            <div class="form-group">
                                <label for="email" class="text-info">Email:</label><br/>
                                <input className="form-control" type="email" placeholder="Email" value={this.state.email} name="email" onChange={this.handleChange} />
                            </div>
                            <div class="form-group">
                                <label for="pw" class="text-info">Password:</label><br/>
                                <input type="password" placeholder="Password" name="pw" id="password" class="form-control"value={this.state.pw}  onChange={this.handleChange}/>
                            </div>
                            <div class="form-group">
                                
                            <div >
                                  <button className="text-info">Log In</button>&nbsp;&nbsp;&nbsp;
                                  <Link to='/' className="text-info">Cancel</Link>
                                  </div>
                            </div>
                            
                        </form>
                    </div>
                </div>
            </div>
        </div>
    
      </div>
      
        </div>
        
    );
  }
};

export default LoginPage;