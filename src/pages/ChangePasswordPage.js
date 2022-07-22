import {React, useState} from 'react'
import style from '../css/pages/FindPasswordPage.module.css'
import { changePassword } from '../apis/UserApi'
import { useHistory } from 'react-router-dom'
import { Col, Container, FormControl, InputGroup, Row } from 'react-bootstrap'
import { getUserId } from '../utils/AuthUtil'

const ChangePasswordPage = () => {
    const history = useHistory();
    
    const [currentPassowrd, setCurrentPassowrd] = useState('')
    const [newPassword1, setNewPassword1] = useState('')
    const [newPassword2, setNewPassword2] = useState('')

    const min_password_length = 10
    const max_password_length = 20

    const validateForm = () => {
        const passwordReg = new RegExp(`(?=.*[A-Z])(?=.*[a-z])(?=.*\\d)(?=.*[@$!%*#?&])[A-Za-z\\d@$!%*#?&]{${min_password_length},${max_password_length}}`)

        if (!currentPassowrd){
            alert("현재 비밀번호를 입력해주세요")
            return false
        }

        if( !passwordReg.test(newPassword1) ) {
            alert("규칙에 맞는 새 비밀번호를 입력해주세요")
            return false
        }

        if (newPassword1 !== newPassword2){
            alert("새 비밀번호가 일치하지 않습니다")
            return false
        }

        return true
    }
    
    const submit = async () => {
        if (!validateForm())
            return

        const userId = getUserId()
        try{
            await changePassword(userId, currentPassowrd, newPassword1)
            alert("비밀번호가 성공적으로 변경되었습니다.")
            history.goBack()
            
        } catch (error){
            try{
                if(error.response.data.errors.filter( e => e.code === "031004").length === 1)
                    alert("현재 비밀번호가 올바르지 않습니다")
                else
                    alert(error.response.data.errors[0].message)
            } catch(e){
                alert("비밀번호 변경에 실패했습니다. 잠시 후 다시 시도하여주세요.")
            }

        } 
    }

    return(
        <Container>
                <InputGroup>
                    <FormControl
                            type = "password" 
                            placeholder="현재 비밀번호"
                            value={currentPassowrd} 
                            onChange={e => setCurrentPassowrd(e.target.value)}
                            maxLength = {max_password_length}>
                    </FormControl>
                </InputGroup>
                <InputGroup>
                    <FormControl
                            type = "password" 
                            placeholder="새 비밀번호"
                            value={newPassword1} 
                            onChange={e => setNewPassword1(e.target.value)}
                            maxLength = {max_password_length}>
                    </FormControl>
                </InputGroup>
                <InputGroup>
                    <FormControl
                            type = "password" 
                            placeholder="새 비밀번호 확인"
                            value={newPassword2} 
                            onChange={e => setNewPassword2(e.target.value)}
                            maxLength = {max_password_length}>
                    </FormControl>
                </InputGroup>

                <Row className='justify-content-center mt-4'>
                    <Col className = {style['submit'] }
                        onClick = {submit}>
                        확인
                    </Col>
                    
                    <Col className = {style['submit']}
                        onClick = {() => history.goBack()}>
                        취소
                    </Col>
                </Row>

        </Container>
    );
}

export default ChangePasswordPage;