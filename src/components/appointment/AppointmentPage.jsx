import React from 'react';
import AppointmentForm from '../appointment/AppointmentForm';


class AppointmentPage extends React.Component {
    constructor(props){
        super(props)
    }
    render(){
        return (
            <div>
                <h2>Make an appointmentt</h2>
                <AppointmentForm 
                history={this.props.history} 
                handleUpdateAppointment={this.props.handleUpdateAppointment}
                />
            </div>
            
        )
    }
}

export default AppointmentPage;