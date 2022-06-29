import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import NovelForm from '../components/NovelForm';
import { getNovel, modifyNovel, deleteNovel } from '../apis/NovelApi';
import { Link } from 'react-router-dom';
import { Container, Spinner, Row, Col, Button } from 'react-bootstrap';

const NovelManagePage = ({id, ...props}) => {
    const history = useHistory()
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(undefined)

    const [novel, setNovel] = useState({})

    useEffect( () => {
        const requset = async () => {
            try{
                let response = await getNovel(id)
                setNovel(response.data)
                setLoading(false)
                setError(undefined)
            }catch (err){
                setLoading(false)
                setError("소설 정보를 불러올 수 없습니다.")
            }
        }
        requset()
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
    
    const deleteMyNovel = () => {
        deleteNovel(id)
        .then( (response) => {
            let go = window.confirm("소설이 제거되면 복구가 불가능합니다.\n정말로 해당 소설을 제거하시겠습니까?")
            if(go){
                alert("소설이 성공적으로 제거되었습니다.")
                history.push('/my_creation')
            }
        }).catch( (error) => {
            try{
                alert(error.response.data.errors[0].message)
            } catch(e){
                alert("잠시 후 다시 시도해주세요!")
            }
            history.push('/my_creation')
        })
    
    }
    return (
        loading ?  <Spinner animation='border'/> :
        <Container >
            {  error ? <p>{error}</p> :
                <>
                    <NovelForm  novel = {novel}
                          onsubmit = {modify}
                          submitBtnName = {'수정'}/>
                  
                    <Button onClick={deleteMyNovel}>제거</Button>
                    <Row className='justify-content-center m-2'>
                        {novel.free === "n" ? <></> :
                        <Col md={2}>
                            <Link to={'/my_creation/pay_apply/' + novel.novelId} style={{fontSize:"30px"}}>
                                유료 신청
                            </Link>
                        </Col>
                        }
                    </Row>
                </>
            }
        </Container>
    )
}

export default NovelManagePage;