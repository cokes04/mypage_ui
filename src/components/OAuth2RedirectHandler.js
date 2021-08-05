import React from 'react';
import { Redirect } from 'react-router-dom'
import { setToken } from '../utils/Api';

const OAuth2RedirectHandler = (props) => {

    let token = new URL(window.location.href).searchParams.get("token");

    if (token) {
        setToken(token);
        return(
            <Redirect to={{
                pathname: "/",
            }}/>
        )
    } else {
        return(
            <Redirect to={{
                pathname: "/login",
            }}/>
        )
    }
} 
export default OAuth2RedirectHandler;