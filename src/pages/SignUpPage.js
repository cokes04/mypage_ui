import {React} from 'react';
import SocialLogin from '../components/SocialLogin';
import { Link } from 'react-router-dom';

const SignUpPage = () => {
    
    return (
        <div>
            <Link to='/signup/emailForm' > 이메일 회원 가입 </Link>
            <SocialLogin />
        </div>
    );
}

export default SignUpPage;