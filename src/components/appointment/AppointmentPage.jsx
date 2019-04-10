import React from 'react';
import NavBar  from '../Navbar/navbar';

const AppointmentPage = props => {

    return (
        <div>
            <h1>Appointment Page</h1>
            <NavBar
                user={props.user}
                handleLogout={props.handleLogout}
            />
        </div>
        
    )
}

export default AppointmentPage;