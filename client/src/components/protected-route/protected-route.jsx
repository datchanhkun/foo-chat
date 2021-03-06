import  React from 'react'
import {Route, Redirect} from "react-router-dom";
import {connect} from "react-redux";



const PrivateRoute = ({ component: Component, currentUser, ...rest }) => {    
    return (
    <Route {...rest} render={(props) => (
       sessionStorage.getItem("validator") && currentUser? 
       <Component currentUser={currentUser} {...props} /> : 
       <Redirect to={{
            pathname:"/auth/login",
            state:{from: props.location}
            }}
        />
    )} />
    )
}
const mapStateToProps = (state) =>({
    currentUser:state.user.currentUser
 })
 


export default connect(mapStateToProps , null)(PrivateRoute)