import {React, useState} from 'react'
import { login } from '../apis/AuthApi'
import { Link } from 'react-router-dom'
import googleSignImg from '../img/google.png'
import {GOOGLE_AUTH_URL} from '../utils/Oauth2'
import { Container, Button, Form, Row, Col } from "react-bootstrap"

const SignPage = ( {authenticate, ...props} ) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [printMessage, setPrintMessage] = useState(false)

    const errorMessage = "이메일, 비밀번호를 다시 확인하고 시도하여주세요. 비밀번호는 대문자, 소문자, 숫자, 특수문자 각 1개 이상씩 입력하여 주세요."
    const max_email_length = 40
    const max_password_length = 20

    const onLogin = () => {
        login(email, password)
        .then(response => {
            authenticate(response.data.accessToken)
            window.location.replace("/")
        }).catch( error => {
            setPassword('')
            setPrintMessage(true)
        })
    };

    const tmpLogin1 = () => {
        login("tmp1111@mypage.com", "TMPtmp111@@")
        .then(response => {
            authenticate(response.data.accessToken)
            window.location.replace("/")
        })
        .catch( error => {
            setPassword('')
            setPrintMessage(true)
        })
    }
    
    const tmpLogin2 = () => {
        login("tmp2222@mypage.com", "TMPtmp222@@")
        .then(response => {
            authenticate(response.data.accessToken)
            window.location.replace("/")
        })
        .catch( error => {
            setPassword('')
            setPrintMessage(true)
        })
    }

    const tmpLogin3 = () => {
        login("tmp3333@mypage.com", "TMPtmp333@@")
        .then(response => {
            authenticate(response.data.accessToken)
            window.location.replace("/")
        })
        .catch( error => {
            setPassword('')
            setPrintMessage(true)
        })
    }

    return (
        <Container>
            <button onClick={ () => tmpLogin1()}>
                 임시로그인1
            </button>
            <button onClick={ () => tmpLogin2()}>
                 임시로그인2
            </button>
            <button onClick={ () => tmpLogin3()}>
                 임시로그인3
            </button>

            <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Control 
                        required 
                        type="email" 
                        placeholder="이메일"
                        value={email}
                        maxLength={max_email_length}
                        onChange={e => setEmail(e.target.value)}/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Control 
                        required 
                        type="password" 
                        placeholder="비밀번호"
                        value={password}
                        maxLength={max_password_length}
                        onChange={e => setPassword(e.target.value)} />
                </Form.Group>
                {printMessage ? <Form.Text>{errorMessage}</Form.Text> : <></>}

                <Row>
                    <Col>
                        <Button type="button" onClick = {onLogin} >로그인</Button>
                    </Col>
                    <Col>
                        <Link to='/find/password' >비밀번호 찾기</Link> 
                    </Col>
                </Row>
            </Form>

            <Row>
                <Link to='/signup/emailForm' >이메일 회원가입</Link>           
            </Row>
            <Row>
                <Col>
                    <a href={GOOGLE_AUTH_URL}><img src={googleSignImg} alt="Google" /></a>
                </Col>  
            </Row>
        </Container>
    );
}

export default SignPage;