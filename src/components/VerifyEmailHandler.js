import {React, useEffect} from 'react'
import { verifyEmail } from '../apis/UserApi'
import { useHistory } from 'react-router-dom'
import { Container, Row, Spinner } from 'react-bootstrap'

const VerifyEmailHandler = ({userId, verifyKey}) => {
    const history = useHistory()

    useEffect(() => {
        submit()
    }, [])
    
    const submit = async () => {
        try{
            await verifyEmail(userId, verifyKey)
            alert("본인 인증이 완료되었습니다.")
            history.push("/sign");
            
        } catch (error){
            try{
                alert(error.response.data.errors[0].message)
            } catch(e){
                alert("본인 인증에 실패하였습니다.")
            }
            history.push("/")
        } 
    }

    return(
        <Container>
            <Row style={{fontsize : "30px"}}>
                이메일 인증 처리 중
            </Row>
            <Spinner animation='border'/>
        </Container>
    );
}

export default VerifyEmailHandler;