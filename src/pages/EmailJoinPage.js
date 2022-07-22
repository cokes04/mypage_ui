import {React, useState} from "react";
import { join } from "../apis/UserApi";
import { useHistory } from "react-router-dom";
import { Button, Form } from "react-bootstrap";

const EmailJoinPage = () => {
    const history = useHistory();
    
    const [email, setEmail] = useState('')
    const [password1, setPassword1] = useState('')
    const [password2, setPassword2] = useState('')
    const [emailMessage, setEmailMessage] = useState('')
    const [passwordMessage, setPasswordMessage] = useState('')

    const emailMessage1 = "이메일 형식에 맞춰서 입력해주세요."
    const passwordRole = "대문자, 소문자, 숫자, 특수문자(@$!%*#?&) 각 1자 이상씩 10 ~ 20자"
    const passwordMessage1 = "규칙에 맞는 비밀번호를 입력해주세요."
    const passwordMessage2 = "비밀번호가 일치하지 않습니다."

    const max_email_length = 40
    const min_password_length = 10
    const max_password_length = 20

    const onJoin = () => {
        if (validateForm()) {
            const user = setUser()
            join(user)
            .then(response => {
                alert("회원가입을 축하드립니다.\n 본인 확인 이메일이 발송되었습니다.")
                history.push("/sign")
                
            }).catch(error => {
                try{
                    alert(error.response.data.errors[0].message)
                } catch(e){
                    alert("잠시 후 다시 시도해주세요!")
                }
             })
        };
    };

    const validateForm = () => {
        resetMessage()
        let success = true

        const emailReg = new RegExp(`[\\w-]+@\\w+\\.\\w+(\\.\\w{1,3})?`)
        const passwordReg = new RegExp(`(?=.*[A-Z])(?=.*[a-z])(?=.*\\d)(?=.*[@$!%*#?&])[A-Za-z\\d@$!%*#?&]{${min_password_length},${max_password_length}}`)
        
        if(!emailReg.test(email)){
            setEmailMessage(emailMessage1)
            success = false
        }

        if( !passwordReg.test(password1) ) {
            setPasswordMessage(passwordMessage1)
            return false
        }

        if (password1 !== password2){
            setPasswordMessage(passwordMessage2)
            return false
        }


        return success
    }
    const resetMessage = () =>{
        setEmailMessage("")
        setPasswordMessage("")
    }

    const setUser = () => {
        return {
            'email' : email,
            'password' : password1,
        };
    }

    return(
            <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Control 
                        required 
                        type="email" 
                        placeholder="이메일"
                        value={email}
                        maxLength={max_email_length}
                        onChange={e => setEmail(e.target.value)}/>
                        { emailMessage ? 
                            <Form.Text>{emailMessage}</Form.Text> : <></>}
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Control 
                        required 
                        type="password" 
                        placeholder={`비밀번호 ( ${passwordRole})`}
                        value={password1}
                        maxLength={max_password_length}
                        onChange={e => setPassword1(e.target.value)} />
                        { passwordMessage ? 
                            <Form.Text>{`${passwordMessage} (${passwordRole})` }</Form.Text> : <></>}
                </Form.Group>
                
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Control 
                        required 
                        type="password" 
                        placeholder="비밀번호 확인"
                        value={password2}
                        maxLength={max_password_length}
                        onChange={e => setPassword2(e.target.value)} />
                </Form.Group>

                <Button type="button" onClick = {onJoin} >회원가입</Button>
            </Form>
    );
};

export default EmailJoinPage;