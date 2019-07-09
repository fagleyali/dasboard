import React, {Component} from 'react';
import doctorsService from '../../utils/doctorsService';
import {Link} from 'react-router-dom';
import userService from '../../utils/userService'

class DoctorsSignupForm extends Component {

    state={
        name: '',
        doctorId:'',
        department:'',
        doctors:[]
      

    }

    async componentDidMount(){
      const user = await userService.getUser();
      this.setState({name:user.name})
    }

    

    handleChange = (e) => {
        // this.props.updateMessage('');
        this.setState({
          // Using ES2015 Computed Property Names
          [e.target.name]: e.target.value
        });
      }
    
      handleSubmit = async (e) => {
        e.preventDefault();
        try {
          await doctorsService.create(this.state)
          .then(doctors=> console.log(doctors)
          )
          this.props.history.push('/doctors');
          
        } catch (err) {
          console.log(err)
          
        }
      }
    
      isFormInvalid() {
        
        return !(this.state.name && this.state.doctorId && this.state.department);
      }
    


render() {
    return (
      <div>
        <header className="header-footer">Doctors' Sign Up</header>
        <form className="form-horizontal" onSubmit={this.handleSubmit} >
          <div className="form-group">
            <div className="col-sm-12">
              <input type="text" className="form-control" placeholder="Name" value={this.state.name} name="name" onChange={this.handleChange} />
            </div>
          </div>
          <div className="form-group">
            <div className="col-sm-12">
              <input type="text" className="form-control" placeholder="Doctor ID" value={this.state.doctorsId} name="doctorId" onChange={this.handleChange} />
            </div>
          </div>
          
            <div className="form-group">
            <div className="col-sm-12">
              <select className="form-control" value={this.state.department}  name="department" onChange={this.handleChange}>
                <option value='' selected>Select</option>
                <option value='Medicine'>Medicine</option>
                <option value='Peditrician'>Peditrician</option>
                <option value='CardioVascular Medicine' >Cardiovasculars Medicine</option>
                <option value='Opthalmologist' >Opthalmologist</option>
            </select>
            </div>
          </div>
          <div className="form-group">
            <div className="col-sm-12 text-center">
              <button className="btn btn-default" disabled={this.isFormInvalid()}>Sign Up</button>&nbsp;&nbsp;
              <Link to='/'>Cancel</Link>
            </div>
          </div>
        </form>
      </div>
    );
  }
};

export default DoctorsSignupForm;
    


