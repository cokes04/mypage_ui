import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import NovelForm from '../components/NovelForm';
import { getNovel, modifyNovel } from '../apis/Api';
import { Link } from 'react-router-dom';
import { Container, Spinner, Row, Image, Col } from 'react-bootstrap';

const NovelManagePage = ({id, ...props}) => {
    const history = useHistory()
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(undefined)

    const [novel, setNovel] = useState({})

    useEffect( async () => {
        try{
            let response = await getNovel(id)
            setNovel(response.data)
            setLoading(false)
            setError(undefined)
        }catch (err){
            setLoading(false)
            setError("소설 정보를 불러올 수 없습니다.")
        }
    }, [id]);


    const modify = (novel) => {
        modifyNovel(id, novel)
            .then( (response) => {
                history.push('/my_creation')

            }).catch( (error) => {
                try{
                    alert(error.response.data.errors[0].message)
                } catch(e){
                    alert("잠시 후 다시 시도해주세요!")
                }
                    
                history.push('/my_creation')
            })
        
    };
    
    return (
        loading ?  <Spinner animation='border'/> :
        <Container >
            {  error ? <p>{error}</p> :
              <NovelForm  novel = {novel}
                          onsubmit = {modify}
                          submitBtnName = {'수정'}/>
            }      

            <Row className='justify-content-center m-2'>
                {novel.monopoly === "y" ? <></> :
                <Col md={2}>
                        <Link to={'/my_creation/monopoly_apply/' + novel.novelId} style={{fontSize:"30px"}}>
                            독점 신청
                        </Link>
                </Col>
                }
                {novel.free === "n" ? <></> :
                <Col md={2}>
                    <Link to={'/my_creation/pay_apply/' + novel.novelId} style={{fontSize:"30px"}}>
                        유료 신청
                    </Link>
                </Col>
                }
            </Row>
        </Container>
    )
}

export default NovelManagePage;