import { Redirect } from 'react-router-dom'
import {ynToBool} from '../apis/mapper'

const OAuth2RedirectHandler = ({authenticate, result, code, message, accessToken, ...props}) => {
    if (ynToBool(result) && accessToken) {

        authenticate(accessToken)
        return <Redirect to={{
            pathname: '/',
        }}/>
    } else {

        alert(message)
        return <Redirect to={{
            pathname: '/login',
        }}/>
    }
} 
export default OAuth2RedirectHandler;