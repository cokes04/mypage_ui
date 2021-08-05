import React, { useEffect, useState } from "react";

const SignUpForm = ( {signup} ) => {

    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password1, setPassword1] = useState('');
    const [password2, setPassword2] = useState('');

    const [passwordError, setPasswordError] = useState('');

    const max_name_length = 5;
    const max_email_length = 50;
    const max_password_length = 20;

    useEffect( () => {
        if (password1 === password2) {
            setPasswordError('');
            return true;
        }else{
            setPasswordError('비밀번호가 일치하지 않습니다.');
            return false;
        }
    }, [password1, password2]);

    const onSubmit = (event) => {
        event.preventDefault();
        if (validateForm()) {
            const user = setUser();
            signup(user);
            resetForm();
        };
    };

    const setUser = () => {
        return {
            'email' : email,
            'name' : name,
            'password' : password1,
        };
    }

    const resetForm = () => {
        setEmail('');
        setName('');
        setPassword1('');
        setPassword2('');
    };

    const validateForm = () => {
        if (!email || email.length > max_email_length) {
            return false;
        }

        if (!name || name.length > max_name_length) {
            return false;
        }

        if (!password1 || password1 > max_password_length) {
          return false;
        }

        if (!password2 || password2 > max_password_length) {
          return false;
        }

        return true;
    };

    return(
        <form  onSubmit={onSubmit}>
            <input 
                type = "email" 
                placeholder="이메일" 
                value={email} 
                onChange={e => setEmail(e.target.value)}
             />
            <br/>
            <input 
                type = "name" 
                placeholder="이름" 
                alue={name} 
                onChange={e => setName(e.target.value)} 
            />
            <br/>
            <input 
            type = "password"
            placeholder="비밀번호"
            value={password1}
            onChange={e => setPassword1(e.target.value)}
             />
            <br/>
            <input 
            type = "password"
            placeholder = "비밀번호 확인"
            value={password2}
            onChange={e => setPassword2(e.target.value)}
             />
            <br/>
            <p>{passwordError}</p>

            <button type="submit">회원 가입</button>
        </form>
    );
};

export default SignUpForm;