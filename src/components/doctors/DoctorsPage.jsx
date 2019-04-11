import React from 'react';
import { Link } from 'react-router-dom';

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