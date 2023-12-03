import React from 'react'
import { Navigate } from "react-router-dom";
import { useSelector } from 'react-redux';

const AuthCheck = (props) => {
    const LoginData =  useSelector((state) => state.authUser.loginData);

    if(LoginData === undefined)
    {
        return (
            <Navigate to={{ pathname:  "/", state: { from: props.location } }} />
        );
    }
    return <React.Fragment> {props.children}</React.Fragment>
}

export default AuthCheck