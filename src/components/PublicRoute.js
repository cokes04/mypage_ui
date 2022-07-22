import React from 'react'
import { Route } from 'react-router-dom'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import { isExistRefreshToken } from '../utils/AuthUtil'

function PublicRoute ({render, ...rest }) {
    const history = useHistory()

    const reject = () => {
        history.goBack()
    }
    
    return (
        <Route
            {...rest}
            render = { props => 
                !isExistRefreshToken() ? 
                        render(props)
                    :   <>{ reject()}</>         
            }
        />
    )
}

export default PublicRoute;