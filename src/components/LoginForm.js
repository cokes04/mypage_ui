import {React, useState } from "react";

const LoginForm = ( {login} ) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const max_email_length = 50;
    const max_password_length = 20;

    const validatedForm = () => {
        if (!email || email.length > max_email_length) {
            return false;
        }

        if (!password || password > max_password_length) {
          return false;
        }

        return true;
    };

    const resetForm = () => {
        setEmail('');
        setPassword('');
    };

    const onSubmit = (e) => {
        e.preventDefault();
        
        if (validatedForm()) {
            const user = setUser(email, password);
            login(user);
            resetForm();
        }else{
            //말풍선
        }
    };

    const setUser = (email, password) => {
        return {
            'email' : email,
            'password' : password
        };
    }
    return(
        <form  onSubmit={onSubmit}>
            <input type = "email" placeholder="이메일" value={email} onChange={e => setEmail(e.target.value)} /><br/>
            <input type = "password" placeholder="비밀번호" value={password} onChange={e => setPassword(e.target.value)} /><br/>
            <button type="submit">로그인</button>
        </form>
    );
};

export default LoginForm;