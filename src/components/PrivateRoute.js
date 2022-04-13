import React from 'react';
import { Route } from 'react-router-dom';
import { logout } from '../apis/AuthApi';
import { isExistRefreshToken } from '../utils/AuthUtil';

function PrivateRoute ({authenticated, render, ...rest }) {
    
    const reject = () => {
        window.location.replace("/")
    }
    return (
        <Route
            {...rest}
            render = { props => 
                isExistRefreshToken() ? 
                        render(props)
                    :
                    <>{
                        reject()
                    }</>

         
                
            }
        />
    )
}

export default PrivateRoute;