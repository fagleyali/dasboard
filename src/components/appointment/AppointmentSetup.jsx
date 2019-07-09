import React from 'react';

import {Link} from 'react-router-dom';


class AppointmentSetup extends React.Component {
    constructor(props){
        super(props)
    }
    render(){
        
        return (
            
            <div className="tableStyle">
                <h1>Appointment Setup</h1>
                

                { this.props.user._id===this.props.patient ?
                <div>
                    <table >
                        
                        <tbody>
                            <tr>
                                <td><h4>Patient:</h4> </td>
                                <td><h4>{this.props.user.name}</h4></td>
                            </tr>
                            <tr>
                                <td><h4>Appointment Date:</h4></td>
                                <td><h4>{this.props.appointmentDate}</h4></td>
                            </tr>
                            <tr>
                                <td><h4>Appointment Time:</h4></td>
                                <td><h4>{this.props.slot}</h4></td>
                            </tr>
                            <tr>
                                <td><h4>Doctor:</h4></td>
                                <td><h4>{this.props.doctor.name}</h4></td>
                            </tr>
                        </tbody>
                    </table>
                

                </div>
                :
                false
                
                }
                <table>

                    <tbody>
                        <tr>
                            <td>
                                    <Link to='/'>Ok</Link>

                            </td>
                        </tr>
                    </tbody>

                </table>
            </div>
            
        )
    }
}

export default AppointmentSetup;