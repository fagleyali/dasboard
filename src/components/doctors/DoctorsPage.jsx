import React from 'react';
import DoctorsSignupForm from '../../components/DoctorsSignupForm/DoctorsSignupForm'
import PrivateRoute from '../../components/PrivateRouter/PrivateRoute';
import { Link } from 'react-router-dom';

const errmsg = ''

const updateMessage = (msg)=>{
   errmsg = msg;
   return errmsg;
};

const DoctorsPage = props => {
    return(
    <div>
        <h1>Doctors List</h1>
        {
            /* Map through list of doctors */
        }
        <Link to="/doctors/signup">
            <span>Add New Doctor</span>
        </Link>
    </div>
    )
}

export default DoctorsPage;