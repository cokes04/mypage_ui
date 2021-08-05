import {React} from 'react';
import  { useHistory} from 'react-router'; 
import { login, setToken } from '../utils/Api';
import LoginForm from '../components/LoginForm';
import SocialLogin from '../components/SocialLogin';

const Login = ( { authenticate } ) => {
    const history = useHistory();
    
    const tryLogin = (user) => {
        login(user)
        .then(response => {
            loginSuccess(response);
        }).catch(error => {
            loginFailure(error);
        })
    };

    const loginSuccess = (response) => {
        console.log(response);
        const { accessToken } = response.data;
        setToken(accessToken);
        authenticate();
        history.push('/signup'); 
    };

    const loginFailure = (error) => {
        console.log(error);
    };

    
    return (
        <div> 
            <button onClick={ () => login({
                                            "email" : "aaaa123@ggg.com",
                                            "password" : "aaa"
                                        })}>
                                            임시로그인</button>
            <LoginForm login = {tryLogin} />
            <br />
            <SocialLogin />
        </div>
    );
}

export default Login;