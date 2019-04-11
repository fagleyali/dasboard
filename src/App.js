import React, { Component } from 'react';
import './App.css';
import AppointmentPage from './components/appointment/AppointmentPage';
import DoctorsPage from './components/doctors/DoctorsPage';
import {Route, Switch,Redirect} from 'react-router-dom';
import SignUpPage from './pages/SignUpPage/SignUpPage';
import userService from './utils/userService';
import LoginPage from './pages/LoginPage/LoginPage';
import PrivateRoute from './components/PrivateRouter/PrivateRoute';
import DoctorsSignupPage from './pages/DoctorsSignupPage/DoctorsSignupPage';
import {SingleDatePicker} from 'react-dates';



class App extends Component {
  constructor(){
    super();
    this.state={...this.getInitialState(),user:'',doctors:[]}

  }

  getInitialState(){
    return{
      
    }
  }


  async componentDidMount(){
    const user = await userService.getUser();
    this.setState({user})
  }

  handleSignupOrLogin = () => {
    this.setState({user: userService.getUser()});
  }

  handleLogout(){
    userService.logout();
    this.setState({user:null});
  }

  handleUpdateDoctors = (doctors) => {
    this.setState({ doctors });
  }

  

  render() {
    return (
      <div className="App">
      
        <Switch>
          <Route exact path='/' render={()=>
            <AppointmentPage 
              user={this.state.user}
              handleLogout={this.handleLogout}
            />
          }>
          </Route>
          <PrivateRoute user={this.state.user} exact path='/doctors' component={DoctorsPage} />
          
          <Route user={this.state.user} exact path="/doctors/signup" render={({history})=>
          <DoctorsSignupPage 
          history = {history}/>
          }
          />
          <Route exact path='/signup' render={({history})=>
              <SignUpPage 
              history={history}
              handleSignupOrLogin={this.handleSignupOrLogin} />
          }>
          </Route>

          <Route exact path='/login' render={({ history }) => 
            <LoginPage
              history={history}
              handleSignupOrLogin={this.handleSignupOrLogin}
            />
          }/>
            

            
          
        </Switch>

      
      </div>
    );
  }
}

export default App;

