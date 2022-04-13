import {React, useState} from 'react';
import style from '../css/pages/FindPasswordPage.module.css'
import { resetPasswordRequest } from '../apis/UserApi';
import { useHistory } from 'react-router-dom';

const FindPasswordPage = ({}) => {
    const history = useHistory();

    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const max_email_length = 40;

    const inputEmail = (email) => {
        setEmail(email)
        setMessage("")
    }
    const findPassword = async () => {
        try{
            const response = await resetPasswordRequest(email)
            alert("비밀번호 재설정을 위한 이메일이 발송되었습니다. 이메일을 확인하여 주세요.")
            
        } catch (error){
            try{
                setMessage(error.response.data.errors[0].message)
            } catch(e){
                setMessage("잠시 후 다시 시도해주세요!")
            }
        } 
    }

    return(
        <div className = {style['container']}>
                <div className = {style['input']}>
                    <input  type = "email" 
                            placeholder="이메일" 
                            value={email} 
                            maxLength={max_email_length}
                            onChange={e => inputEmail(e.target.value)}/>
                </div>

                {message ? <div>{message}</div> : null}

                <div className = {style['submit']}
                    onClick = {findPassword}>
                        비밀번호 재설정 이메일 받기
                </div>
        </div>
    );
}

export default FindPasswordPage;