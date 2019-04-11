import React from 'react';
import DoctorsSignupForm from '../../components/DoctorsSignupForm/DoctorsSignupForm'

const errmsg = ''

const updateMessage = (msg)=>{
   errmsg = msg;
   return errmsg;
};

const DoctorsSignupPage = props => {
    
    return(
    <div>
        <h1>Docotors Signup Page</h1>
        <DoctorsSignupForm 
        {...props} history={props.history}
        // updateMessage={updateMessage}
        // user={props.user}
        // handleUpdateDoctor={props.handleUpdateDoctor}
        /> 
    </div>
    )
}

export default DoctorsSignupPage;