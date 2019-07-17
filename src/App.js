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
import NavBar  from './components/Navbar/navbar';
import AppointmentSetup from './components/appointment/AppointmentSetup';
import doctorService from './utils/doctorsService'



class App extends Component {
  constructor(){
    super();
    this.state={...this.getInitialState(),user:'',doctors:[]}

  }

  getInitialState(){
    return{
      doctor: '',
      appointment:{
        appointmentDate: '',
        patient:'',
        
        slot:0
      },
      doctors: []
      
    }
  }


  async componentDidMount(){
    const user = await userService.getUser();
    this.setState({user})
    this.getAllDoctors()
    
  }

  handleSignupOrLogin = () => {
    this.setState({user: userService.getUser()});
  }

  handleLogout(){
    userService.logout();
    this.setState({user:null});
  }

  handleUpdateDoctors = (doctors) => {
    console.log('Line no: 56' + doctors)
    this.setState({ doctors });
  }

  getDoctor=doctorId=>{
    doctorService.getDoctor(doctorId)
    .then(doctor=>{
      this.setState({doctor})
    }).catch(err=>console.log(err))
    
  }

  getAllDoctors=()=>{
    doctorService.index()
    .then(doctors=>{
      this.setState({doctors})
    }).catch(err=>console.log(err))
  }

  handleUpdateAppointment=(doctor,appointment)=>{
   this.setState({doctor})
    const newArr= this.state.appointment
    
    newArr.patient=appointment.appointmentDetails[appointment.appointmentDetails.length-1].patient
    newArr.appointmentDate=appointment.appointmentDate
    
    newArr.slot=appointment.appointmentDetails[appointment.appointmentDetails.length-1].slot
    this.setState({appointment:newArr})
    
  }

  render() {
    return (
      <div className="App">
        <NavBar
          user={this.state.user}
          handleLogout={this.handleLogout}
          />
        <Switch>
          <Route exact path='/' render={({history})=>
            <AppointmentPage 
              user={this.state.user}
              handleLogout={this.handleLogout}
              history={history}
              handleUpdateAppointment={this.handleUpdateAppointment}
            />
          }>
          </Route>
          <Route exact path='/appointmentsetup' render={()=>
            <AppointmentSetup
            user={this.state.user}
            patient={this.state.appointment.patient}
            appointmentDate={this.state.appointment.appointmentDate}
            slot={this.state.appointment.slot}
            doctor={this.state.doctor}
            />
          }>
          </Route>
          <PrivateRoute user={this.state.user} doctors={this.state.doctors} exact path='/doctors' component={DoctorsPage} />
          
          <Route user={this.state.user} exact path="/doctors/signup" render={({history})=>
          <DoctorsSignupPage 
          history = {history}
         handleUpdateDoctors={doctors=> this.handleUpdateDoctors(doctors)}
          />
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

