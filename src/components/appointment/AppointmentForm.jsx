import React from 'react';
import Calendar from 'react-calendar';
import doctorsService from '../../utils/doctorsService';
import {Link} from 'react-router-dom';
import './Appointment.css';
import userService from '../../utils/userService';
import appointmentService from '../../utils/appointmentService';

var nSlots = {};
class AppointmentForm extends React.Component{
    
        state={
            user: userService.getUser(),
            department: '',
            doctors:[],
            doctor: '',
            appDate:'',
            // slots: {"8:00 am":false,"8:30 am":false,"9:00 am":false,"9:30 am":false,"10:00 am":false,"10:30 am":false,
            //   "11:00 am":false,"11:30 am":false,"12:00 am":false,"12:30 am":false,"1:00 am":false,"1:30 am":false,"2:00 am":false,
            //   "2:30 am":false,"3:00 am":false,"3:30 am":false
            // },

            slots: [],

            slot:"",
            appointment:{}
        }

        initializeSlots=()=>{
          const newSlots=this.state.slots
          Object.keys(newSlots).map(slot=>{
            newSlots[slot]=false;
          })
          this.setState({slots:newSlots})
        }

    handleChange = (e) => {
      
        this.setState({
          [e.target.name]: e.target.value,
        });
      }

    handleGetDoctors = (e) => {
      this.setState({ department: e.target.value }, () => {
        doctorsService.getDoctors(this.state.department)
          .then((doctors) => {
           
            this.setState({ doctors })
          }).catch(error => console.log(error))
        })
      }


      // handleAppDate=selectedDate=>{
      //   console.log(selectedDate)
      //   this.setState({appDate:selectedDate},()=>{
      //     appointmentService.getSlots(this.state.doctor,this.state.appDate)
      //     .then(slots=>{
      //       console.log(slots )
      //       if(slots.length===0) this.initializeSlots();
      //       const newSlots = this.state.slots
      //       Object.keys(newSlots).map(slot1=>{
      //         slots.map(slot2=>{
      //           if (slot1===slot2){
                  
      //             newSlots[slot1]=true;
      //           }
      //         }) 
      //       })
      //       this.setState({slots:newSlots})
      //     })
      //   .catch(err=> console.log(err))
      // })
      // }

      handleAppDate=selectedDate=>{
        console.log(selectedDate)
        this.setState({appDate:selectedDate},()=>{
          appointmentService.getSlots(this.state.doctor,this.state.appDate)
          .then(slots=>{
            console.log(slots )
            if(slots.length===0) this.initializeSlots();
            this.setState({ slots })
          })
        .catch(err=> console.log(err))
      })
      }

      handleSlotsUpdate=(e)=>{
        nSlots = this.state.slots ;
        nSlots[e.target.value] = true;
      }

      appointment=()=>{
        if(userService.getUser()){
          
          const appointment={
            appointmentDate:this.state.appDate,
            appointmentDetails:{

              patient:this.state.user,
              slot:this.state.slot
            }
          }
          
          return appointment;

        }
        
      }

      handleSubmit = async (e) => {
        
        e.preventDefault();
        const doctorName = this.state.doctors.find(doctor=>doctor._id===this.state.doctor)
          appointmentService.createAppointment(this.state.doctor,this.appointment())
          .then((appointment)=>{
            this.setState({ appointment });
            this.props.handleUpdateAppointment(doctorName,appointment)
            this.props.history.push('/appointmentsetup');
          }).catch(err => console.log(err))
      }
      
     

        isFormInvalid() {
          return !(this.state.user && this.state.doctor && this.state.appDate && this.state.slot);
        }
   

    render(){
      
        return(
      <div className="flex-container">
          <form  className="row" onSubmit={this.handleSubmit} >
            <div className="column">
              <h3>Selection Area</h3>
                <div >
                  <select className="form-control"   value={this.props.department}  name="department" onChange={this.handleGetDoctors}>
                    <option value='' selected>Select Department</option>
                    <option value='Medicine'>Medicine</option>
                    <option value='Peditrician'>Peditrician</option>
                    <option value='CardioVascular Medicine' >Cardiovasculars Medicine</option>
                    <option value='Opthalmologist' >Opthalmologist</option>
                  </select>
                </div>
                <div >
                  <select className="form-control"  name="doctor" onChange={this.handleChange} >
                    <option value='' selected>Select Doctor</option>
                    {this.state.doctors.map((d,key)=>{
                        return <option key={key} value={d._id}>{d.name}</option>

                    })}
                   </select>
                </div>
                <div className="form-control-calendar">
                    <Calendar onChange={this.handleAppDate} />
                </div>
                
              </div>
            <div className="column">
            <h3>Available Slot</h3>
                <div>
                    <select className="form-control" name="slot" onChange={this.handleChange} >
                    <option value='' selected>Select a slot</option>
                    
                    {this.state.appDate ?
                      this.state.slots.map( (s,id) => <option key={id} value= {s} > {s} </option> )
                      :
                      true}
                      
                    </select>
                    </div>
                  <div className="form-control">
                    <button className="text-info"  disabled={this.isFormInvalid()}>Set Appointment</button>
                    <Link className="text-info" to='/'>Cancel</Link>
                  </div>
                </div>
                <div className="column" >
                <h3>Patient's History</h3>
                </div>
              </form>
          </div>
        )
    }
        
}

export default AppointmentForm;