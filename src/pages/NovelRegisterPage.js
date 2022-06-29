import React from 'react';
import { useHistory } from 'react-router-dom';
import NovelForm from '../components/NovelForm';
import { writeNovel } from '../apis/NovelApi';
import { Container } from 'react-bootstrap';
import { getUserId } from '../utils/AuthUtil';

const NovelRegisterPage = () => {

    const history = useHistory();
    
    const register = (novel) => {
        const userId = getUserId()
        writeNovel(userId, novel)
        .then( (response) => {
            history.push('/my_creation')
        })
        .catch( (error) => {
            try{
                alert(error.response.data.errors[0].message)
                if(error.response.data.errors[0].code === '021013')
                    history.push('/my_info')
            } catch(e){
                alert("알 수 없는 원인으로 등록에 실패하였습니다.")
            }
        })
        
    };

    return (
        <Container>
            <NovelForm  onsubmit = {register}
                        submitBtnName = {'등록'}/>
        </Container>
    )
}

export default NovelRegisterPage;