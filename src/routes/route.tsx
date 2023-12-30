import React from 'react'
import { Navigate } from "react-router-dom";
import { useAppSelector } from '../redux/store';

const AuthCheck = (props) => {
    const LoginData =  useAppSelector((state) => state?.authUser.loginData);

    if(LoginData === undefined)
    {
        return (
            <Navigate to={{ pathname:  "/", state: { from: props.location } }} />
        );
    }
    return <React.Fragment> {props.children}</React.Fragment>
}

export default AuthCheck