import React from  'react';

import {Route, Redirect} from 'react-router-dom';




const PrivateRoute=({component: Component, ...rest})=>{
    console.log(rest.doctors)
    return(
<Route 
    {...rest}
    render={(props)=>(
    rest.user.role==='doctor'? 
    <Component {...props}{...rest}/>:
    <Redirect to='/'/>
   )
}
/>
    )

}
    


    export default PrivateRoute;


