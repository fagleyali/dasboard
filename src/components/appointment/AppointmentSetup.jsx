import React from 'react';
import NavBar  from '../Navbar/navbar';
import {Link} from 'react-router-dom';


class AppointmentSetup extends React.Component {
    constructor(props){
        super(props)
    }
    render(){
        console.log(this.props.doctor.name)
        return (
            
            <div>
                <h1>Appointment Setup</h1>
                <NavBar
                    user={this.props.user}
                    handleLogout={this.props.handleLogout}
                />

                { this.props.user._id===this.props.patient ?
                <div>
                <h4>{this.props.user.name}</h4>
                <h4>{this.props.appointmentDate}</h4>
                <h4>{this.props.slot}</h4>
                <h4>{this.props.doctor.name}</h4>

                </div>
                :
                false
                
                }
                <Link to='/'>Ok</Link>
            </div>
            
        )
    }
}

export default AppointmentSetup;