import {React, useEffect, useState} from 'react';
import style from '../css/pages/FindPasswordPage.module.css'
import { resetPassword } from '../apis/UserApi';
import { useHistory } from 'react-router-dom';

const ResetPasswordPage = ({userId, resetKey}) => {
    const history = useHistory();

    const [password1, setPassword1] = useState('');
    const [password2, setPassword2] = useState('');

    const max_password_length = 30;

    const submit = async () => {
        try{
            await resetPassword(userId, resetKey, password1)
            alert("비밀번호가 성공적으로 변경되었습니다.")
            history.push("/sign");
            
        } catch (error){
            try{
                alert(error.response.data.errors[0].message)
            } catch(e){
                alert("비밀번호 변경에 실패했습니다. 잠시 후 다시 시도하여주세요.")
            }
            history.push("/");
        } 
    }

    return(
        <div className = {style['container']}>
                <div className = {style['input']}>
                    <input  type = "password"
                            placeholder="비밀번호"
                            value={password1}
                            maxLength={max_password_length}
                            onChange={e => setPassword1(e.target.value)}/>
                </div>

                <div className = {style['input']}>
                    <input  type = "password"
                            placeholder = "비밀번호 확인"
                            value={password2}
                            maxLength={max_password_length}
                            onChange={e => setPassword2(e.target.value)}/>
                </div>

                <div className = {style['submit']}
                    onClick = {submit}>
                    재설정
                </div>
        </div>
    );
}

export default ResetPasswordPage;