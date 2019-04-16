import React from 'react';
import { Link } from 'react-router-dom';

const DoctorsPage = props => {
    console.log(props.doctors)
    return(
    <div>
        <h1>Doctors List</h1>
        
            {props.doctors.map((doctor,id)=> 
            <div>
                <p key={id}>Name: {doctor.name}</p>
                <p key={id}>Department: {doctor.department}</p>
            </div>
            
            
            )}

            
        
        
        <Link to="/doctors/signup">
            <span>Add New Doctor</span>
        </Link>
    </div>
    )
}

export default DoctorsPage;