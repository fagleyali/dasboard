import React from 'react';
import Calendar from '../Calendar/Calendar';
import doctorsService from '../../utils/doctorsService';

class AppointmentForm extends React.Component{
    
        state={
            department: '',
            doctors:[],
            doctor: '',
            appDateTime:''
        }

   

    handleChange = (e) => {
     this.handleGetDoctors(e)

        this.setState({
          // Using ES2015 Computed Property Names
          [e.target.name]: e.target.value,
         
        });
      }

    handleGetDoctors = async (e) => {
        e.preventDefault();
        try {
          const doctors = await doctorsService.getDoctors(this.state.department);
            this.setState({doctors});
          //   this.props.history.push('/doctors');
          
        } catch (err) {
          console.log(err)
          
        }
        
      }

    

    render(){

        return(
            <div>
                <h1>Appointment Form</h1>
                <div className="col-sm-12">
                  <select className="form-control" value={this.props.department}  name="department" onChange={this.handleChange}>
                    <option value='' selected>Select</option>
                    <option value='Medicine'>Medicine</option>
                    <option value='Peditrician'>Peditrician</option>
                    <option value='CardioVascular Medicine' >Cardiovasculars Medicine</option>
                    <option value='Opthalmologist' >Opthalmologist</option>
                </select>
                </div>
                <div className="col-sm-12">
                  <select className="form-control" value={this.state.doctors}  name="doctor" onChange={this.handleChange}>
                    {this.state.doctors.map((d,key)=>{
                        return <option key={key} value={d}>{d}</option>

                    })}
                   </select>
                </div>
                <Calendar />
            </div>
    
        )
    }
        
}

export default AppointmentForm;