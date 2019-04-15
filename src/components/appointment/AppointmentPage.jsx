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
                <NavBar
                    user={this.props.user}
                    handleLogout={this.props.handleLogout}
                />
                <h3>Make an appointmnet</h3>
                
                
                <AppointmentForm 
                history={this.props.history} 
                handleUpdateAppointment={this.props.handleUpdateAppointment}
                />

    
                
            </div>
            
        )
    }
}

export default AppointmentPage;