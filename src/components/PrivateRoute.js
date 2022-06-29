import React from 'react';
import { Route } from 'react-router-dom';
import { isExistRefreshToken } from '../utils/AuthUtil';

function PrivateRoute ({authenticated, render, ...rest }) {
    
    const reject = () => {
        alert("로그인이 필요한 페이지입니다.")
        window.location.replace("/sign")
    }
    return (
        <Route
            {...rest}
            render = { props => 
                isExistRefreshToken() ? 
                        render(props)
                    :   <>{ reject()}</>         
            }
        />
    )
}

export default PrivateRoute;