import React, { Component } from 'react';
import ReactDom from 'react-dom';
import './App.css';
import AppointmentPage from './components/appointment/AppointmentPage';
import DoctorsPage from './components/doctors/DoctorsPage';
import {Route, Switch} from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <div className="App">
      
        <Switch>
          <Route exact path='/' render={()=>
            <AppointmentPage />
          }>
          </Route>
          <Route exact path='/doctors' render={()=>
              <DoctorsPage />
          }>
          </Route>
        </Switch>

      
      </div>
    );
  }
}

export default App;

