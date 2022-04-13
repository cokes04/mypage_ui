import { Redirect } from 'react-router-dom'

const OAuth2RedirectHandler = ({authenticate, accessToken, ...props}) => {
    console.log(accessToken);
    if (accessToken) {
        authenticate(accessToken);
        return <Redirect to={{
            pathname: '/',
        }}/>
    } else 
        return <Redirect to={{
            pathname: '/login',
        }}/>

} 
export default OAuth2RedirectHandler;