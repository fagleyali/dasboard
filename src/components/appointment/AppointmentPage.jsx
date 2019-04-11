import React from 'react';
import NavBar  from '../Navbar/navbar';

import AppointmentForm from '../appointment/AppointmentForm';


class AppointmentPage extends React.Component {
    constructor(props){
        super(props)
    }

    

    render(){


        return (
            <div>
                <h1>Appointment Page</h1>
                
                <NavBar
                    user={this.props.user}
                    handleLogout={this.props.handleLogout}
                />
                
                <AppointmentForm  />

    
                
            </div>
            
        )
    }
}

export default AppointmentPage;