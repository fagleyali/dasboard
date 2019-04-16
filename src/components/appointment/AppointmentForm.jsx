import React from 'react';
import Calendar from '../Calendar/Calendar';
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
            slots: {1:false,2:false,3:false,4:false,5:false,6:false,
              7:false,8:false,9:false,10:false,11:false,12:false,13:false,
              14:false,15:false,16:false
            },
            slot:0,
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
      console.log(e.target.value)
        this.setState({
          [e.target.name]: e.target.value,
        });
      }

    handleGetDoctors = (e) => {
      this.setState({ department: e.target.value }, () => {
        doctorsService.getDoctors(this.state.department)
          .then((doctors) => {
            console.log("Line 35: ",doctors)
            this.setState({ doctors })
          }).catch(error => console.log(error))
        })
      }


      handleAppDate=selectedDate=>{
        this.setState({appDate:selectedDate},()=>{
          appointmentService.getSlots(this.state.doctor,new Date(this.state.appDate).getTime())
          .then(slots=>{
            if(slots.length===0) this.initializeSlots();
            const newSlots = this.state.slots
            Object.keys(newSlots).map(slot1=>{
              slots.map(slot2=>{
                if (parseInt(slot1)===slot2){
                  newSlots[slot1]=true;
                }
              }) 
            })
            this.setState({slots:newSlots})
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
            patient:this.state.user,
            slot:this.state.slot
          }
          console.log("Line 59:",appointment);
          return appointment;

        }
        
      }

      handleSubmit = async (e) => {
        console.log(this.state.doctors," | ",this.appointment())
        e.preventDefault();
        const doctorName = this.state.doctors.find(doctor=>doctor._id===this.state.doctor)
          appointmentService.createAppointment(this.state.doctor,this.appointment())
          .then((appointment)=>{
            this.setState({ appointment });
            this.props.handleUpdateAppointment(doctorName,appointment)
            this.props.history.push('/appointmentsetup');
          }).catch(err => console.log(err))
      }
      
     timeLoop=()=>{
        var arr=[]
        for (var i=8;i<17;i++){
          
          for(var j=0;j<31;j+=30){
            if (j>30){
              i++
              j='00'
            }
            arr.push(`${i}:${j}`);
            
          }
        }
        return arr;
        }

        isFormInvalid() {
          return !(this.state.user && this.state.doctor && this.state.appDate && this.state.slot);
        }
    

    render(){
      const arr=this.timeLoop();
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
                    <Calendar handleAppDate={this.handleAppDate} />
                </div>
              </div>
            <div className="column">
            <h3>Available Slot</h3>
                <div>
                    <select className="form-control" name="slot" onChange={this.handleChange} >
                    <option value='' selected>Select a slot</option>
                    {this.state.appDate ?
                      (Object.keys(this.state.slots)).map((key,id)=>(
                        !this.state.slots[key] &&
                          <option value={key}>{arr[id]}</option>

                        ))
                      :
                      false
                      }
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