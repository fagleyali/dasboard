import React from 'react';
import { Link } from 'react-router-dom';
import './doctors.css';

const DoctorsPage = props => {
    console.log(props.doctors)
    
    return(
    <div >
        <h1>Doctors List</h1>
            <div classname='container1'>

            {props.doctors.map((doctor,id)=> 
            <div >
                <li className='card-body' key={id}>Name: {doctor.name} |
                 Department: {doctor.department}</li>
            </div>
            )}
            </div>

        <div>

            <Link className='btn btn-primary' to="/doctors/signup">
                <span>Add New Doctor</span>
            </Link>
           
            <Link className='btn btn-primary' to="/">
                <span>Cancel</span>
            </Link>
        </div>
        
    </div>
    )
}

export default DoctorsPage;